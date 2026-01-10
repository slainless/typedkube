import type { Tagged } from "type-fest"
import type { Base, Constructor } from "./common"
import type { DataIndex, DataStorage } from "./storage"

export type ElementIndex = Tagged<number, "element">

export class Registry {
	private registry: Map<Constructor<Base>, Map<ElementIndex, Base>> = new Map()
	constructor(readonly storage: DataStorage) {}

	get<T extends Constructor<Base>>(
		klass: T,
		id: ElementIndex,
		...args: any[]
	): InstanceType<T> {
		if (!this.registry.has(klass)) {
			this.registry.set(klass, new Map())
		}

		let registry = this.registry.get(klass)
		if (!registry) {
			registry = new Map()
			this.registry.set(klass, registry)
		}

		if (registry.has(id)) {
			return registry.get(id) as InstanceType<T>
		}

		const instance = new klass(this, id, ...args)
		registry.set(id, instance)
		return instance as InstanceType<T>
	}

	dataIndexOf(elementIndex: ElementIndex): DataIndex {
		return elementIndex as number as DataIndex
	}

	elementIndexOf(dataIndex: DataIndex): ElementIndex {
		return dataIndex as number as ElementIndex
	}
}
