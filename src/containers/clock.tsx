import { Component, createSignal, onCleanup, onMount } from 'solid-js'
import { DateTime } from 'luxon'
import { CLOCK_FORMAT } from '../lib/constants'

function timeUntilMidnight(dt: DateTime) {
  const nextMidnight = dt.plus({ days: 1 }).startOf('day')
  return nextMidnight.diff(dt).toFormat(CLOCK_FORMAT)
}

export const Clock: Component = () => {
  let timerRef: number
  const [now, setNow] = createSignal(DateTime.utc())

  onMount(() => {
    timerRef = window.setInterval(() => {
      setNow(DateTime.utc())
    }, 1000)
  })

  onCleanup(() => {
    window.clearInterval(timerRef)
  })

  return (
    <div class="text-primary">
      {/* <div>GMT: {now().toFormat(CLOCK_FORMAT)}</div> */}
      <div>Time Until Reset: {timeUntilMidnight(now())}</div>
    </div>
  )
}