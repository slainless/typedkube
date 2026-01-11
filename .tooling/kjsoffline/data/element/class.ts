import { Base } from "../common"
import { IndexHolderMixin } from "../mixin/index-holder"
import type { ElementIndex, Registry } from "../registry"
import type { DataIndex, TypeData } from "../storage"
import { exist } from "../utils"

export class Class<T extends TypeData> extends IndexHolderMixin(
	Base<TypeData>,
) {
	protected override _data!: T
	protected _arrayDepth?: number

	constructor(
		registry: Registry,
		protected id: ElementIndex,
		arrayDepth?: number,
	) {
		super(registry)
		const index = this.registry.dataIndexOf(id)

		const type = exist(this.registry.storage.getType(index))
		this.validateData(type)

		// @ts-expect-error
		this.setData(type)
		this.setIndex(index)
		this._arrayDepth = arrayDepth
	}

	validateData(data: TypeData) {
		if ((this.constructor as typeof Class).isValid(data)) return
		throw new Error(`Invalid data being assigned to ${this.constructor.name}`)
	}

	static isValid(data: TypeData) {
		return this.dataDiscriminator() in data
	}

	static dataDiscriminator(): string {
		throw new Error(
			"Data discriminator must be implemented to determine the type of the data",
		)
	}

	override data(): T {
		return this.data()
	}

	override setData(data: T) {
		this._data = data
		return this
	}

	arrayDepth() {
		return this._arrayDepth
	}

	packageIndex(): DataIndex | null | undefined {
		return
	}
}
