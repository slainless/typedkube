import type { RawClass } from "@tooling/kjsoffline/data"
import type { Wrapped } from "@tooling/kjsoffline/data/common.ts"
import { isStatic } from "../utils.ts"

export function renderFields(klass: Wrapped<RawClass>, staticOnly = false) {
	return klass
		.wrapped()
		.fields(true)
		.filter((v) =>
			staticOnly ? isStatic(v.modifiersValue()) : !isStatic(v.modifiersValue()),
		)
		.map((field) => field.asWrapped(klass.typeVariableMap()).typescriptField())
		.join("\n")
}
