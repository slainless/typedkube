import type { Tagged } from "type-fest"
import { Property } from "./common.ts"
import type { Modifier } from "./element/modifier.ts"
import { asArray, assertExist } from "./utils.ts"

export type DataIndex = Tagged<number, "data">
export type ArrayDataIndex = [DataIndex, number]
export type EitherDataIndex = DataIndex | [DataIndex, number]

/**
 * Raw class type data structure.
 * Represents a Java class, interface, enum, or annotation type.
 */
export interface RawClassTypeData {
	/** Class name (NameID) */
	[Property.CLASS_NAME]?: DataIndex
	/** Annotations (List<AnnotationID>) */
	[Property.ANNOTATIONS]?: DataIndex[]
	/** Modifiers (int) */
	[Property.MODIFIERS]?: Modifier.Value
	/** Type variables/parameters (List<TypeVariableID>) */
	[Property.TYPE_VARIABLES]?: EitherDataIndex[]
	/** Package name (PackageID) */
	[Property.PACKAGE_NAME]?: DataIndex
	/** Super class (TypeID) */
	[Property.SUPER_CLASS]?: DataIndex
	/** Interfaces (List<TypeID>) */
	[Property.INTERFACES]?: DataIndex[]
	/** Inner classes (List<TypeID>) */
	[Property.INNER_CLASSES]?: DataIndex[]
	/** Enclosing class (TypeID) */
	[Property.ENCLOSING_CLASS]?: DataIndex
	/** Declaring class (TypeID) */
	[Property.DECLARING_CLASS]?: DataIndex
	/** Fields (List<FieldID>) */
	[Property.FIELDS]?: DataIndex[]
	/** Constructors (List<ConstructorID>) */
	[Property.CONSTRUCTORS]?: DataIndex[]
	/** Methods (List<MethodID>) */
	[Property.METHODS]?: DataIndex[]
	/** Internal ID assigned during normalization */
	_id?: DataIndex
}

/**
 * Parameterized type data structure.
 * Represents a generic type with type arguments (e.g., List<String>).
 */
export interface ParameterizedTypeData {
	/** Raw type (TypeID) */
	[Property.RAW_PARAMETERIZED_TYPE]?: DataIndex
	/** Owner type (TypeID) */
	[Property.OWNER_TYPE]?: DataIndex
	/** Type variables/actual type arguments (List<TypeOrTypeVariableID>) */
	[Property.TYPE_VARIABLES]: EitherDataIndex[]
	/** Internal ID assigned during normalization */
	_id?: DataIndex
}

/**
 * Wildcard type data structure.
 * Represents a wildcard type (e.g., ? extends Number, ? super Integer).
 */
export interface WildcardTypeData {
	/** Lower bounds (List<TypeOrTypeVariableID>) */
	[Property.WILDCARD_LOWER_BOUNDS]?: EitherDataIndex[]
	/** Upper bounds (List<TypeOrTypeVariableID>) */
	[Property.WILDCARD_UPPER_BOUNDS]?: EitherDataIndex[]
	/** Internal ID assigned during normalization */
	_id?: DataIndex
}

/**
 * Type variable data structure.
 * Represents a generic type variable (e.g., T, E, K, V).
 */
export interface TypeVariableData {
	/** Type variable name (NameID) */
	[Property.TYPE_VARIABLE_NAME]: DataIndex
	/** Type variable bounds (List<TypeOrTypeVariableID>) */
	[Property.TYPE_VARIABLE_BOUNDS]?: EitherDataIndex[]
	/** Internal ID assigned during normalization */
	_id?: DataIndex
}

/**
 * Union type representing all possible type data structures.
 * Types are stored as JSON objects (not compressed strings like fields/methods).
 */
export type TypeData =
	| RawClassTypeData
	| ParameterizedTypeData
	| WildcardTypeData
	| TypeVariableData

export class DataStorage {
	annotations: string[] = []
	constructors: string[] = []
	fields: string[] = []
	methods: string[] = []
	packages: Array<[string] | [string, number]> = []
	parameters: string[] = []
	names: string[] = []
	types: TypeData[] = []

	constructor(data: Record<string, unknown>) {
		this.annotations = data.annotations as string[]
		this.constructors = data.constructors as string[]
		this.fields = data.fields as string[]
		this.methods = data.methods as string[]
		this.packages = data.packages as Array<[string] | [string, number]>
		this.parameters = data.parameters as string[]
		this.names = data.names as string[]
		this.types = data.types as TypeData[]
	}

	getAnnotation(id: DataIndex) {
		assertExist(id)
		return this.annotations[id]
	}

	getConstructor(id: DataIndex) {
		assertExist(id)
		return this.constructors[id]
	}

	getField(id: DataIndex) {
		assertExist(id)
		return this.fields[id]
	}

	getMethod(id: DataIndex) {
		assertExist(id)
		return this.methods[id]
	}

	getPackage(id: DataIndex) {
		assertExist(id)
		return this.packages[id]
	}

	getPackageName(id: DataIndex): string {
		assertExist(id)
		const data = asArray(this.packages[id])
		if (!data) return ""
		if (data?.length === 1) return data[0]
		return `${this.getPackageName(data[1] as DataIndex)}.${data[0]}`
	}

	getParameter(id: DataIndex) {
		assertExist(id)
		return this.parameters[id]
	}

	getName(id: DataIndex) {
		assertExist(id)
		return this.names[id]
	}

	getType(id: DataIndex): TypeData | undefined {
		assertExist(id)
		if (!(id in this.types)) return
		const type = this.types[id]
		if (!type) return
		// TODO: move _id assignment to normalization step
		if (type._id == null) type._id = id
		return type
	}
}
