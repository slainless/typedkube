import { Property, Wrapped } from "../common.ts"
import type { ElementIndex } from "../registry.ts"
import type { TypeVariableData } from "../storage.ts"
import { asArray } from "../utils.ts"
import { ClassTypeMixin } from "../wrapped-mixin/class-type.ts"
import { Class } from "./class.ts"

export class TypeVariable extends Class<TypeVariableData> {
	static override dataDiscriminator(): string {
		return Property.TYPE_VARIABLE_NAME
	}

	typeVariableBoundsIndex() {
		return asArray(
			this.data()[Property.TYPE_VARIABLE_BOUNDS],
		) as number[] as ElementIndex[]
	}

	asWrapped() {
		return this.registry.get(
			WrappedTypeVariable,
			this.id,
			() => new WrappedTypeVariable(this.registry, this, {}),
		)
	}
}

export class WrappedTypeVariable extends ClassTypeMixin(
	Wrapped<TypeVariable>,
) {}
