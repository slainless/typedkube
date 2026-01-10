import { type Base, type Constructor, Property } from "../common"
import type { Modifier } from "../element/modifier"

export function ModifierMixin<
	T extends Constructor<Base<{ [Property.MODIFIERS]?: Modifier.Value }>>,
>(klass: T) {
	abstract class Modified extends klass {
		protected _cachedModifiers?: Modifier.Value

		modifiers() {
			const mod = this.data()[Property.MODIFIERS]
			if (mod != null) return mod
			throw new Error("TODO")
		}
	}

	return Modified as T & typeof Modified
}

export namespace ModifierMixin {
	export interface Data {
		[Property.MODIFIERS]?: Modifier.Value
	}
}
