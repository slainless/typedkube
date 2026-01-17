import { type Constructor, Property, type TypeVariableMap } from "../common"
import type { Class } from "../element/class"
import { ParameterizedType } from "../element/parameterized-type"
import { RawClass } from "../element/raw-class"
import { TypeVariable } from "../element/type-variable"
import { WildcardType } from "../element/wildcard-type"
import type { DataIndex, EitherDataIndex } from "../storage"
import { dataIndex } from "../utils"

export function ClassTypeMixin<T extends Constructor<Class<any>>>(klass: T) {
	class ClassType extends klass {
		protected _arrayDepth: number = 0

		// TODO: create lru cache for these...
		protected _cachedRecursiveTypeVariableMap?: RecursiveTypeVariableMap
		protected _cachedFlatTypeVariableMap?: TypeVariableMap

		computeTypeVariableMap() {
			if (this._cachedFlatTypeVariableMap != null)
				return this._cachedFlatTypeVariableMap

			this._cachedFlatTypeVariableMap = this.flattenMapping(
				this.computeExhaustiveMapping(),
			)
			return this._cachedFlatTypeVariableMap
		}

		computeExhaustiveMapping(): RecursiveTypeVariableMap {
			if (this._cachedRecursiveTypeVariableMap != null)
				return this._cachedRecursiveTypeVariableMap

			const mapping: RecursiveTypeVariableMap = {
				v: {},
				n: new Map(),
			}

			if (this instanceof WildcardType) {
				return mapping
			}

			if (this instanceof TypeVariable) {
				mapping.v[this.index()] = this.index()
				return mapping
			}

			if (this instanceof ParameterizedType) {
				const rawType = this.rawType()
				const rawTypeVariables = rawType.typeVariablesIndex()
				const actualTypeVariables = this.typeVariablesIndex()
				if (rawTypeVariables.length !== actualTypeVariables.length) {
					throw new Error(
						"Raw type variables and actual type variables must have the same length",
					)
				}

				const rawMapping = rawType.computeExhaustiveMapping()
				mapping.n.set(rawType, rawMapping)

				const ownerType = this.ownerType()
				if (ownerType != null) {
					const ownerMapping = ownerType.computeExhaustiveMapping()
					mapping.n.set(ownerType, ownerMapping)
				}

				for (const index in rawTypeVariables) {
					const mappedIndex = actualTypeVariables[index]
					const fromIndex = rawTypeVariables[index]
					if (mappedIndex == null || fromIndex == null) continue

					mapping.v[dataIndex(fromIndex)] = mappedIndex
				}

				return mapping
			}

			if (this instanceof RawClass) {
				const superClassType = this.superClass()
				if (superClassType != null) {
					const superClassMapping = superClassType.computeExhaustiveMapping()
					mapping.n.set(superClassType, superClassMapping)
				}

				const interfaces = this.interfaces()
				for (const interfaceType of interfaces) {
					const interfaceMapping = interfaceType.computeExhaustiveMapping()
					mapping.n.set(interfaceType, interfaceMapping)
				}
				return mapping
			}

			throw new Error(`Unsupported class type: ${this}`)
		}

		protected flattenMapping(mapping: RecursiveTypeVariableMap) {
			const flat: TypeVariableMap = {}

			const items: RecursiveTypeVariableMap[] = [mapping]
			while (items.length > 0) {
				const current = items.pop()
				if (current == null) continue

				Object.assign(flat, current.v)
				items.push(...Object.values(current.n))
			}

			return flat
		}
	}

	return ClassType as T & typeof ClassType
}

export type RecursiveTypeVariableMap = {
	v: Record<DataIndex, EitherDataIndex>
	n: Map<Class<any>, RecursiveTypeVariableMap>
}
