import { globSync } from "node:fs"
import path from "node:path"
import { defineConfig } from "@rspack/cli"
import rspack from "@rspack/core"

const entries = globSync([
	"./client_scripts/**/*.[jt]s",
	"./server_scripts/**/*.[jt]s",
	"./startup_scripts/**/*.[jt]s",
])

export default defineConfig({
	context: path.resolve("."),
	target: "es5",
	entry: Object.fromEntries(
		entries.map((file) => {
			const abs = path.resolve(file)
			const name = path.relative(".", abs).replace(/\.[jt]s$/, "")
			return [name, abs]
		}),
	),
	resolve: {
		preferRelative: true,
	},
	optimization: {
		splitChunks: false,
		runtimeChunk: false,
	},
	output: {
		chunkFormat: "module",
		filename: "[name].js",
		path: path.resolve(process.cwd(), "../kubejs"),
		clean: {
			keep: /^(exported|documentation)\/$/,
		},
	},
	plugins: [
		new rspack.CopyRspackPlugin({
			patterns: [{ from: "./root" }],
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
