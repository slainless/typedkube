import { Property, type TypeVariableMap, Wrapped } from "../common"
import { TypeVariableMixin } from "../mixin/type-variable"
import type { ElementIndex } from "../registry"
import type { RawClassTypeData } from "../storage"
import { asArray, exist } from "../utils"
import { MappedTypeVariableMixin } from "../wrapped-mixin/type-variable"
import { Class } from "./class"
import { Constructor } from "./constructor"
import { Field } from "./field"
import { Method } from "./method"
import { ParameterizedType } from "./parameterized-type"
import type { Relation } from "./relation"

export class RawClass extends TypeVariableMixin(Class<RawClassTypeData>) {
	override dataDiscriminator() {
		return Property.CLASS_NAME
	}

	interfacesIndex() {
		return asArray(
			this.data()[Property.INTERFACES],
		) as number[] as ElementIndex[]
	}

	superClassIndex() {
		return this.data()[Property.SUPER_CLASS] as number as
			| ElementIndex
			| undefined
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

	isTypeVariable() {
		// TODO: implements variants of class...
		throw new Error("TODO")
		// return this.data()[Property.TYPE_VARIABLE_NAME] != null
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

	asWrapped(typeVariableMap: TypeVariableMap) {
		return new WrappedRawClass(this.registry, this, typeVariableMap)
	}
}

export class WrappedRawClass extends MappedTypeVariableMixin(
	Wrapped<RawClass>,
) {
	override typeVariableMap(): TypeVariableMap {
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
