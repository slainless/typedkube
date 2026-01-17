import { Base, Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { AnnotationMixin } from "../mixin/annotation.ts"
import { BasicNameMixin } from "../mixin/basic-name.ts"
import { DeclaringClassMixin } from "../mixin/declaring-class.ts"
import { FunctionMixin } from "../mixin/function.ts"
import { IndexHolderMixin } from "../mixin/index-holder.ts"
import { ModifierMixin } from "../mixin/modifier.ts"
import { TypeVariableMixin } from "../mixin/type-variable.ts"
import type { ElementIndex, Registry } from "../registry.ts"
import type { DataIndex } from "../storage.ts"
import { assertExist, renderClassDebug } from "../utils.ts"
import { WrappedAnnotationMixin } from "../wrapped-mixin/annotation.ts"
import { WrappedDeclaringClassMixin } from "../wrapped-mixin/declaring-class.ts"
import { WrappedFunctionMixin } from "../wrapped-mixin/function.ts"
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

	constructorIndexInClass() {
		return this._constructorIndexInClass
	}

	asWrapped(typeVariableMap: TypeVariableMap) {
		return new WrappedConstructor(this.registry, this, typeVariableMap)
	}

	asString() {
		throw new Error("TODO")
	}
}

export class WrappedConstructor extends WrappedFunctionMixin(
	WrappedDeclaringClassMixin(
		WrappedAnnotationMixin(MappedTypeVariableMixin(Wrapped<Constructor>)),
	),
) {
	wrappedDeclaringConstructor() {
		const ctorIndex = this.wrapped().constructorIndexInClass()
		if (ctorIndex === -1) return null

		const declaringClass = this.wrappedDeclaringClass()
		const ctor = declaringClass.wrapped().constructors()[ctorIndex]
		if (ctor == null)
			throw ReferenceError(
				`Constructor not found at index ${ctorIndex} in ${renderClassDebug(declaringClass)}`,
			)

		return ctor.asWrapped(this.typeVariableMap())
	}

	typescriptConstructor() {
		const modifiersComment = this.wrapped().typescriptModifiersComment()
		const generics = this.typescriptGenerics()
		const parameters = this.typescriptParameters()
		const returnType = this.wrappedDeclaringClass().typescriptReferenceName()
		return `${modifiersComment}\nnew${generics}(${parameters}): ${returnType}`
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
