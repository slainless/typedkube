interface EntityEvents {
	afterHurt: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.entity.EntityType<?>>
		string,
		_.dev.latvian.mods.kubejs.entity.AfterLivingEntityHurtKubeEvent
	>
	spawned: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.entity.EntityType<?>>
		string,
		_.dev.latvian.mods.kubejs.entity.EntitySpawnedKubeEvent
	>
	drops: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.entity.EntityType<?>>
		string,
		_.dev.latvian.mods.kubejs.entity.LivingEntityDropsKubeEvent
	>
	checkSpawn: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.entity.EntityType<?>>
		string,
		_.dev.latvian.mods.kubejs.entity.CheckLivingEntitySpawnKubeEvent
	>
	death: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.entity.EntityType<?>>
		string,
		_.dev.latvian.mods.kubejs.entity.LivingEntityDeathKubeEvent
	>
	beforeHurt: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.world.entity.EntityType<?>>
		string,
		_.dev.latvian.mods.kubejs.entity.BeforeLivingEntityHurtKubeEvent
	>
}
declare const EntityEvents: EntityEvents
