import { mkdir, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import dprint from "dprint-node"
import { Class, RawClass, type Registry } from "../data"
import { renderPackage } from "./renderer/package"

export interface Package {
	[key: string]: RawClass | Package
	[Package.PackageName]: string
}

export namespace Package {
	export const PackageName = Symbol("PackageName")
}

export class Packager {
	constructor(readonly registry: Registry) {
		this.preload()
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
				!Number.isNaN(Number.parseInt(klass.simpleName(), 10)) ||
				klass.simpleName().startsWith("package-info")
			)
				continue
			this.insertClass(klass)
		}
	}

	private insertClass(klass: RawClass) {
		const packageName = klass.packageName()
		let packageClasses = this.packages[packageName]
		if (!packageClasses) {
			packageClasses = {}
			this.packages[packageName] = packageClasses
		}

		const parts = packageName.split(".")
		let current = this.packageMap
		for (const part of parts) {
			if (!(part in current)) {
				current[part] = {
					[Package.PackageName]: packageName,
				}
			}
			current = current[part] as Package
		}

		const wrapped = klass.asWrapped()
		packageClasses[wrapped.simpleName()] = klass
		current[wrapped.simpleName()] = klass
	}

	async generate(targetDir: string) {
		const tasks = this.collectPackages(this.packageMap).map((pkg) =>
			this.generatePackage(targetDir, pkg)
				.then(() => null)
				.catch((error) => [pkg, error] as const),
		)
		const results = await Promise.all(tasks)
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
			if (format) finalCode = dprint.format(packagePath, finalCode)
		} catch (e) {
			error = e
		}

		await mkdir(dirname(packagePath), { recursive: true })
		await writeFile(packagePath, finalCode)

		if (error) throw error
	}

	private collectPackages(packageEntrypoint: Package): Package[] {
		const packages: Package[] = []
		const queue: Package[] = [packageEntrypoint]
		while (queue.length > 0) {
			const pkg = queue.shift()
			if (!pkg) continue
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
