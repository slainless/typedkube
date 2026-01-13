import { Property, Wrapped } from "../common.ts"
import { ClassTypeMixin } from "../mixin/class-type.ts"
import type { ElementIndex } from "../registry.ts"
import type { TypeVariableData } from "../storage.ts"
import { asArray } from "../utils.ts"
import { WrappedClassMixin } from "../wrapped-mixin/class-type.ts"
import { Class } from "./class.ts"

export class TypeVariable extends ClassTypeMixin(Class<TypeVariableData>) {
	static override dataDiscriminator(): string {
		return Property.TYPE_VARIABLE_NAME
	}

	typeVariableBoundsIndex() {
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
) {}
