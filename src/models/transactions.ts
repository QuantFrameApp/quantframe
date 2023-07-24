import { db } from './db'

export type TransactionType = {
  id: number;
  name: string;
  created_at: string;
  transaction_type: string;
  price: number;
}

export default class transactions {
  constructor() {
    db.execute(/*sql*/`
      CREATE TABLE IF NOT EXISTS ${transactions.name} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        created_at TEXT,
        transaction_type TEXT,
        price INTEGER
      ) STRICT;
    `)
  }
}
