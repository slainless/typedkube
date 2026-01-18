import { isStatic } from "@tooling/kjsoffline/typegen/utils.ts"
import { Base, Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { AnnotationMixin } from "../mixin/annotation.ts"
import { BasicNameMixin } from "../mixin/basic-name.ts"
import { IndexHolderMixin } from "../mixin/index-holder.ts"
import { ModifierMixin } from "../mixin/modifier.ts"
import { ParameterMixin } from "../mixin/parameter.ts"
import { TypeVariableMixin } from "../mixin/type-variable.ts"
import type { ElementIndex, Registry } from "../registry.ts"
import type { DataIndex } from "../storage.ts"
import { assertExist } from "../utils.ts"
import { WrappedAnnotationMixin } from "../wrapped-mixin/annotation.ts"
import { DeclaringClassMixin } from "../wrapped-mixin/declaring-class.ts"
import { FunctionMixin } from "../wrapped-mixin/function.ts"
import { MappedTypeVariableMixin } from "../wrapped-mixin/mapped-type-variable.ts"

export class Constructor extends ParameterMixin(
	AnnotationMixin(
		ModifierMixin(
			TypeVariableMixin(BasicNameMixin(IndexHolderMixin(Base<Method.Data>))),
		),
	),
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

	asWrapped(
		typeVariableMap: TypeVariableMap,
		declaringClass: ElementIndex,
		constructorIndexInClass: number,
	) {
		return new WrappedConstructor(
			this.registry,
			this,
			typeVariableMap,
			declaringClass,
			constructorIndexInClass,
		)
	}

	asString() {
		throw new Error("TODO")
	}
}

export class WrappedConstructor extends FunctionMixin(
	DeclaringClassMixin(
		WrappedAnnotationMixin(MappedTypeVariableMixin(Wrapped<Constructor>)),
	),
) {
	protected _constructorIndexInClass: number

	constructor(
		registry: Registry,
		classInstance: Constructor,
		typeVariableMap: TypeVariableMap,
		declaringClass: ElementIndex,
		constructorIndexInClass: number,
	) {
		super(registry, classInstance, typeVariableMap)
		assertExist(declaringClass)
		assertExist(constructorIndexInClass)

		this.setDeclaringClassIndex(declaringClass)
		this.setDeclaringFunctionIndex(
			this.registry.elementIndexOf(classInstance.index()),
		)
		this.setDeclaringFunctionType("constructor")
		this._constructorIndexInClass = constructorIndexInClass
	}

	constructorIndexInClass() {
		return this._constructorIndexInClass
	}

	typescriptConstructor() {
		const declaringClass = this.wrappedDeclaringClass()
		const useStatic = isStatic(declaringClass.wrapped().modifiersValue())

		const modifiersComment = this.wrapped().typescriptModifiersComment()

		let generics = this.typescriptGenerics(true, useStatic)
		if (!useStatic)
			generics = [declaringClass.typescriptGenerics(false, false), generics]
				.filter(Boolean)
				.join(",")
		generics = generics ? `<${generics}>` : ""

		const parameters = this.typescriptParameters()
		const returnType = this.wrappedDeclaringClass().typescriptReferenceName()
		return `${modifiersComment}\nnew${generics}(${parameters}): ${returnType}`
	}
}

export namespace Method {
	export interface Data
		extends ModifierMixin.Data,
			AnnotationMixin.Data,
			ParameterMixin.Data,
			TypeVariableMixin.Data {
		[Property.EXCEPTIONS]?: DataIndex[]
	}
}
