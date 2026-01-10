import { type Base, type Constructor, Property, type Wrapped } from "../common"
import type { ElementIndex } from "../registry"
import { asArray } from "../utils"

export function TypeVariableMixin<
	T extends Constructor<Base<{ [Property.TYPE_VARIABLES]?: ElementIndex[] }>>,
>(klass: T) {
	class TypeVariableHolder extends klass {
		typeVariablesIndex() {
			return asArray(this.data()[Property.TYPE_VARIABLES])
		}
	}

	return TypeVariableHolder as T & typeof TypeVariableHolder
}

export function MappedTypeVariableMixin<
	T extends InstanceType<ReturnType<typeof TypeVariableMixin>>,
>(klass: Constructor<Wrapped<T>>) {
	class HasMappedTypeVariable extends klass {
		mappedTypeVariables() {
			const typeVariableMap = this.typeVariableMap()
			return this.wrapped()
				.typeVariablesIndex()
				.map((id) => typeVariableMap[id] ?? id)
		}
	}

	return HasMappedTypeVariable
}

export namespace TypeVariableMixin {
	export interface Data {
		[Property.TYPE_VARIABLES]?: ElementIndex[]
	}
}
