declare function setInterval(
	handler: TimerHandler,
	timeout?: number,
	...arguments: any[]
): number;
/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/setTimeout) */
declare function setTimeout(
	handler: TimerHandler,
	timeout?: number,
	...arguments: any[]
): number;
/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/structuredClone) */
declare function clearInterval(id: number | undefined): void;
/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/clearTimeout) */
declare function clearTimeout(id: number | undefined): void;
/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/createImageBitmap) */
