type TargetedEventHandler<K, E> = (
	target: K,
	callback: (event: E) => void,
) => void
type EventHandler<E> = (callback: (event: E) => void) => void
