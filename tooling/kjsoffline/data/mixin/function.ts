import { type Base, type Constructor, Property, type Wrapped } from "../common"
import { Parameter } from "../element/parameter"
import type { ElementIndex } from "../registry"
import { asArray } from "../utils"
import type { DeclaringClassMixin } from "./class"

export function FunctionMixin<
	T extends DeclaringClassMixin<
		Constructor<Base<{ [Property.PARAMETERS]?: ElementIndex[] }>>
	>,
>(klass: T) {
	class IsFunction extends klass {
		protected _cachedParameters?: Parameter[]

		protected _declaringFunctionIndex: ElementIndex
		protected _declaringFunctionType: "method" | "constructor"

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
			return this._declaringFunctionIndex
		}

		declaringFunctionType() {
			return this._declaringFunctionType
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

export function WrappedFunctionMixin<
	T extends InstanceType<ReturnType<typeof FunctionMixin>>,
>(klass: Constructor<Wrapped<T>>) {
	class HasWrappedParameter extends klass {
		wrappedParameters() {
			// TODO: whether to use cache or not
			return this.wrapped()
				.parameters()
				.map((parameter) => parameter.asWrapped(this.typeVariableMap()))
		}
	}

	return HasWrappedParameter
}

export namespace FunctionMixin {
	export interface Data {
		[Property.PARAMETERS]?: ElementIndex[]
	}
}
