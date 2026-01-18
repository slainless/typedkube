interface ServerEvents {
	registry: TargetedEventHandler<
		// net.minecraft.resources.ResourceKey<net.minecraft.core.Registry<?>>
		string,
		_.dev.latvian.mods.kubejs.registry.ServerRegistryKubeEvent<any>
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
