import Database from "tauri-plugin-sql-api";

import { appConfigDir } from "@tauri-apps/api/path";
import { SQL_LITE_DB_PATH } from "./constants";
const path = await appConfigDir()
console.log('App config path: ', path);

const db = await Database.load(SQL_LITE_DB_PATH);

// Install vscode extension es6-string-html to get sql syntax highlighting

// Docs https://www.sqlite.org/lang.html

const placeholders = (count: number) => Array(count).fill("?").join(", ");

const upsert = (table: string, columns: string[], values: string[]) => {
  return db.execute(/*sql*/`
    INSERT INTO ${table} (
      ${columns.join(', ')}
    ) VALUES (
      ${placeholders(columns.length)}
    ) ON CONFLICT(${columns[0]}) DO UPDATE SET ${columns.filter((_, i) => i !== 0).map(c => `${c} = excluded.${c}`).join(', ')};
  `, values)
}

class InventoryTable {
  static _name = 'inventory';
  constructor() {
    db.execute(/*sql*/`
      CREATE TABLE IF NOT EXISTS ${InventoryTable._name} (
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

class SettingsTable {
  static _name = 'settings';
  constructor() {
    db.execute(/*sql*/`
      CREATE TABLE IF NOT EXISTS ${SettingsTable._name} (
        id INTEGER PRIMARY KEY,
        mastery_rank INTEGER,
      );
    `)
  }
}

class Trades {
  static _name = 'trades';
  constructor() {
    // Create table if not exists
    db.execute(/*sql*/`
      CREATE TABLE IF NOT EXISTS ${Trades._name} (
        id INTEGER PRIMARY KEY,
        created_at TEXT DEFAULT DATE('now')
        available_trades INTEGER,
        max_trades INTEGER,
      );
    `)
    
    // Create entry for today if not exists
    
  }

  async availableTrades() {
    return db.select(/*sql*/`SELECT available_trades FROM trades`);
  }

  async setAvailableTrades() {
    // await upsert(Trades._name, ['id', 'available_trades'], [1, 1])

    // await db.execute(/*sql*/`
    //   INSERT INTO ${Trades._name} (
    //     id, available_trades
    //   ) VALUES (
    //     1, 'value1', 'value2'
    //   ) ON CONFLICT(id) DO UPDATE SET available_trades = excluded.available_trades;
    // `);
  }
}

export default {
  inventory: new InventoryTable(),
  trades: new Trades(),
  settings: new SettingsTable(),
}
