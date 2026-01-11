import { type Base, type Constructor, Property } from "../common"
import type { Modifier } from "../element/modifier"
import { ParameterizedType } from "../element/parameterized-type"

export function ModifierMixin<
	T extends Constructor<Base<{ [Property.MODIFIERS]?: Modifier.Value }>>,
>(klass: T) {
	abstract class Modified extends klass {
		protected _cachedModifiers?: Modifier.Value

		modifiers(): Modifier.Value | undefined {
			const mod = this.data()[Property.MODIFIERS]
			if (mod != null) return mod
			if (this instanceof ParameterizedType) return this.rawType().modifiers()
			return
		}
	}

	return Modified as T & typeof Modified
}

export namespace ModifierMixin {
	export interface Data {
		[Property.MODIFIERS]?: Modifier.Value
	}
}
