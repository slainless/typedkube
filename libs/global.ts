export function getGlobal(): typeof globalThis {
	return function () {
		// @ts-expect-error
		return this
	}.call(null)
}
