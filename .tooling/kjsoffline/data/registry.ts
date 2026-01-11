import type { Tagged } from "type-fest"
import type { Base, Constructor } from "./common.ts"
import { Class } from "./element/class.ts"
import { ParameterizedType } from "./element/parameterized-type.ts"
import { RawClass } from "./element/raw-class.ts"
import { TypeVariable } from "./element/type-variable.ts"
import { WildcardType } from "./element/wildcard-type.ts"
import type { DataIndex, DataStorage } from "./storage.ts"
import { exist } from "./utils.ts"

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
			if (RawClass.isValid(data)) finalClass = RawClass
			else if (ParameterizedType.isValid(data)) finalClass = ParameterizedType
			else if (WildcardType.isValid(data)) finalClass = WildcardType
			else if (TypeVariable.isValid(data)) finalClass = TypeVariable
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
