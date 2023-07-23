import { db } from './db.ts';

// Not sure if this will be useful
export default class JsonTable<Data> {
  constructor(public name: string = 'json_table') {
    db.execute(/*sql*/`
      CREATE TABLE IF NOT EXISTS ${name} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data json
      );
    `)
  }

  async list() {
    return db.select<Data>(/*sql*/`SELECT * FROM ${this.name}`);
  }

  async insert(newData: Data) {
    return db.execute(/*sql*/`
      INSERT INTO ${this.name} (data) VALUES (?);
    `, [JSON.stringify(newData)])
  }

  async upsert(newData: Data) {
    return db.execute(/*sql*/`
      INSERT INTO ${this.name} (data) VALUES (?) ON CONFLICT(id) DO UPDATE SET data = excluded.data;
    `, [JSON.stringify(newData)]);
  }

  async delete(id: number) {
    return db.execute(/*sql*/`DELETE FROM ${this.name} WHERE id = ?`, [id]);
  }
}