import { Component, onMount } from 'solid-js'
import { APP_NAME } from '../lib/constants'
import { Center } from '../components'
import { useNavigate } from '@solidjs/router'
import settings from '../lib/persistance'

// Consistent app load times FEEL faster than inconsistent load times
// Also splash screens are cool
function artificialLoadTime(ms: number) {
  const startTime = Date.now()
  return new Promise(resolve => {
    const now = Date.now()
    const timeElapsed = now - startTime
    const timeLeft = ms - timeElapsed
    setTimeout(resolve, timeLeft)
  })
}

export const SplashScreen: Component = (props) => {
  const navigate = useNavigate()
  onMount(async () => {
    const atLeast1Second = artificialLoadTime(800)
    const { access_token } = await settings.get()
    await atLeast1Second    

    if (access_token === undefined) {
      navigate('/login')
    } else {
      navigate('/app')
    }
  })

  return (
    <Center>
      <img src="/icon.png" alt="icon" class="w-32 h-32"/>
      <h1 class="font-comic text-3xl">{APP_NAME}</h1>
    </Center>
  )
}