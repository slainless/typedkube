type TargetedEventHandler<K, E> = {
	(callback: (event: E) => void): void
	(target: K, callback: (event: E) => void): void
}
type EventHandler<E> = (callback: (event: E) => void) => void
