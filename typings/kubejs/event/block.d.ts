interface BlockEvents {
	broken: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.block.Block>
		string,
		_.dev.latvian.mods.kubejs.block.BlockBrokenKubeEvent
	>
	placed: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.block.Block>
		string,
		_.dev.latvian.mods.kubejs.block.BlockPlacedKubeEvent
	>
	leftClicked: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.block.Block>
		string,
		_.dev.latvian.mods.kubejs.block.BlockLeftClickedKubeEvent
	>
	randomTick: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.block.Block>
		string,
		_.dev.latvian.mods.kubejs.block.RandomTickKubeEvent
	>
	rightClicked: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.block.Block>
		string,
		_.dev.latvian.mods.kubejs.block.BlockRightClickedKubeEvent
	>
	startedFalling: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.block.Block>
		string,
		_.dev.latvian.mods.kubejs.block.BlockStartedFallingKubeEvent
	>
	modification: EventHandler<_.dev.latvian.mods.kubejs.block.BlockModificationKubeEvent>
	detectorPowered: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.block.DetectorBlockKubeEvent
	>
	farmlandTrampled: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.block.Block>
		string,
		_.dev.latvian.mods.kubejs.block.FarmlandTrampledKubeEvent
	>
	stoppedFalling: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.block.Block>
		string,
		_.dev.latvian.mods.kubejs.block.BlockStoppedFallingKubeEvent
	>
	drops: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.block.Block>
		string,
		_.dev.latvian.mods.kubejs.block.BlockDropsKubeEvent
	>
	detectorUnpowered: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.block.DetectorBlockKubeEvent
	>
	picked: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.block.Block>
		string,
		_.dev.latvian.mods.kubejs.block.BlockPickedKubeEvent
	>
	detectorChanged: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.block.DetectorBlockKubeEvent
	>
	blockEntityTick: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.block.Block>
		string,
		_.dev.latvian.mods.kubejs.block.entity.BlockEntityTickKubeEvent
	>
}
declare const BlockEvents: BlockEvents
