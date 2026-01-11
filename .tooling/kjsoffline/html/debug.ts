import { join } from "node:path"
import { JsonExtractor } from "./parser.ts"

const docsDir = join(import.meta.dirname, "..", "..", "..", "documentation")
const input = join(docsDir, "index.html")
const output = join(docsDir, "data.json")

const extractor = new JsonExtractor(input, output)
await extractor.extract()
