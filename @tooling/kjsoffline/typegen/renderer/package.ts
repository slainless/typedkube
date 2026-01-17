import type { RawClass } from "@tooling/kjsoffline/data"
import {
	renderClassConstructorInterface,
	renderClassInterface,
} from "./class-interface"

export function renderPackage(packageName: string, classes: RawClass[]) {
	const members = classes.flatMap((klass) => {
		const wrapped = klass.asWrapped()
		return [
			renderClassConstructorInterface(wrapped),
			renderClassInterface(wrapped),
		]
	})

	return `
		namespace ${packageName} {
			${members.join("\n")}
		}
	`
}
