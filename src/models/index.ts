import inventory from './inventory';
import settings from './settings';
import transactions from './transactions';

export default {
  inventory: new inventory(),
  settings: new settings(),
  transactions: new transactions(),
}

export * from './inventory';
export * from './settings';
export * from './transactions';