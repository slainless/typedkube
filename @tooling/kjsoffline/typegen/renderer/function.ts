import {
	Modifier,
	type RawClass,
	WrappedConstructor,
	WrappedMethod,
} from "@tooling/kjsoffline/data"
import type { Base, Wrapped } from "@tooling/kjsoffline/data/common"
import { isStatic } from "../utils"
import { renderGeneric } from "./generic"
import { renderModifierComment } from "./modifier"
import { renderParameters } from "./parameter"

export function renderFunction(klass: Wrapped<Base<any>>) {
	const modifiers = renderModifierComment(klass)
	if (klass instanceof WrappedConstructor) {
		return [
			modifiers,
			`new ${renderGeneric(klass)}(${renderParameters(klass)}): ${klass.wrappedDeclaringClass().asString()}`,
		].join("")
	}

	if (klass instanceof WrappedMethod) {
		const declaringClass = klass.wrapped().declaringClass()
		return [
			modifiers,
			klass.wrapped().name(),
			renderGeneric(klass),
			`(${renderParameters(klass)}):`,
			klass.mappedType().referenceName(declaringClass.typeVariableMap()),
		].join("")
	}

	return `// Unsupported function: ${klass.constructor.name}`
}

export function renderConstructors(klass: Wrapped<RawClass>) {
	return klass
		.wrapped()
		.constructors(true)
		.map((v) => renderFunction(v.asWrapped(klass.typeVariableMap())))
		.join("\n")
}

export function renderMethods(klass: Wrapped<RawClass>, staticOnly = false) {
	return klass
		.wrapped()
		.methods(true)
		.filter((v) =>
			staticOnly ? isStatic(v.modifiers()) : !isStatic(v.modifiers()),
		)
		.map((v) => renderFunction(v.asWrapped(klass.typeVariableMap())))
		.join("\n")
}
