import {
	type Base,
	type Constructor,
	Property,
	type Wrapped,
} from "../common.ts"
import { Class } from "../element/class.ts"
import type { DataIndex, EitherDataIndex } from "../storage.ts"
import { asArray, exist } from "../utils.ts"

export function MappedTypeMixin<
	T extends Constructor<Wrapped<Base<{ [Property.TYPE]?: EitherDataIndex }>>>,
>(klass: T) {
	class TypeHolder extends klass {
		protected _cachedMappedIndex?: [DataIndex, number]
		protected _cachedMappedType?: Wrapped<Class<any>>

		mappedTypeIndex() {
			if (this._cachedMappedIndex) return this._cachedMappedIndex

			let [type, arrayDepth] = asArray(
				this.wrapped().data()[Property.TYPE],
			) as [DataIndex, number?]
			const map = this.typeVariableMap()
			if (!map || Object.keys(map).length === 0)
				return [type, arrayDepth ?? 0] as const

			const seen = new Set()
			while (type != null && !seen.has(type)) {
				seen.add(type)
				;[type, arrayDepth] = asArray(map[type]) as [DataIndex, number?]
			}

			this._cachedMappedIndex = [type, arrayDepth ?? 0]
			return [type, arrayDepth ?? 0] as const
		}

		mappedType() {
			const [index, arrayDepth] = exist(this.mappedTypeIndex())
			const type = this.registry
				.get(Class, this.registry.elementIndexOf(index))
				.asWrapped(arrayDepth)
			this._cachedMappedType = type
			return type
		}
	}

	return TypeHolder as T & typeof TypeHolder
}
