import { Modifier } from "@tooling/kjsoffline/data"
import type { Base, Wrapped } from "@tooling/kjsoffline/data/common"
import type { ModifierMixin } from "@tooling/kjsoffline/data/mixin/modifier"

export function renderModifierComment(modified: Wrapped<Base<any>>) {
	const wrapped = modified.wrapped() as InstanceType<
		ReturnType<typeof ModifierMixin>
	>
	if ("modifiers" in wrapped) {
		return [
			`/**`,
			` * @modifier ${Modifier.asString(wrapped.modifiers() ?? Modifier.PUBLIC.value).join(",")}`,
			` */\n`,
		].join("\n")
	}

	return ""
}
