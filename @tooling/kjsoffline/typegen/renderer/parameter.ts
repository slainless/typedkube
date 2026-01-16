import type { Wrapped } from "@tooling/kjsoffline/data/common"
import type { FunctionMixin } from "@tooling/kjsoffline/data/mixin/function"

export function renderParameters(
	klass: Wrapped<InstanceType<ReturnType<typeof FunctionMixin>>>,
) {
	const typeVariableMap = klass.typeVariableMap()
	return klass
		.wrapped()
		.parameters()
		.map(
			(parameter) =>
				`${parameter.name()}: ${parameter.asWrapped(typeVariableMap).mappedType().referenceName(typeVariableMap)}`,
		)
		.join(", ")
}
