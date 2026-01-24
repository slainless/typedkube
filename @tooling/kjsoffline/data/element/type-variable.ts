import { Property, Wrapped } from "../common.ts"
import { ClassTypeMixin } from "../mixin/class-type.ts"
import type { TypescriptNameOptions } from "../name.ts"
import type { ElementIndex } from "../registry.ts"
import type { TypeVariableData } from "../storage.ts"
import { asArray, exist } from "../utils.ts"
import { WrappedClassMixin } from "../wrapped-mixin/class-type.ts"
import { Class } from "./class.ts"

/**
 * Type variable declaration such as `T`, `U`, `V`, etc.
 */
export class TypeVariable extends ClassTypeMixin(Class<TypeVariableData>) {
	static override dataDiscriminator(): string {
		return Property.TYPE_VARIABLE_NAME
	}

	nameIndex() {
		return this.data()[Property.TYPE_VARIABLE_NAME]
	}

	name() {
		const nameIndex = exist(this.nameIndex())
		return exist(this.registry.storage.getName(nameIndex))
	}

	typeVariableBoundsIndices() {
		return asArray(
			this.data()[Property.TYPE_VARIABLE_BOUNDS],
		) as number[] as ElementIndex[]
	}

	asWrapped(arrayDepth = 0) {
		return new WrappedTypeVariable(this.registry, this, {}).setArrayDepth(
			arrayDepth,
		)
	}
}

export class WrappedTypeVariable extends WrappedClassMixin(
	Wrapped<TypeVariable>,
) {
	override typescriptReferenceName(options?: TypescriptNameOptions) {
		return this.wrapped().name()
	}
}
