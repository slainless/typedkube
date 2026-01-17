import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { getLogger } from "@logtape/logtape"
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
import { Package, Packager } from "@tooling/kjsoffline/typegen/packager"
import {
	renderClassConstructorInterface,
	renderClassInterface,
} from "@tooling/kjsoffline/typegen/renderer/class-interface"
import { simpleIOArgs } from "@tooling/libs/args.ts"
import { configureLogger } from "@tooling/libs/logger"

process.env.DEBUG = "true"

await configureLogger()
const logger = getLogger("global")

const argv = simpleIOArgs()
const extractor = new JsonExtractor(argv.values.input, argv.values.output)
await extractor.extract()

const data = JSON.parse(await readFile(argv.values.output, "utf-8"))
const storage = new DataStorage(data)
const registry = new Registry(storage)
const packager = new Packager(registry)
const packages = packager.packageMap
const render = (index: number) => {
	const klass = registry.get(Class, index as ElementIndex)
	if (klass instanceof RawClass) {
		logger.info(renderClassConstructorInterface(klass.asWrapped()))
		logger.info(renderClassInterface(klass.asWrapped()))
	} else {
		logger.info(`Not a raw class: ${klass.constructor.name}`)
	}
}
const renderPackage = (pkg: Package, format = true) => {
	packager.generatePackage(join(process.cwd(), "typegen"), pkg, format)
}
const renderAll = async () => {
	const results = await packager.generate(join(process.cwd(), "typegen"))
	for (const [pkg, error] of results) {
		logger.error(error, `Error generating package ${pkg[Package.PackageName]}:`)
	}
}
