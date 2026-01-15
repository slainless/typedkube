import { Base, Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { AnnotationMixin } from "../mixin/annotation.ts"
import { BasicNameMixin } from "../mixin/basic-name.ts"
import { DeclaringClassMixin } from "../mixin/declaring-class.ts"
import { FunctionMixin, WrappedFunctionMixin } from "../mixin/function.ts"
import { IndexHolderMixin } from "../mixin/index-holder.ts"
import { ModifierMixin } from "../mixin/modifier.ts"
import { TypeVariableMixin } from "../mixin/type-variable.ts"
import type { ElementIndex, Registry } from "../registry.ts"
import type { DataIndex } from "../storage.ts"
import { assertExist } from "../utils.ts"
import { WrappedAnnotationMixin } from "../wrapped-mixin/annotation.ts"
import { WrappedDeclaringClassMixin } from "../wrapped-mixin/declaring-class.ts"
import { MappedTypeVariableMixin } from "../wrapped-mixin/mapped-type-variable.ts"

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
