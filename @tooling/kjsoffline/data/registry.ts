import type { Tagged } from "type-fest"
import type { Base, Constructor } from "./common.ts"
import { Class } from "./element/class.ts"
import { ParameterizedType } from "./element/parameterized-type.ts"
import { RawClass } from "./element/raw-class.ts"
import { TypeVariable } from "./element/type-variable.ts"
import { WildcardType } from "./element/wildcard-type.ts"
import { NameRenderer } from "./name.ts"
import type { DataIndex, DataStorage } from "./storage.ts"
import { exist } from "./utils.ts"

export type ElementIndex = Tagged<number, "element">

export class Registry {
	private registry: Map<Constructor<any>, Map<ElementIndex, any>> = new Map()
	readonly name = new NameRenderer(this)

	constructor(readonly storage: DataStorage) {}

	get<T extends Constructor<any>>(
		klass: T,
		id: ElementIndex,
		ctor: () => InstanceType<T>,
	): InstanceType<T>
	get(
		klass: typeof Class,
		id: ElementIndex,
	): RawClass | ParameterizedType | WildcardType | TypeVariable
	get<T extends Constructor<Base>>(
		klass: T,
		id: ElementIndex,
		...args: any[]
	): InstanceType<T>
	get(klass: Constructor<any>, id: ElementIndex, ...args: any[]) {
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
			else
				throw new Error(
					`Invalid data being assigned to ${Class.name}: ${JSON.stringify(data)}`,
				)
		}

		let instance: any
		if (klass === Class) instance = new finalClass(this, id)
		else if (typeof args[0] === "function" && args.length === 1)
			instance = args[0]()
		else instance = new finalClass(this, id, ...args)

		registry.set(id, instance)
		return instance
	}

	dataIndexOf(elementIndex: ElementIndex | number): DataIndex {
		return elementIndex as number as DataIndex
	}

	elementIndexOf(dataIndex: DataIndex | number): ElementIndex {
		return dataIndex as number as ElementIndex
	}
}
