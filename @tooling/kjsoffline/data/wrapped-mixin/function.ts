import type { Constructor, Wrapped } from "../common"
import type { ParameterMixin } from "../mixin/parameter"
import type { ElementIndex } from "../registry"
import type { DeclaringClassMixin } from "./declaring-class"

export function FunctionMixin<
	T extends Constructor<
		Wrapped<InstanceType<ReturnType<typeof ParameterMixin>>>
	> &
		ReturnType<typeof DeclaringClassMixin>,
>(klass: T) {
	class IsFunction extends klass {
		protected _declaringFunctionIndex?: ElementIndex
		protected _declaringFunctionType?: "method" | "constructor"

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

		wrappedParameters() {
			// REVIEW: whether to use cache or not
			return this.wrapped()
				.parameters()
				.map((parameter, index) =>
					parameter.asWrapped(
						this.typeVariableMap(),
						this.declaringClassIndex(),
						this.declaringFunctionIndex(),
						this.declaringFunctionType(),
						index,
					),
				)
		}

		typescriptParameters() {
			return this.wrappedParameters()
				.map((parameter) => parameter.typescriptParameter())
				.join(",")
		}
	}

	return IsFunction as T & typeof IsFunction
}
