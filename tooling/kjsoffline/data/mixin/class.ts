import type { Base, Constructor, Wrapped } from "../common"
import { Class } from "../element/class"
import type { ElementIndex } from "../registry"

export function DeclaringClassMixin<T extends Constructor<Base>>(klass: T) {
	class HasDeclaringClass extends klass {
		protected _declaringClass: ElementIndex

		declaringClassIndex() {
			return this._declaringClass
		}

		setDeclaringClassIndex(id: ElementIndex) {
			this._declaringClass = id
			return this
		}

		declaringClass() {
			return this.registry.get(Class, this._declaringClass)
		}
	}

	return HasDeclaringClass as T & typeof HasDeclaringClass
}

export type DeclaringClassMixin<T extends Constructor<Base>> = ReturnType<
	typeof DeclaringClassMixin<T>
>

export function WrappedDeclaringClassMixin<
	T extends InstanceType<ReturnType<typeof DeclaringClassMixin>>,
>(klass: Constructor<Wrapped<T>>) {
	class HasWrappedDeclaringClass extends klass {
		wrappedDeclaringClass() {
			return this.wrapped().declaringClass().asWrapped(this.typeVariableMap())
		}
	}

	return HasWrappedDeclaringClass
}
