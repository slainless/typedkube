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
import { Property } from "@tooling/kjsoffline/data/common"
import type { ElementIndex } from "@tooling/kjsoffline/data/registry"
import { Package, Packager } from "@tooling/kjsoffline/typegen/packager"
import {
	renderClassConstructorInterface,
	renderClassInterface,
} from "@tooling/kjsoffline/typegen/renderer/class-interface"
import { debugOutputPath } from "@tooling/libs/args"
import { bootstrapTypegen } from "@tooling/libs/bootstrap"

// process.env.DEBUG = "true"

const { packager, logger, registry } = await bootstrapTypegen()

export const packages = packager.nestedPackageMap
export const render = (index: number) => {
	const klass = registry.get(Class, index as ElementIndex)
	if (klass instanceof RawClass) {
		logger.info(renderClassConstructorInterface(klass.asWrapped()))
		logger.info(renderClassInterface(klass.asWrapped()))
	} else {
		logger.info(`Not a raw class: ${klass.constructor.name}`)
	}
}
export const renderPackage = (pkg: Package, format = true) => {
	packager.generatePackage(debugOutputPath, pkg, format)
}
export const renderAll = async () => {
	const results = await packager.generate(debugOutputPath)
	for (const [pkg, error] of results) {
		logger.error(error, `Error generating package ${pkg[Package.PackageName]}:`)
	}
}
export const renderLoadClass = async () => {
	await packager.generateLoadClass(debugOutputPath)
}
