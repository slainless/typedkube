export function getGlobal(): typeof globalThis {
	return function () {
		// @ts-expect-error
		return this
	}.call(null)
}

export function getObjectFields(obj: any) {
	const keys = new Set()

	let o: any = obj
	while (o) {
		for (const name of Object.getOwnPropertyNames(obj)) {
			keys.add(name)
		}
		o = Object.getPrototypeOf(o)
	}

	return Array.from(keys.values())
}
