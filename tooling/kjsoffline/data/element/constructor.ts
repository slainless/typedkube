import { Base, Property, type TypeVariableMap, Wrapped } from "../common"
import { AnnotationMixin, WrappedAnnotationMixin } from "../mixin/annotation"
import { DeclaringClassMixin, WrappedDeclaringClassMixin } from "../mixin/class"
import { IndexHolderMixin } from "../mixin/data"
import { FunctionMixin, WrappedFunctionMixin } from "../mixin/function"
import { ModifierMixin } from "../mixin/modifier"
import { BasicNameMixin } from "../mixin/name"
import {
	MappedTypeVariableMixin,
	TypeVariableMixin,
} from "../mixin/type-parameter"
import type { ElementIndex, Registry } from "../registry"
import type { DataIndex } from "../storage"

export class Constructor extends FunctionMixin(
	DeclaringClassMixin(
		AnnotationMixin(
			ModifierMixin(
				TypeVariableMixin(BasicNameMixin(IndexHolderMixin(Base<Method.Data>))),
			),
		),
	),
) {
	protected _constructorIndexInClass: number

	constructor(
		registry: Registry,
		protected id: ElementIndex,
		declaringClass: ElementIndex,
		constructorIndexInClass: number,
	) {
		super(registry)
		const index = this.registry.dataIndexOf(id)
		this.setIndex(index)
		this.setData(this.decode(index))
		this.setDeclaringClassIndex(declaringClass)
		this.setDeclaringFunctionIndex(id)
		this.setDeclaringFunctionType("constructor")
		this._constructorIndexInClass = constructorIndexInClass
	}

	protected rawDataParsingKeys(): readonly string[] {
		return [
			Property.MODIFIERS,
			Property.ANNOTATIONS,
			Property.EXCEPTIONS,
			Property.TYPE_VARIABLES,
			Property.PARAMETERS,
		]
	}

	protected getStorageRawData(id: DataIndex): string {
		return this.registry.storage.getConstructor(id)
	}

	asWrapped(typeVariableMap: TypeVariableMap) {
		return new WrappedConstructor(this.registry, this, typeVariableMap)
	}
}

export class WrappedConstructor extends WrappedFunctionMixin(
	WrappedDeclaringClassMixin(
		WrappedAnnotationMixin(MappedTypeVariableMixin(Wrapped<Constructor>)),
	),
) {
	asString() {
		throw new Error("TODO")
	}

	asKubeStaticCall() {
		throw new Error("TODO")
	}

	id() {
		throw new Error("TODO")
	}

	wrappedDeclaringConstructor() {
		throw new Error("TODO")
	}
}

export namespace Method {
	export interface Data
		extends ModifierMixin.Data,
			AnnotationMixin.Data,
			FunctionMixin.Data,
			TypeVariableMixin.Data {
		[Property.EXCEPTIONS]?: DataIndex[]
	}
}
