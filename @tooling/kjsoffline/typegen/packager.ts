import { Class, RawClass, type Registry } from "../data"

interface Package {
	[key: string]: RawClass | Package
}

export class Packager {
	constructor(readonly registry: Registry) {
		this.preload()
	}

	readonly packages: Record<string, Record<string, RawClass>> = {}
	readonly packageMap: Package = {}

	private preload() {
		for (let i = 0; i < this.registry.storage.types.length; i++) {
			let klass: Class<any>
			try {
				klass = this.registry.get(Class, this.registry.elementIndexOf(i))
			} catch {
				continue
			}

			if (!(klass instanceof RawClass)) continue
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
				current[part] = {}
			}
			current = current[part] as Package
		}

		const wrapped = klass.asWrapped()
		packageClasses[wrapped.simpleName()] = klass
		current[wrapped.simpleName()] = klass
	}
}
