import { createEffect, createSignal, onMount } from "solid-js";
import { Gear, Modal } from "../components";
import { Clock, Inventory, Login, Settings, SplashScreen, TransactionControl } from "./index";
import { itemCache, settings } from "../models";
import { Route, Routes, useLocation, useNavigate } from "@solidjs/router";

// Consistent app load times FEEL faster than inconsistent load times
// Also splash screens are cool
function artificialLoadTime(ms: number) {
  const startTime = Date.now();
  return new Promise(resolve => {
    const now = Date.now();
    const timeElapsed = now - startTime;
    const timeLeft = ms - timeElapsed;
    setTimeout(resolve, timeLeft);
  });
}

// TODO solid router to make this easier to manage

export default function App() {
  const [settingsOpen, setSettingsOpen] = createSignal(false);

  const handleOpen = () => setSettingsOpen(true);
  const handleClose = () => setSettingsOpen(false);


  const navigate = useNavigate();

  createEffect(async () => {
    const location = useLocation()
    const config = await settings.get()
    const cache = await itemCache.get()

    config.user_password = '********'
    if (config.access_token) {
      config.access_token = `${config.access_token?.slice(0, 5)}************************`
    }

    console.group("Debug")
    console.log(`pathname: ${location.pathname}`);
    console.log(`settings: ${JSON.stringify(config, null, 2)}`);
    console.log('cache:', cache.items);
    console.groupEnd()
  })

  onMount(async () => {
    const atLeast1Second = artificialLoadTime(800);
    
    const { access_token } = await settings.get()

    await atLeast1Second;
    
    if (access_token === undefined) {
      navigate('/login')
    } else {
      navigate('/app')
    }
  })

  return (
    <div class="from-slate-700 to-slate-900 bg-gradient-to-t text-primary h-screen select-none">
      <Routes>
        <Route path="/" component={SplashScreen} />
        <Route path="/login" component={Login} />

        <Route path="/app" component={() => (
          <>
            <nav class="h-10 bg-slate-950 flex justify-between items-center px-2">
              <div class="inline-flex items-center">
                <img src="/icon.png" alt="icon" class="w-8 h-8 mr-2" />
                <span class="font-bold">QuantFrame</span>
              </div>
              <Gear class="h-8 w-8" onClick={handleOpen} />
            </nav>
            <main class="px-2 ">
              <Clock />
              <Inventory />
              <TransactionControl />
              {/* <Visualizations/> */}
              <Modal open={settingsOpen()} onClose={handleClose}>
                <Settings />
              </Modal>
            </main>
          </>
        )}/>
      </Routes>
    </div>
  );
}
