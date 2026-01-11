import { join } from "node:path"

export const DEFAULT_KUBE_DIR = join(process.cwd(), "..", "kubejs")
export const DEFAULT_DATA_OUTPUT = join(
	process.cwd(),
	"@tooling",
	"kjsoffline",
	"data.json",
)
export const DEFAULT_KUBE_OFFLINE_HTML = join(
	DEFAULT_KUBE_DIR,
	"documentation",
	"index.html",
)
