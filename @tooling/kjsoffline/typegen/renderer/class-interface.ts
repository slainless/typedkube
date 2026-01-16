import type { WrappedRawClass } from "@tooling/kjsoffline/data"
import { renderFields } from "./class-member"
import { renderConstructors, renderMethods } from "./function"
import { renderInnerClasses } from "./inner-class"
import { renderExtends } from "./super-class"

export function renderClassConstructorInterface(klass: WrappedRawClass) {
	return [
		`interface ${klass.name({}, false, { nameSuffix: "Static" })} ${renderExtends(klass, true)} {`,
		renderConstructors(klass),
		renderMethods(klass, true),
		renderFields(klass, true),
		renderInnerClasses(klass, true),
		"}",
	].join("\n")
}

export function renderClassInterface(klass: WrappedRawClass) {
	return [
		`interface ${klass.name()} ${renderExtends(klass)} {`,
		renderMethods(klass, false),
		renderFields(klass, false),
		renderInnerClasses(klass, false),
		"}",
	].join("\n")
}
