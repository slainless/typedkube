import { Wrapped } from "./common"
import type { IndexHolderMixin } from "./mixin/index-holder"
import type { DataIndex, EitherDataIndex } from "./storage"

type Part = boolean | null | number
export function decodePart(
	part: string | undefined,
	objectDecoder?: (part: string) => any,
): Part | Part[] {
	if (!part) return null
	if (!part.trim()) return null

	// Format
	// by default assume integer.
	// If it starts with a [ then it is an array.
	// If it starts with a { then it is an object.
	// If it is equal to T then it is a boolean (true)
	// If it is equal to F then it is a boolean (false)
	if (part === "T") return true
	if (part === "F") return false

	if (part.startsWith("["))
		return part
			.slice(1)
			.split("|")
			.map((p) => decodePart(p.trim())) as Part[]

	if (part.startsWith("{")) {
		if (objectDecoder) return objectDecoder(atob(part.slice(1)))
		throw new Error(`Object decoder not provided for part: ${part}`)
	}

	// Otherwise assume it's an integer
	const num = Number.parseInt(part, 10)
	if (Number.isNaN(num)) throw new Error(`Invalid number: ${part}`)
	return num
}

export function asArray<T>(
	value: T,
): NonNullable<T> extends Array<any> ? NonNullable<T> : Array<NonNullable<T>> {
	// @ts-expect-error
	return (Array.isArray(value) ? value : value == null ? [] : [value]).filter(
		(v) => v != null,
	)
}

export function dataIndex(index: EitherDataIndex): DataIndex {
	if (typeof index === "number") return index
	if (Array.isArray(index)) return index[0]
	throw new Error(`Expected EitherDataIndex, but received ${index}`)
}

export function exist<T>(val: T, contextMessage?: string): NonNullable<T> {
	assertExist(val, contextMessage)
	return val
}

export function assertExist<T>(
	val: T,
	contextMessage?: string,
): asserts val is NonNullable<T> {
	if (val === undefined || val === null) {
		throw new TypeError(
			`Expected 'val' to be defined, but received ${val}: ${contextMessage}`,
		)
	}

	// @ts-expect-error
	return val
}

export function renderClassDebug(
	element:
		| InstanceType<ReturnType<typeof IndexHolderMixin>>
		| Wrapped<InstanceType<ReturnType<typeof IndexHolderMixin>>>,
): string {
	if (element instanceof Wrapped)
		return `${element.constructor.name} (type: ${element.wrapped().index()})`

	return `${element.constructor.name} (type: ${element.index()})`
}

const reservedKeywords = new Set([
	"type",
	"interface",
	"function",
	"class",
	"enum",
	"in",
	"with",
	"export",
	"import",
	"from",
	"as",
	"namespace",
	"module",
	"private",
	"protected",
	"public",
	"static",
	"async",
	"await",
	"yield",
	"default",
	"extends",
	"implements",
	"let",
	"const",
	"var",
	"if",
	"else",
	"switch",
	"case",
	"break",
	"continue",
	"return",
	"throw",
	"try",
	"catch",
	"finally",
	"while",
	"do",
	"for",
	"instanceof",
	"typeof",
	"new",
	"this",
	"super",
	"void",
	"null",
	"true",
	"false",
])

export function mapReservedKeyword(name: string) {
	if (reservedKeywords.has(name)) return `$${name}`
	return name
}

export function satinizeName(name: string) {
	const sanitized = name.replaceAll(/[?!<>[\]]/g, "")
	if (!sanitized)
		return `sanitized_${Math.random().toString(36).substring(2, 5)}`
	return sanitized
}

export function encloseObjectField(name: string) {
	if (name.includes("-")) return `"${name}"`
	return name
}

export function isDebug() {
	return process.env.DEBUG === "true"
}
