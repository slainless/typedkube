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

interface StartupEvents {
    init: _.dev.latvian.mods.kubejs.plugin.builtin.event.StartupEventsStatic['INIT'] 
    registry: _.dev.latvian.mods.kubejs.plugin.builtin.event.StartupEventsStatic['REGISTRY'] 
    modifyCreativeTab: _.dev.latvian.mods.kubejs.plugin.builtin.event.StartupEventsStatic['MODIFY_CREATIVE_TAB'] 
    postInit: _.dev.latvian.mods.kubejs.plugin.builtin.event.StartupEventsStatic['POST_INIT']
}
declare const StartupEvents: StartupEvents

interface ServerEvents {
    registry: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['REGISTRY']
    recipeMappingRegistry: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['RECIPE_MAPPING_REGISTRY']
    recipes: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['RECIPES']
    specialRecipeSerializers: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['SPECIAL_RECIPE_SERIALIZERS']
    compostableRecipes: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['COMPOSTABLE_RECIPES']
    recipeSchemaRegistry: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['RECIPE_SCHEMA_REGISTRY']
    modifyRecipeResult: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['MODIFY_RECIPE_RESULT']
    tick: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['TICK']
    command: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['COMMAND']
    tags: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['TAGS']
    loaded: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['LOADED']
    commandRegistry: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['COMMAND_REGISTRY']
    afterRecipes: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['AFTER_RECIPES']
    unloaded: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['UNLOADED']
    modifyRecipeIngredient: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['MODIFY_RECIPE_INGREDIENT']
    basicCommand: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['BASIC_COMMAND']
    generateData: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['GENERATE_DATA']
    basicPublicCommand: _.dev.latvian.mods.kubejs.plugin.builtin.event.ServerEventsStatic['BASIC_PUBLIC_COMMAND']
}
declare const ServerEvents: ServerEvents

interface LevelEvents {
    loaded: _.dev.latvian.mods.kubejs.plugin.builtin.event.LevelEventsStatic['LOADED']
    unloaded: _.dev.latvian.mods.kubejs.plugin.builtin.event.LevelEventsStatic['UNLOADED']
    beforeExplosion: _.dev.latvian.mods.kubejs.plugin.builtin.event.LevelEventsStatic['BEFORE_EXPLOSION']
    saved: _.dev.latvian.mods.kubejs.plugin.builtin.event.LevelEventsStatic['SAVED']
    tick: _.dev.latvian.mods.kubejs.plugin.builtin.event.LevelEventsStatic['TICK']
    afterExplosion: _.dev.latvian.mods.kubejs.plugin.builtin.event.LevelEventsStatic['AFTER_EXPLOSION']
}
declare const LevelEvents: LevelEvents

interface NetworkEvents {
    dataReceived: _.dev.latvian.mods.kubejs.plugin.builtin.event.NetworkEventsStatic['DATA_RECEIVED']
}
declare const NetworkEvents: NetworkEvents

interface ItemEvents {
    rightClicked: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['RIGHT_CLICKED']
    crafted: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['CRAFTED']
    dropped: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['DROPPED']
    dynamicTooltips: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['DYNAMIC_TOOLTIPS']
    modelProperties: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['MODEL_PROPERTIES']
    firstRightClicked: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['FIRST_RIGHT_CLICKED']
    modification: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['MODIFICATION']
    pickedUp: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['PICKED_UP']
    destroyed: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['DESTROYED']
    entityInteracted: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['ENTITY_INTERACTED']
    toolTierRegistry: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['TOOL_TIER_REGISTRY']
    foodEaten: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['FOOD_EATEN']
    firstLeftClicked: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['FIRST_LEFT_CLICKED']
    canPickUp: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['CAN_PICK_UP']
    smelted: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['SMELTED']
    modifyTooltips: _.dev.latvian.mods.kubejs.plugin.builtin.event.ItemEventsStatic['MODIFY_TOOLTIPS']
}
declare const ItemEvents: ItemEvents

interface BlockEvents {
    broken: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['BROKEN']
    placed: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['PLACED']
    leftClicked: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['LEFT_CLICKED']
    randomTick: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['RANDOM_TICK']
    rightClicked: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['RIGHT_CLICKED']
    startedFalling: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['STARTED_FALLING']
    modification: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['MODIFICATION']
    detectorPowered: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['DETECTOR_POWERED']
    farmlandTrampled: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['FARMLAND_TRAMPLING']
    stoppedFalling: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['STOPPED_FALLING']
    drops: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['DROPS']
    detectorUnpowered: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['DETECTOR_UNPOWERED']
    picked: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['PICKED']
    detectorChanged: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['DETECTOR_CHANGED']
    blockEntityTick: _.dev.latvian.mods.kubejs.plugin.builtin.event.BlockEventsStatic['BLOCK_ENTITY_TICK']
}
declare const BlockEvents: BlockEvents

interface EntityEvents {
    afterHurt: _.dev.latvian.mods.kubejs.plugin.builtin.event.EntityEventsStatic['AFTER_HURT']
    spawned: _.dev.latvian.mods.kubejs.plugin.builtin.event.EntityEventsStatic['SPAWNED']
    drops: _.dev.latvian.mods.kubejs.plugin.builtin.event.EntityEventsStatic['DROPS']
    checkSpawn: _.dev.latvian.mods.kubejs.plugin.builtin.event.EntityEventsStatic['CHECK_SPAWN']
    death: _.dev.latvian.mods.kubejs.plugin.builtin.event.EntityEventsStatic['DEATH']
    beforeHurt: _.dev.latvian.mods.kubejs.plugin.builtin.event.EntityEventsStatic['BEFORE_HURT']
}
declare const EntityEvents: EntityEvents

interface PlayerEvents {
    chestOpened: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['CHEST_OPENED']
    loggedOut: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['LOGGED_OUT']
    tick: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['TICK']
    stageRemoved: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['STAGE_REMOVED']
    respawned: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['RESPAWNED']
    decorateChat: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['DECORATE_CHAT']
    cloned: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['CLONED']
    stageAdded: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['STAGE_ADDED']
    advancement: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['ADVANCEMENT']
    chat: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['CHAT']
    chestClosed: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['CHEST_CLOSED']
    loggedIn: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['LOGGED_IN']
    inventoryClosed: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['INVENTORY_CLOSED']
    inventoryChanged: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['INVENTORY_CHANGED']
    inventoryOpened: _.dev.latvian.mods.kubejs.plugin.builtin.event.PlayerEventsStatic['INVENTORY_OPENED']
}
declare const PlayerEvents: PlayerEvents

interface RecipeViewerEvents {
    addEntries: _.dev.latvian.mods.kubejs.plugin.builtin.event.RecipeViewerEventsStatic['ADD_ENTRIES']
    removeEntriesCompletely: _.dev.latvian.mods.kubejs.plugin.builtin.event.RecipeViewerEventsStatic['REMOVE_ENTRIES_COMPLETELY']
    addInformation: _.dev.latvian.mods.kubejs.plugin.builtin.event.RecipeViewerEventsStatic['ADD_INFORMATION']
    removeRecipes: _.dev.latvian.mods.kubejs.plugin.builtin.event.RecipeViewerEventsStatic['REMOVE_RECIPES']
    removeEntries: _.dev.latvian.mods.kubejs.plugin.builtin.event.RecipeViewerEventsStatic['REMOVE_ENTRIES']
    removeCategories: _.dev.latvian.mods.kubejs.plugin.builtin.event.RecipeViewerEventsStatic['REMOVE_CATEGORIES']
    registerSubtypes: _.dev.latvian.mods.kubejs.plugin.builtin.event.RecipeViewerEventsStatic['REGISTER_SUBTYPES']
    groupEntries: _.dev.latvian.mods.kubejs.plugin.builtin.event.RecipeViewerEventsStatic['GROUP_ENTRIES']
}
declare const RecipeViewerEvents: RecipeViewerEvents

interface ClientEvents {
    rightDebugInfo: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['RIGHT_DEBUG_INFO']
    leftDebugInfo: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['LEFT_DEBUG_INFO']
    atlasSpriteRegistry: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['ATLAS_SPRITE_REGISTRY']
    loggedOut: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['LOGGED_OUT']
    generateAssets: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['GENERATE_ASSETS']
    blockEntityRendererRegistry: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['BLOCK_ENTITY_RENDERER_REGISTRY']
    tick: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['TICK']
    menuScreenRegistry: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['MENU_SCREEN_REGISTRY']
    highlight: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['HIGHLIGHT']
    particleProviderRegistry: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['PARTICLE_PROVIDER_REGISTRY']
    entityRendererRegistry: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['ENTITY_RENDERER_REGISTRY']
    loggedIn: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['LOGGED_IN']
    lang: _.dev.latvian.mods.kubejs.plugin.builtin.event.ClientEventsStatic['LANG']
}
declare const ClientEvents: ClientEvents

interface KeyBindEvents {
    registry: _.dev.latvian.mods.kubejs.plugin.builtin.event.KeyBindEventsStatic['REGISTRY']
    pressed: _.dev.latvian.mods.kubejs.plugin.builtin.event.KeyBindEventsStatic['PRESSED']
    tick: _.dev.latvian.mods.kubejs.plugin.builtin.event.KeyBindEventsStatic['TICK']
    released: _.dev.latvian.mods.kubejs.plugin.builtin.event.KeyBindEventsStatic['RELEASED']
}
declare const KeyBindEvents: KeyBindEvents