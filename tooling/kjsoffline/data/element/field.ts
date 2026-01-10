import { Base, Property, type TypeVariableMap, Wrapped } from "../common"
import { AnnotationMixin, WrappedAnnotationMixin } from "../mixin/annotation"
import { DeclaringClassMixin, WrappedDeclaringClassMixin } from "../mixin/class"
import { IndexHolderMixin } from "../mixin/data"
import { ModifierMixin } from "../mixin/modifier"
import { BasicNameMixin } from "../mixin/name"
import { MappedTypeMixin } from "../mixin/type"
import type { ElementIndex, Registry } from "../registry"
import type { DataIndex } from "../storage"

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
		const index = this.registry.dataIndexOf(id)
		this.setIndex(index)
		this.setData(this.decode(index))
		this.setDeclaringClassIndex(declaringClass)
		this._fieldIndexInClass = fieldIndexInClass
	}

	protected rawDataParsingKeys() {
		return [
			Property.FIELD_NAME,
			Property.FIELD_TYPE,
			Property.MODIFIERS,
			Property.ANNOTATIONS,
		] as const
	}

	protected getStorageRawData(id: DataIndex): string {
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
