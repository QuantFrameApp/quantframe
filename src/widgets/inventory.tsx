import { Section } from "../lib/components"

type InventoryItem = {
  // id: number
  name: string
  avgPrice: number
  listedPrice: number
  owned: number
}

export const Inventory = () => {
  return (
    <Section title="Inventory Manager">
      <form>
        <h2>Purchase new item:</h2>
        <label for="item">Item:</label>
        <input
          type="text"
          id="item"
          name="item"
          required
        />
        <label for="price">Price:</label>
        <input type="number" id="price" name="price" required></input>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Item 1</td>
              <td>$1.00</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Item 2</td>
              <td>$2.00</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Item 3</td>
              <td>$3.00</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  )
}