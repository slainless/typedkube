import { Base, Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { AnnotationMixin } from "../mixin/annotation.ts"
import { BasicNameMixin } from "../mixin/basic-name.ts"
import { DeclaringClassMixin } from "../mixin/declaring-class.ts"
import { IndexHolderMixin } from "../mixin/index-holder.ts"
import { ModifierMixin } from "../mixin/modifier.ts"
import type { ElementIndex, Registry } from "../registry.ts"
import type { DataIndex, DataIndexWithDepth } from "../storage.ts"
import { assertExist } from "../utils.ts"
import { WrappedDeclaringClassMixin } from "../wrapped-mixin/declaring-class.ts"
import { MappedTypeMixin } from "../wrapped-mixin/mapped-type.ts"
import { Constructor } from "./constructor.ts"
import { Method } from "./method.ts"

export class Parameter extends DeclaringClassMixin(
	BasicNameMixin(
		AnnotationMixin(ModifierMixin(IndexHolderMixin(Base<Parameter.Data>))),
	),
) {
	protected _declaringFunctionType: "method" | "constructor"
	protected _declaringFunctionIndex: ElementIndex
	protected _parameterIndexInFunction: number

	constructor(
		registry: Registry,
		protected id: ElementIndex,
		declaringClass: ElementIndex,
		declaringFunction: ElementIndex,
		declaringFunctionType: Parameter["_declaringFunctionType"],
		parameterIndexInFunction: number,
	) {
		super(registry)
		assertExist(declaringClass)
		assertExist(declaringFunction)
		assertExist(parameterIndexInFunction)

		const index = this.registry.dataIndexOf(id)
		this.setIndex(index)
		this.setData(this.decode(index))
		this.setDeclaringClassIndex(declaringClass)
		this._declaringFunctionType = declaringFunctionType
		this._declaringFunctionIndex = declaringFunction
		this._parameterIndexInFunction = parameterIndexInFunction
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

	asWrapped(typeVariableMap: TypeVariableMap) {
		return new WrappedParameter(this.registry, this, typeVariableMap)
	}

	asString() {
		throw new Error("TODO")
	}
}

export class WrappedParameter extends WrappedDeclaringClassMixin(
	MappedTypeMixin(Wrapped<Parameter>),
) {
	asString() {
		throw new Error("TODO")
	}

	id() {
		throw new Error("TODO")
	}

	wrappedDeclaringFunction() {
		throw new Error("TODO")
		// return this.wrapped().declaringFunction().asWrapped(this.typeVariableMap())
	}
}

export namespace Parameter {
	export interface Data extends ModifierMixin.Data, AnnotationMixin.Data {
		[Property.PARAMETER_NAME]?: DataIndex
		[Property.PARAMETER_TYPE]?: DataIndexWithDepth
	}
}
