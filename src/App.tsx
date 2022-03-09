import { Component, createSignal, For } from "solid-js";
import { createInView } from "./inview";

import {
  TransitionGroup,
  animateEnter,
  animateExit,
  animateMove,
} from "@otonashixav/solid-flip";

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
	const [els, setEls] = createSignal<HTMLDivElement[]>([]);

	function buildThresholdList() {
		let thresholds = [];
		let numSteps = 20;

		for (let i = 1.0; i <= numSteps; i++) {
			let ratio = i / numSteps;
			thresholds.push(ratio);
		}

		thresholds.push(0);
		return thresholds;
	}
	const { observe, activeEls } = createInView({
		gapFrom: {
			top: "160px",
			bottom: "160px",
		},
		threshold: buildThresholdList(),
		onEnter: (entry: IntersectionObserverEntry, intersectionRatio: number, scrollingTo: any) => {
			animateTo(
				entry.target.firstElementChild,
				{
					opacity: [0, 1],
					transform: ["scale(0) translateY(0px)", "scale(1) translateY(20px)"],
				},
				{
					duration: 300,
					easing:'cubic-bezier(.5, 1.25, .75, 1.25)',
				}
			);
		},
		onLeave: (entry: IntersectionObserverEntry, intersectionRatio: number, scrollingTo: any) => {
			animateTo(
				entry.target.firstElementChild,
				{
					opacity: [1, 0],
					transform: ["scale(1) translateY(20px)","scale(0) translateY(0px)"],
				},
				{
					duration: 300,
					easing:'cubic-bezier(.5, -.3, .1, 1.5)'
				}
			);
		},
	});
	return (
		<>
			<section class="min-h-screen relative p-10 h-full w-full flex flex-col items-center bg-white">
				<div class={`fixed top-0 w-full h-10 flex items-center justify-center`}>
					        <TransitionGroup
          onEntering={(els) => console.log("entering", els)}
          onEntered={(els) => console.log("entered", els)}
          onExiting={(els) => console.log("exiting", els)}
          onExited={(els) => console.log("exited", els)}
          move={animateMove({ options: { duration: 1000 } })}
          enter={animateEnter(
            {
              keyframes: [
                {
                  transform: "translateY(30px)",
                  composite: "add",
                  offset: 0,
                },
                {
                  opacity: 0,
                  offset: 0,
                },
              ],
              options: {
                duration: 1000,
              },
            },
            { reverseExit: true, unabsolute: true }
          )}
          exit={animateExit(
            {
              keyframes: [
                {
                  transform: "translateY(-30px)",
                  composite: "add",
                  offset: 1,
                },
                {
                  opacity: 0,
                  offset: 1,
                },
              ],
              options: {
                duration: 1000,
              },
            },
            { absolute: true, reverseEnter: true }
          )}
        >
					<For each={activeEls()} >
					{(activeEl,i) => (
						<div class={`px-2 py-1 rounded-lg mx-2 ${activeEl.firstElementChild.classList[0]} ${activeEl.firstElementChild.classList[1]}  `} >
							{activeEl.textContent}
						</div>
					)}
					</For>
					</TransitionGroup>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-cyan-100 text-cyan-900 w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						1 CYAN
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-cyan-200 text-cyan-800 w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2">
						2 CYAN
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-cyan-300 text-cyan-700 w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2">
						3 CYAN
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-cyan-400 text-white w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2">
						4 CYAN
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-cyan-500 text-white w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						5 CYAN
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-cyan-600 text-white w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						6 CYAN
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-cyan-700 text-white w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						7 CYAN
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-cyan-800 text-white w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						8 CYAN
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-cyan-900 text-white w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						9 CYAN
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-blue-900 text-white w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						11 BLUE
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-blue-800 text-white w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						12 BLUE
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-blue-700 text-white w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						13 BLUE
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-blue-600 text-white w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						14 BLUE
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-blue-500 text-white w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						15 BLUE
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-blue-400 text-white w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						16 BLUE
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-blue-300 text-blue-600 w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						17 BLUE
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-blue-200 text-blue-700 w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						18 BLUE
					</div>
				</div>
				<div
					class="w-full h-20 my-10"
					ref={(el) => {
						setEls([...els(), el]);
						observe(el);
					}}>
					<div class="bg-blue-100 text-blue-900 w-full h-20 relative opacity-0 rounded-xl flex items-center justify-center scale-110 translate-y-2 ">
						19 BLUE
					</div>
				</div>
			</section>
		</>
	);
};

export default App;
