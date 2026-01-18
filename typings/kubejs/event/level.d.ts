interface LevelEvents {
	loaded: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.Level>
		string,
		_.dev.latvian.mods.kubejs.level.SimpleLevelKubeEvent
	>
	unloaded: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.Level>
		string,
		_.dev.latvian.mods.kubejs.level.SimpleLevelKubeEvent
	>
	beforeExplosion: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.Level>
		string,
		_.dev.latvian.mods.kubejs.level.ExplosionKubeEvent$Before
	>
	saved: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.Level>
		string,
		_.dev.latvian.mods.kubejs.level.SimpleLevelKubeEvent
	>
	tick: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.Level>
		string,
		_.dev.latvian.mods.kubejs.level.SimpleLevelKubeEvent
	>
	afterExplosion: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.level.Level>
		string,
		_.dev.latvian.mods.kubejs.level.ExplosionKubeEvent$After
	>
}
declare const LevelEvents: LevelEvents
