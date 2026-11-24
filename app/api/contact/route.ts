import {createHash} from 'node:crypto';
import {studio} from '@/config/site';
import {database} from '@/lib/storage.mjs';
import {deliver} from '@/lib/delivery.mjs';
import {inquirySchema,validationIssues} from '@/lib/inquiry';
const result=(status:number,code:string,errors?:Record<string,string>)=>Response.json({code,errors},{status,headers:{'Cache-Control':'no-store',...(status===429?{'Retry-After':'900'}:{})}});
async function limitedJson(req:Request){
 const reader=req.body?.getReader();if(!reader)throw Error();const chunks:Uint8Array[]=[];let size=0;
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>32000){await reader.cancel();throw RangeError()}chunks.push(value)}
 return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export async function POST(req:Request){
 const origin=req.headers.get('origin');if(origin&&origin!==(studio.baseUrl||new URL(req.url).origin))return result(403,'invalid');
 if(!studio.formEnabled)return result(503,'unavailable');
 if(!req.headers.get('content-type')?.includes('application/json'))return result(415,'invalid');
 let input;try{input=await limitedJson(req)}catch(e){return result(e instanceof RangeError?413:400,'invalid')}
 const parsed=inquirySchema.safeParse(input);if(!parsed.success)return result(422,'invalid',validationIssues(parsed.error));
 const q=parsed.data,db=database(),payload=JSON.stringify(q);
 const existing=db.prepare('SELECT payload FROM inquiries WHERE id=?').get(q.id);
 if(existing)return existing.payload===payload?result(200,'received'):result(409,'invalid');
 const ip=process.env.TRUSTED_CLIENT_IP_HEADER?req.headers.get(process.env.TRUSTED_CLIENT_IP_HEADER)?.split(',')[0]?.trim():undefined;
 const keys=[[q.email.toLowerCase(),3],['ip/'+(ip||'shared'),ip?8:60]] as const;
 const bucket=Math.floor(Date.now()/900000);
 db.exec('BEGIN IMMEDIATE');try{
  for(const [key,max] of keys){
   const hash=createHash('sha256').update(key).digest('hex');
   const record=db.prepare('SELECT count,bucket FROM limits WHERE token=?').get(hash);
   if(record?.bucket===bucket&&Number(record.count)>=max){db.exec('ROLLBACK');return result(429,'rateLimit')}
   db.prepare('INSERT INTO limits VALUES(?,?,1) ON CONFLICT(token) DO UPDATE SET count=CASE WHEN limits.bucket=excluded.bucket THEN limits.count+1 ELSE 1 END,bucket=excluded.bucket').run(hash,bucket);
  }
  db.prepare('DELETE FROM limits WHERE bucket<?').run(bucket-1);
  db.prepare("INSERT INTO inquiries(id,created,payload,status) VALUES(?,?,?,'pending')").run(q.id,Date.now(),payload);
  db.exec('COMMIT');
 }catch{db.exec('ROLLBACK');const duplicate=db.prepare('SELECT payload FROM inquiries WHERE id=?').get(q.id);if(duplicate?.payload===payload)return result(200,'received');return result(503,'error')}
 await deliver(q.id);return result(201,'received');
}
