import {
	type Base,
	type Constructor,
	type Data,
	Property,
	type TypeVariableMap,
	type Wrapped,
} from "../common"
import { Class, type WrappedClass } from "../element/class"
import type { DataIndex } from "../storage"
import { exist } from "../utils"

export function TypeVariableMapMixin<T extends Constructor<Data<any>>>(
	klass: T,
) {
	class TypeVariableHolder extends klass {
		protected _typeVariableMap?: TypeVariableMap

		typeVariableMap() {
			return this.useBeforeInit("typeVariableMap")
		}

		setTypeVariableMap(typeVariableMap: TypeVariableMap) {
			this._typeVariableMap = typeVariableMap
			return this
		}
	}

	return TypeVariableHolder as T & typeof TypeVariableHolder
}

export function MappedTypeMixin<
	T extends Base<{ [Property.TYPE]?: DataIndex }>,
>(klass: Constructor<Wrapped<T>>) {
	class TypeHolder extends klass {
		protected _cachedMappedIndex?: DataIndex
		protected _cachedMappedType?: WrappedClass

		mappedTypeIndex() {
			if (this._cachedMappedIndex) return this._cachedMappedIndex

			const type = this.data()[Property.TYPE]
			const map = this.typeVariableMap()
			if (!map) return type

			const seen = new Set()
			let remappedType = type
			while (remappedType != null && !seen.has(remappedType)) {
				seen.add(remappedType)
				remappedType = map[remappedType]
			}

			this._cachedMappedIndex = remappedType
			return remappedType
		}

		mappedType() {
			const index = exist(this.mappedTypeIndex())
			const type = this.registry.get(Class, this.registry.elementIndexOf(index))
			const wrappedType = type.asWrapped(this.typeVariableMap())
			this._cachedMappedType = wrappedType
			return wrappedType
		}
	}

	return TypeHolder
}
