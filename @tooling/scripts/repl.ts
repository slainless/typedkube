import { readFile } from "node:fs/promises"
import {
	Annotation,
	Binding,
	Class,
	Constructor,
	DataStorage,
	Field,
	JsonExtractor,
	Method,
	Modifier,
	Parameter,
	ParameterizedType,
	RawClass,
	Registry,
	TypeVariable,
	WildcardType,
} from "@tooling/kjsoffline"
import { simpleIOArgs } from "@tooling/libs/args.ts"

const argv = simpleIOArgs()
const extractor = new JsonExtractor(argv.values.input, argv.values.output)
await extractor.extract()

const data = JSON.parse(await readFile(argv.values.output, "utf-8"))
const storage = new DataStorage(data)
const registry = new Registry(storage)
