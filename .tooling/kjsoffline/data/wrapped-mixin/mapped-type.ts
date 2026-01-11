import { type Base, type Constructor, Property, type Wrapped } from "../common"
import { Class } from "../element/class"
import type { DataIndex } from "../storage"
import { exist } from "../utils"

export function MappedTypeMixin<
	T extends Constructor<Wrapped<Base<{ [Property.TYPE]?: DataIndex }>>>,
>(klass: T) {
	class TypeHolder extends klass {
		protected _cachedMappedIndex?: DataIndex
		protected _cachedMappedType?: Class<any>

		mappedTypeIndex() {
			if (this._cachedMappedIndex) return this._cachedMappedIndex

			const type = this.wrapped().data()[Property.TYPE]
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
			this._cachedMappedType = type
			return type
		}
	}

	return TypeHolder as T & typeof TypeHolder
}
