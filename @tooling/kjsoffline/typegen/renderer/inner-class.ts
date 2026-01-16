import type { RawClass } from "@tooling/kjsoffline/data"
import type { Wrapped } from "@tooling/kjsoffline/data/common"
import { isStatic } from "../utils"
import { renderClassMember } from "./class-member"

export function renderInnerClasses(
	klass: Wrapped<RawClass>,
	staticOnly = false,
) {
	return klass
		.wrapped()
		.innerClasses()
		.filter((v) =>
			staticOnly ? isStatic(v.modifiers()) : !isStatic(v.modifiers()),
		)
		.map((v) => renderClassMember(v.asWrapped(0, klass.typeVariableMap())))
		.join("\n")
}
