import { parseArgs } from "node:util"
import { DEFAULT_DATA_OUTPUT, DEFAULT_KUBE_OFFLINE_HTML } from "./default.ts"

export function simpleIOArgs() {
	return parseArgs({
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
				default: DEFAULT_DATA_OUTPUT,
			},
		},
		allowPositionals: false,
	})
}
