import { join } from "node:path"
import { parseArgs } from "node:util"
import {
	KUBEJS_OFFLINE_HTML_DUMP_PATH,
	TYPEGEN_OUTPUT_PATH,
} from "../../typedkube.config.ts"

export function simpleIOArgs() {
	return parseArgs({
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
				default: join(TYPEGEN_OUTPUT_PATH, "data.json"),
			},
		},
		allowPositionals: false,
	})
}
