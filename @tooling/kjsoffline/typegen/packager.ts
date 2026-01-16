import { mkdirSync, writeFileSync } from "node:fs"
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
				!Number.isNaN(Number.parseInt(klass.simpleName(), 10))
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

	generate(targetDir: string) {
		// TODO: generate for all...
	}

	generatePackage(targetDir: string, packages: Package, format = false) {
		const classes = Object.values(packages).filter(
			(value) => value instanceof RawClass,
		)
		if (Object.keys(classes).length <= 0) return

		const packageName = packages[Package.PackageName]
		const dirs = packageName.split(".")
		const packageFile = `${dirs.pop()}.d.ts`
		const packagePath = join(targetDir, ...packageName.split("."), packageFile)

		const code = format
			? dprint.format(packagePath, renderPackage(packageName, classes))
			: renderPackage(packageName, classes)

		mkdirSync(dirname(packagePath), { recursive: true })
		writeFileSync(packagePath, code)
	}
}
