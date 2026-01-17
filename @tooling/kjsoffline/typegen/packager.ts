import { readFileSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { createContext, type FormatterContext } from "@dprint/formatter"
import typescript from "@dprint/typescript"
import { Class, RawClass, type Registry } from "../data"
import { renderPackage } from "./renderer/package.ts"
export interface Package {
	[key: string]: RawClass | Package
	[Package.PackageName]: string
}

export namespace Package {
	export const PackageName = Symbol.for("PackageName")
}

export class Packager {
	context: FormatterContext

	constructor(readonly registry: Registry) {
		this.preload()
		this.context = createContext()
		this.context.addPlugin(readFileSync(typescript.getPath()))
	}

	readonly packages: Record<string, Record<string, RawClass>> = {}
	readonly packageMap: Package = {
		[Package.PackageName]: "",
	}

	private preload() {
		for (let i = 0; i < this.registry.storage.types.length; i++) {
			let klass: Class<any>
			try {
				klass = this.registry.get(Class, this.registry.elementIndexOf(i))
			} catch {
				continue
			}

			if (
				!(klass instanceof RawClass) ||
				klass.asWrapped().typescriptSimpleName().startsWith("package-info")
			)
				continue
			this.insertClass(klass)
		}
	}

	private insertClass(klass: RawClass) {
		const wrapped = klass.asWrapped()
		const packageName = wrapped.typescriptPackageName()
		if (!packageName) return

		let packageClasses = this.packages[packageName]
		if (!packageClasses) {
			packageClasses = {}
			this.packages[packageName] = packageClasses
		}

		const parts = packageName.split(".")
		let current = this.packageMap
		let partialPackage = ""
		for (const part of parts) {
			partialPackage = partialPackage ? `${partialPackage}.${part}` : part
			if (!(part in current))
				current[part] = {
					[Package.PackageName]: partialPackage ?? "",
				}

			current = current[part] as Package
		}

		const name = wrapped.typescriptReferenceName()
		packageClasses[name] = klass
		current[name] = klass
	}

	async generate(
		targetDir: string,
		options?: {
			onSuccess?: (packageName: string) => void
			onError?: (packageName: string, error: Error) => void
		},
	) {
		const tasks = this.collectPackages(this.packageMap)
		const results = await Promise.all(
			tasks.map((pkg) =>
				this.generatePackage(targetDir, pkg)
					.then(() => {
						options?.onSuccess?.(pkg[Package.PackageName])
						return null
					})
					.catch((error) => {
						options?.onError?.(pkg[Package.PackageName], error)
						return [pkg, error] as const
					}),
			),
		)
		return results.filter((result) => result !== null)
	}

	async generatePackage(
		targetDir: string,
		singlePackage: Package,
		format = true,
	) {
		const classes = Object.values(singlePackage).filter(
			(value) => value instanceof RawClass,
		)
		if (Object.keys(classes).length <= 0) return

		const packageName = singlePackage[Package.PackageName]
		const dirs = packageName.split(".")
		const packageFile = `${dirs.pop()}.d.ts`
		const packagePath = join(targetDir, ...packageName.split("."), packageFile)

		let finalCode = renderPackage(packageName, classes)
		let error: any
		try {
			if (format)
				finalCode = this.context.formatText({
					filePath: packagePath,
					fileText: finalCode,
				})
		} catch (e) {
			error = e
		}

		await mkdir(dirname(packagePath), { recursive: true })
		await writeFile(packagePath, finalCode)

		if (error) throw error
	}

	// TODO: warn if multiple packages with the same name are found
	private collectPackages(packageEntrypoint: Package): Package[] {
		const packages: Package[] = []
		const queue: Package[] = [packageEntrypoint]
		while (queue.length > 0) {
			const pkg = queue.shift()
			if (!pkg) break
			packages.push(pkg)
			queue.push(
				...(Object.values(pkg).filter(
					(value) => !(value instanceof RawClass),
				) as Package[]),
			)
		}
		return packages
	}
}
