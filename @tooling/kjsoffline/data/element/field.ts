import { Base, Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { AnnotationMixin } from "../mixin/annotation.ts"
import { BasicNameMixin } from "../mixin/basic-name.ts"
import { IndexHolderMixin } from "../mixin/index-holder.ts"
import { ModifierMixin } from "../mixin/modifier.ts"
import type { ElementIndex, Registry } from "../registry.ts"
import type { DataIndex, EitherDataIndex } from "../storage.ts"
import { assertExist, encloseObjectField } from "../utils.ts"
import { WrappedAnnotationMixin } from "../wrapped-mixin/annotation.ts"
import { DeclaringClassMixin } from "../wrapped-mixin/declaring-class.ts"
import { MappedTypeMixin } from "../wrapped-mixin/mapped-type.ts"

export class Field extends AnnotationMixin(
	ModifierMixin(BasicNameMixin(IndexHolderMixin(Base<Field.Data>))),
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
			Property.FIELD_NAME,
			Property.FIELD_TYPE,
			Property.MODIFIERS,
			Property.ANNOTATIONS,
		] as const
	}

	protected override getStorageRawData(id: DataIndex) {
		return this.registry.storage.getField(id)
	}

	asWrapped(
		typeVariableMap: TypeVariableMap,
		declaringClass: ElementIndex,
		fieldIndexInClass: number,
	) {
		return new WrappedField(
			this.registry,
			this,
			typeVariableMap,
			declaringClass,
			fieldIndexInClass,
		)
	}
}

export class WrappedField extends DeclaringClassMixin(
	WrappedAnnotationMixin(MappedTypeMixin(Wrapped<Field>)),
) {
	protected _fieldIndexInClass: number

	constructor(
		registry: Registry,
		classInstance: Field,
		typeVariableMap: TypeVariableMap,
		declaringClass: ElementIndex,
		fieldIndexInClass: number,
	) {
		super(registry, classInstance, typeVariableMap)
		assertExist(declaringClass)
		assertExist(fieldIndexInClass)

		this.setDeclaringClassIndex(declaringClass)
		this._fieldIndexInClass = fieldIndexInClass
	}

	fieldIndexInClass() {
		return this._fieldIndexInClass
	}

	typescriptField() {
		const modifiersComment = this.wrapped().typescriptModifiersComment()
		const name = encloseObjectField(this.wrapped().name())
		const type = this.mappedType().typescriptReferenceName()
		return `${modifiersComment}\n${name}: ${type}`
	}
}

export namespace Field {
	export interface Data extends ModifierMixin.Data, AnnotationMixin.Data {
		[Property.FIELD_NAME]?: DataIndex
		[Property.FIELD_TYPE]?: EitherDataIndex
	}
}
