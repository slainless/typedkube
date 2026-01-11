import { Base, Property, type TypeVariableMap, Wrapped } from "../common"
import { IndexHolderMixin } from "../mixin/index-holder"
import type { ElementIndex, Registry } from "../registry"
import type { DataIndex } from "../storage"
import { exist } from "../utils"
import { MappedTypeMixin } from "../wrapped-mixin/mapped-type"

export class Annotation extends IndexHolderMixin(Base<Annotation.Data>) {
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
		return [Property.ANNOTATION_TYPE, Property.ANNOTATION_STRING] as const
	}

	protected override getStorageRawData(id: DataIndex) {
		return this.registry.storage.getAnnotation(id)
	}

	name() {
		const index = exist(this.data()[Property.ANNOTATION_STRING])
		return this.registry.storage.getName(index)
	}

	asString() {
		return this.name()
	}

	asWrapped(typeVariableMap: TypeVariableMap) {
		return new WrappedAnnotation(this.registry, this, typeVariableMap)
	}

	override toString() {
		return `@${this.name()}`
	}
}

export class WrappedAnnotation extends MappedTypeMixin(Wrapped<Annotation>) {
	asString() {
		throw new Error("TODO")
	}
}

export namespace Annotation {
	export interface Data {
		[Property.ANNOTATION_TYPE]?: DataIndex
		[Property.ANNOTATION_STRING]?: DataIndex
	}
}
