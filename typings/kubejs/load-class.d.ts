namespace _.dev.latvian.mods.kubejs.plugin.builtin.wrapper {
	interface JavaWrapperStatic {
		loadClass<T extends keyof LoadClassMap>(name: T): LoadClassMap[T]
	}
}
