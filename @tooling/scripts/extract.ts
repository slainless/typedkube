import { JsonExtractor } from "@tooling/kjsoffline/html/extract.ts"
import { simpleIOArgs } from "@tooling/libs/args.ts"

const argv = simpleIOArgs()
const extractor = new JsonExtractor(argv.values.input, argv.values.output)
await extractor.extract()
