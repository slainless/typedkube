import type { Constructor, Wrapped } from "../common.ts"
import type { DeclaringClassMixin } from "../mixin/declaring-class.ts"

export function WrappedDeclaringClassMixin<
	T extends Constructor<
		Wrapped<InstanceType<ReturnType<typeof DeclaringClassMixin>>>
	>,
>(klass: T) {
	class HasWrappedDeclaringClass extends klass {
		wrappedDeclaringClass() {
			return this.wrapped()
				.declaringClass()
				.asWrapped(0, this.typeVariableMap())
		}
	}

	return HasWrappedDeclaringClass as T & typeof HasWrappedDeclaringClass
}
