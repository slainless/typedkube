import { Property, Wrapped } from "../common.ts"
import { ClassTypeMixin } from "../mixin/class-type.ts"
import type { TypescriptNameOptions } from "../name.ts"
import type { ElementIndex } from "../registry.ts"
import type { TypeData, WildcardTypeData } from "../storage.ts"
import { asArray, isDebug } from "../utils.ts"
import { WrappedClassMixin } from "../wrapped-mixin/class-type.ts"
import { Class } from "./class.ts"

/**
 * Wildcard type declaration such as `?` or `? extends T` or `? super T`.
 */
export class WildcardType extends ClassTypeMixin(Class<WildcardTypeData>) {
	static override isValid(data: TypeData) {
		return (
			Object.keys(data).length <= 0 ||
			Object.keys(data).every((key) => key.startsWith("_")) ||
			Property.WILDCARD_LOWER_BOUNDS in data ||
			Property.WILDCARD_UPPER_BOUNDS in data
		)
	}

	lowerBoundsIndices() {
		return asArray(
			this.data()[Property.WILDCARD_LOWER_BOUNDS],
		) as number[] as ElementIndex[]
	}

	lowerBounds() {
		return this.lowerBoundsIndices().map((index) =>
			this.registry.get(Class, index),
		)
	}

	upperBoundsIndices() {
		return asArray(
			this.data()[Property.WILDCARD_UPPER_BOUNDS],
		) as number[] as ElementIndex[]
	}

	upperBounds() {
		return this.upperBoundsIndices().map((index) =>
			this.registry.get(Class, index),
		)
	}

	asWrapped(arrayDepth = 0) {
		return new WrappedWildcardType(this.registry, this, {}).setArrayDepth(
			arrayDepth,
		)
	}
}

export class WrappedWildcardType extends WrappedClassMixin(
	Wrapped<WildcardType>,
) {
	wrappedLowerBounds() {
		return this.wrapped()
			.lowerBounds()
			.map((type) => type.asWrapped(0, this.typeVariableMap()))
	}

	wrappedUpperBounds() {
		return this.wrapped()
			.upperBounds()
			.map((type) => type.asWrapped(0, this.typeVariableMap()))
	}

	override typescriptReferenceName(options?: TypescriptNameOptions): string {
		let typescriptReference = ""
		let wildcardComment = ""
		const lowerBounds = this.wrappedLowerBounds()
		if (lowerBounds.length > 0) {
			typescriptReference = lowerBounds
				.map((type) => type.typescriptReferenceName())
				.join(" & ")
			if (!isDebug())
				wildcardComment = `/** @type {? super ${typescriptReference}} */`
		}

		const upperBounds = this.wrappedUpperBounds()
		if (upperBounds.length > 0) {
			typescriptReference = upperBounds
				.map((type) => type.typescriptReferenceName())
				.join(" & ")
		}

		if (typescriptReference) return `${wildcardComment}${typescriptReference}`
		return "any"
	}
}
