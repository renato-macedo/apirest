import fs from 'fs';

import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

type DB = { read: () => Promise<any>; write: (data: any) => Promise<void> };

const config: { readonly [key: string]: string } = {
  development: './src/database/db.json',
  production: './src/database/db.json',
  test: './src/database/db.test.json',
};

function NewDB() {
  let Store: DB;

  const filepath =
    config[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'];
  function connect() {
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
