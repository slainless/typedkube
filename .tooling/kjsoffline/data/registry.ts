import type { Tagged } from "type-fest"
import type { Base, Constructor } from "./common"
import { Class } from "./element/class"
import { ParameterizedType } from "./element/parameterized-type"
import { RawClass } from "./element/raw-class"
import { TypeVariable } from "./element/type-variable"
import { WildcardType } from "./element/wildcard-type"
import type { DataIndex, DataStorage } from "./storage"
import { exist } from "./utils"

export type ElementIndex = Tagged<number, "element">

export class Registry {
	private registry: Map<Constructor<Base>, Map<ElementIndex, Base>> = new Map()
	constructor(readonly storage: DataStorage) {}

	get(
		klass: typeof Class,
		id: ElementIndex,
		arrayDepth?: number,
	): RawClass | ParameterizedType | WildcardType | TypeVariable
	get<T extends Constructor<Base>>(
		klass: T,
		id: ElementIndex,
		...args: any[]
	): InstanceType<T>
	get(klass: Constructor<Base>, id: ElementIndex, ...args: any[]) {
		let registry = this.registry.get(klass)
		if (!registry) {
			registry = new Map()
			this.registry.set(klass, registry)
		}

		if (registry.has(id)) {
			return registry.get(id)
		}

		let finalClass: Constructor<Base> = klass
		if (klass === Class) {
			const data = exist(this.storage.getType(this.dataIndexOf(id)))
			if (RawClass.prototype.isValid(data)) finalClass = RawClass
			else if (ParameterizedType.prototype.isValid(data))
				finalClass = ParameterizedType
			else if (WildcardType.prototype.isValid(data)) finalClass = WildcardType
			else if (TypeVariable.prototype.isValid(data)) finalClass = TypeVariable
			else throw new Error(`Invalid data being assigned to ${Class.name}`)
		}

		const instance = new finalClass(this, id, ...args)
		registry.set(id, instance)
		return instance
	}

	dataIndexOf(elementIndex: ElementIndex): DataIndex {
		return elementIndex as number as DataIndex
	}

	elementIndexOf(dataIndex: DataIndex): ElementIndex {
		return dataIndex as number as ElementIndex
	}
}
