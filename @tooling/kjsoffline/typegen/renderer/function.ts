import type { WrappedRawClass } from "@tooling/kjsoffline/data"
import { isStatic } from "../utils.ts"

export function renderConstructors(klass: WrappedRawClass) {
	return klass
		.wrapped()
		.constructors(true)
		.map((ctor) =>
			ctor.asWrapped(klass.typeVariableMap()).typescriptConstructor(),
		)
		.join("\n")
}

export function renderMethods(klass: WrappedRawClass, staticOnly = false) {
	return klass
		.wrapped()
		.methods(true)
		.filter((v) =>
			staticOnly ? isStatic(v.modifiersValue()) : !isStatic(v.modifiersValue()),
		)
		.map((method) =>
			method.asWrapped(klass.typeVariableMap()).typescriptMethod(),
		)
		.join("\n")
}
