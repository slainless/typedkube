import { type Base, type Constructor, Property } from "../common"
import { ElementIndex, Registry } from "../registry"
import type { DataIndex } from "../storage"
import { exist } from "../utils"

export function BasicNameMixin<
	T extends Constructor<Base<{ [Property.NAME]?: DataIndex }>>,
>(klass: T) {
	class BasicNamed extends klass {
		name() {
			const nameIndex = exist(this.data()[Property.NAME])
			return this.registry.storage.getName(nameIndex)
		}
	}

	return BasicNamed as T & typeof BasicNamed
}
