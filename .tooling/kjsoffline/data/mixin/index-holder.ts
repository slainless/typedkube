import type { Base, Constructor } from "../common"
import type { DataIndex } from "../storage"

export function IndexHolderMixin<T extends Constructor<Base>>(klass: T) {
	class IndexHolder extends klass {
		protected _index?: DataIndex

		index() {
			return this.useBeforeInit("index")
		}

		setIndex(id: DataIndex) {
			this._index = id
			return this
		}
	}

	return IndexHolder as T & typeof IndexHolder
}
