import type { RawClass } from "@tooling/kjsoffline/data"
import type { Wrapped } from "@tooling/kjsoffline/data/common"

export function renderExtends(klass: Wrapped<RawClass>, asStatic = false) {
	const superClass = klass.wrapped().superClass()
	if (!superClass) return ""
	const typeVariableMap = klass.typeVariableMap()
	const wrapped = superClass.asWrapped(0, typeVariableMap)
	return `extends ${wrapped.referenceName(typeVariableMap, { nameSuffix: asStatic ? "Static" : "" })}`
}

export function renderImplements(klass: Wrapped<RawClass>, asStatic = false) {
	const interfaces = klass.wrapped().interfaces()
	if (interfaces.length === 0) return ""
	const typeVariableMap = klass.typeVariableMap()
	return `implements ${interfaces.map((v) => v.asWrapped(0, typeVariableMap).referenceName(typeVariableMap, { nameSuffix: asStatic ? "Static" : "" })).join(", ")}`
}
