import type { WrappedRawClass } from "@tooling/kjsoffline/data"
import { isStatic } from "../utils.ts"

export function renderFields(klass: WrappedRawClass, staticOnly = false) {
	return klass
		.wrapped()
		.fields(true)
		.filter((v) =>
			staticOnly ? isStatic(v.modifiersValue()) : !isStatic(v.modifiersValue()),
		)
		.map((field) => field.asWrapped(klass.typeVariableMap()).typescriptField())
		.join("\n")
}
