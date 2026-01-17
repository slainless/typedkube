import { Modifier } from "../data"

export function isStatic(modifiers?: Modifier.Value) {
	return modifiers ? Modifier.STATIC.is(modifiers) : false
}

export function mapReservedKeywords(name: string) {
	switch (name) {
		case "type":
			return "$type"
		case "interface":
			return "$interface"
		case "function":
			return "$function"
		case "class":
			return "$class"
		case "enum":
			return "$enum"
		case "in":
			return "$in"
		case "with":
			return "$with"
		default:
			return name
	}
}
