import { Property } from "../common"
import type { ElementIndex } from "../registry"
import type { WildcardTypeData } from "../storage"
import { asArray } from "../utils"
import { Class } from "./class"

export class WildcardType extends Class<WildcardTypeData> {
	override dataDiscriminator(): string {
		return Property.WILDCARD_LOWER_BOUNDS
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
}
