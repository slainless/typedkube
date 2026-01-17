import {
	type Base,
	type Constructor,
	Property,
	type Wrapped,
} from "../common.ts"
import { Parameter } from "../element/parameter.ts"
import type { ElementIndex } from "../registry.ts"
import { asArray } from "../utils.ts"
import type { DeclaringClassMixin } from "./declaring-class.ts"

export function FunctionMixin<
	T extends DeclaringClassMixin<
		Constructor<Base<{ [Property.PARAMETERS]?: ElementIndex[] }>>
	>,
>(klass: T) {
	class IsFunction extends klass {
		protected _cachedParameters?: Parameter[]

		protected _declaringFunctionIndex?: ElementIndex
		protected _declaringFunctionType?: "method" | "constructor"

		parameters() {
			if (this._cachedParameters) return this._cachedParameters
			this._cachedParameters = asArray(this.data()[Property.PARAMETERS]).map(
				(id, index) =>
					this.registry.get(
						Parameter,
						id,
						this.declaringClassIndex(),
						this.declaringFunctionIndex(),
						this.declaringFunctionType(),
						index,
					),
			)
			return this._cachedParameters
		}

		declaringFunctionIndex() {
			return this.useBeforeInit("declaringFunctionIndex")
		}

		declaringFunctionType() {
			return this.useBeforeInit("declaringFunctionType")
		}

		setDeclaringFunctionIndex(id: ElementIndex) {
			this._declaringFunctionIndex = id
			return this
		}

		setDeclaringFunctionType(type: "method" | "constructor") {
			this._declaringFunctionType = type
			return this
		}
	}

	return IsFunction as T & typeof IsFunction
}

export namespace FunctionMixin {
	export interface Data {
		[Property.PARAMETERS]?: ElementIndex[]
	}
}
