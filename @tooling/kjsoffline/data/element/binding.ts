import { type Base, Property, Wrapped } from "../common.ts"
import type { ElementIndex, Registry } from "../registry.ts"
import type { DataIndex } from "../storage.ts"
import { MappedTypeMixin } from "../wrapped-mixin/mapped-type.ts"
import { CompleteClass } from "./complete-class.ts"

export class Binding extends MappedTypeMixin(Wrapped<Base<Binding.Data>>) {
	private _id: string
	private _type: ElementIndex
	private _name: string

	constructor(
		storage: Registry,
		type: ElementIndex,
		name: string,
		data: Binding.Data,
	) {
		super(storage)
		this.setData(data)
		this._type = type
		this._name = name
		this._id = `${name}-${this.registry.get(CompleteClass, type).id()}`
		this.setTypeVariableMap({})
	}

	type() {
		return this._type
	}

	id() {
		return this._id
	}

	name() {
		return this._name
	}
}

export namespace Binding {
	export interface Data {
		[Property.TYPE]?: DataIndex
	}
}
