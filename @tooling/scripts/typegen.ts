import { mkdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import { parseArgs } from "node:util"
import { DataStorage, JsonExtractor, Registry } from "@tooling/kjsoffline"
import { Packager } from "@tooling/kjsoffline/typegen/packager"
import { DEFAULT_KUBE_OFFLINE_HTML } from "@tooling/libs/default"

const DEFAULT_TYPEGEN_OUTPUT = join(process.cwd(), "typings", "typegen")

const argv = parseArgs({
	args: process.argv.slice(2),
	options: {
		input: {
			type: "string",
			short: "i",
			default: DEFAULT_KUBE_OFFLINE_HTML,
		},
		output: {
			type: "string",
			short: "o",
			default: DEFAULT_TYPEGEN_OUTPUT,
		},
	},
	allowPositionals: false,
})

await mkdir(argv.values.output, { recursive: true })

const jsonPath = join(argv.values.output, "data.json")
console.log(`Extracting JSON data from ${argv.values.input} to ${jsonPath}`)
await new JsonExtractor(argv.values.input, jsonPath).extract()

const data = JSON.parse(await readFile(jsonPath, "utf-8"))
const storage = new DataStorage(data)
const registry = new Registry(storage)

console.log(`Generating typegen to ${argv.values.output}`)
const packager = new Packager(registry)
await packager.generate(argv.values.output, {
	onSuccess(packageName) {
		console.log(`✅ Generated package ${packageName}`)
	},
	onError(packageName, error) {
		console.error(
			`⛔ Error generating package ${packageName}: ${error.message}`,
		)
	},
})
