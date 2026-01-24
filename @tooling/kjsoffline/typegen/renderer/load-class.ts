import type { WrappedRawClass } from "@tooling/kjsoffline/data"

export function renderJavaLoadClass(klass: WrappedRawClass[]) {
	return `
		interface LoadClassMap {
			${klass.map(renderJavaLoadClassEntry).join("\n")}
		}
	`
}

function renderJavaLoadClassEntry(klass: WrappedRawClass) {
	const wrapped = klass
	const keyName = wrapped.typescriptReferenceName({
		appendGenerics: false,
		rootPackage: "",
	})
	const referenceName = wrapped.typescriptReferenceName({
		appendGenerics: false,
		nameSuffix: "Static",
	})

	return `"${keyName}": ${referenceName}`
}
