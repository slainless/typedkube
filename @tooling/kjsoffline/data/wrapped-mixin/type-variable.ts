import type { Constructor, Wrapped } from "../common.ts"
import type { TypeVariableMixin } from "../mixin/type-variable.ts"

export function MappedTypeVariableMixin<
	T extends Constructor<
		Wrapped<InstanceType<ReturnType<typeof TypeVariableMixin>>>
	>,
>(klass: T) {
	class HasMappedTypeVariable extends klass {
		mappedTypeVariablesIndex() {
			const typeVariableMap = this.typeVariableMap()
			return this.wrapped()
				.typeVariablesIndex()
				.map((id) => typeVariableMap[id] ?? id)
		}
	}

	return HasMappedTypeVariable as T & typeof HasMappedTypeVariable
}
