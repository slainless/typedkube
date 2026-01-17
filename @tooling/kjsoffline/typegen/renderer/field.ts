import type { RawClass } from "@tooling/kjsoffline/data"
import type { Wrapped } from "@tooling/kjsoffline/data/common"
import { isStatic } from "../utils"

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
