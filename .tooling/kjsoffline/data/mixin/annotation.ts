import { type Base, type Constructor, Property } from "../common"
import { Annotation } from "../element/annotation"
import type { ElementIndex } from "../registry"
import { asArray } from "../utils"

export function AnnotationMixin<
	T extends Constructor<Base<{ [Property.ANNOTATIONS]?: ElementIndex[] }>>,
>(klass: T) {
	class Annotated extends klass {
		private _cachedAnnotations!: Annotation[]

		annotations() {
			if (this._cachedAnnotations) return this._cachedAnnotations
			this._cachedAnnotations = asArray(this.data()[Property.ANNOTATIONS]).map(
				(id) => this.registry.get(Annotation, id),
			)
			return this._cachedAnnotations
		}
	}

	return Annotated as T & typeof Annotated
}

export namespace AnnotationMixin {
	export interface Data {
		[Property.ANNOTATIONS]?: ElementIndex[]
	}
}
