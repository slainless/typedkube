import type { Constructor, Wrapped } from "../common.ts"
import type { Class } from "../element/class.ts"
import type { ClassTypeMixin } from "../mixin/class-type.ts"
import type { TypescriptNameOptions } from "../name.ts"

export function WrappedClassMixin<
	T extends Constructor<
		Wrapped<
			InstanceType<ReturnType<typeof ClassTypeMixin<Constructor<Class<any>>>>>
		>
	>,
>(klass: T) {
	class WrappedClass extends klass {
		protected _arrayDepth = 0

		setArrayDepth(depth: number) {
			this._arrayDepth = depth
			return this
		}

		arrayDepth() {
			return this._arrayDepth
		}

		typescriptReferenceName(options?: TypescriptNameOptions) {
			return ""
		}
	}

	return WrappedClass as T & typeof WrappedClass
}
