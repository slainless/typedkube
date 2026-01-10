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
	return (Array.isArray(value) ? (value == null ? [] : value) : [value]).filter(
		(v) => v != null,
	)
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
