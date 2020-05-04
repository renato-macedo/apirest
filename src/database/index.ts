import fs from 'fs';

import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

type DB = { read: () => Promise<any>; write: (data: any) => Promise<void> };

export function NewDB() {
  let Store: DB;

  function connect(filepath: string) {
    Store = {
      async read() {
        const buff = await readFile(filepath);
        const data = buff.toString();
        const dbObject = JSON.parse(data); // will throw if the file has no valid json

        return dbObject;
      },
      write(data: any) {
        return writeFile(filepath, JSON.stringify(data));
      },
    };
  }

  return {
    getStore: () => Store,
    connect,
  };
}

// Singleton
export const Database = NewDB();
