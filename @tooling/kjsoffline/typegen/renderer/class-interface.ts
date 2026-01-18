import type { WrappedRawClass } from "@tooling/kjsoffline/data"
import { renderFields } from "./field.ts"
import { renderConstructors, renderMethods } from "./function.ts"
import { renderInnerClasses } from "./inner-class.ts"

export function renderClassConstructorInterface(klass: WrappedRawClass) {
	const name = klass.typescriptReferenceName({
		mapClassGenerics: false,
		prependPackageName: false,
		nameSuffix: "Static",
		appendGenerics: false,
	})
	const inherits = klass.typescriptExtends({
		appendGenerics: false,
		nameSuffix: "Static",
	})

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
