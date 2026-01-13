import { Property, Wrapped } from "../common.ts"
import type { ElementIndex } from "../registry.ts"
import type { WildcardTypeData } from "../storage.ts"
import { asArray } from "../utils.ts"
import { ClassTypeMixin } from "../wrapped-mixin/class-type.ts"
import { Class } from "./class.ts"

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

	asWrapped() {
		return this.registry.get(
			WrappedWildcardType,
			this.id,
			() => new WrappedWildcardType(this.registry, this, {}),
		)
	}
}

export class WrappedWildcardType extends ClassTypeMixin(
	Wrapped<WildcardType>,
) {}
