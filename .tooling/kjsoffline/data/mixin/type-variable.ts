import { type Base, type Constructor, Property } from "../common"
import type { DataIndex } from "../storage"
import { asArray } from "../utils"

export function TypeVariableMixin<
	T extends Constructor<Base<{ [Property.TYPE_VARIABLES]?: DataIndex[] }>>,
>(klass: T) {
	class TypeVariableHolder extends klass {
		typeVariablesIndex() {
			return asArray(this.data()[Property.TYPE_VARIABLES])
		}
	}

	return TypeVariableHolder as T & typeof TypeVariableHolder
}

export namespace TypeVariableMixin {
	export interface Data {
		[Property.TYPE_VARIABLES]?: DataIndex[]
	}
}
