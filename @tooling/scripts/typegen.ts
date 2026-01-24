import { join } from "node:path"
import { bootstrapTypegen } from "@tooling/libs/bootstrap.ts"

const { packager, argv, logger } = await bootstrapTypegen({
	logOutput: join(process.cwd(), "@tooling", "logs", "typegen.log"),
})

logger.info(`Generating typegen to ${argv.values.output}`)

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
