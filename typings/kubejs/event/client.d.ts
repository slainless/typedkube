interface ClientEvents {
	rightDebugInfo: EventHandler<_.dev.latvian.mods.kubejs.client.DebugInfoKubeEvent>
	leftDebugInfo: EventHandler<_.dev.latvian.mods.kubejs.client.DebugInfoKubeEvent>
	atlasSpriteRegistry: TargetedEventHandler<
		// net.minecraft.resources.ResourceLocation
		string,
		_.dev.latvian.mods.kubejs.client.AtlasSpriteRegistryKubeEvent
	>
	loggedOut: EventHandler<_.dev.latvian.mods.kubejs.client.ClientPlayerKubeEvent>
	generateAssets: TargetedEventHandler<
		// dev.latvian.mods.kubejs.script.data.GeneratedDataStage
		string,
		_.dev.latvian.mods.kubejs.generator.KubeAssetGenerator
	>
	blockEntityRendererRegistry: EventHandler<_.dev.latvian.mods.kubejs.client.BlockEntityRendererRegistryKubeEvent>
	tick: EventHandler<_.dev.latvian.mods.kubejs.client.ClientPlayerKubeEvent>
	menuScreenRegistry: EventHandler<_.dev.latvian.mods.kubejs.client.MenuScreenRegistryKubeEvent>
	highlight: EventHandler<_.dev.latvian.mods.kubejs.client.highlight.HighlightKubeEvent>
	particleProviderRegistry: EventHandler<_.dev.latvian.mods.kubejs.client.ParticleProviderRegistryKubeEvent>
	entityRendererRegistry: EventHandler<_.dev.latvian.mods.kubejs.client.EntityRendererRegistryKubeEvent>
	loggedIn: EventHandler<_.dev.latvian.mods.kubejs.client.ClientPlayerKubeEvent>
	lang: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.client.LangKubeEvent
	>
}
declare const ClientEvents: ClientEvents
