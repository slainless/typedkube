import { type Base, type Constructor, Property } from "../common.ts"
import { Annotation } from "../element/annotation.ts"
import type { DataIndex } from "../storage.ts"
import { asArray } from "../utils.ts"

export function AnnotationMixin<
	T extends Constructor<Base<{ [Property.ANNOTATIONS]?: DataIndex[] }>>,
>(klass: T) {
	class Annotated extends klass {
		private _cachedAnnotations!: Annotation[]

		annotations() {
			if (this._cachedAnnotations) return this._cachedAnnotations
			this._cachedAnnotations = asArray(this.data()[Property.ANNOTATIONS]).map(
				(id) => this.registry.get(Annotation, this.registry.elementIndexOf(id)),
			)
			return this._cachedAnnotations
		}
	}

	return Annotated as T & typeof Annotated
}

export namespace AnnotationMixin {
	export interface Data {
		[Property.ANNOTATIONS]?: DataIndex[]
	}
}
