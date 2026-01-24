import { type Base, type Constructor, Property } from "../common.ts"
import { Class } from "../element/class.ts"
import type { DataIndex, EitherDataIndex } from "../storage.ts"
import { asArray } from "../utils.ts"
import type { WrappedClassMixin } from "../wrapped-mixin/class-type.ts"

export function TypeVariableMixin<
	T extends Constructor<
		Base<{ [Property.TYPE_VARIABLES]?: EitherDataIndex[] }>
	>,
>(klass: T) {
	class TypeVariableHolder extends klass {
		typeVariablesIndices() {
			return asArray(this.data()[Property.TYPE_VARIABLES])
		}

		typeVariables(): InstanceType<ReturnType<typeof WrappedClassMixin>>[] {
			return this.typeVariablesIndices().map((index) => {
				const [typeIndex, arrayDepth] = asArray(index) as [DataIndex, number]
				const type = this.registry.get(
					Class,
					this.registry.elementIndexOf(typeIndex),
				)
				return type.asWrapped(arrayDepth)
			})
		}
	}

	return TypeVariableHolder as T & typeof TypeVariableHolder
}

export namespace TypeVariableMixin {
	export interface Data {
		[Property.TYPE_VARIABLES]?: EitherDataIndex[]
	}
}
