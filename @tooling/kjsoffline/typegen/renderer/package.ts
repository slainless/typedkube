import type { RawClass } from "@tooling/kjsoffline/data"
import {
	renderClassConstructorInterface,
	renderClassInterface,
} from "./class-interface"

export function renderPackage(packageName: string, classes: RawClass[]) {
	return [
		`namespace ${packageName} {`,
		...classes.flatMap((klass) => {
			const wrapped = klass.asWrapped(0, {})
			return [
				renderClassConstructorInterface(wrapped),
				renderClassInterface(wrapped),
			]
		}),
		"}",
	].join("\n")
}
