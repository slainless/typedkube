import { WrappedRawClass } from "@tooling/kjsoffline"
import { debugOutputPath } from "@tooling/libs/args"
import { bootstrapTypegen } from "@tooling/libs/bootstrap"
import { prop } from "remeda"

const { packager, argv } = await bootstrapTypegen({
	args: {
		package: {
			type: "string",
			short: "p",
			default: "_.kotlin",
		},
	},
})

const packages = packager.nestedPackageMap
// @ts-expect-error ts(2556)
const pkg = prop(packages, ...argv.values.package.split("."))
if (!pkg || pkg instanceof WrappedRawClass) {
	throw new Error(`Package ${argv.values.package} not found or is a raw class`)
}

packager.generatePackage(debugOutputPath, pkg)
