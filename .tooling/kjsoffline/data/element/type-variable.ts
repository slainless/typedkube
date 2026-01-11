import { Property } from "../common"
import type { ElementIndex } from "../registry"
import type { TypeVariableData } from "../storage"
import { asArray } from "../utils"
import { Class } from "./class"

export class TypeVariable extends Class<TypeVariableData> {
	override dataDiscriminator(): string {
		return Property.TYPE_VARIABLE_NAME
	}

	typeVariableBoundsIndex() {
		return asArray(
			this.data()[Property.TYPE_VARIABLE_BOUNDS],
		) as number[] as ElementIndex[]
	}
}
