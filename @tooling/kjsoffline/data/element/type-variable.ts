import { Property, type TypeVariableMap, Wrapped } from "../common.ts"
import type { ElementIndex } from "../registry.ts"
import type { TypeVariableData } from "../storage.ts"
import { asArray } from "../utils.ts"
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

	asWrapped(typeVariableMap: TypeVariableMap) {
		return new WrappedTypeVariable(this.registry, this, typeVariableMap)
	}
}

export class WrappedTypeVariable extends Wrapped<TypeVariable> {}
