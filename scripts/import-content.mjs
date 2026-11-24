import {readFileSync,readdirSync,statSync,mkdirSync,writeFileSync,existsSync} from 'node:fs';
import {resolve,dirname,join,extname} from 'node:path';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import {database,dataRoot} from '../lib/storage.mjs';
import {entrySchema,walkMedia} from '../lib/content-schema.mjs';
async function prepare(file){
 const entry=entrySchema.parse(JSON.parse(readFileSync(file,'utf8').replace(/^\uFEFF/,'')));
 const images=[];walkMedia(entry,i=>images.push(i));const names=new Set();
 for(const image of images){
  if(!image.src)continue;
  if(image.src.startsWith('/assets/')){
   if(!/^\/assets\/(editorial|portfolio)\/[\w.-]+$/.test(image.src)||!existsSync(resolve('public','.'+image.src)))throw Error('Unknown site asset '+image.src);
   continue;
  }
  if(image.src.startsWith('/media/')){
   const name=image.src.slice(7);if(!/^[a-f0-9]{64}\.webp$/.test(name)||!existsSync(join(dataRoot(),'media',name)))throw Error('Unknown media '+name);
   names.add(name);continue;
  }
  const bytes=await sharp(resolve(dirname(file),image.src),{limitInputPixels:85000000}).rotate().resize({width:3000,withoutEnlargement:true}).webp({quality:88}).toBuffer();
  const name=createHash('sha256').update(bytes).digest('hex')+'.webp', destination=join(dataRoot(),'media');
  mkdirSync(destination,{recursive:true});try{writeFileSync(join(destination,name),bytes,{flag:'wx'})}catch(e){if(e.code!=='EEXIST')throw e}
  image.src='/media/'+name;names.add(name);
 }
 return {entry,names};
}
try{
 const source=resolve(process.argv[2]||'content/projects');
 const files=statSync(source).isDirectory()?readdirSync(source).filter(x=>extname(x)==='.json').sort().map(x=>join(source,x)):[source];
 if(!files.length)throw Error('No JSON entries found');
 const rows=[];for(const file of files)rows.push(await prepare(file));
 if(new Set(rows.map(({entry:e})=>e.kind+'/'+e.id)).size!==rows.length)throw Error('Duplicate ID in import.');
 const db=database();db.exec('BEGIN IMMEDIATE');
 try{for(const {entry:e,names} of rows){
  db.prepare('INSERT INTO entries VALUES(?,?,?,?,?) ON CONFLICT(kind,id) DO UPDATE SET slug=excluded.slug,published=excluded.published,payload=excluded.payload').run(e.kind,e.id,e.slug,Number(e.status==='published'),JSON.stringify(e));
  db.prepare('DELETE FROM media WHERE kind=? AND entry_id=?').run(e.kind,e.id);
  for(const name of names)db.prepare('INSERT INTO media VALUES(?,?,?)').run(e.kind,e.id,name);
 }db.exec('COMMIT')}catch(e){db.exec('ROLLBACK');throw e}
 console.log('Imported '+rows.length+' entries into '+dataRoot());
}catch(e){console.error(e.message);process.exitCode=1}
