import { Component, ComponentProps, JSX, createEffect, createSignal, mergeProps } from "solid-js";
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

export const Section: Component<{
  title: JSX.Element | string;
  children: JSX.Element;
  class?: string;
  // TODO deprecate containerClass. I don't like it
  containerClass?: string;
}> = (props) => {
  if (typeof props.title === 'string') {
    return (
      <div class={props.containerClass}>
        <h2 class={twMerge("text-2xl", props.class)}>{props.title}</h2>
        <div class="p-2">
          {props.children}
        </div>
      </div>
    )
  }
  return (
    <div class={props.containerClass}>
      {props.title}
      <div class="p-2">
        {props.children}
      </div>
    </div>
  )
}

type TabProps = {
  headers: string[];
  sections: JSX.Element[];
}
export const HorizontalTabs: Component<TabProps> = (props) => {
  const [selected, setSelected] = createSignal(0);
  return (
    <div class="flex flex-col">
      <div class="flex flex-row">
        {props.headers.map((header, i) => (
          <button
            type="button"
            class={clsx("px-2 rounded-md text-white font-medium", { "bg-secondary": selected() === i })}
            onClick={() => setSelected(i)}
          >
            {header}
          </button>
        ))}
      </div>
      <div class="p-2">
        {props.sections[selected()]}
      </div>
    </div>
  )
}

export const Center: Component<{ children: JSX.Element; class?:string }> = (props) => (
  <div class={twMerge("h-screen w-screen flex flex-col justify-center items-center", props.class)}>
    {props.children}
  </div>
)
