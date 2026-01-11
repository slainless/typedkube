import { createReadStream, createWriteStream, unlinkSync } from "node:fs"
import type { Writable } from "node:stream"
import { WritableStream } from "htmlparser2/WritableStream"

export class JsonExtractor {
	constructor(
		private readonly fromHtmlPath: string,
		private readonly toJsonPath: string,
	) {}

	private extractTask?: Promise<void>
	extract() {
		if (this.extractTask) return this.extractTask
		const input = createReadStream(this.fromHtmlPath, "utf8")
		const output = createWriteStream(this.toJsonPath, "utf8")

		const parser = new WritableStream({
			ontext: (data) => {
				if (this.shouldWrite()) this.preflush(output, this.stripText(data))
			},
			onopentag: (name, attribs, isImplied) => {
				this.tagOpened(name, attribs, isImplied)
			},
			onclosetag: (name) => {
				this.tagClosed(name)
				this.lastFlush(output)
			},
		})

		this.extractTask = new Promise<void>((res, rej) => {
			input
				.pipe(parser)
				.on("error", rej)
				.on("finish", () => res())
		})
			.catch((rej) => {
				output.close()
				unlinkSync(this.toJsonPath)
			})
			.finally(() => {
				this.reset()
				input.close()
				output.close()
			})

		return this.extractTask
	}

	private isWriting = false
	private constStripped = false
	private preflushed?: string
	private reset() {
		this.extractTask = undefined
		this.isWriting = false
		this.constStripped = false
		this.preflushed = undefined
	}

	private preflush(output: Writable, text: string) {
		if (this.preflushed == null) {
			this.preflushed = text
			return
		}

		output.write(this.preflushed)
		this.preflushed = text
	}

	private lastFlush(output: Writable) {
		if (this.preflushed == null) return
		output.write(this.preflushed.trimEnd().replace(/;$/, ""))
		this.preflushed = undefined
	}

	private shouldWrite() {
		return this.isWriting
	}

	private tagOpened(
		name: string,
		attribs: Record<string, string>,
		isImplied: boolean,
	) {
		if (
			name !== "script" ||
			attribs.id !== "data" ||
			attribs.class !== "constant"
		) {
			this.isWriting = false
			return
		}

		this.isWriting = true
	}

	private tagClosed(name: string) {
		this.isWriting = false
	}

	private stripText(text: string) {
		if (this.constStripped) return text
		if (text.includes("const DATA = ")) {
			this.constStripped = true
			return text.replace("const DATA = ", "")
		}
		return text
	}
}
