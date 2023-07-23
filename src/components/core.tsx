import { Component, JSX, createEffect, createSignal, mergeProps } from "solid-js";
import clsx from "clsx";
import { twMerge } from 'tailwind-merge'


export const Button = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" {...props} class={twMerge("px-2 rounded-md text-white font-medium bg-secondary", props.class)} />
)

export const Toggle: Component<{ on?: string, off?: string, onChange: (state: boolean) => void }> = (props) => {
  const merged = mergeProps({ on: "Stop", off: "Start" }, props);
  const [state, setState] = createSignal(false);
  return (
    <button
      tabIndex={-1}
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

export const Section: Component<{ title: string; children: JSX.Element; class?: string }> = (props) => {
  return (
    <div class={props.class}>
      <h2 class="text-2xl">{props.title}</h2>
      <div class="p-2">
        {props.children}
      </div>
    </div>
  )
}