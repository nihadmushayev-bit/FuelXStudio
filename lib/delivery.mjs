import {database} from './storage.mjs';
export async function deliver(id){
 const db=database();
 const row=db.prepare("SELECT payload FROM inquiries WHERE id=? AND status IN ('pending','retry')").get(id);
 if(!row)return;
 const q=JSON.parse(row.payload);
 try{
  const response=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(6500),headers:{Authorization:'Bearer '+process.env.CONTACT_FORM_API_KEY,'Content-Type':'application/json','Idempotency-Key':'studio-'+id},body:JSON.stringify({from:process.env.CONTACT_FROM_EMAIL,to:[process.env.CONTACT_EMAIL||'teamfuelxstudio@gmail.com'],reply_to:q.email,subject:'FUEL X STUDIO / '+q.type,text:[q.firstName+' '+q.lastName,q.email,q.company,q.type,q.timeline,q.description].filter(Boolean).join('\n\n')})});
  if(!response.ok)throw Error('Provider rejected submission');
  const ack=await response.json();if(typeof ack.id!=='string')throw Error('Missing provider receipt');
  db.prepare("UPDATE inquiries SET status='provider-accepted', attempts=attempts+1 WHERE id=?").run(id);
 }catch{db.prepare("UPDATE inquiries SET status='retry', attempts=attempts+1 WHERE id=? AND status!='provider-accepted'").run(id)}
}
