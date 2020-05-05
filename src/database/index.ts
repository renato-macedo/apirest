import fs from 'fs';

import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

type DB = { read: () => Promise<any>; write: (data: any) => Promise<void> };

const config = {
  development: './src/database/db.json',
  production: './src/database/db.json',
  testing: './src/database/db.test.json',
};

function NewDB() {
  let Store: DB;
  console.log(process.env.NODE_ENV);
  const filepath = config[process.env.NODE_ENV];

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
