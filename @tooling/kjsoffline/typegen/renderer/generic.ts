import type { TypeVariableMixin } from "@tooling/kjsoffline/data/mixin/type-variable"
import type { MappedTypeVariableMixin } from "@tooling/kjsoffline/data/wrapped-mixin/mapped-type-variable"

export function renderGeneric(
	klass:
		| InstanceType<ReturnType<typeof MappedTypeVariableMixin>>
		| InstanceType<ReturnType<typeof TypeVariableMixin>>,
) {
	let variables: string = ""
	if ("typeVariables" in klass) {
		variables = klass
			.typeVariables()
			.map((variable) => variable.asString())
			.join(", ")
	}

	if ("mappedTypeVariables" in klass) {
		variables = klass
			.mappedTypeVariables()
			.map((variable) => variable.asString())
			.join(", ")
	}
	if (variables) return `<${variables}>`
	return ""
}
