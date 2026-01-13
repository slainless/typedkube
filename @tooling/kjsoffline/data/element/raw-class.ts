import { Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { AnnotationMixin } from "../mixin/annotation.ts"
import { ModifierMixin } from "../mixin/modifier.ts"
import { TypeVariableMixin } from "../mixin/type-variable.ts"
import type { ElementIndex } from "../registry.ts"
import type { RawClassTypeData } from "../storage.ts"
import { asArray, exist } from "../utils.ts"
import { ClassTypeVariableMappingMixin } from "../wrapped-mixin/exhaustive-type-variable.ts"
import { MappedTypeVariableMixin } from "../wrapped-mixin/type-variable.ts"
import { Class } from "./class.ts"
import { Constructor } from "./constructor.ts"
import { Field } from "./field.ts"
import { Method } from "./method.ts"
import { ParameterizedType } from "./parameterized-type.ts"
import type { Relation } from "./relation.ts"

export class RawClass extends AnnotationMixin(
	ModifierMixin(TypeVariableMixin(Class<RawClassTypeData>)),
) {
	static override dataDiscriminator() {
		return Property.CLASS_NAME
	}

	interfacesIndex() {
		return asArray(
			this.data()[Property.INTERFACES],
		) as number[] as ElementIndex[]
	}

	interfaces() {
		return this.interfacesIndex().map((index) => {
			const iface = this.registry.get(Class, index)
			if (!(iface instanceof RawClass || iface instanceof ParameterizedType))
				throw new Error("Interface type is not a RawClass or ParameterizedType")

			return iface
		})
	}

	superClassIndex() {
		return this.data()[Property.SUPER_CLASS] as number as
			| ElementIndex
			| undefined
	}

	superClass() {
		const index = this.superClassIndex()
		if (index == null) return undefined

		const superClass = this.registry.get(Class, index)
		if (
			!(
				superClass instanceof RawClass ||
				superClass instanceof ParameterizedType
			)
		)
			throw new Error("Super class type is not a RawClass or ParameterizedType")

		return superClass
	}

	enclosingClassIndex() {
		return this.data()[Property.ENCLOSING_CLASS] as number as
			| ElementIndex
			| undefined
	}

	isInnerClass() {
		return this.enclosingClassIndex() != null
	}

	declaringClassIndex() {
		return this.data()[Property.DECLARING_CLASS] as number as
			| ElementIndex
			| undefined
	}

	innerClassesIndex() {
		return asArray(
			this.data()[Property.INNER_CLASSES],
		) as number[] as ElementIndex[]
	}

	private createAccessor<T>(action: (klass: RawClass) => T[]) {
		return (shallow = false) => {
			const elements: T[] = []

			if (shallow) {
				elements.push(...action(this))
			} else {
				this.walkInheritanceChain((klass) => elements.push(...action(klass)))
			}

			return elements
		}
	}

	fields = this.createAccessor((klass) => {
		const fields = asArray(klass.data()[Property.FIELDS])
		return fields.map((field, index) =>
			this.registry.get(
				Field,
				this.registry.elementIndexOf(field),
				klass.id,
				index,
			),
		)
	})

	methods = this.createAccessor((klass) => {
		const methods = asArray(klass.data()[Property.METHODS])
		return methods.map((method, index) =>
			this.registry.get(
				Method,
				this.registry.elementIndexOf(method),
				klass.id,
				index,
			),
		)
	})

	constructors = this.createAccessor((klass) => {
		const constructors = asArray(klass.data()[Property.CONSTRUCTORS])
		return constructors.map((constructor, index) =>
			this.registry.get(
				Constructor,
				this.registry.elementIndexOf(constructor),
				klass.id,
				index,
			),
		)
	})

	protected walkInheritanceChain(
		action: (klass: RawClass, breaks: () => void) => void,
	) {
		const seen = new Set<ElementIndex>()
		const queue = [this.id]
		let breaks = false
		while (queue.length > 0) {
			const id = queue.pop()
			if (id == null || seen.has(id)) {
				continue
			}

			const klass = this.registry.get(Class, id)
			seen.add(id)

			if (klass instanceof RawClass) {
				action(klass, () => {
					breaks = true
				})
				if (breaks) break

				queue.push(...asArray(klass.superClassIndex()))
				queue.push(...klass.interfacesIndex())
			} else if (klass instanceof ParameterizedType) {
				const index = klass.rawTypeIndex()
				if (index == null) continue
				queue.push(index)
			}
		}
	}

	name() {
		throw new Error("TODO")
	}

	simpleName() {
		throw new Error("TODO")
	}

	referenceName() {
		throw new Error("TODO")
	}

	fullyQualifiedName() {
		throw new Error("TODO")
	}

	override packageIndex() {
		return this.data()[Property.PACKAGE_NAME]
	}

	packageName() {
		const packageId = exist(this.packageIndex())
		return this.registry.storage.getPackageName(packageId)
	}

	parameterizedArgs() {
		throw new Error("Not implemented")
		/**
		 * TODO: no such key in Property ???
		 * it does exist in debugconstants but it points to .jsName and .jsName
		 * doesn't exist everywhere else in the codebase...
		 */
		// return asArray(this.data()[Property.PARAMETERIZED_ARGUMENTS])
	}

	inheritedClassesIndex() {
		const classes = new Set<ElementIndex>()
		this.walkInheritanceChain((klass) => classes.add(klass.id))
		return Array.from(classes)
	}

	relation(type: Relation.Type) {
		// TODO: implements Relation...
		// switch (type) {
		// 	case Relation.Type.SUPER_CLASS_OF:
		// 		return
		// 	case Relation.Type.TYPE_VARIABLE_OF:
		// 		return this.typeVariableBoundsIndex()
		// 	case Relation.Type.COMPONENT_OF:
		// 		return this.ownerTypeIndex()
		// 	case Relation.Type.INNER_TYPE_OF:
		// 		return this.enclosingClassIndex()
		// }
	}

	asString() {
		throw new Error("TODO")
	}

	hasDependency() {
		throw new Error("TODO")
	}

	asWrapped() {
		return this.registry.get(
			WrappedRawClass,
			this.id,
			() => new WrappedRawClass(this.registry, this, {}),
		)
	}
}

export class WrappedRawClass extends ClassTypeVariableMappingMixin(
	MappedTypeVariableMixin(Wrapped<RawClass>),
) {
	protected _cachedTypeVariableMap?: TypeVariableMap

	name() {
		throw new Error("TODO")
	}

	simpleName() {
		throw new Error("TODO")
	}

	referenceName() {
		throw new Error("TODO")
	}

	fullyQualifiedName() {
		throw new Error("TODO")
	}

	asKubeLoad_1_18() {
		throw new Error("TODO")
	}

	asKubeLoad_1_19() {
		throw new Error("TODO")
	}

	asKubeLoad_1_20() {
		throw new Error("TODO")
	}

	asKubeLoad() {
		throw new Error("TODO")
	}

	asString() {
		throw new Error("TODO")
	}
}
