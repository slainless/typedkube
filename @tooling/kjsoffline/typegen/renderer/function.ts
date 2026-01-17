import type { RawClass } from "@tooling/kjsoffline/data"
import type { Wrapped } from "@tooling/kjsoffline/data/common.ts"
import { isStatic } from "../utils.ts"

export function renderConstructors(klass: Wrapped<RawClass>) {
	return klass
		.wrapped()
		.constructors(true)
		.map((ctor) =>
			ctor.asWrapped(klass.typeVariableMap()).typescriptConstructor(),
		)
		.join("\n")
}

export function renderMethods(klass: Wrapped<RawClass>, staticOnly = false) {
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
