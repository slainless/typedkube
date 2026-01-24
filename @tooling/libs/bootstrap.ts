import { mkdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import {
	type ParseArgsConfig,
	type ParseArgsOptionsConfig,
	parseArgs,
} from "node:util"
import { getLogger } from "@logtape/logtape"
import { DataStorage, JsonExtractor, Registry } from "@tooling/kjsoffline"
import { Packager } from "@tooling/kjsoffline/typegen/packager"
import {
	KUBEJS_OFFLINE_HTML_DUMP_PATH,
	TYPEGEN_OUTPUT_PATH,
} from "../../typedkube.config"
import { configureLogger } from "./logger"

export interface BootstrapTypegenOptions<T extends ParseArgsOptionsConfig> {
	args?: T
	logOutput?: string
}
export async function bootstrapTypegen<
	T extends BootstrapTypegenOptions<ParseArgsOptionsConfig>,
>(options?: T) {
	await configureLogger(
		options?.logOutput ??
			join(process.cwd(), "@tooling", "logs", "typegen.log"),
	)
	const logger = getLogger("global")

	const argOptions = {
		args: process.argv.slice(2),
		options: {
			input: {
				type: "string",
				short: "i",
				default: KUBEJS_OFFLINE_HTML_DUMP_PATH,
			},
			output: {
				type: "string",
				short: "o",
				default: TYPEGEN_OUTPUT_PATH,
			},
			...options?.args,
		},
		allowPositionals: false,
	} satisfies ParseArgsConfig

	const argv = parseArgs(argOptions)

	await mkdir(argv.values.output, { recursive: true })

	const jsonPath = join(argv.values.output, "data.json")
	logger.debug(`Extracting JSON data from ${argv.values.input} to ${jsonPath}`)
	await new JsonExtractor(argv.values.input, jsonPath).extract()

	const data = JSON.parse(await readFile(jsonPath, "utf-8"))
	const storage = new DataStorage(data)
	const registry = new Registry(storage)

	const packager = new Packager(registry)

	// @ts-expect-error
	const aliasedArgv = argv as ReturnType<
		typeof parseArgs<typeof argOptions & { options: T["args"] }>
	>

	return {
		packager,
		registry,
		storage,
		data,
		logger,
		argv: aliasedArgv,
	}
}
