interface PlayerEvents {
	chestOpened: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.inventory.MenuType<?>>
		string,
		_.dev.latvian.mods.kubejs.player.ChestKubeEvent
	>
	loggedOut: EventHandler<_.dev.latvian.mods.kubejs.player.SimplePlayerKubeEvent>
	tick: EventHandler<_.dev.latvian.mods.kubejs.player.SimplePlayerKubeEvent>
	stageRemoved: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.player.StageChangedEvent
	>
	respawned: EventHandler<_.dev.latvian.mods.kubejs.player.PlayerRespawnedKubeEvent>
	decorateChat: EventHandler<_.dev.latvian.mods.kubejs.player.PlayerChatReceivedKubeEvent>
	cloned: EventHandler<_.dev.latvian.mods.kubejs.player.PlayerClonedKubeEvent>
	stageAdded: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.player.StageChangedEvent
	>
	advancement: TargetedEventHandler<
		// net.minecraft.resources.ResourceLocation
		string,
		_.dev.latvian.mods.kubejs.player.PlayerAdvancementKubeEvent
	>
	chat: EventHandler<_.dev.latvian.mods.kubejs.player.PlayerChatReceivedKubeEvent>
	chestClosed: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.inventory.MenuType<?>>
		string,
		_.dev.latvian.mods.kubejs.player.ChestKubeEvent
	>
	loggedIn: EventHandler<_.dev.latvian.mods.kubejs.player.SimplePlayerKubeEvent>
	inventoryClosed: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.inventory.MenuType<?>>
		string,
		_.dev.latvian.mods.kubejs.player.InventoryKubeEvent
	>
	inventoryChanged: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.item.Item>
		string,
		_.dev.latvian.mods.kubejs.player.InventoryChangedKubeEvent
	>
	inventoryOpened: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.inventory.MenuType<?>>
		string,
		_.dev.latvian.mods.kubejs.player.InventoryKubeEvent
	>
}
declare const PlayerEvents: PlayerEvents
