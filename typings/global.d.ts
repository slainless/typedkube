// Constructors or global variables

declare const global: Record<string, any>
declare const Component: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.TextWrapperStatic
declare const TextIcons: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.TextIconsStatic
declare const UUID: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.UUIDWrapperStatic
declare const JsonUtils: _.dev.latvian.mods.kubejs.util.JsonUtilsStatic
declare const JsonIO: _.dev.latvian.mods.kubejs.util.JsonIOStatic
declare const Block: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.BlockWrapperStatic
declare const Blocks: _.net.minecraft.world.level.block.BlocksStatic
declare const Item: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.ItemWrapperStatic
declare const Items: _.net.minecraft.world.item.ItemsStatic
declare const Ingredient: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.IngredientWrapperStatic
declare const NBT: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.NBTWrapperStatic
declare const NBTIO: _.dev.latvian.mods.kubejs.util.NBTIOWrapperStatic
declare const Direction: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.DirectionWrapperStatic
declare const Facing: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.DirectionWrapperStatic
declare const AABB: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.AABBWrapperStatic
declare const Stats: _.net.minecraft.stats.StatsStatic
declare const FluidAmounts: _.dev.latvian.mods.kubejs.util.FluidAmountsStatic
declare const Notification: _.dev.latvian.mods.kubejs.util.NotificationToastDataStatic
declare const SizedIngredient: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.SizedIngredientWrapperStatic
declare const ParticleOptions: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.ParticleOptionsWrapperStatic
declare const Registry: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.RegistryWrapperStatic
declare const DataMap: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.DataMapWrapperStatic
declare const EntitySelector: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.EntitySelectorWrapperStatic
declare const Fluid: _.dev.latvian.mods.kubejs.fluid.FluidWrapperStatic
declare const SECOND: 1000
declare const MINUTE: 60000
declare const HOUR: 3600000
declare const Color: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.ColorWrapperStatic
declare const BlockStatePredicate: _.dev.latvian.mods.kubejs.block.state.BlockStatePredicateStatic
declare const Vec3d: _.net.minecraft.world.phys.Vec3Static
declare const Vec3i: _.net.minecraft.core.Vec3iStatic
declare const Vec3f: _.org.joml.Vector3fStatic
declare const Vec4f: _.org.joml.Vector4fStatic
declare const Matrix3f: _.org.joml.Matrix3fStatic
declare const Matrix4f: _.org.joml.Matrix4fStatic
declare const Quaternionf: _.org.joml.QuaternionfStatic
declare const RotationAxis: _.dev.latvian.mods.kubejs.util.RotationAxisStatic
declare const BlockPos: _.net.minecraft.core.BlockPosStatic
declare const DamageSource: _.net.minecraft.world.damagesource.DamageSourcesStatic
declare const SoundType: _.net.minecraft.world.level.block.SoundTypeStatic
declare const BlockProperties: _.net.minecraft.world.level.block.state.properties.BlockStatePropertiesStatic
declare const NativeEvents: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.NativeEventWrapperStatic
declare const MobEffectUtil: _.dev.latvian.mods.kubejs.util.MobEffectUtilStatic
declare const Client: _.net.minecraft.client.MinecraftStatic
declare const GLFWInput: Record<string, number>
declare const JavaAdapter: Function // TODO: check what kind of function this is
declare const Platform: _.dev.latvian.mods.kubejs.script.PlatformWrapperStatic
declare const JavaMath: java.lang.MathStatic
declare const ID: _.dev.latvian.mods.kubejs.util.IDStatic
declare const Duration: java.time.DurationStatic
declare const KMath: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.KMathStatic
declare const Java: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.JavaWrapperStatic
declare const Utils: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.UtilsWrapperStatic
declare const Text: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.TextWrapperStatic
declare const JavaException: Function
declare const With: Function
declare const Call: Function
declare const StringUtils: _.dev.latvian.mods.kubejs.plugin.builtin.wrapper.StringUtilsWrapperStatic

// Manual injections from Rhino, probably...
// Events mapped from kubejs/src/main/java/dev/latvian/mods/kubejs/plugin/builtin/event/

interface StartupEvents {
	init: EventHandler<_.dev.latvian.mods.kubejs.event.KubeStartupEvent>
	postInit: EventHandler<_.dev.latvian.mods.kubejs.event.KubeStartupEvent>
	registry: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.core.Registry<?>>
		string,
		_.dev.latvian.mods.kubejs.registry.RegistryKubeEvent
	>
	modifyCreativeTab: TargetedEventHandler<
		// net.minecraft.resources.ResourceLocation
		string,
		_.dev.latvian.mods.kubejs.item.creativetab.CreativeTabKubeEvent
	>
}
declare const StartupEvents: StartupEvents

interface ServerEvents {
	registry: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.core.Registry<?>>
		string,
		_.dev.latvian.mods.kubejs.registry.ServerRegistryKubeEvent
	>
	generateData: TargetedEventHandler<
		// dev.latvian.mods.kubejs.script.data.GeneratedDataStage
		string,
		_.dev.latvian.mods.kubejs.generator.KubeDataGenerator
	>
	loaded: EventHandler<_.dev.latvian.mods.kubejs.server.ServerKubeEvent>
	unloaded: EventHandler<_.dev.latvian.mods.kubejs.server.ServerKubeEvent>
	tick: EventHandler<_.dev.latvian.mods.kubejs.server.ServerKubeEvent>
	tags: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.core.Registry<?>>
		string,
		_.dev.latvian.mods.kubejs.server.tag.TagKubeEvent
	>
	commandRegistry: EventHandler<_.dev.latvian.mods.kubejs.command.CommandRegistryKubeEvent>
	command: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.server.CommandKubeEvent
	>
	basicCommand: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.server.BasicCommandKubeEvent
	>
	basicPublicCommand: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.server.BasicCommandKubeEvent
	>
	recipeMappingRegistry: EventHandler<_.dev.latvian.mods.kubejs.recipe.schema.RecipeMappingRegistry>
	recipeSchemaRegistry: EventHandler<_.dev.latvian.mods.kubejs.recipe.schema.RecipeSchemaRegistry>
	recipes: EventHandler<_.dev.latvian.mods.kubejs.recipe.RecipesKubeEvent>
	afterRecipes: EventHandler<_.dev.latvian.mods.kubejs.recipe.AfterRecipesLoadedKubeEvent>
	specialRecipeSerializers: EventHandler<_.dev.latvian.mods.kubejs.recipe.special.SpecialRecipeSerializerManager>
	compostableRecipes: EventHandler<_.dev.latvian.mods.kubejs.recipe.CompostableRecipesKubeEvent>
	modifyRecipeResult: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.recipe.ModifyCraftingItemKubeEvent
	>
	modifyRecipeIngredient: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.recipe.ModifyCraftingItemKubeEvent
	>
}
declare const ServerEvents: ServerEvents

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

interface NetworkEvents {
	dataReceived: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.net.NetworkKubeEvent
	>
}
declare const NetworkEvents: NetworkEvents

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

interface RecipeViewerEvents {
	addEntries: TargetedEventHandler<
		// dev.latvian.mods.kubejs.recipe.viewer.RecipeViewerEntryType
		string,
		_.dev.latvian.mods.kubejs.recipe.viewer.AddEntriesKubeEvent
	>
	removeEntriesCompletely: TargetedEventHandler<
		// dev.latvian.mods.kubejs.recipe.viewer.RecipeViewerEntryType
		string,
		_.dev.latvian.mods.kubejs.recipe.viewer.RemoveEntriesKubeEvent
	>
	addInformation: TargetedEventHandler<
		// dev.latvian.mods.kubejs.recipe.viewer.RecipeViewerEntryType
		string,
		_.dev.latvian.mods.kubejs.recipe.viewer.AddInformationKubeEvent
	>
	removeRecipes: EventHandler<_.dev.latvian.mods.kubejs.recipe.viewer.RemoveRecipesKubeEvent>
	removeEntries: TargetedEventHandler<
		// dev.latvian.mods.kubejs.recipe.viewer.RecipeViewerEntryType
		string,
		_.dev.latvian.mods.kubejs.recipe.viewer.RemoveEntriesKubeEvent
	>
	removeCategories: EventHandler<_.dev.latvian.mods.kubejs.recipe.viewer.RemoveCategoriesKubeEvent>
	registerSubtypes: TargetedEventHandler<
		// dev.latvian.mods.kubejs.recipe.viewer.RecipeViewerEntryType
		string,
		_.dev.latvian.mods.kubejs.recipe.viewer.RegisterSubtypesKubeEvent
	>
	groupEntries: TargetedEventHandler<
		// dev.latvian.mods.kubejs.recipe.viewer.RecipeViewerEntryType
		string,
		_.dev.latvian.mods.kubejs.recipe.viewer.GroupEntriesKubeEvent
	>
}
declare const RecipeViewerEvents: RecipeViewerEvents

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

namespace _.dev.latvian.mods.kubejs.plugin.builtin.wrapper {
	interface JavaWrapperStatic {
		loadClass<T extends keyof LoadClassMap>(name: T): LoadClassMap[T]
	}
}
