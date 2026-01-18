import type { RawClass } from "@tooling/kjsoffline/data"

export function renderJavaLoadClass(klass: RawClass[]) {
	return `
		interface LoadClassMap {
			${klass.map(renderJavaLoadClassEntry).join("\n")}
		}
	`
}

function renderJavaLoadClassEntry(klass: RawClass) {
	const wrapped = klass.asWrapped()
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
