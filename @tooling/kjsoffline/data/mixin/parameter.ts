import { type Base, type Constructor, Property } from "../common.ts"
import { Parameter } from "../element/parameter.ts"
import type { ElementIndex } from "../registry.ts"
import { asArray } from "../utils.ts"

export function ParameterMixin<
	T extends Constructor<Base<{ [Property.PARAMETERS]?: ElementIndex[] }>>,
>(klass: T) {
	class IsFunction extends klass {
		parameterIndex() {
			return asArray(this.data()[Property.PARAMETERS])
		}

		parameters() {
			return this.parameterIndex().map((id) => this.registry.get(Parameter, id))
		}
	}

	return IsFunction as T & typeof IsFunction
}

export namespace ParameterMixin {
	export interface Data {
		[Property.PARAMETERS]?: ElementIndex[]
	}
}
