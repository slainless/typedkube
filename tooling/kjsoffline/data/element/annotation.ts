import { Base, Property, type TypeVariableMap, Wrapped } from "../common"
import { IndexHolderMixin } from "../mixin/data"
import { MappedTypeMixin } from "../mixin/type"
import type { ElementIndex, Registry } from "../registry"
import type { DataIndex } from "../storage"

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

	protected rawDataParsingKeys() {
		return [Property.ANNOTATION_TYPE, Property.ANNOTATION_STRING] as const
	}

	protected getStorageRawData(id: DataIndex): string {
		return this.registry.storage.getAnnotation(id)
	}

	name() {
		return this.registry.storage.getName(this.data[Property.ANNOTATION_STRING])
	}

	asString() {
		return this.name()
	}

	asWrapped(typeVariableMap: TypeVariableMap) {
		return new WrappedAnnotation(this.registry, this, typeVariableMap)
	}

	toString() {
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
