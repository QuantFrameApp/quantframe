import { DateTime, DurationLike } from "luxon";
import { Component, createSignal, onCleanup, onMount } from "solid-js";

export const Countdown: Component<{
  time: DurationLike;
  format?: string;
  onEnd?: () => void;
  class?: string
}> = (props) => {
  let timerRef: number;
  const [remaining, setRemaining] = createSignal('');

  onMount(() => {
    const end = DateTime.now().plus(props.time)
    timerRef = setInterval(() => {
      const now = DateTime.now()
      const remaining = end.diff(now)
      setRemaining(remaining.toFormat(props.format || `m'm' ss`))
      if (remaining.milliseconds <= 0) {
        clearInterval(timerRef)
        props.onEnd?.()
      }
    }, 1000)
  })

  onCleanup(() => {
    window.clearInterval(timerRef)
  })

  return (
    <span class={props.class}>
      {remaining()}
    </span>
  )
}