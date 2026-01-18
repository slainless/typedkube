import type { WrappedRawClass } from "@tooling/kjsoffline/data"
import { isStatic } from "../utils.ts"

export function renderInnerClasses(klass: WrappedRawClass, staticOnly = false) {
	return klass
		.wrapped()
		.innerClasses()
		.filter((v) =>
			staticOnly ? isStatic(v.modifiersValue()) : !isStatic(v.modifiersValue()),
		)
		.map((kls) => kls.asWrapped(0, klass.typeVariableMap()).typescriptField())
		.join("\n")
}
