import { Component, createEffect, createSignal, onMount } from "solid-js";
import { Button, HorizontalTabs, Section } from "../components";
import { Store } from "tauri-plugin-store-api";
import { SETTINGS_FILE, SETTINGS_KEYS } from "../lib/constants";

const store = new Store(SETTINGS_FILE);

const WarframeMarket: Component<{}> = (props) => {
  const [username, setUsername] = createSignal("");
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    const uname = await store.get<string>(SETTINGS_KEYS.WFM_USERNAME)
    if (uname) {
      setUsername(uname)
    }
    setLoading(false)
  })

  const handleSubmit = async () => {
    await store.set(SETTINGS_KEYS.WFM_USERNAME, username())
  }
  return (
    <>
      {loading() ? <p>Loading...</p> : (
        <form class="flex flex-col" onSubmit={handleSubmit}>
          <input class="mb-2 px-1 text-black"
            autocomplete="off"
            value={username()}
            onInput={(e) => setUsername(e.currentTarget.value)}
            type="text"
            name="username"
            placeholder="username"
          />
          <Button type="submit" class="w-32">Save</Button>
        </form>
      )}
    </>
  )
}

export const Settings: Component<{}> = (props) => {


  return (
    <Section title="Settings" containerClass="bg-slate-700">
      <HorizontalTabs
        headers={[
          "Warframe Market",
        ]}
        sections={[
          <WarframeMarket />,
        ]}
      />

    </Section>
  )
};