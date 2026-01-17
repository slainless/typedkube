import type { Wrapped } from "@tooling/kjsoffline/data/common"
import type { FunctionMixin } from "@tooling/kjsoffline/data/mixin/function"
import { mapReservedKeywords } from "../utils"

export function renderParameters(
	klass: Wrapped<InstanceType<ReturnType<typeof FunctionMixin>>>,
) {
	const typeVariableMap = klass.typeVariableMap()
	return klass
		.wrapped()
		.parameters()
		.map((parameter) =>
			[
				`${mapReservedKeywords(parameter.name())}:`,
				parameter
					.asWrapped(typeVariableMap)
					.mappedType()
					.referenceName(typeVariableMap, {
						typescriptCompatibility: { plainTypeVariables: true },
					}),
			].join(""),
		)
		.join(", ")
}
