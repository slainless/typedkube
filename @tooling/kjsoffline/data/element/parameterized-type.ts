import { Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { ClassTypeMixin } from "../mixin/class-type.ts"
import { TypeVariableMixin } from "../mixin/type-variable.ts"
import type { TypescriptNameOptions } from "../name.ts"
import type { ElementIndex } from "../registry.ts"
import type { ParameterizedTypeData } from "../storage.ts"
import { exist } from "../utils.ts"
import { WrappedClassMixin } from "../wrapped-mixin/class-type.ts"
import { MappedTypeVariableMixin } from "../wrapped-mixin/mapped-type-variable.ts"
import { Class } from "./class.ts"
import { RawClass } from "./raw-class.ts"

/**
 * Instantiation of {@link RawClass} with concrete type arguments.
 * The type arguments are concrete so it should not be affected by any type variable mappings.
 */
export class ParameterizedType extends ClassTypeMixin(
	TypeVariableMixin(Class<ParameterizedTypeData>),
) {
	static override dataDiscriminator(): string {
		return Property.RAW_PARAMETERIZED_TYPE
	}

	rawTypeIndex() {
		return this.data()[Property.RAW_PARAMETERIZED_TYPE] as number as
			| ElementIndex
			| undefined
	}

	ownerTypeIndex() {
		return this.data()[Property.OWNER_TYPE] as number as
			| ElementIndex
			| undefined
	}

	rawType() {
		const index = exist(this.rawTypeIndex())
		const rawType = this.registry.get(Class, index)
		if (!(rawType instanceof RawClass))
			throw new Error("Raw type is not a RawClass")
		return rawType
	}

	ownerType() {
		const index = this.ownerTypeIndex()
		if (index == null) return undefined

		const ownerType = this.registry.get(Class, index)
		if (
			!(ownerType instanceof RawClass || ownerType instanceof ParameterizedType)
		)
			throw new Error("Owner type is not a RawClass or ParameterizedType")

		return ownerType
	}

	asWrapped(arrayDepth = 0, typeVariableMap: TypeVariableMap = {}) {
		return new WrappedParameterizedType(
			this.registry,
			this,
			typeVariableMap,
		).setArrayDepth(arrayDepth)
	}
}

export class WrappedParameterizedType extends WrappedClassMixin(
	MappedTypeVariableMixin(Wrapped<ParameterizedType>),
) {
	wrappedRawType() {
		return this.wrapped().rawType().asWrapped(0, this.typeVariableMap())
	}

	override typescriptReferenceName(options?: TypescriptNameOptions) {
		const {
			prependPackageName = true,
			appendGenerics = true,
			nameSuffix = "",
			rootPackage,
		} = options ?? {}

		const rawType = this.wrappedRawType()
		const packageName = prependPackageName
			? rawType.typescriptPackageName(rootPackage)
			: ""
		const enclosingClass = rawType.typescriptEnclosingClassName()
		const name = rawType.typescriptSimpleName()
		const generics = appendGenerics ? this.typescriptGenerics() : ""
		return `${packageName ? `${packageName}.` : ""}${enclosingClass}${name}${nameSuffix}${generics}`
	}
}
