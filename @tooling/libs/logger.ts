import { mkdir, truncate } from "node:fs/promises"
import { dirname } from "node:path"
import { getFileSink } from "@logtape/file"
import { type Config, configure, getConsoleSink } from "@logtape/logtape"
import { getPrettyFormatter } from "@logtape/pretty"

export async function configureLogger(outputPath?: string) {
	const tapeConfig: Config<any, any> = {
		sinks: {
			console: getConsoleSink({ formatter: getPrettyFormatter() }),
		},
		loggers: [
			{
				category: "global",
				sinks: ["console"],
			},
		],
	} as const

	if (outputPath) {
		await mkdir(dirname(outputPath), { recursive: true })
		try {
			await truncate(outputPath)
		} catch (error) {}
		tapeConfig.sinks.file = getFileSink(outputPath)
		tapeConfig.loggers[0]?.sinks?.push("file")
	}

	await configure(tapeConfig)
}
