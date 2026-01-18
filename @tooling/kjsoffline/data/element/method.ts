import { Base, Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { AnnotationMixin } from "../mixin/annotation.ts"
import { BasicNameMixin } from "../mixin/basic-name.ts"
import { IndexHolderMixin } from "../mixin/index-holder.ts"
import { ModifierMixin } from "../mixin/modifier.ts"
import { ParameterMixin } from "../mixin/parameter.ts"
import { TypeVariableMixin } from "../mixin/type-variable.ts"
import type { ElementIndex, Registry } from "../registry.ts"
import type { DataIndex, EitherDataIndex } from "../storage.ts"
import { assertExist, encloseObjectField } from "../utils.ts"
import { WrappedAnnotationMixin } from "../wrapped-mixin/annotation.ts"
import { DeclaringClassMixin } from "../wrapped-mixin/declaring-class.ts"
import { FunctionMixin } from "../wrapped-mixin/function.ts"
import { MappedTypeMixin } from "../wrapped-mixin/mapped-type.ts"
import { MappedTypeVariableMixin } from "../wrapped-mixin/mapped-type-variable.ts"

export class Method extends ParameterMixin(
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

	asWrapped(
		typeVariableMap: TypeVariableMap,
		declaringClass: ElementIndex,
		methodIndexInClass: number,
	) {
		return new WrappedMethod(
			this.registry,
			this,
			typeVariableMap,
			declaringClass,
			methodIndexInClass,
		)
	}
}

export class WrappedMethod extends FunctionMixin(
	DeclaringClassMixin(
		WrappedAnnotationMixin(
			MappedTypeVariableMixin(MappedTypeMixin(Wrapped<Method>)),
		),
	),
) {
	protected _methodIndexInClass: number

	constructor(
		registry: Registry,
		classInstance: Method,
		typeVariableMap: TypeVariableMap,
		declaringClass: ElementIndex,
		methodIndexInClass: number,
	) {
		super(registry, classInstance, typeVariableMap)
		assertExist(declaringClass)
		assertExist(methodIndexInClass)

		this.setDeclaringClassIndex(declaringClass)
		this.setDeclaringFunctionIndex(
			this.registry.elementIndexOf(classInstance.index()),
		)
		this.setDeclaringFunctionType("method")
		this._methodIndexInClass = methodIndexInClass
	}

	typescriptMethod() {
		const modifiersComment = this.wrapped().typescriptModifiersComment()
		const name = encloseObjectField(this.wrapped().name())
		const generics = this.typescriptGenerics()
		const parameters = this.typescriptParameters()
		const returnType = this.mappedType().typescriptReferenceName()
		return `${modifiersComment}\n${name}${generics}(${parameters}): ${returnType}`
	}
}

export namespace Method {
	export interface Data
		extends ModifierMixin.Data,
			AnnotationMixin.Data,
			ParameterMixin.Data,
			TypeVariableMixin.Data {
		[Property.METHOD_NAME]?: DataIndex
		[Property.METHOD_RETURN_TYPE]?: EitherDataIndex
		[Property.EXCEPTIONS]?: DataIndex[]
	}
}
