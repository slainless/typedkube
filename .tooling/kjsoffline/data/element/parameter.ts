import { Base, Property, type TypeVariableMap, Wrapped } from "../common"
import { AnnotationMixin } from "../mixin/annotation"
import { DeclaringClassMixin, WrappedDeclaringClassMixin } from "../mixin/class"
import { IndexHolderMixin } from "../mixin/data"
import { ModifierMixin } from "../mixin/modifier"
import { BasicNameMixin } from "../mixin/name"
import { MappedTypeMixin } from "../mixin/type"
import type { ElementIndex, Registry } from "../registry"
import type { DataIndex } from "../storage"

export class Parameter extends DeclaringClassMixin(
	BasicNameMixin(
		AnnotationMixin(ModifierMixin(IndexHolderMixin(Base<Parameter.Data>))),
	),
) {
	protected _functionType: "method" | "constructor"
	protected _declaringFunction: ElementIndex
	protected _parameterIndexInFunction: number

	constructor(
		registry: Registry,
		protected id: ElementIndex,
		declaringClass: ElementIndex,
		declaringFunction: ElementIndex,
		declaringFunctionType: Parameter["_functionType"],
		parameterIndexInFunction: number,
	) {
		super(registry)
		const index = this.registry.dataIndexOf(id)
		this.setIndex(index)
		this.setData(this.decode(index))
		this.setDeclaringClassIndex(declaringClass)
		this._functionType = declaringFunctionType
		this._declaringFunction = declaringFunction
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
		// TODO: implement this
		// if (this._functionType === 'method') {
		//     return this.registry.get(Method, this._declaringFunction)
		// } else {
		//     return this.registry.get(Constructor, this._declaringFunction)
		// }
	}

	declaringFunctionType() {
		return this._functionType
	}

	declaringFunctionIndex() {
		return this._declaringFunction
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
		[Property.PARAMETER_TYPE]?: DataIndex
	}
}
