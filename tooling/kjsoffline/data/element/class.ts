import { Base, Property, type TypeVariableMap, Wrapped } from "../common"
import { AnnotationMixin } from "../mixin/annotation"
import { IndexHolderMixin } from "../mixin/data"
import { ModifierMixin } from "../mixin/modifier"
import {
	MappedTypeVariableMixin,
	TypeVariableMixin,
} from "../mixin/type-parameter"
import type { ElementIndex, Registry } from "../registry"
import type { RawClassTypeData } from "../storage"
import { asArray } from "../utils"
import { Constructor } from "./constructor"
import { Field } from "./field"
import { Method } from "./method"
import { Relation } from "./relation"
import type { Relationship } from "./relationship"

export class Class extends TypeVariableMixin(
	AnnotationMixin(ModifierMixin(IndexHolderMixin(Base<RawClassTypeData>))),
) {
	protected _arrayDepth?: number

	constructor(
		registry: Registry,
		protected id: ElementIndex,
		arrayDepth?: number,
	) {
		super(registry)
		const index = this.registry.dataIndexOf(id)
		this.setIndex(index)
		this.setData(this.registry.storage.getType(index))
		this._arrayDepth = arrayDepth
	}

	asWrapped(typeVariableMap: TypeVariableMap): WrappedClass {
		return new WrappedClass(this.registry, this, typeVariableMap)
	}

	/**
	 * Whether this type is a Class type.
	 * This means the Type extends Class<?> and is not a parameterized type.
	 */
	isRaw() {
		return this.data()[Property.CLASS_NAME] != null
	}

	interfaces() {
		return asArray(
			this.data()[Property.INTERFACES],
		) as number[] as ElementIndex[]
	}

	superClassIndex() {
		return this.registry.elementIndexOf(this.data()[Property.SUPER_CLASS])
	}

	enclosingClassIndex() {
		return this.registry.elementIndexOf(this.data()[Property.ENCLOSING_CLASS])
	}

	isInnerClass() {
		return this.enclosingClassIndex() != null
	}

	declaringClassIndex() {
		return this.registry.elementIndexOf(this.data()[Property.DECLARING_CLASS])
	}

	innerClassesIndex() {
		return asArray(
			this.data()[Property.INNER_CLASSES],
		) as number[] as ElementIndex[]
	}

	relatedClasses(
		seen = new Set<ElementIndex>(),
		relations: [ElementIndex, Relationship<string>, string][] = [],
	) {
		/**
		 * Looks like this method is only used to create related classes table, which is
		 * not that important.
		 */
		throw new Error("Not implemented")
		// if (seen.has(this.id)) {
		// 	return relations.map(
		// 		([id, relation]) => [this.registry.get(Class, id), relation] as const,
		// 	)
		// }

		// seen.add(this.id)
		// const relatedClasses: [ElementIndex, Relationship<string>, string][] = []
		// if (this.superClass() != null) {
		// 	relatedClasses.push([
		// 		this.superClass(),
		// 		Relationship.SUPER_CLASS,
		// 		"Extends",
		// 	])
		// }
	}

	private createAccessor<T>(action: (klass: Class) => T[]) {
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
		const fields = klass.data()[Property.FIELDS]
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
		const methods = klass.data()[Property.METHODS]
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
		const constructors = klass.data()[Property.CONSTRUCTORS]
		return constructors.map((constructor, index) =>
			this.registry.get(
				Constructor,
				this.registry.elementIndexOf(constructor),
				klass.id,
				index,
			),
		)
	})

	rawTypeIndex() {
		return this.registry.elementIndexOf(
			this.data()[Property.RAW_PARAMETERIZED_TYPE],
		)
	}

	isParameterized() {
		return this.rawTypeIndex() != null
	}

	ownerTypeIndex() {
		return this.registry.elementIndexOf(this.data()[Property.OWNER_TYPE])
	}

	protected walkInheritanceChain(
		action: (klass: Class, breaks: () => void) => void,
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

			action(klass, () => {
				breaks = true
			})
			if (breaks) {
				break
			}

			queue.push(klass.superClassIndex())
			queue.push(...klass.interfaces())
			// TODO: handles walking with parameterized class...
			throw new Error("TODO")
		}
	}

	lowerBoundsIndex() {
		return asArray(
			this.data()[Property.WILDCARD_LOWER_BOUNDS],
		) as number[] as ElementIndex[]
	}

	upperBoundsIndex() {
		return asArray(
			this.data()[Property.WILDCARD_UPPER_BOUNDS],
		) as number[] as ElementIndex[]
	}

	isWildcard() {
		return (
			this.lowerBoundsIndex().length > 0 || this.upperBoundsIndex().length > 0
		)
	}

	isTypeVariable() {
		return this.data()[Property.TYPE_VARIABLE_NAME] != null
	}

	typeVariableBoundsIndex() {
		return asArray(
			this.data()[Property.TYPE_VARIABLE_BOUNDS],
		) as number[] as ElementIndex[]
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

	arrayDepth() {
		return this._arrayDepth ?? 0
	}

	packageId() {
		const packageId = this.data()[Property.PACKAGE_NAME]
		if (packageId != null) return packageId

		if (this.isParameterized()) {
			// TODO: resolve rawType...
			throw new Error("TODO")
		}

		return null
	}

	packageName() {
		return this.registry.storage.getPackageName(this.packageId())
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

	isCompatibleWith(other: Class) {
		let isCompatible = false
		this.walkInheritanceChain((klass, breaks) => {
			if (klass.id === other.id) {
				isCompatible = true
				breaks()
			}
		})

		return isCompatible
	}

	relation(type: Relation.Type) {
		// TODO: implements Relation...
		switch (type) {
			case Relation.Type.SUPER_CLASS_OF:
				return
			case Relation.Type.TYPE_VARIABLE_OF:
				return this.typeVariableBoundsIndex()
			case Relation.Type.COMPONENT_OF:
				return this.ownerTypeIndex()
			case Relation.Type.INNER_TYPE_OF:
				return this.enclosingClassIndex()
		}
	}

	asString() {
		throw new Error("TODO")
	}

	hasDependency() {
		throw new Error("TODO")
	}
}

export class WrappedClass extends MappedTypeVariableMixin(Wrapped<Class>) {
	typeVariableMap(): TypeVariableMap {
		// TODO: implement computeExhaustiveMapping when accessed without any type variable...
		throw new Error("TODO")
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

export namespace Class {
	export interface Data extends TypeVariableMixin.Data {}
}
