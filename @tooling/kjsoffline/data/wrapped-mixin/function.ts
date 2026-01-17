import type { Constructor, Wrapped } from "../common"
import type { FunctionMixin } from "../mixin/function"

export function WrappedFunctionMixin<
	T extends Constructor<
		Wrapped<InstanceType<ReturnType<typeof FunctionMixin>>>
	>,
>(klass: T) {
	class HasWrappedParameter extends klass {
		wrappedParameters() {
			// REVIEW: whether to use cache or not
			return this.wrapped()
				.parameters()
				.map((parameter) => parameter.asWrapped(this.typeVariableMap()))
		}

		typescriptParameters() {
			return this.wrappedParameters()
				.map((parameter) => parameter.typescriptParameter())
				.join(",")
		}
	}

	return HasWrappedParameter as T & typeof HasWrappedParameter
}
