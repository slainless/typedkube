interface ItemEvents {
	rightClicked: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.item.Item>
		string,
		_.dev.latvian.mods.kubejs.item.ItemClickedKubeEvent
	>
	crafted: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.item.Item>
		string,
		_.dev.latvian.mods.kubejs.item.ItemCraftedKubeEvent
	>
	dropped: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.item.Item>
		string,
		_.dev.latvian.mods.kubejs.item.ItemDroppedKubeEvent
	>
	dynamicTooltips: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.item.DynamicItemTooltipsKubeEvent
	>
	modelProperties: EventHandler<_.dev.latvian.mods.kubejs.item.ItemModelPropertiesKubeEvent>
	firstRightClicked: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.item.Item>
		string,
		_.dev.latvian.mods.kubejs.item.ItemClickedKubeEvent
	>
	modification: EventHandler<_.dev.latvian.mods.kubejs.item.ItemModificationKubeEvent>
	pickedUp: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.item.Item>
		string,
		_.dev.latvian.mods.kubejs.item.ItemPickedUpKubeEvent
	>
	destroyed: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.item.Item>
		string,
		_.dev.latvian.mods.kubejs.item.ItemDestroyedKubeEvent
	>
	entityInteracted: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.item.Item>
		string,
		_.dev.latvian.mods.kubejs.item.ItemEntityInteractedKubeEvent
	>
	toolTierRegistry: EventHandler<_.dev.latvian.mods.kubejs.item.custom.ItemToolTierRegistryKubeEvent>
	foodEaten: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.item.Item>
		string,
		_.dev.latvian.mods.kubejs.item.FoodEatenKubeEvent
	>
	firstLeftClicked: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.item.Item>
		string,
		_.dev.latvian.mods.kubejs.item.ItemClickedKubeEvent
	>
	canPickUp: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.item.Item>
		string,
		_.dev.latvian.mods.kubejs.item.ItemPickedUpKubeEvent
	>
	smelted: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.item.Item>
		string,
		_.dev.latvian.mods.kubejs.item.ItemSmeltedKubeEvent
	>
	modifyTooltips: EventHandler<_.dev.latvian.mods.kubejs.item.ModifyItemTooltipsKubeEvent>
}
declare const ItemEvents: ItemEvents
