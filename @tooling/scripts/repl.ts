import { readFile } from "node:fs/promises"
import {
	Annotation,
	Binding,
	Class,
	Constructor,
	DataStorage,
	Field,
	JsonExtractor,
	Method,
	Modifier,
	Parameter,
	ParameterizedType,
	RawClass,
	Registry,
	TypeVariable,
	WildcardType,
} from "@tooling/kjsoffline"
import type { ElementIndex } from "@tooling/kjsoffline/data/registry"
import { Packager } from "@tooling/kjsoffline/typegen/packager"
import {
	renderClassConstructorInterface,
	renderClassInterface,
} from "@tooling/kjsoffline/typegen/renderer/class-interface"
import { renderPackage as renderPkg } from "@tooling/kjsoffline/typegen/renderer/package"
import { simpleIOArgs } from "@tooling/libs/args.ts"

const argv = simpleIOArgs()
const extractor = new JsonExtractor(argv.values.input, argv.values.output)
await extractor.extract()

const data = JSON.parse(await readFile(argv.values.output, "utf-8"))
const storage = new DataStorage(data)
const registry = new Registry(storage)
const packager = new Packager(registry)
const render = (index: number) => {
	const klass = registry.get(Class, index as ElementIndex)
	if (klass instanceof RawClass) {
		console.log(renderClassConstructorInterface(klass.asWrapped()))
		console.log(renderClassInterface(klass.asWrapped()))
	} else {
		console.log(`Not a raw class: ${klass.constructor.name}`)
	}
}
const renderPackage = (packageName: string) => {
	const packages = packager.packages[packageName]
	if (!packages) {
		console.log(`Package ${packageName} not found`)
		return
	}

	console.log(renderPkg(packageName, packages))
}
