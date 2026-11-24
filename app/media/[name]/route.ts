import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {database,dataRoot} from '@/lib/storage.mjs';
import {features} from '@/config/site';
export async function GET(_:Request,{params}:{params:Promise<{name:string}>}){
 const {name}=await params;if(!/^[a-f0-9]{64}\.webp$/.test(name))return new Response(null,{status:404});
 const found=database().prepare("SELECT 1 FROM media m JOIN entries e ON e.kind=m.kind AND e.id=m.entry_id WHERE m.filename=? AND e.published=1 AND (e.kind='project' OR ?=1) LIMIT 1").get(name,Number(features.showArticles));
 if(!found)return new Response(null,{status:404});
 try{return new Response(new Uint8Array(await readFile(join(dataRoot(),'media',name))),{headers:{'Content-Type':'image/webp','Cache-Control':'public, max-age=0, must-revalidate'}})}catch{return new Response(null,{status:404})}
}
