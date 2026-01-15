import { Base, Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { AnnotationMixin } from "../mixin/annotation.ts"
import { BasicNameMixin } from "../mixin/basic-name.ts"
import { DeclaringClassMixin } from "../mixin/declaring-class.ts"
import { FunctionMixin, WrappedFunctionMixin } from "../mixin/function.ts"
import { IndexHolderMixin } from "../mixin/index-holder.ts"
import { ModifierMixin } from "../mixin/modifier.ts"
import { TypeVariableMixin } from "../mixin/type-variable.ts"
import type { ElementIndex, Registry } from "../registry.ts"
import type { DataIndex, EitherDataIndex } from "../storage.ts"
import { assertExist } from "../utils.ts"
import { WrappedAnnotationMixin } from "../wrapped-mixin/annotation.ts"
import { WrappedDeclaringClassMixin } from "../wrapped-mixin/declaring-class.ts"
import { MappedTypeMixin } from "../wrapped-mixin/mapped-type.ts"
import { MappedTypeVariableMixin } from "../wrapped-mixin/mapped-type-variable.ts"

export class Method extends FunctionMixin(
	DeclaringClassMixin(
		AnnotationMixin(
			ModifierMixin(
				TypeVariableMixin(BasicNameMixin(IndexHolderMixin(Base<Method.Data>))),
			),
		),
	),
) {
	protected _methodIndexInClass: number

	constructor(
		registry: Registry,
		protected id: ElementIndex,
		declaringClass: ElementIndex,
		methodIndexInClass: number,
	) {
		super(registry)
		assertExist(declaringClass)
		assertExist(methodIndexInClass)

		const index = this.registry.dataIndexOf(id)
		this.setIndex(index)
		this.setData(this.decode(index))
		this.setDeclaringClassIndex(declaringClass)
		this.setDeclaringFunctionIndex(id)
		this.setDeclaringFunctionType("method")
		this._methodIndexInClass = methodIndexInClass
	}

	protected override rawDataParsingKeys(): readonly string[] {
		return [
			Property.METHOD_NAME,
			Property.MODIFIERS,
			Property.METHOD_RETURN_TYPE,
			Property.ANNOTATIONS,
			Property.PARAMETERS,
			Property.TYPE_VARIABLES,
			Property.EXCEPTIONS,
		]
	}

	protected override getStorageRawData(id: DataIndex) {
		return this.registry.storage.getMethod(id)
	}

	asWrapped(typeVariableMap: TypeVariableMap) {
		return new WrappedMethod(this.registry, this, typeVariableMap)
	}
}

export class WrappedMethod extends WrappedFunctionMixin(
	WrappedDeclaringClassMixin(
		WrappedAnnotationMixin(
			MappedTypeVariableMixin(MappedTypeMixin(Wrapped<Method>)),
		),
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

	equals(other: WrappedMethod) {
		throw new Error("TODO")
	}

	moreSpecificThan(other: WrappedMethod) {
		throw new Error("TODO")
	}

	wrappedDeclaringMethod() {
		throw new Error("TODO")
	}
}

export namespace Method {
	export interface Data
		extends ModifierMixin.Data,
			AnnotationMixin.Data,
			FunctionMixin.Data,
			TypeVariableMixin.Data {
		[Property.METHOD_NAME]?: DataIndex
		[Property.METHOD_RETURN_TYPE]?: EitherDataIndex
		[Property.EXCEPTIONS]?: DataIndex[]
	}
}
