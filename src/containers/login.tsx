import { Component, Match, Switch, createSignal, onMount } from 'solid-js'
import { Button, Center, Checkmark, Eye, EyeSlash, Section, Spinner, XMark } from '../components'
import { Loading } from '../lib/types'
import wfmClient from '../lib/wfmClient'
import { useNavigate } from '@solidjs/router'
import settings, { itemCache, user } from '../lib/persistance'

export const Login: Component<{}> = (props) => {
  let formRef: HTMLFormElement|undefined = undefined
  const [loading, setLoading] = createSignal<Loading>('idle')
  const [error, setError] = createSignal('')

  onMount(async () => {
    const { user_email, user_password } = await settings.get()

    if (formRef) {
      formRef.username.value = user_email
      if (user_password) {
        formRef.password.value = user_password
        formRef.rememberMe.checked = true
      }

      if (formRef.username.value === '') {
        formRef.username.focus()
      } else {
        formRef.password.focus()
      }
    }
  })

  const navigate = useNavigate()

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setLoading('loading')
    const form = e.currentTarget as HTMLFormElement
    const { username, password, rememberMe } = form    

    await settings.update({ user_email: username.value })
    if (rememberMe.checked) {
      await settings.update({ user_password: password.value })
    }
    const [currentUser, err] = await wfmClient.auth.login(username.value, password.value)
    console.log(currentUser, err)
    
    if (err) {
      console.error(err)
      setError('Something went wrong..')
      setLoading('error')
      return
    }

    if (currentUser) {
      setLoading('success')
      await user.update(currentUser)
      setTimeout(() => {
        navigate('/app')
      }, 800)
    } else {
      setLoading('error')
    }
  }

  const [revealPassword, setRevealPassword] = createSignal(false)

  return (
    <Center>
      <img src="/icon.png" alt="icon" class="w-24 h-24 mr-2" />
      <Section title="Warframe.market Login">
        <form ref={formRef} class="flex flex-col item-center" onSubmit={handleSubmit}>
          <div class="my-2">
            <input class="bg-slate-600 text-white w-full" type="text" name="username" placeholder="username"></input>
          </div>
          <div class="my-2">
            <span class="relative flex">
              <input class="bg-slate-600 text-white w-full" type={revealPassword() ? 'text' : 'password'} name="password" placeholder="password"/>
              <span class="absolute right-0">
                {revealPassword() ? (
                  <EyeSlash onClick={() => setRevealPassword(false)} />
                ) : (
                  <Eye onClick={() => setRevealPassword(true)} />
                )}
              </span>
            </span>
            <input type="checkbox" class="mr-1" name="rememberMe" id="rememberMe" />
            <label for="rememberMe">rememberMe password</label>
          </div>
          <Button class="mt-2" type="submit" value="Login">
            <Switch fallback={<span>Login</span>}>
              <Match when={loading() === 'loading'}>
                <span class="inline-flex items-center">
                  Loading...
                  <Spinner class="ml-4 h-4 w-4 fill-tertiary"/>
                </span>
              </Match>
              <Match when={loading() === 'success'}>
                <span class="inline-flex items-center">
                  Success!
                  <Checkmark class="text-tertiary stroke-2" />
                </span>
              </Match>
              <Match when={loading() === 'error'}>
                <span class="inline-flex items-center">
                  Something went wrong..
                  <XMark class="text-red-500 stroke-2" />
                </span>
              </Match>
            </Switch>
          </Button>
        </form>
        {loading() === 'error' && error() &&(
          <div class="bg-red-400 bg-opacity-50 text-center mt-2">
            <span>{error()}</span>
          </div>
        )}

        <div class="bg-slate-900 p-2 mt-4 flex flex-col">
          <h3 class="text-3xl mb-2">Beta Tools</h3>
          <Button onClick={async () => {
            await settings.reset()
            await user.reset()
            await itemCache.reset()
            window.location.reload()
          }}>Clear Data</Button>
        </div>
      </Section>
    </Center>
  )
}