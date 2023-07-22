import { Button, Section } from "../lib/components"

export const Inventory = () => {
  return (
    <Section title="Inventory Manager">
      <form class="flex flex-col items-center w-52">
        <h2>Purchase new item:</h2>
        <div class="p-2">
          <input
            placeholder="Item Name"
            class="bg-zinc-700 text-white border-secondary border-2 rounded-md"
            type="text"
            id="item"
            name="item"
            required
          />
        </div>
        <div class="p-2">
          <input
            placeholder="Price"
            class="bg-zinc-700 text-white border-secondary border-2 rounded-md"
            type="number"
            id="price"
            name="price"
            required
          />
        </div>
        <Button type="submit" class="px-4">Buy</Button>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Avg Purchase Price</th>
              <th>Owned</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </Section>
  )
}