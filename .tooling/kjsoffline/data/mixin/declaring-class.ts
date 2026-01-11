import type { Base, Constructor } from "../common"
import { Class } from "../element/class"
import type { ElementIndex } from "../registry"

export function DeclaringClassMixin<T extends Constructor<Base>>(klass: T) {
	class HasDeclaringClass extends klass {
		protected _declaringClassIndex?: ElementIndex

		declaringClassIndex() {
			return this.useBeforeInit("declaringClassIndex")
		}

		setDeclaringClassIndex(id: ElementIndex) {
			this._declaringClassIndex = id
			return this
		}

		declaringClass() {
			return this.registry.get(Class, this.declaringClassIndex())
		}
	}

	return HasDeclaringClass as T & typeof HasDeclaringClass
}

export type DeclaringClassMixin<T extends Constructor<Base>> = ReturnType<
	typeof DeclaringClassMixin<T>
>
