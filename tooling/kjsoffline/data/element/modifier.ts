import type { Tagged } from "type-fest"

export class Modifier {
	readonly value: Modifier.Value

	constructor(
		value: number,
		readonly name: string,
	) {
		this.value = value as Modifier.Value
	}

	is(mod: Modifier.Value): boolean {
		return (this.value & mod) !== 0
	}
}

export namespace Modifier {
	export type Value = Tagged<number, "Modifier">

	export const PUBLIC = new Modifier(1, "public")
	export const PRIVATE = new Modifier(2, "private")
	export const PROTECTED = new Modifier(4, "protected")
	export const STATIC = new Modifier(8, "static")
	export const FINAL = new Modifier(16, "final")
	export const SYNCHRONIZED = new Modifier(32, "synchronized")
	export const VOLATILE = new Modifier(64, "volatile")
	export const TRANSIENT = new Modifier(128, "transient")
	export const NATIVE = new Modifier(256, "native")
	export const INTERFACE = new Modifier(512, "interface")
	export const ABSTRACT = new Modifier(1024, "abstract")
	export const STRICT = new Modifier(2048, "strict")
	export const SYNTHETIC = new Modifier(4096, "synthetic")
	export const MANDATED = new Modifier("耀".codePointAt(0), "mandated")

	export const BRIDGE = new Modifier(64, "bridge")
	export const VARARGS = new Modifier(128, "varargs")
	export const ANNOTATION = new Modifier(8192, "annotation")
	export const ENUM = new Modifier(16384, "enum")

	export const CLASS_MODIFIERS = new Modifier(3103, "class modifiers")
	export const INTERFACE_MODIFIERS = new Modifier(3087, "interface modifiers")
	export const CONSTRUCTOR_MODIFIERS = new Modifier(7, "constructor modifiers")
	export const METHOD_MODIFIERS = new Modifier(3391, "method modifiers")
	export const FIELD_MODIFIERS = new Modifier(223, "field modifiers")
	export const PARAMETER_MODIFIERS = new Modifier(16, "parameter modifiers")
	export const ACCESS_MODIFIERS = new Modifier(7, "access modifiers")

	const STRING_LOOKUP = [
		PUBLIC,
		PROTECTED,
		PRIVATE,
		ABSTRACT,
		STATIC,
		FINAL,
		TRANSIENT,
		VOLATILE,
		SYNCHRONIZED,
		NATIVE,
		STRICT,
		INTERFACE,
	]

	export function asString(modifiers: Modifier.Value): string[] {
		const strings = []
		for (const modifier of STRING_LOOKUP)
			if (modifier.is(modifiers)) strings.push(modifier.name)
		return strings
	}
}
