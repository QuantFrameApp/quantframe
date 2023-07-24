import { DEV, createSignal, onMount } from 'solid-js'
import { Gear, Modal } from './components'
import { Clock, Inventory, Login, Settings, SplashScreen } from './containers/index'
import { itemCache, settings, user } from './lib/persistance'
import { Route, Routes, useNavigate } from '@solidjs/router'
import packageJson from '../package.json'

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

// @ts-ignore
window.debug = async () => {
  const config = structuredClone(await settings.get())
  const cache = structuredClone(await itemCache.get())
  const currentUser = structuredClone(await user.get())

  // @ts-ignore
  delete config.user_password
  // @ts-ignore
  delete config.access_token

  console.group('Debug')
  console.log(`pathname: ${window.location.pathname}`)
  console.log(`settings: ${JSON.stringify(config, null, 2)}`)
  console.log('cache:', cache.items)
  console.log('user', currentUser)

  console.groupEnd()
}

// TODO solid router to make this easier to manage

export default function App() {
  const navigate = useNavigate()
  const [settingsOpen, setSettingsOpen] = createSignal(false)

  const handleOpen = () => setSettingsOpen(true)
  const handleClose = () => setSettingsOpen(false)

  onMount(async () => {
    const atLeast1Second = artificialLoadTime(1000)
    const { access_token } = await settings.get()
    await atLeast1Second
    
    if (access_token === undefined) {
      navigate('/login')
    } else {
      navigate('/app')
    }
  })

  return (
    <div class="bg-slate-800 text-primary h-screen select-none">
      <Routes>
        <Route path="/" component={SplashScreen} />
        <Route path="/login" component={Login} />

        <Route path="/app" component={() => (
          <>
            <nav class="h-10 bg-slate-900 flex justify-between items-center px-2">
              <div class="inline-flex items-center">
                <img src="/icon.png" alt="icon" class="w-8 h-8 mr-2" />
                {DEV && (<span class="text-secondary font-bold mr-2">DEV</span>)}

                <span class="font-bold">QuantFrame</span>
                <span class="text-xs text-zinc-400 pt-1 mx-2">v{packageJson.version}</span>
              </div>
              <Gear class="h-8 w-8" onClick={handleOpen} />
            </nav>
            <main class="px-2 ">
              <Clock />
              <Inventory />
              {/* <TransactionControl /> */}
              {/* <Visualizations/> */}
              <Modal open={settingsOpen()} onClose={handleClose}>
                <Settings />
              </Modal>
            </main>
          </>
        )}/>
      </Routes>
    </div>
  )
}
