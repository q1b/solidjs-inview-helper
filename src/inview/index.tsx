import { createSignal, createEffect, createMemo, createReaction, on, onMount, createUniqueId, onCleanup, mapArray } from "solid-js";

export const observerErr =
	"💡 solid-inview: the browser doesn't support Intersection Observer, please install polyfill: https://github.com/wellyshen/react-cool-inview#intersection-observer-polyfill";
export const observerWarn = "💡 solid-inview: the browser doesn't support Intersection Observer v2, fallback to v1 behavior";

interface IntersectionObserverEntryV2 extends IntersectionObserverEntry {
	readonly isVisible?: boolean;
}

type ScrollingTo = "top" | "right" | "bottom" | "left";

interface Observe<T> {
	(element?: T | null): void;
}

interface Event<T> {
	readonly entry: IntersectionObserverEntryV2;
	readonly scrollDirection: ScrollingTo;
	observe: Observe<T>;
	unobserve: () => void;
}

export interface Options<T> {
	root?: HTMLElement | null;
	rootMargin?: string;
	threshold?: number | number[];
	trackVisibility?: boolean;
	delay?: number;
	unobserveOnEnter?: boolean;
	onChange?: (event: Event<T> & { inView: boolean }) => void;
	onEnter?: (event: Event<T>) => void;
	onLeave?: (event: Event<T>) => void;
}

interface Return<T> extends Omit<Event<T>, "entry"> {
	inView: boolean;
	entry?: IntersectionObserverEntryV2;
	updatePosition: () => void;
}

interface State {
	inView: boolean;
	scrollDirection: ScrollingTo;
	entry?: IntersectionObserverEntryV2;
}

// const useInView = <T extends HTMLElement | null>({}: Options<T> = {}): Return<T> => {

// };
type ElsDetail = { id: number; el: HTMLElement;  };
type ElsDetails = ElsDetail[];
// utility to generate && remove els detail obj
export const remove = (arr: ElsDetails, item: ElsDetail) => {
	const newArr = [...arr];
	newArr.splice(
		newArr.findIndex((i) => i === item),
		1
	);
	return newArr;
};

function makeUniqueAddMethod() {
	let newIndex = 0;
	return (arr: ElsDetails, el: HTMLElement ): ElsDetails => {
		newIndex = newIndex + 1;
		return [...arr, { id: newIndex, el }];
	};
}

interface GapFrom {
	x: string;
	y: string;
	all: string;
	top: string;
	bottom: string;
	left: string;
	right: string;
}

/**
 * Generate RootMargin from given string in form of top,right,bottom,left
 * @param {string|GapFrom}
 * @returns {string}
 */
const extractGap = (gapFrom: string | GapFrom): string => {
	if (typeof gapFrom === "string") {
		return gapFrom;
	} else {
		let left = "",
			right = "",
			top = "",
			bottom = "",
			all = "";
		for (let index = 0; index < Object.keys(gapFrom).length; index++) {
			const gapType = Object.keys(gapFrom)[index];
			const gapValue = `-${Object.values(gapFrom)[index]}`;
			switch (gapType) {
				case "x":
					left = gapValue;
					right = gapValue;
					break;
				case "y":
					top = gapValue;
					bottom = gapValue;
					break;
				case "left":
					left = gapValue;
					break;
				case "right":
					right = gapValue;
					break;
				case "top":
					top = gapValue;
					break;
				case "bottom":
					bottom = gapValue;
					break;
				case "all":
					top = gapValue;
					right = gapValue;
					bottom = gapValue;
					left = gapValue;
					break;
				default:
					break;
			}
		}
		return `${top || "0px"} ${right || "0px"} ${bottom || "0px"} ${left || "0px"}`;
	}
};

export const createInView = (props: any) => {
	const [els, setEls] = createSignal<ElsDetails>([]);
	const [activeEls, setActiveEls] = createSignal<Element[]>([]);
	const [prevPos,setPrevPos] = createSignal<{x?:number;y?:number;}>({});
	const [scrollingTo,setScrollingTo] = createSignal<ScrollingTo>("bottom");
	
	const gapFrom = extractGap(props?.gapFrom);
	const addEls = makeUniqueAddMethod();
	const mapped = mapArray(els, (model) => {
		const [el, setEl] = createSignal(model.el);
		return {
			id: model.id,
			get el() {
				return el();
			},
			setEl,
		};
	});

	const observe = (element: any) => {
		setEls(addEls(els(), element));
	};

	onMount(() => {
		let obv = new IntersectionObserver(
			(entries: IntersectionObserverEntryV2[]) => {
				document.body.getBoundingClientRect().y  > prevPos()?.y ? setScrollingTo("top") : setScrollingTo("bottom");
				setPrevPos(document.body?.getBoundingClientRect() || {});
				for (let index = 0; index < entries.length; index++) {
					const entry = entries[index];
					const mappedDetail = mapped().find((e) => e.el === entry.target);
					const {
						intersectionRatio,
						isIntersecting,
						boundingClientRect: { x, y },
						isVisible,
					} = entry;
					if (isIntersecting) {
						if(!activeEls().includes(entry.target)){
							setActiveEls((c) => [...c, entry.target]);
							props.onEnter(entry,intersectionRatio,scrollingTo);
						}
					} else {
						if (activeEls().includes(entry.target)) {
							props.onLeave(entry,intersectionRatio,scrollingTo);
							setActiveEls((c) => {
								const newArr = [...c];
								newArr.splice(
									newArr.findIndex((i) => i === entry.target),
									1
								);
								return newArr;
							});
						}
					}
				}
			},
			{
				rootMargin: gapFrom,
				threshold: props.threshold || 0.5,
			}
		);
		for (let i = 0; i < els().length; i++) {
			obv.observe(els()[i].el);
		}
		onCleanup(() => {
			obv.disconnect();
		});
	});
	return { observe, activeEls };
};
// export default useInView;
