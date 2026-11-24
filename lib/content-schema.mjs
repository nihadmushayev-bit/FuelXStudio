import {z} from 'zod';
export const localeIds=['az','en','ru'];
const text=z.string();
const languages=shape=>z.object({az:shape,en:shape,ru:shape});
const media=z.object({src:text,alt:languages(text)});
const base={id:text.regex(/^[a-z0-9-]+$/),slug:text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),status:z.enum(['draft','published']),cover:media.nullable()};
const project=z.object({...base,kind:z.literal('project'),year:z.number().int().min(1900).max(2200).nullable(),client:text,featured:z.boolean(),copy:languages(z.object({title:text,category:text,overview:text,objectives:text,design:text,development:text,results:text})),desktop:media.nullable(),tablet:media.nullable(),mobile:media.nullable(),gallery:z.array(media),liveUrl:z.url().regex(/^https?:\/\//).nullable(),services:z.array(text)});
const article=z.object({...base,kind:z.literal('article'),date:z.iso.date().nullable(),author:text,copy:languages(z.object({title:text,category:text,intro:text,sections:z.array(z.object({title:text,body:text,image:media.nullable()}))}))});
export const entrySchema=z.discriminatedUnion('kind',[project,article]).superRefine((e,ctx)=>{
  if(e.status!=='published')return;
  const fail=message=>ctx.addIssue({code:'custom',message});
  if(!e.cover?.src)fail('A published entry needs a cover.');
  if(e.kind==='project'&&!e.year)fail('Missing year.');
  if(e.kind==='article'&&(!e.author.trim()||!e.date))fail('Missing article author or date.');
  for(const l of localeIds){const c=e.copy[l];for(const [key,v] of Object.entries(c))if(typeof v==='string'&&!v.trim())fail(l+'.'+key+' is empty.');
    if(e.kind==='article'&&(!c.sections.length||c.sections.some(s=>!s.title.trim()||!s.body.trim())))fail('Incomplete article sections: '+l);}
  walkMedia(e,i=>{if(!i.src||localeIds.some(l=>!i.alt[l].trim()))fail('Media needs a source and localized alt text.')});
});
export function walkMedia(record,visit){
 if(!record||typeof record!=='object')return;
 if(typeof record.src==='string'&&record.alt){visit(record);return}
 for(const v of Object.values(record))walkMedia(v,visit);
}
