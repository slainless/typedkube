import type { Base, Constructor } from "../common"
import type { DataIndex } from "../storage"

export function IndexHolderMixin<T extends Constructor<Base<any>>>(klass: T) {
	class IndexHolder extends klass {
		private _index: DataIndex

		index() {
			return this._index
		}

		setIndex(id: DataIndex) {
			this._index = id
			return this
		}
	}

	return IndexHolder as T & typeof IndexHolder
}
