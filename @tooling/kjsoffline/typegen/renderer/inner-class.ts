import type { RawClass } from "@tooling/kjsoffline/data"
import type { Wrapped } from "@tooling/kjsoffline/data/common.ts"
import { isStatic } from "../utils.ts"

export function renderInnerClasses(
	klass: Wrapped<RawClass>,
	staticOnly = false,
) {
	return klass
		.wrapped()
		.innerClasses()
		.filter((v) =>
			staticOnly ? isStatic(v.modifiersValue()) : !isStatic(v.modifiersValue()),
		)
		.map((kls) => kls.asWrapped(0, klass.typeVariableMap()).typescriptField())
		.join("\n")
}
