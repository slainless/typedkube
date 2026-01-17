import type { WrappedRawClass } from "@tooling/kjsoffline/data"
import { renderFields } from "./field"
import { renderConstructors, renderMethods } from "./function"
import { renderInnerClasses } from "./inner-class"

export function renderClassConstructorInterface(klass: WrappedRawClass) {
	const name = klass.typescriptReferenceName({
		mapClassGenerics: false,
		prependPackageName: false,
		nameSuffix: "Static",
	})
	const inherits = klass.typescriptExtends()

	return `
		interface ${name} ${inherits ? `extends ${inherits}` : ""} {
			${renderConstructors(klass)}
			${renderMethods(klass, true)}
			${renderFields(klass, true)}
			${renderInnerClasses(klass, true)}
		}
	`
}

export function renderClassInterface(klass: WrappedRawClass) {
	const name = klass.typescriptReferenceName({
		mapClassGenerics: false,
		prependPackageName: false,
	})
	const inherits = klass.typescriptExtends()

	return `
		interface ${name} ${inherits ? `extends ${inherits}` : ""} {
			${renderMethods(klass, false)}
			${renderFields(klass, false)}
			${renderInnerClasses(klass, false)}
		}
	`
}
