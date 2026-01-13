import { Property, Wrapped } from "../common.ts"
import { TypeVariableMixin } from "../mixin/type-variable.ts"
import type { ElementIndex } from "../registry.ts"
import type { ParameterizedTypeData } from "../storage.ts"
import { exist } from "../utils.ts"
import { ClassTypeMixin } from "../wrapped-mixin/class-type.ts"
import { Class } from "./class.ts"
import { RawClass } from "./raw-class.ts"

export class ParameterizedType extends TypeVariableMixin(
	Class<ParameterizedTypeData>,
) {
	static override dataDiscriminator(): string {
		return Property.RAW_PARAMETERIZED_TYPE
	}

	rawTypeIndex() {
		return this.data()[Property.RAW_PARAMETERIZED_TYPE] as number as
			| ElementIndex
			| undefined
	}

	ownerTypeIndex() {
		return this.data()[Property.OWNER_TYPE] as number as
			| ElementIndex
			| undefined
	}

	rawType() {
		const index = exist(this.rawTypeIndex())
		const rawType = this.registry.get(Class, index)
		if (!(rawType instanceof RawClass))
			throw new Error("Raw type is not a RawClass")
		return rawType
	}

	ownerType() {
		const index = this.ownerTypeIndex()
		if (index == null) return undefined

		const ownerType = this.registry.get(Class, index)
		if (
			!(ownerType instanceof RawClass || ownerType instanceof ParameterizedType)
		)
			throw new Error("Owner type is not a RawClass or ParameterizedType")

		return ownerType
	}

	asWrapped() {
		return this.registry.get(
			WrappedParameterizedType,
			this.id,
			() => new WrappedParameterizedType(this.registry, this, {}),
		)
	}
}

export class WrappedParameterizedType extends ClassTypeMixin(
	Wrapped<ParameterizedType>,
) {}
