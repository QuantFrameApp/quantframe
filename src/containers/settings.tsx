import { Component, createEffect, createSignal, onMount } from 'solid-js'
import { Button, HorizontalTabs, Section } from '../components'
import { settings } from '../lib/persistance'
import { useNavigate } from '@solidjs/router'
import wfmClient from '../api/wfmClient'


const WarframeMarket: Component<{}> = (props) => {

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

const General: Component<{}> = (props) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await wfmClient.auth.logout()
    
    navigate('/login')
    // TODO close settings page
  }

  return (
    <>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  )
}

export const Settings: Component<{}> = (props) => {
  return (
    <Section title="Settings" containerClass="bg-slate-700">
      <HorizontalTabs
        headers={[
          'General',
          'Warframe Market',
        ]}
        sections={[
          <General/>,
          <WarframeMarket />,
        ]}
      />

    </Section>
  )
}