import { mkdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import { parseArgs } from "node:util"
import { getLogger } from "@logtape/logtape"
import { DataStorage, JsonExtractor, Registry } from "@tooling/kjsoffline"
import { Packager } from "@tooling/kjsoffline/typegen/packager.ts"
import { configureLogger } from "@tooling/libs/logger.ts"
import {
	KUBEJS_OFFLINE_HTML_DUMP_PATH,
	TYPEGEN_OUTPUT_PATH,
} from "../../typedkube.config.ts"

await configureLogger(join(process.cwd(), "@tooling", "logs", "typegen.log"))
const logger = getLogger("global")

const argv = parseArgs({
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
	},
	allowPositionals: false,
})

await mkdir(argv.values.output, { recursive: true })

const jsonPath = join(argv.values.output, "data.json")
logger.info(`Extracting JSON data from ${argv.values.input} to ${jsonPath}`)
await new JsonExtractor(argv.values.input, jsonPath).extract()

const data = JSON.parse(await readFile(jsonPath, "utf-8"))
const storage = new DataStorage(data)
const registry = new Registry(storage)

logger.info(`Generating typegen to ${argv.values.output}`)
const packager = new Packager(registry)
await packager.generate(argv.values.output, {
	onSuccess(packageName) {
		logger.info(`✅ Generated package ${packageName}`)
	},
	onError(packageName, error) {
		logger.error(`⛔ Error generating package ${packageName}`, error)
	},
})

const loadClassPath = join(argv.values.output, "load-class.d.ts")
logger.info(`Generating load class to ${loadClassPath}`)
await packager.generateLoadClass(loadClassPath)
