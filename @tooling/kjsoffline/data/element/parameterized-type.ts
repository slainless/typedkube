import { Property, type TypeVariableMap, Wrapped } from "../common.ts"
import type { ElementIndex } from "../registry.ts"
import type { ParameterizedTypeData } from "../storage.ts"
import { exist } from "../utils.ts"
import { Class } from "./class.ts"
import { RawClass } from "./raw-class.ts"

export class ParameterizedType extends Class<ParameterizedTypeData> {
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
		const index = exist(this.ownerTypeIndex())
		const ownerType = this.registry.get(Class, index)
		if (
			!(ownerType instanceof RawClass || ownerType instanceof ParameterizedType)
		)
			throw new Error("Owner type is not a RawClass or ParameterizedType")
		return ownerType
	}

	asWrapped(typeVariableMap: TypeVariableMap) {
		return new WrappedParameterizedType(this.registry, this, typeVariableMap)
	}
}

export class WrappedParameterizedType extends Wrapped<ParameterizedType> {}
