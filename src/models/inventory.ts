import { db } from './db'

export type InventoryType = {
  id: number;
  name: string;
  purchase_price: number;
  listed_price: number;
  number: number;
}

export default class inventory {
  constructor() {
    db.execute(/*sql*/`
      CREATE TABLE if not exists ${inventory.name}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        purchase_price REAL NOT NULL,
        listed_price INTEGER,
        number INTEGER NOT NULL
      ) STRICT;
    `)
  }

  async list() {
    return db.select(/*sql*/`SELECT * FROM ${inventory.name}`)
  }

  async upsert() {
    // await db.execute(/*sql*/`INSERT INTO inventory (name, quantity, price) VALUES ('test', 1, 1.00)`);
  }
}