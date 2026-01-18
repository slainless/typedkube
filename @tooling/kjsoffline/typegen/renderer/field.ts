import type { WrappedRawClass } from "@tooling/kjsoffline/data"
import { isStatic } from "../utils.ts"

export function renderFields(klass: WrappedRawClass, staticOnly = false) {
	return klass
		.wrappedFields(true)
		.filter((field) =>
			staticOnly
				? isStatic(field.wrapped().modifiersValue())
				: !isStatic(field.wrapped().modifiersValue()),
		)
		.map((field) => field.typescriptField())
		.join("\n")
}
