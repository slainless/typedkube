import { Property, type TypeVariableMap, Wrapped } from "../common"
import type { ElementIndex } from "../registry"
import type { TypeVariableData } from "../storage"
import { asArray } from "../utils"
import { Class } from "./class"

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
