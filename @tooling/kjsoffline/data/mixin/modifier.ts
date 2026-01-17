import { type Base, type Constructor, Property } from "../common.ts"
import { Modifier } from "../element/modifier.ts"
import { ParameterizedType } from "../element/parameterized-type.ts"

export function ModifierMixin<
	T extends Constructor<Base<{ [Property.MODIFIERS]?: Modifier.Value }>>,
>(klass: T) {
	abstract class Modified extends klass {
		protected _cachedModifiers?: Modifier.Value

		modifiersValue(): Modifier.Value | undefined {
			const mod = this.data()[Property.MODIFIERS]
			if (mod != null) return mod
			if (this instanceof ParameterizedType)
				return this.rawType().modifiersValue()
			return
		}

		modifiers() {
			return Modifier.asString(this.modifiersValue() ?? Modifier.PUBLIC.value)
		}

		typescriptModifiersComment() {
			const modifiers = Modifier.asString(
				this.modifiersValue() ?? Modifier.PUBLIC.value,
			).join(",")

			return `
				/**
				 * @modifiers ${modifiers}
				 */`
		}
	}

	return Modified as T & typeof Modified
}

export namespace ModifierMixin {
	export interface Data {
		[Property.MODIFIERS]?: Modifier.Value
	}
}
