import { Property, type TypeVariableMap, Wrapped } from "../common"
import type { ElementIndex } from "../registry"
import type { WildcardTypeData } from "../storage"
import { asArray } from "../utils"
import { Class } from "./class"

export class WildcardType extends Class<WildcardTypeData> {
	static override dataDiscriminator(): string {
		return Property.WILDCARD_LOWER_BOUNDS
	}

	lowerBoundsIndex() {
		return asArray(
			this.data()[Property.WILDCARD_LOWER_BOUNDS],
		) as number[] as ElementIndex[]
	}

	upperBoundsIndex() {
		return asArray(
			this.data()[Property.WILDCARD_UPPER_BOUNDS],
		) as number[] as ElementIndex[]
	}

	asWrapped(typeVariableMap: TypeVariableMap) {
		return new WrappedWildcardType(this.registry, this, typeVariableMap)
	}
}

export class WrappedWildcardType extends Wrapped<WildcardType> {}
