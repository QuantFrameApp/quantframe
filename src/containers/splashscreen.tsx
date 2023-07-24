import { Component } from 'solid-js'
import { APP_NAME } from '../lib/constants'
import { Center } from '../components'

export const SplashScreen: Component = (props) => {
  return (
    <Center>
      <img src="/icon.png" alt="icon" class="w-32 h-32"/>
      <h1 class="font-comic text-3xl">{APP_NAME}</h1>
    </Center>
  )
}