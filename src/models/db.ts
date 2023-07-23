import Database from "tauri-plugin-sql-api";

import { appConfigDir } from "@tauri-apps/api/path";
import { SQL_LITE_DB_PATH } from "../lib/constants";
const path = await appConfigDir()
console.log('App config path: ', path);

export const db = await Database.load(SQL_LITE_DB_PATH);

// Install vscode extension es6-string-html to get sql syntax highlighting

// Docs https://www.sqlite.org/lang.html

export const placeholders = (count: number) => Array(count).fill("?").join(", ");

export const upsert = (table: string, columns: string[], values: (string|number|boolean)[]) => {
  return db.execute(/*sql*/`
    INSERT INTO ${table} (
      ${columns.join(', ')}
    ) VALUES (
      ${placeholders(columns.length)}
    ) ON CONFLICT(${columns[0]}) DO UPDATE SET ${columns.filter((_, i) => i !== 0).map(c => `${c} = excluded.${c}`).join(', ')};
  `, values)
}




