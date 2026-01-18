import { toCamelCase } from "remeda"
import { Base, Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { AnnotationMixin } from "../mixin/annotation.ts"
import { BasicNameMixin } from "../mixin/basic-name.ts"
import { IndexHolderMixin } from "../mixin/index-holder.ts"
import { ModifierMixin } from "../mixin/modifier.ts"
import type { ElementIndex, Registry } from "../registry.ts"
import type { DataIndex, EitherDataIndex } from "../storage.ts"
import { assertExist, mapReservedKeyword, satinizeName } from "../utils.ts"
import { DeclaringClassMixin } from "../wrapped-mixin/declaring-class.ts"
import { MappedTypeMixin } from "../wrapped-mixin/mapped-type.ts"
import { Constructor } from "./constructor.ts"
import { Method } from "./method.ts"

export class Parameter extends BasicNameMixin(
	AnnotationMixin(ModifierMixin(IndexHolderMixin(Base<Parameter.Data>))),
) {
	constructor(
		registry: Registry,
		protected id: ElementIndex,
	) {
		super(registry)

		const index = this.registry.dataIndexOf(id)
		this.setIndex(index)
		this.setData(this.decode(index))
	}

	protected override rawDataParsingKeys() {
		return [
			Property.PARAMETER_NAME,
			Property.PARAMETER_TYPE,
			Property.MODIFIERS,
			Property.ANNOTATIONS,
		] as const
	}

	protected override getStorageRawData(id: DataIndex) {
		return this.registry.storage.getParameter(id)
	}

	asWrapped(
		typeVariableMap: TypeVariableMap,
		declaringClass: ElementIndex,
		declaringFunction: ElementIndex,
		declaringFunctionType: "method" | "constructor",
		parameterIndexInFunction: number,
	) {
		return new WrappedParameter(
			this.registry,
			this,
			typeVariableMap,
			declaringClass,
			declaringFunction,
			declaringFunctionType,
			parameterIndexInFunction,
		)
	}
}

export class WrappedParameter extends DeclaringClassMixin(
	MappedTypeMixin(Wrapped<Parameter>),
) {
	protected _declaringFunctionType: "method" | "constructor"
	protected _declaringFunctionIndex: ElementIndex
	protected _parameterIndexInFunction: number

	constructor(
		registry: Registry,
		classInstance: Parameter,
		typeVariableMap: TypeVariableMap,
		declaringClass: ElementIndex,
		declaringFunction: ElementIndex,
		declaringFunctionType: WrappedParameter["_declaringFunctionType"],
		parameterIndexInFunction: number,
	) {
		super(registry, classInstance, typeVariableMap)
		assertExist(declaringClass)
		assertExist(declaringFunction)
		assertExist(parameterIndexInFunction)
		this.setDeclaringClassIndex(declaringClass)
		this._declaringFunctionType = declaringFunctionType
		this._declaringFunctionIndex = declaringFunction
		this._parameterIndexInFunction = parameterIndexInFunction
	}

	declaringFunction() {
		/**
		 * declaring class should be optional here since declaring function should constructed first
		 * before parameters...
		 */
		if (this._declaringFunctionType === "method") {
			return this.registry.get(Method, this._declaringFunctionIndex)
		} else {
			return this.registry.get(Constructor, this._declaringFunctionIndex)
		}
	}

	declaringFunctionType() {
		return this._declaringFunctionType
	}

	declaringFunctionIndex() {
		return this._declaringFunctionIndex
	}

	parameterIndexInFunction() {
		return this._parameterIndexInFunction
	}

	typescriptParameter() {
		const name = mapReservedKeyword(
			satinizeName(toCamelCase(this.wrapped().name())),
		)
		const type = this.mappedType().typescriptReferenceName()
		return `${name}: ${type}`
	}
}

export namespace Parameter {
	export interface Data extends ModifierMixin.Data, AnnotationMixin.Data {
		[Property.PARAMETER_NAME]?: DataIndex
		[Property.PARAMETER_TYPE]?: EitherDataIndex
	}
}
