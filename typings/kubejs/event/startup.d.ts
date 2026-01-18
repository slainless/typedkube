interface StartupEvents {
	init: EventHandler<_.dev.latvian.mods.kubejs.event.KubeStartupEvent>
	postInit: EventHandler<_.dev.latvian.mods.kubejs.event.KubeStartupEvent>
	registry: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.core.Registry<?>>
		string,
		_.dev.latvian.mods.kubejs.registry.RegistryKubeEvent<any>
	>
	modifyCreativeTab: TargetedEventHandler<
		// net.minecraft.resources.ResourceLocation
		string,
		_.dev.latvian.mods.kubejs.item.creativetab.CreativeTabKubeEvent
	>
}
declare const StartupEvents: StartupEvents
