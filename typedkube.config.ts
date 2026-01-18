import { resolve } from "node:path"

export const KUBEJS_PATH = resolve(process.cwd(), "..", "kubejs")
export const KUBEJS_OFFLINE_HTML_DUMP_PATH = resolve(
	KUBEJS_PATH,
	"documentation",
	"index.html",
)

export const TYPEGEN_OUTPUT_PATH = resolve(process.cwd(), "typings", "typegen")
export const TYPEDKUBE_OUTPUT_PATH = KUBEJS_PATH
