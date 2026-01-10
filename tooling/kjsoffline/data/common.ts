import { TypeVariableMapMixin } from "./mixin/type"
import type { Registry } from "./registry"
import type { DataIndex } from "./storage"
import { decodePart } from "./utils"

export type Constructor<T, Arguments extends unknown[] = any[]> = new (
	...arguments_: Arguments
) => T

export class Data<T = {}> {
	private _data?: T
	constructor(protected registry: Registry) {}

	setData(data: T) {
		this._data = data
		return this
	}

	data() {
		if (!this._data) throw new TypeError("Data must be initialized before use!")
		return this._data
	}
}

export class Base<T = {}> extends Data<T> {
	protected getStorageRawData(id: DataIndex): string {
		throw new Error("Not Implemented")
	}

	protected rawDataParsingKeys(): readonly string[] {
		throw new Error("Not Implemented")
	}

	decode(id: DataIndex) {
		const keys = this.rawDataParsingKeys()
		const data = this.getStorageRawData(id)
		if (!data)
			throw new ReferenceError(
				`Cannot find ${this.constructor.name} with index: ${id}`,
			)

		const values = data.split(",")
		if (values.length !== keys.length)
			throw new TypeError(
				`Invalid ${this.constructor.name} definition: ${data}`,
			)

		const result: any = {}
		for (const index in keys) {
			const decoded = decodePart(values[index].trim())
			if (decoded == null) continue

			result[keys[index]] = decoded
		}

		return result
	}
}

export class Wrapped<T extends Base = Base<{}>> extends TypeVariableMapMixin(
	Data,
) {
	constructor(
		registry: Registry,
		protected classInstance: T,
		typeVariableMap: TypeVariableMap,
	) {
		super(registry)
		// @ts-expect-error
		this.setData(classInstance.data())
		this.setTypeVariableMap(typeVariableMap)
	}

	data(): T extends Base<infer D> ? D : never {
		// @ts-expect-error
		return super.data()
	}

	setData(data: T extends Base<infer D> ? D : never) {
		super.setData(data)
		return this
	}

	wrapped(): T {
		return this.classInstance
	}
}

/**
 * Can either be FullTypeName, TypeName, or SimplifiedTypeName
 */
export type JavaType = string

export type TypeVariableMap = Record<DataIndex, DataIndex>

export namespace Property {
	export const TYPE = "t"
	export const NAME = "N"
	export const TYPE_VARIABLES = "v"
	export const TYPE_VARIABLE_NAME = "V"
	export const TYPE_VARIABLE_BOUNDS = "b"
	export const WILDCARD_UPPER_BOUNDS = "u"
	export const WILDCARD_LOWER_BOUNDS = "l"
	export const CLASS_NAME = "N"
	export const SUPER_CLASS = "s"
	export const INTERFACES = "i"
	export const PACKAGE_NAME = "P"
	export const ANNOTATIONS = "a"
	export const MODIFIERS = "M"
	export const CONSTRUCTORS = "c"
	export const FIELDS = "f"
	export const METHODS = "m"
	export const PARAMETERS = "p"
	export const RAW_PARAMETERIZED_TYPE = "r"
	export const OWNER_TYPE = "o"
	export const PARAMETER_NAME = "N"
	export const PARAMETER_TYPE = "t"
	export const METHOD_NAME = "N"
	export const METHOD_RETURN_TYPE = "t"
	export const FIELD_NAME = "N"
	export const FIELD_TYPE = "t"
	export const ANNOTATION_TYPE = "t"
	export const ANNOTATION_STRING = "s"
	export const BINDING_TYPE = "btype"
	export const BINDING_TYPE_CLASS = "class"
	export const BINDING_TYPE_ENUM = "enum"
	export const BINDING_TYPE_MAP = "map"
	export const BINDING_TYPE_PRIMITIVE = "primitive"
	export const BINDING_STRING = "s"
	export const BINDING_FUNCTION = "f"
	export const BINDING_OBJECT = "o"
	export const EXCEPTIONS = "e"
	export const INNER_CLASSES = "I"
	export const ENCLOSING_CLASS = "E"
	export const DECLARING_CLASS = "D"
}
