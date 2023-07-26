import { useNavigate } from '@solidjs/router'
import { SettingsSection } from './types'
import wfmClient from '../../api/wfmClient'
import { Button } from '../../components'
import { Component } from 'solid-js'

const App: Component = () => {
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

export default {
  Component: App,
  name: 'App',
} as SettingsSection