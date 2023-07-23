import { Component, createSignal } from "solid-js";
import { Section, Toggle } from "../components/core";

export const TransactionControl: Component = () => {
  const [statsReaderStatus, setStatsReaderStatus] = createSignal(false);
  const [liveUpdaterStatus, setLiveUpdaterStatus] = createSignal(false);
  const [screenReaderStatus, setScreenReaderStatus] = createSignal(false);
  return (
    <Section title="Transaction Control">
      <div class="m-1">
        <Toggle onChange={setStatsReaderStatus} /> - Stats Reader Status: {statsReaderStatus() ? "Running" : "Not Running"}
      </div>
      <div class="m-1">
        <Toggle onChange={setLiveUpdaterStatus} /> - Live Updater Status: {liveUpdaterStatus() ? "Running" : "Not Running"}
      </div>
      <div class="m-1">
        <Toggle onChange={setScreenReaderStatus} /> - Screen Reader Status: {screenReaderStatus() ? "Running" : "Not Running"}
      </div>
    </Section>
  )
}