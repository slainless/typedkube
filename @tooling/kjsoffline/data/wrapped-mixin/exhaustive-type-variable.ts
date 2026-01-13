import type { Constructor, TypeVariableMap, Wrapped } from "../common"
import type { Class } from "../element/class"
import { ParameterizedType } from "../element/parameterized-type"
import { RawClass } from "../element/raw-class"
import { TypeVariable } from "../element/type-variable"
import { WildcardType } from "../element/wildcard-type"
import type { DataIndex } from "../storage"
import { silenceError } from "../utils"

export function ClassTypeVariableMappingMixin<
	T extends Constructor<Wrapped<Class<any>>>,
>(klass: T) {
	class HasExhaustiveTypeVariable extends klass {
		// TODO: create lru cache for these...
		protected _cachedRecursiveTypeVariableMap?: RecursiveTypeVariableMap
		protected _cachedFlatTypeVariableMap?: TypeVariableMap

		override typeVariableMap() {
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
			const wrapped = this.wrapped()

			if (wrapped instanceof WildcardType) {
				return mapping
			}

			if (wrapped instanceof TypeVariable) {
				mapping.v[wrapped.index()] = wrapped.index()
				return mapping
			}

			if (wrapped instanceof ParameterizedType) {
				const rawType = wrapped.rawType()
				const rawTypeVariables = rawType.typeVariablesIndex()
				const actualTypeVariables = wrapped.typeVariablesIndex()
				if (rawTypeVariables.length !== actualTypeVariables.length) {
					throw new Error(
						"Raw type variables and actual type variables must have the same length",
					)
				}

				const rawTypeWrapped = rawType.asWrapped()
				const rawMapping = rawTypeWrapped.computeExhaustiveMapping()
				mapping.n.set(rawTypeWrapped, rawMapping)

				const ownerType = wrapped.ownerType()
				if (ownerType != null) {
					const ownerTypeWrapped = ownerType.asWrapped()
					const ownerMapping = ownerTypeWrapped.computeExhaustiveMapping()
					mapping.n.set(ownerTypeWrapped, ownerMapping)
				}

				for (const index in rawTypeVariables) {
					const mappedIndex = actualTypeVariables[index]
					const fromIndex = rawTypeVariables[index]
					if (mappedIndex == null || fromIndex == null) continue

					mapping.v[fromIndex] = mappedIndex
				}

				return mapping
			}

			if (wrapped instanceof RawClass) {
				const superClass = wrapped.superClass()
				if (superClass != null) {
					const superClassWrapped = superClass.asWrapped()
					const superClassMapping = superClassWrapped.computeExhaustiveMapping()
					mapping.n.set(superClassWrapped, superClassMapping)
				}

				const interfaces = wrapped.interfaces()
				for (const iface of interfaces) {
					const interfaceWrapped = iface.asWrapped()
					const interfaceMapping = interfaceWrapped.computeExhaustiveMapping()
					mapping.n.set(interfaceWrapped, interfaceMapping)
				}
				return mapping
			}

			throw new Error(`Unsupported wrapped type: ${wrapped}`)
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

	return HasExhaustiveTypeVariable as T & typeof HasExhaustiveTypeVariable
}

export type RecursiveTypeVariableMap = {
	v: Record<DataIndex, DataIndex>
	n: Map<Wrapped<Class<any>>, RecursiveTypeVariableMap>
}
