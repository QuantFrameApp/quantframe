import Database from "tauri-plugin-sql-api";

import { appConfigDir } from "@tauri-apps/api/path";
import { SQL_LITE_DB_PATH } from "./constants";
const path = await appConfigDir()
console.log('App config path: ', path);

const db = await Database.load(SQL_LITE_DB_PATH);

// Install vscode extension es6-string-html to get sql syntax highlighting

// Docs https://www.sqlite.org/lang.html

const placeholders = (count: number) => Array(count).fill("?").join(", ");

const upsert = (table: string, columns: string[], values: (string|number|boolean)[]) => {
  return db.execute(/*sql*/`
    INSERT INTO ${table} (
      ${columns.join(', ')}
    ) VALUES (
      ${placeholders(columns.length)}
    ) ON CONFLICT(${columns[0]}) DO UPDATE SET ${columns.filter((_, i) => i !== 0).map(c => `${c} = excluded.${c}`).join(', ')};
  `, values)
}

class inventory {
  constructor() {
    db.execute(/*sql*/`
      CREATE TABLE if not exists ${inventory.name}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        purchasePrice REAL NOT NULL,
        listedPrice INTEGER,
        number INTEGER NOT NULL
      ) STRICT;
    `)
  }

  async list() {
    return db.select(/*sql*/`SELECT * FROM ${inventory.name}`);
  }

  async upsert() {
    // await db.execute(/*sql*/`INSERT INTO inventory (name, quantity, price) VALUES ('test', 1, 1.00)`);
  }
}

type Settings = {
  mastery_rank: number;
}
class settings {
  constructor() {
    db.execute(/*sql*/`
      CREATE TABLE IF NOT EXISTS ${settings.name} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mastery_rank INTEGER,
      );
    `)
  }

  async get() {
    return db.select<Settings>(/*sql*/`SELECT * FROM ${settings.name}`);
  }

  async set(newSettings: Partial<Settings>) {
    const columns = ['id', ...Object.keys(newSettings)];
    const values = [1, ...Object.values(newSettings)]
    return upsert(settings.name, columns, values);
  }
}

// init.py - transactions
class transactions {
  constructor() {
    db.execute(/*sql*/`
      CREATE TABLE IF NOT EXISTS ${transactions.name} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        created_at TEXT,
        transactionType TEXT,
        price INTEGER
      ) STRICT;
    `)
  }
}

export default {
  inventory: new inventory(),
  settings: new settings(),
  transactions: new transactions(),
}
