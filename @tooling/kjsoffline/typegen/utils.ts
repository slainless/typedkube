import { Modifier } from "../data"

export function isStatic(modifiers?: Modifier.Value) {
	return modifiers ? Modifier.STATIC.is(modifiers) : false
}
