import type { WrappedRawClass } from "@tooling/kjsoffline/data"
import {
	renderClassConstructorInterface,
	renderClassInterface,
} from "./class-interface"

export function renderPackage(packageName: string, classes: WrappedRawClass[]) {
	const members = classes.flatMap((klass) => {
		return [renderClassConstructorInterface(klass), renderClassInterface(klass)]
	})

	return `
		namespace ${packageName} {
			${members.join("\n")}
		}
	`
}
