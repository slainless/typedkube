import { Property, Wrapped } from "../common.ts"
import { ClassTypeMixin } from "../mixin/class-type.ts"
import type { ElementIndex } from "../registry.ts"
import type { TypeData, WildcardTypeData } from "../storage.ts"
import { asArray } from "../utils.ts"
import { WrappedClassMixin } from "../wrapped-mixin/class-type.ts"
import { Class } from "./class.ts"

export class WildcardType extends ClassTypeMixin(Class<WildcardTypeData>) {
	static override isValid(data: TypeData) {
		return (
			Object.keys(data).length <= 0 ||
			Object.keys(data).every((key) => key.startsWith("_")) ||
			Property.WILDCARD_LOWER_BOUNDS in data ||
			Property.WILDCARD_UPPER_BOUNDS in data
		)
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

	asWrapped(arrayDepth = 0) {
		return new WrappedWildcardType(this.registry, this, {}).setArrayDepth(
			arrayDepth,
		)
	}
}

export class WrappedWildcardType extends WrappedClassMixin(
	Wrapped<WildcardType>,
) {}
