import {
	type Base,
	type Constructor,
	Property,
	type Wrapped,
} from "../common.ts"
import { Class } from "../element/class.ts"
import type { ArrayDataIndex, DataIndex, EitherDataIndex } from "../storage.ts"
import { asArray, exist } from "../utils.ts"

export function MappedTypeMixin<
	T extends Constructor<Wrapped<Base<{ [Property.TYPE]?: EitherDataIndex }>>>,
>(klass: T) {
	class TypeHolder extends klass {
		protected _cachedMappedPath?: ArrayDataIndex[]
		protected _cachedMappedType?: Wrapped<Class<any>>

		mappedTypePath() {
			let [type, arrayDepth = 0] = asArray(
				this.wrapped().data()[Property.TYPE],
			) as ArrayDataIndex
			const path: ArrayDataIndex[] = [[type, arrayDepth]]
			const map = this.typeVariableMap()
			if (!map || Object.keys(map).length === 0) return path

			const seen = new Set()
			while (type != null && !seen.has(type)) {
				seen.add(type)
				;[type, arrayDepth = 0] = asArray(map[type]) as ArrayDataIndex
				if (type != null) path.push([type, arrayDepth])
			}

			this._cachedMappedPath = path
			return path
		}

		mappedTypeIndex() {
			return this.mappedTypePath().at(-1)
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
