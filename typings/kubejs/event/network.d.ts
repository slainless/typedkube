interface NetworkEvents {
	dataReceived: TargetedEventHandler<
		// java.lang.String
		string,
		_.dev.latvian.mods.kubejs.net.NetworkKubeEvent
	>
}
declare const NetworkEvents: NetworkEvents
