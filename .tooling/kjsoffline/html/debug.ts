import { join } from "node:path"
import { JsonExtractor } from "./parser"

const docsDir = join(__dirname, "..", "..", "..", "documentation")
const input = join(docsDir, "index.html")
const output = join(docsDir, "data.json")

const extractor = new JsonExtractor(input, output)
await extractor.extract()
