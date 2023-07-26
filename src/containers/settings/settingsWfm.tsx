import { Component } from 'solid-js'
import { SettingsSection } from './types'

const WarframeMarket: Component = () => {

  const handleSubmit = async () => {
  }
  return (
    <form class="flex flex-col" onSubmit={handleSubmit}>
      {/* <input class="mb-2 px-1 text-black"
        autocomplete="off"
        // value={username()}
        // onInput={(e) => setUsername(e.currentTarget.value)}
        type="text"
        name="username"
        placeholder="username"
      />
      <Button type="submit" class="w-32">Save</Button> */}
    </form>
  )
}

export default {
  Component: WarframeMarket,
  name: 'Warframe.Market',
} as SettingsSection