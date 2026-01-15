import { type Base, type Constructor, Property } from "../common.ts"
import type { DataIndex } from "../storage.ts"
import { exist } from "../utils.ts"

export function BasicNameMixin<
	T extends Constructor<Base<{ [Property.NAME]?: DataIndex }>>,
>(klass: T) {
	class BasicNamed extends klass {
		name() {
			const nameIndex = exist(this.data()[Property.NAME])
			return exist(this.registry.storage.getName(nameIndex))
		}
	}

	return BasicNamed as T & typeof BasicNamed
}
