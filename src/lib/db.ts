import Database from "tauri-plugin-sql-api";

import { appConfigDir } from "@tauri-apps/api/path";
import { SQL_LITE_DB_PATH } from "./constants";
const path = await appConfigDir()
console.log('App config path: ', path);

const db = await Database.load(SQL_LITE_DB_PATH);

// Install vscode extension es6-string-html to get sql syntax highlighting

class InventoryTable {
  constructor() {
    db.execute(/*sql*/`
      CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY,
        name TEXT,
        quantity INTEGER,
        price REAL
      );
    `)
  }

  async list() {
    return db.select(/*sql*/`SELECT * FROM inventory`);
  }

  async upsert() {
    // await db.execute(/*sql*/`INSERT INTO inventory (name, quantity, price) VALUES ('test', 1, 1.00)`);
  }
}

export default {
  inventory: new InventoryTable(),
}