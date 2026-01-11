import type { Constructor, Wrapped } from "../common"
import type { DeclaringClassMixin } from "../mixin/declaring-class"

export function WrappedDeclaringClassMixin<
	T extends Constructor<
		Wrapped<InstanceType<ReturnType<typeof DeclaringClassMixin>>>
	>,
>(klass: T) {
	class HasWrappedDeclaringClass extends klass {
		wrappedDeclaringClass() {
			return this.wrapped().declaringClass().asWrapped(this.typeVariableMap())
		}
	}

	return HasWrappedDeclaringClass as T & typeof HasWrappedDeclaringClass
}
