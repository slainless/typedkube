import type { Base, Constructor } from "../common.ts"
import { Class } from "../element/class.ts"
import { RawClass } from "../element/raw-class.ts"
import type { ElementIndex } from "../registry.ts"

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
			const klass = this.registry.get(Class, this.declaringClassIndex())
			if (klass instanceof RawClass) return klass
			throw new Error("Declaring class must be a RawClass")
		}
	}

	return HasDeclaringClass as T & typeof HasDeclaringClass
}

export type DeclaringClassMixin<T extends Constructor<Base>> = ReturnType<
	typeof DeclaringClassMixin<T>
>
