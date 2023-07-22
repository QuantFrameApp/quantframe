import { onMount } from "solid-js";
import dbClient from './lib/db'
import { Inventory, TransactionControl } from "./widgets";

export default function App() {

  onMount(async () => {
    await dbClient.inventory.list()
  })

  return (
    <main class="h-screen from-slate-700 to-slate-900 bg-gradient-to-b px-2 text-primary">
      <Inventory/>
      <TransactionControl/>
      {/* <Visualizations/> */}
    </main>
  );
}
