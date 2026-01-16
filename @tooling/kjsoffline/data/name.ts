import { Property, type TypeVariableMap } from "./common"
import { Class } from "./element/class"
import { ParameterizedType } from "./element/parameterized-type"
import { RawClass } from "./element/raw-class"
import { TypeVariable } from "./element/type-variable"
import { WildcardType } from "./element/wildcard-type"
import type { Registry } from "./registry"
import type { DataIndex } from "./storage"
import { dataIndex } from "./utils"

export class NameRenderer {
	constructor(protected readonly registry: Registry) {}

	genericDefinition(
		type: Class<any>,
		typeVariableMap: TypeVariableMap,
		includeGenerics = true,
		options?: Partial<NameRenderer.Options>,
	) {
		return this.render(type, {
			typeVariableMap,
			isDefiningTypeVariable: false,
			appendPackageName: true,
			includeGenerics,
			...options,
		})
	}

	genericDefinitionWithoutPackage(
		type: Class<any>,
		typeVariableMap: TypeVariableMap,
		includeGenerics = true,
		options?: Partial<NameRenderer.Options>,
	) {
		return this.render(type, {
			typeVariableMap,
			isDefiningTypeVariable: false,
			appendPackageName: false,
			includeGenerics,
			...options,
		})
	}

	genericName(
		type: Class<any>,
		typeVariableMap: TypeVariableMap,
		includeGenerics = true,
		options?: Partial<NameRenderer.Options>,
	) {
		return this.render(type, {
			typeVariableMap,
			isDefiningTypeVariable: false,
			appendPackageName: false,
			includeGenerics,
			...options,
		})
	}

	protected render(type: Class<any>, config: NameRenderer.Options): string {
		if (type instanceof RawClass)
			if (type.declaringClassIndex())
				return (
					this.render(type.declaringClass()!, config) +
					"$" +
					this.rawClassName(type, { ...config, appendPackageName: false })
				)
			else return this.rawClassName(type, config)
		if (type instanceof TypeVariable) return this.typeVariableName(type, config)
		if (type instanceof WildcardType) return this.wildcardName(type, config)
		if (type instanceof ParameterizedType)
			return this.parameterizedName(type, config)
		throw new TypeError(`Unknown type: ${type.constructor.name}`)
	}

	protected rawClassName(type: RawClass, config: NameRenderer.Options) {
		const name = type.simpleName()
		if (config.appendPackageName && type.packageIndex() != null)
			return `${type.packageName()}.${name}${config.nameSuffix ?? ""}`
		return name + (config.nameSuffix ?? "")
	}

	protected typeVariableName(type: TypeVariable, config: NameRenderer.Options) {
		const name = type.simpleName()
		if (config.typeVariablesBeingDefined?.has(type.index())) return name

		const newTypeIndex = config.typeVariableMap?.[type.index()]
		if (newTypeIndex != null) {
			const newType = this.registry.get(
				Class,
				this.registry.elementIndexOf(dataIndex(newTypeIndex)),
			)
			if (newType.index() === type.index())
				return this.render(newType, {
					...config,
					isDefiningTypeVariable: true,
					typeVariablesBeingDefined: new Set([
						...(config.typeVariablesBeingDefined ?? []),
						type.index(),
					]),
				})
		}

		const bounds = type
			.typeVariableBoundsIndex()
			.map((bound) => this.registry.get(Class, bound))
		if (bounds.length <= 0) return name

		return (
			name +
			" extends " +
			bounds
				.map((bound) =>
					this.render(bound, {
						...config,
						isDefiningTypeVariable: true,
						typeVariablesBeingDefined: new Set([
							...(config.typeVariablesBeingDefined ?? []),
							type.index(),
						]),
					}),
				)
				.join(" & ")
		)
	}

	protected wildcardName(type: WildcardType, config: NameRenderer.Options) {
		const name = "?"
		const lowerBound = type
			.lowerBoundsIndex()
			.map((bound) => this.registry.get(Class, bound))
		if (lowerBound.length > 0) {
			return (
				name +
				" super " +
				lowerBound.map((bound) => this.render(bound, config)).join(" & ")
			)
		}

		const upperBound = type
			.upperBoundsIndex()
			.map((bound) => this.registry.get(Class, bound))
		if (upperBound.length > 0) {
			return (
				name +
				" extends " +
				upperBound.map((bound) => this.render(bound, config)).join(" & ")
			)
		}

		return name
	}

	protected parameterizedName(
		type: ParameterizedType,
		config: NameRenderer.Options,
	) {
		const rawTypeName = this.render(type.rawType(), {
			...config,
			appendPackageName: config.appendPackageName && type.ownerType() == null,
			disableEnclosingName: true,
		})
		const ownerType = type.ownerType()
		const ownerPrefix =
			ownerType != null && !config.isDefiningParameterizedType
				? this.render(ownerType, { ...config, disableEnclosingName: true }) +
					"$"
				: ""
		const actualTypes = type
			.typeVariablesIndex()
			?.map((type) =>
				this.registry.get(Class, this.registry.elementIndexOf(dataIndex(type))),
			)
		const genericArguments = this.generics(actualTypes, {
			...config,
			disableEnclosingName: true,
		})
		return ownerPrefix + rawTypeName + genericArguments
	}

	protected generics(types: Class<any>[], config: NameRenderer.Options) {
		if (types.length <= 0 || !config.includeGenerics) return ""

		return (
			"<" +
			types
				.map((type) =>
					this.render(type, {
						...config,
						isDefiningTypeVariable: true,
						typeVariablesBeingDefined: new Set([
							...(config.typeVariablesBeingDefined ?? []),
							type.index(),
						]),
					}),
				)
				.join(", ") +
			">"
		)
	}
}
// cachedGenericDefinition = getGenericDefinitionLogic
export namespace NameRenderer {
	export interface Options {
		typeVariableMap?: TypeVariableMap
		isDefiningTypeVariable?: boolean
		typeVariablesBeingDefined?: Set<DataIndex>
		appendPackageName?: boolean
		includeGenerics?: boolean
		disableEnclosingName?: boolean
		isDefiningParameterizedType?: boolean
		nameSuffix?: string
	}
}
