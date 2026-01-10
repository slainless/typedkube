import { type Base, type Constructor, Property } from "../common"
import { ElementIndex, Registry } from "../registry"
import type { DataIndex } from "../storage"

export function BasicNameMixin<
	T extends Constructor<Base<{ [Property.NAME]?: DataIndex }>>,
>(klass: T) {
	class BasicNamed extends klass {
		name() {
			return this.registry.storage.getName(this.data()[Property.NAME])
		}
	}

	return BasicNamed as T & typeof BasicNamed
}
