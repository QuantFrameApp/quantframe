import { db, upsert } from "./db";

export type SettingsType = {
  mastery_rank: number;
}
export default class settings {
  constructor() {
    db.execute(/*sql*/`
      CREATE TABLE IF NOT EXISTS ${settings.name} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mastery_rank INTEGER,
      );
    `)
  }

  async get() {
    return db.select<SettingsType>(/*sql*/`SELECT * FROM ${settings.name}`);
  }

  async set(newSettings: Partial<SettingsType>) {
    const columns = ['id', ...Object.keys(newSettings)];
    const values = [1, ...Object.values(newSettings)]
    return upsert(settings.name, columns, values);
  }
}