import { Property, type TypeVariableMap, Wrapped } from "../common.ts"
import { AnnotationMixin } from "../mixin/annotation.ts"
import { ClassTypeMixin } from "../mixin/class-type.ts"
import { ModifierMixin } from "../mixin/modifier.ts"
import { TypeVariableMixin } from "../mixin/type-variable.ts"
import type { ElementIndex } from "../registry.ts"
import type { RawClassTypeData } from "../storage.ts"
import { asArray, exist } from "../utils.ts"
import { WrappedClassMixin } from "../wrapped-mixin/class-type.ts"
import { MappedTypeVariableMixin } from "../wrapped-mixin/mapped-type-variable.ts"
import { Class } from "./class.ts"
import { Constructor } from "./constructor.ts"
import { Field } from "./field.ts"
import { Method } from "./method.ts"
import { ParameterizedType } from "./parameterized-type.ts"
import type { Relation } from "./relation.ts"

export class RawClass extends ClassTypeMixin(
	AnnotationMixin(ModifierMixin(TypeVariableMixin(Class<RawClassTypeData>))),
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

	declaringClass() {
		const index = this.declaringClassIndex()
		if (index == null) return undefined
		const declaringClass = this.registry.get(Class, index)
		if (
			!(
				declaringClass instanceof RawClass ||
				declaringClass instanceof ParameterizedType
			)
		)
			throw new Error("Declaring class is not a RawClass or ParameterizedType")
		return declaringClass
	}

	innerClassesIndex() {
		return asArray(
			this.data()[Property.INNER_CLASSES],
		) as number[] as ElementIndex[]
	}

	innerClasses() {
		return this.innerClassesIndex().map((index) => {
			const innerClass = this.registry.get(Class, index)
			if (!(innerClass instanceof RawClass))
				throw new Error("Inner class is not a RawClass or ParameterizedType")
			return innerClass
		})
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

	fieldsIndex() {
		return asArray(this.data()[Property.FIELDS]) as number[] as ElementIndex[]
	}

	methodsIndex() {
		return asArray(this.data()[Property.METHODS]) as number[] as ElementIndex[]
	}

	constructorsIndex() {
		return asArray(
			this.data()[Property.CONSTRUCTORS],
		) as number[] as ElementIndex[]
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

	nameIndex() {
		return this.data()[Property.CLASS_NAME]
	}

	override packageIndex() {
		return this.data()[Property.PACKAGE_NAME]
	}

	simpleName() {
		const classNameIndex = exist(this.nameIndex())
		return exist(this.registry.storage.getName(classNameIndex))
	}

	packageName(): string {
		const packageNameIndex = this.packageIndex()
		if (packageNameIndex == null) return "$root"

		return this.registry.storage.getPackageName(packageNameIndex)
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

	// asString() {
	// 	throw new Error("TODO")
	// }

	hasDependency() {
		throw new Error("TODO")
	}

	asWrapped(arrayDepth = 0, typeVariableMap: TypeVariableMap = {}) {
		return new WrappedRawClass(
			this.registry,
			this,
			typeVariableMap,
		).setArrayDepth(arrayDepth)
	}
}

export class WrappedRawClass extends WrappedClassMixin(
	MappedTypeVariableMixin(Wrapped<RawClass>),
) {}
