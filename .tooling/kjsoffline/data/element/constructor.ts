import { Base, Property, type TypeVariableMap, Wrapped } from "../common"
import { AnnotationMixin } from "../mixin/annotation"
import { BasicNameMixin } from "../mixin/basic-name"
import { DeclaringClassMixin } from "../mixin/declaring-class"
import { FunctionMixin, WrappedFunctionMixin } from "../mixin/function"
import { IndexHolderMixin } from "../mixin/index-holder"
import { ModifierMixin } from "../mixin/modifier"
import { TypeVariableMixin } from "../mixin/type-variable"
import type { ElementIndex, Registry } from "../registry"
import type { DataIndex } from "../storage"
import { assertExist } from "../utils"
import { WrappedAnnotationMixin } from "../wrapped-mixin/annotation"
import { WrappedDeclaringClassMixin } from "../wrapped-mixin/declaring-class"
import { MappedTypeVariableMixin } from "../wrapped-mixin/type-variable"

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
		assertExist(declaringClass)
		assertExist(constructorIndexInClass)

		const index = this.registry.dataIndexOf(id)
		this.setIndex(index)
		this.setData(this.decode(index))
		this.setDeclaringClassIndex(declaringClass)
		this.setDeclaringFunctionIndex(id)
		this.setDeclaringFunctionType("constructor")
		this._constructorIndexInClass = constructorIndexInClass
	}

	protected override rawDataParsingKeys(): readonly string[] {
		return [
			Property.MODIFIERS,
			Property.ANNOTATIONS,
			Property.EXCEPTIONS,
			Property.TYPE_VARIABLES,
			Property.PARAMETERS,
		]
	}

	protected override getStorageRawData(id: DataIndex) {
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
