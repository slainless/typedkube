import { isStatic } from "@tooling/kjsoffline/typegen/utils.ts"
import type { Constructor, Wrapped } from "../common.ts"
import { Class } from "../element/class.ts"
import { type RawClass, WrappedRawClass } from "../element/raw-class.ts"
import type { TypeVariableMixin } from "../mixin/type-variable.ts"
import type { DataIndex } from "../storage.ts"
import { asArray, dataIndex } from "../utils.ts"

export function MappedTypeVariableMixin<
	T extends Constructor<
		Wrapped<InstanceType<ReturnType<typeof TypeVariableMixin>>>
	>,
>(klass: T) {
	class HasMappedTypeVariable extends klass {
		typeVariablesIndex() {
			return this.wrapped().typeVariablesIndex()
		}

		typeVariables() {
			return this.wrapped().typeVariables()
		}

		mappedTypeVariablesIndex() {
			const typeVariableMap = this.typeVariableMap()
			return this.wrapped()
				.typeVariablesIndex()
				.map((id) => typeVariableMap[dataIndex(id)] ?? id)
		}

		mappedTypeVariables() {
			return this.mappedTypeVariablesIndex().map((index) => {
				const [typeIndex, arrayDepth] = asArray(index) as [DataIndex, number]
				const type = this.registry.get(
					Class,
					this.registry.elementIndexOf(typeIndex),
				)
				return type.asWrapped(arrayDepth, this.typeVariableMap())
			})
		}

		typescriptGenerics(mapGeneric = true, enclose = true): string {
			let variables: string
			if (mapGeneric)
				variables = this.typeVariables()
					.map((variable) => variable.typescriptReferenceName())
					.join(",")
			else
				variables = this.mappedTypeVariables()
					.map((variable) => variable.typescriptReferenceName())
					.join(",")

			if (!enclose) return variables
			return variables ? `<${variables}>` : ""
		}
	}

	return HasMappedTypeVariable as T & typeof HasMappedTypeVariable
}
