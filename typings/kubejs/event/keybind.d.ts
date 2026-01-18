interface KeyBindEvents {
	registry: EventHandler<_.dev.latvian.mods.kubejs.client.KeybindRegistryKubeEvent>
	pressed: TargetedEventHandler<
		// _.dev.latvian.mods.kubejs.client.KubeJSKeybinds$KubeKey
		string,
		_.dev.latvian.mods.kubejs.client.KubeJSKeybinds$KeyEvent
	>
	tick: TargetedEventHandler<
		// _.dev.latvian.mods.kubejs.client.KubeJSKeybinds$KubeKey
		string,
		_.dev.latvian.mods.kubejs.client.KubeJSKeybinds$TickingKeyEvent
	>
	released: TargetedEventHandler<
		// _.dev.latvian.mods.kubejs.client.KubeJSKeybinds$KubeKey
		string,
		_.dev.latvian.mods.kubejs.client.KubeJSKeybinds$TickingKeyEvent
	>
}
declare const KeyBindEvents: KeyBindEvents
