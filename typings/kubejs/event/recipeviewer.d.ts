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
