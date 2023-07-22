import { Component, JSX, createEffect, createSignal, mergeProps } from "solid-js";
import clsx from "clsx";


export const Toggle: Component<{ on?: string, off?: string, onChange: (state: boolean) => void }> = (props) => {
  const merged = mergeProps({ on: "Stop", off: "Start" }, props);
  const [state, setState] = createSignal(false);
  return (
    <button
      class={clsx(
        "px-2 rounded-md text-white font-medium",
        { "bg-secondary": !state(), "bg-red-500": state() }
      )}
      type="button"
      onClick={() => setState(!state())}
    >
      {state() ? merged.on : merged.off}
    </button>
  )
}

export const Section: Component<{ title: string; children: JSX.Element }> = (props) => {
  return (
    <div>
      <h2 class="text-2xl">{props.title}</h2>
      <div class="p-2">
        {props.children}
      </div>
    </div>
  )
}