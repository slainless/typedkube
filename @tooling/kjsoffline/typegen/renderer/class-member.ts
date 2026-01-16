import {
	type RawClass,
	WrappedParameterizedType,
	WrappedRawClass,
} from "@tooling/kjsoffline/data"
import type { Base, Wrapped } from "@tooling/kjsoffline/data/common"
import type { BasicNameMixin } from "@tooling/kjsoffline/data/mixin/basic-name"
import type { DeclaringClassMixin } from "@tooling/kjsoffline/data/mixin/declaring-class"
import type { MappedTypeMixin } from "@tooling/kjsoffline/data/wrapped-mixin/mapped-type"
import { isStatic } from "../utils"
import { renderModifierComment } from "./modifier"

export function renderClassMember(klass: Wrapped<Base<any>>) {
	const modifiers = renderModifierComment(klass)
	if (klass instanceof WrappedRawClass) {
		return [
			modifiers,
			`${klass.simpleName()}: ${klass.referenceName(klass.typeVariableMap())}`,
		].join("")
	}

	if (klass instanceof WrappedParameterizedType) {
		return [
			modifiers,
			`${klass.simpleName()}: ${klass.referenceName(klass.typeVariableMap())}`,
		].join("")
	}

	const wrapped = klass.wrapped() as InstanceType<
		ReturnType<typeof BasicNameMixin>
	>
	if ("name" in wrapped && "mappedType" in klass) {
		const kls = klass as InstanceType<ReturnType<typeof MappedTypeMixin>> &
			InstanceType<ReturnType<typeof DeclaringClassMixin>>
		const name = wrapped.name()
		const mappedType = kls.mappedType()
		return [
			modifiers,
			`${name}:`,
			mappedType.referenceName(klass.typeVariableMap(), {
				typescriptCompatibility: true,
			}),
		].join("")
	}

	return `// Unsupported class member: ${klass.constructor.name}`
}

export function renderFields(klass: Wrapped<RawClass>, staticOnly = false) {
	return klass
		.wrapped()
		.fields(true)
		.filter((v) =>
			staticOnly ? isStatic(v.modifiers()) : !isStatic(v.modifiers()),
		)
		.map((v) => renderClassMember(v.asWrapped(klass.typeVariableMap())))
		.join("\n")
}
