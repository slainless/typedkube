import type { Constructor, Wrapped } from "../common.ts"
import type { Class } from "../element/class.ts"

export function WrappedClassMixin<T extends Constructor<Wrapped<Class<any>>>>(
	klass: T,
) {
	class WrappedClass extends klass {
		protected _arrayDepth = 0

		setArrayDepth(depth: number) {
			this._arrayDepth = depth
			return this
		}

		arrayDepth() {
			return this._arrayDepth
		}
	}

	return WrappedClass as T & typeof WrappedClass
}
