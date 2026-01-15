import type { Constructor, TypeVariableMap, Wrapped } from "../common.ts"
import type { Class } from "../element/class.ts"
import { ParameterizedType } from "../element/parameterized-type.ts"
import { RawClass } from "../element/raw-class.ts"
import { TypeVariable } from "../element/type-variable.ts"
import { WildcardType } from "../element/wildcard-type.ts"
import type { ClassTypeMixin } from "../mixin/class-type.ts"

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

		protected renderArrayDepth() {
			return "[]".repeat(this.arrayDepth())
		}

		name(typeVariableMap: TypeVariableMap = {}, includeGenerics = true) {
			const wrapped = this.wrapped()
			if (wrapped instanceof RawClass)
				return (
					this.registry.name.genericName(
						wrapped,
						wrapped.typeVariableMap(),
						includeGenerics,
					) + this.renderArrayDepth()
				)

			return this.fullyQualifiedName(typeVariableMap, includeGenerics)
		}

		simpleName() {
			const wrapped = this.wrapped()
			if (wrapped instanceof WildcardType) return `?${this.renderArrayDepth()}`
			if (wrapped instanceof TypeVariable)
				return wrapped.simpleName() + this.renderArrayDepth()
			if (wrapped instanceof ParameterizedType) {
				const name = wrapped.simpleName()
				const ownerPrefix =
					wrapped.ownerTypeIndex() != null
						? `${wrapped.ownerType()?.simpleName()}$`
						: ""
				return `${ownerPrefix}${name}${this.renderArrayDepth()}`
			}
			if (wrapped instanceof RawClass)
				return wrapped.simpleName() + this.renderArrayDepth()
			throw new Error(`Unsupported wrapped type: ${wrapped.constructor.name}`)
		}

		fullyQualifiedName(
			typeVariableMap: TypeVariableMap = {},
			includeGenerics = true,
		) {
			return (
				this.registry.name.genericName(
					this.wrapped(),
					typeVariableMap,
					includeGenerics,
				) + this.renderArrayDepth()
			)
		}

		referenceName(typeVariableMap: TypeVariableMap = {}) {
			return this.fullyQualifiedName(typeVariableMap, true)
		}

		asKubeLoad_1_18() {
			return `const $${this.simpleName().toUpperCase()} = Java("${this.fullyQualifiedName()}");`
		}

		asKubeLoad_1_19() {
			return `const $${this.simpleName().toUpperCase()} = Java.loadClass("${this.fullyQualifiedName()}");`
		}

		asKubeLoad_1_20() {
			return `const $${this.simpleName().toUpperCase()} = Java.loadClass("${this.fullyQualifiedName()}");`
		}

		asString() {
			return (
				this.registry.name.genericDefinitionWithoutPackage(
					this.wrapped(),
					this.typeVariableMap(),
					true,
				) + this.renderArrayDepth()
			)
		}
	}

	return WrappedClass as T & typeof WrappedClass
}
