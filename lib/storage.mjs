import {DatabaseSync} from 'node:sqlite';
import {mkdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
export function dataRoot(){return resolve(process.env.STUDIO_DATA_DIR || './data')}
export function database(){
  const root=dataRoot();
  if(globalThis.__fuelStudioDB?.root===root) return globalThis.__fuelStudioDB.connection;
  mkdirSync(root,{recursive:true});
  const connection=new DatabaseSync(join(root,'studio.sqlite'));
  connection.exec(`PRAGMA busy_timeout=5000; PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS entries (kind TEXT NOT NULL, id TEXT NOT NULL, slug TEXT NOT NULL, published INTEGER NOT NULL, payload TEXT NOT NULL, PRIMARY KEY(kind,id), UNIQUE(kind,slug));
    CREATE TABLE IF NOT EXISTS media (kind TEXT, entry_id TEXT, filename TEXT, PRIMARY KEY(kind,entry_id,filename));
    CREATE INDEX IF NOT EXISTS media_filename ON media(filename);
    CREATE TABLE IF NOT EXISTS inquiries (id TEXT PRIMARY KEY, created INTEGER NOT NULL, payload TEXT NOT NULL, status TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS limits (token TEXT PRIMARY KEY, bucket INTEGER NOT NULL, count INTEGER NOT NULL);`);
  globalThis.__fuelStudioDB={root,connection}; return connection;
}