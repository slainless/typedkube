import type { RawClass } from "@tooling/kjsoffline/data"
import {
	renderClassConstructorInterface,
	renderClassInterface,
} from "./class-interface"

export function renderPackage(
	packageName: string,
	packages: Record<string, RawClass>,
) {
	return [
		`namespace ${packageName} {`,
		...Object.values(packages).flatMap((klass) => {
			const wrapped = klass.asWrapped(0, {})
			return [
				renderClassConstructorInterface(wrapped),
				renderClassInterface(wrapped),
			]
		}),
		"}",
	].join("\n")
}
