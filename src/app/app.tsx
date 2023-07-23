import { createSignal } from "solid-js";
import { Gear, Modal } from "../components";
import { Clock, Inventory, Settings, TransactionControl } from "./index";

export default function App() {
  const [settingsOpen, setSettingsOpen] = createSignal(false);

  const handleOpen = () => setSettingsOpen(true);
  const handleClose = () => setSettingsOpen(false);

  return (
    <div class="from-slate-700 to-slate-900 bg-gradient-to-t text-primary h-screen select-none">
      <nav class="h-10 bg-slate-950 flex justify-between items-center px-2">
        <span class="font-bold">QuantFrame</span>
        <Gear class="h-8 w-8" onClick={handleOpen} />
      </nav>
      <main class="px-2 ">
        <Clock/>
        <Inventory/>
        <TransactionControl/>
        {/* <Visualizations/> */}
        <Modal open={settingsOpen()} onClose={handleClose}>
          <Settings/>
        </Modal>
      </main>
    </div>
  );
}
