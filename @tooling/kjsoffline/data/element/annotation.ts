import { Base, Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { IndexHolderMixin } from "../mixin/index-holder.ts"
import type { ElementIndex, Registry } from "../registry.ts"
import type { DataIndex, EitherDataIndex } from "../storage.ts"
import { exist } from "../utils.ts"
import { MappedTypeMixin } from "../wrapped-mixin/mapped-type.ts"

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
		[Property.ANNOTATION_TYPE]?: EitherDataIndex
		[Property.ANNOTATION_STRING]?: DataIndex
	}
}
