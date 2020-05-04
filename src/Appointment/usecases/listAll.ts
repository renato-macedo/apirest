import { Database } from '../../database';

export function listAll() {
  return Database.getStore().read();
}
