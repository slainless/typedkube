import type { WrappedRawClass } from "@tooling/kjsoffline/data"
import { isStatic } from "../utils.ts"

export function renderConstructors(klass: WrappedRawClass) {
	return klass
		.wrappedConstructors(true)
		.map((ctor) => ctor.typescriptConstructor())
		.join("\n")
}

export function renderMethods(klass: WrappedRawClass, staticOnly = false) {
	return klass
		.wrappedMethods(true)
		.filter((method) =>
			staticOnly
				? isStatic(method.wrapped().modifiersValue())
				: !isStatic(method.wrapped().modifiersValue()),
		)
		.map((method) => method.typescriptMethod())
		.join("\n")
}
