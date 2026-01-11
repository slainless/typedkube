import { Base, Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { AnnotationMixin } from "../mixin/annotation.ts"
import { BasicNameMixin } from "../mixin/basic-name.ts"
import { DeclaringClassMixin } from "../mixin/declaring-class.ts"
import { IndexHolderMixin } from "../mixin/index-holder.ts"
import { ModifierMixin } from "../mixin/modifier.ts"
import type { ElementIndex, Registry } from "../registry.ts"
import type { DataIndex } from "../storage.ts"
import { assertExist } from "../utils.ts"
import { WrappedAnnotationMixin } from "../wrapped-mixin/annotation.ts"
import { WrappedDeclaringClassMixin } from "../wrapped-mixin/declaring-class.ts"
import { MappedTypeMixin } from "../wrapped-mixin/mapped-type.ts"

export class Field extends DeclaringClassMixin(
	AnnotationMixin(
		ModifierMixin(BasicNameMixin(IndexHolderMixin(Base<Field.Data>))),
	),
) {
	_fieldIndexInClass: number

	constructor(
		registry: Registry,
		protected id: ElementIndex,
		declaringClass: ElementIndex,
		fieldIndexInClass: number,
	) {
		super(registry)
		assertExist(declaringClass)
		assertExist(fieldIndexInClass)

		const index = this.registry.dataIndexOf(id)
		this.setIndex(index)
		this.setData(this.decode(index))
		this.setDeclaringClassIndex(declaringClass)
		this._fieldIndexInClass = fieldIndexInClass
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

	fieldIndexInClass() {
		return this._fieldIndexInClass
	}

	asWrapped(typeVariableMap: TypeVariableMap) {
		return new WrappedField(this.registry, this, typeVariableMap)
	}

	asString() {
		throw new Error("TODO")
	}
}

export class WrappedField extends WrappedDeclaringClassMixin(
	WrappedAnnotationMixin(MappedTypeMixin(Wrapped<Field>)),
) {
	asString() {
		throw new Error("TODO")
	}

	asKubeStaticReference() {
		throw new Error("TODO")
	}

	id() {
		throw new Error("TODO")
	}
}

export namespace Field {
	export interface Data extends ModifierMixin.Data, AnnotationMixin.Data {
		[Property.FIELD_NAME]?: DataIndex
		[Property.FIELD_TYPE]?: DataIndex
	}
}
