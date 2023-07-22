import { Component, createSignal, onCleanup, onMount } from "solid-js";
import { DateTime } from 'luxon'


const FORMAT = 'hh:mm:ss'

function timeUntilMidnight(dt: luxon.DateTime) {
  const nextMidnight = dt.plus({ days: 1 }).startOf('day')
  return nextMidnight.diff(dt).toFormat(FORMAT)
}

export const Clock: Component = (props) => {
  const [now, setNow] = createSignal<luxon.DateTime>(DateTime.local());
  let timerRef: number;

  onMount(() => {
    timerRef = window.setInterval(() => {
      setNow(DateTime.local())
    }, 1000) // technically could be off by a few ms, but ¯\_(ツ)_/¯
  })

  onCleanup(() => {
    window.clearInterval(timerRef)
  })

  return (
    <div>
      <div>GMT: {now().toFormat(FORMAT)}</div>
      <div>Time Until Reset: {timeUntilMidnight(now())}</div>
    </div>
  )
};