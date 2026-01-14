import { type Base, type Constructor, Property } from "../common.ts"
import type { EitherDataIndex } from "../storage.ts"
import { asArray } from "../utils.ts"

export function TypeVariableMixin<
	T extends Constructor<
		Base<{ [Property.TYPE_VARIABLES]?: EitherDataIndex[] }>
	>,
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
		[Property.TYPE_VARIABLES]?: EitherDataIndex[]
	}
}
