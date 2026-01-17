import { globSync } from "node:fs"
import path from "node:path"
import { defineConfig } from "@rspack/cli"
import rspack from "@rspack/core"

function scriptDirectory(dir: string, targetDirectory: string) {
	return globSync(path.join(dir, "**/*.[jt]s")).map((file) => {
		const abs = path.resolve(file)
		const name = path.join(
			targetDirectory,
			path.relative(dir, abs).replace(/\.[jt]s$/, ""),
		)
		return [name, abs] as const
	})
}

export default defineConfig({
	context: path.resolve("."),
	target: "es5",
	entry: Object.fromEntries([
		...scriptDirectory("./scripts/client", "client_scripts"),
		...scriptDirectory("./scripts/server", "server_scripts"),
		...scriptDirectory("./scripts/startup", "startup_scripts"),
	]),
	resolve: {
		preferRelative: true,
		extensions: [".ts", ".js"],
	},
	optimization: {
		splitChunks: false,
		runtimeChunk: false,
		minimize: false,
	},
	devtool: false,
	output: {
		chunkFormat: "module",
		filename: "[name].js",
		path: path.resolve(process.cwd(), "../kubejs"),
		clean: {
			keep: /(exported|documentation)\//,
		},
	},
	plugins: [
		new rspack.CopyRspackPlugin({
			patterns: [{ from: "./root" }],
		}),
		new rspack.ProvidePlugin({
			$: path.resolve(process.cwd(), "./libs/polyfill.ts"),
		}),
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/],
				loader: "builtin:swc-loader",
				options: {
					jsc: {
						parser: {
							syntax: "typescript",
						},
					},
				},
				type: "javascript/auto",
			},
		],
	},
})
