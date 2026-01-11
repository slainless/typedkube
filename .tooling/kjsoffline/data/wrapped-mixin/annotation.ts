import type { Constructor, Wrapped } from "../common.ts"
import type { AnnotationMixin } from "../mixin/annotation.ts"

export function WrappedAnnotationMixin<
	T extends Constructor<
		Wrapped<InstanceType<ReturnType<typeof AnnotationMixin>>>
	>,
>(klass: T) {
	class HasWrappedAnnotation extends klass {
		wrappedAnnotations() {
			// REVIEW: whether to use cache or not
			return this.wrapped()
				.annotations()
				.map((annotation) => annotation.asWrapped(this.typeVariableMap()))
		}
	}

	return HasWrappedAnnotation as T & typeof HasWrappedAnnotation
}
