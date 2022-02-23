import { Component, createSignal, createMemo } from "solid-js";
import { createInView } from "./inview";

export const remove = (arr: Element[], item: Element) => {
	const newArr = [...arr];
	newArr.splice(
		newArr.findIndex((i) => i === item),
		1
	);
	return newArr;
};

function animateTo(element: Element, keyframes: PropertyIndexedKeyframes, options: KeyframeAnimationOptions) {
	const anim = element.animate(keyframes, { ...options, fill: "both" });
	anim.addEventListener("finish", () => {
		anim.commitStyles();
		anim.cancel();
	});
	return anim;
}

const App: Component = () => {
	const [act, setAct] = createSignal("bg-slate-900");
	const { observe, activeEls } = createInView({
		gapFrom: {
			top: "40px",
			bottom: "40px",
		},
		onEnter: (entry: IntersectionObserverEntry, scrollingTo: any) => {
			switch (scrollingTo()) {
				case "top":
					animateTo(
						entry.target,
						{
							opacity: [0, 1],
							transform: ["translateY(-10px) scale(0)", "translateY(0px) scale(1)"],
						},
						{
							duration: 300,
						}
					);
					break;
				case "bottom":
					animateTo(
						entry.target,
						{
							opacity: [0, 1],
							transform: ["scale(1.1) translateY(8px)", "scale(1) translateY(0px)"],
						},
						{
							duration: 300,
						}
					);
					break;
				default:
					break;
			}
		},
		onLeave: (entry: IntersectionObserverEntry, scrollingTo: any) => {
			switch (scrollingTo()) {
				case "top":
					animateTo(
						entry.target,
						{
							opacity: [1, 0],
							transform: ["scale(1) translateY(0px)", "scale(1.1) translateY(8px)"],
						},
						{
							duration: 300,
						}
					);
					break;
				case "bottom":
					animateTo(
						entry.target,
						{
							opacity: [1, 0],
							transform: ["translateY(0px) scale(1.1)", "translateY(-10px) scale(0)"],
						},
						{
							duration: 300,
						}
					);
					break;
				default:
					break;
			}
			// console.log(scrollingTo());
		},
	});
	const textContent = createMemo(() => {
		const textsList: string[] = [];
		activeEls().forEach((el) => {
			textsList.push(el.textContent ?? " ");
		});
		return textsList.join(" ");
	});
	return (
		<>
			<section class="min-h-screen relative p-10 h-full w-full flex flex-col items-center bg-white">
				<div class={`fixed top-0 ${act()} bg-opacity-80 backdrop-blur-sm w-full h-10 flex items-center justify-center`}>
					{textContent()}
				</div>
				<div
					ref={observe}
					class="bg-cyan-100 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-cyan-900 scale-110 translate-y-2 ">
					1 CYAN
				</div>
				<div
					ref={observe}
					class="bg-cyan-200 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-cyan-800 scale-110 translate-y-2">
					2 CYAN
				</div>
				<div
					ref={observe}
					class="bg-cyan-300 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-cyan-700 scale-110 translate-y-2">
					3 CYAN
				</div>
				<div
					ref={observe}
					class="bg-cyan-400 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-white scale-110 translate-y-2">
					4 CYAN
				</div>
				<div
					ref={observe}
					class="bg-cyan-500 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-white scale-110 translate-y-2 ">
					5 CYAN
				</div>
				<div
					ref={observe}
					class="bg-cyan-600 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-white scale-110 translate-y-2 ">
					6 CYAN
				</div>
				<div
					ref={observe}
					class="bg-cyan-700 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-white scale-110 translate-y-2 ">
					7 CYAN
				</div>
				<div
					ref={observe}
					class="bg-cyan-800 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-white scale-110 translate-y-2 ">
					8 CYAN
				</div>
				<div
					ref={observe}
					class="bg-cyan-900 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-white scale-110 translate-y-2 ">
					9 CYAN
				</div>
				<div
					ref={observe}
					class="bg-blue-900 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-white scale-110 translate-y-2 ">
					11 BLUE
				</div>
				<div
					ref={observe}
					class="bg-blue-800 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-white scale-110 translate-y-2 ">
					12 BLUE
				</div>
				<div
					ref={observe}
					class="bg-blue-700 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-white scale-110 translate-y-2 ">
					13 BLUE
				</div>
				<div
					ref={observe}
					class="bg-blue-600 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-white scale-110 translate-y-2 ">
					14 BLUE
				</div>
				<div
					ref={observe}
					class="bg-blue-500 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-white scale-110 translate-y-2 ">
					15 BLUE
				</div>
				<div
					ref={observe}
					class="bg-blue-400 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-white scale-110 translate-y-2 ">
					16 BLUE
				</div>
				<div
					ref={observe}
					class="bg-blue-300 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-blue-600 scale-110 translate-y-2 ">
					17 BLUE
				</div>
				<div
					ref={observe}
					class="bg-blue-200 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-blue-700 scale-110 translate-y-2 ">
					18 BLUE
				</div>
				<div
					ref={observe}
					class="bg-blue-100 w-full h-20 mt-10 opacity-0 rounded-xl flex items-center justify-center text-blue-900 scale-110 translate-y-2 ">
					19 BLUE
				</div>
			</section>
		</>
	);
};

export default App;
