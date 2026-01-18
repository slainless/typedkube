import type { Base, Constructor, Wrapped } from "../common.ts"
import { Class } from "../element/class.ts"
import { RawClass } from "../element/raw-class.ts"
import type { ElementIndex } from "../registry.ts"

export function DeclaringClassMixin<T extends Constructor<Wrapped<Base>>>(
	klass: T,
) {
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

		wrappedDeclaringClass() {
			return this.declaringClass().asWrapped(0, this.typeVariableMap())
		}
	}

	return HasDeclaringClass as T & typeof HasDeclaringClass
}
