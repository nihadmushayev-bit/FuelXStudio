'use client';
import {useRef,useState} from 'react';
import type {FormEvent} from 'react';
import type {Dictionary,Locale} from '@/lib/dictionary';
import {inquirySchema,projectTypes,validationIssues,type FieldName} from '@/lib/inquiry';
import s from './Pages.module.css';
export function ContactForm({f,l,email,enabled,initialType,emailLabel}:{f:Dictionary['form'];l:Locale;email:string;enabled:boolean;initialType?:string;emailLabel:string}){
 const [errors,setErrors]=useState<Record<string,string>>({}),[state,setState]=useState(''),[busy,setBusy]=useState(false);const id=useRef('');const snapshot=useRef('');
 function message(code:string){const value=f[code as keyof typeof f];return typeof value==='string'?value:f.error}
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(busy)return;const form=e.currentTarget;const values=Object.fromEntries(new FormData(form));const serialized=JSON.stringify(values);
  if(snapshot.current!==serialized||!id.current){id.current=crypto.randomUUID();snapshot.current=serialized}
  const checked=inquirySchema.safeParse({...values,locale:l,id:id.current});
  if(!checked.success){const issues=validationIssues(checked.error);setErrors(issues);setState('invalid');form.querySelector<HTMLElement>('[name="'+Object.keys(issues)[0]+'"]')?.focus();return}
  setErrors({});setState('');
  if(!enabled){const q=checked.data;const type=f.types[projectTypes.indexOf(q.type)];const body=[q.firstName+' '+q.lastName,q.company,q.email,type,q.timeline,q.description].filter(Boolean).join('\n\n');window.location.href='mailto:'+email+'?subject='+encodeURIComponent('FUEL X STUDIO / '+type)+'&body='+encodeURIComponent(body);setState('unavailable');return}
  setBusy(true);
  try{const resp=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(checked.data)});const result=await resp.json();setState(result.code||'error');if(result.errors)setErrors(result.errors);if(resp.ok&&result.code==='received'){form.reset();id.current='';snapshot.current=''}}
  catch{setState('error')}finally{setBusy(false)}
 }
 const field=(key:FieldName)=>{const optional=key==='timeline'||key==='company';const common={id:'inquiry-'+key,name:key,required:!optional,'aria-invalid':Boolean(errors[key]),'aria-describedby':errors[key]?'err-'+key:undefined};
 return <div className={s.field+(key==='description'?' '+s.full:'')} key={key}><label htmlFor={common.id}>{f[key]}{optional?' ('+f.optional+')':' *'}</label>{key==='type'?<select {...common} defaultValue={initialType||''}><option value="">{f.choose}</option>{projectTypes.map((value,i)=><option key={value} value={value}>{f.types[i]}</option>)}</select>:key==='description'?<textarea {...common} rows={3} maxLength={5000}/>:<input {...common} type={key==='email'?'email':'text'} maxLength={key==='email'?254:optional?150:80} autoComplete={({firstName:'given-name',lastName:'family-name',email:'email',company:'organization',timeline:'off'})[key]}/>} {errors[key]&&<small id={'err-'+key}>{message(errors[key])}</small>}</div>};
 return <form onSubmit={submit} noValidate className={s.form}>{(['firstName','lastName','email','company','type','timeline','description'] as FieldName[]).map(field)}<label className={s.trap} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>{!enabled&&<p className={s.formInfo}>{f.unavailable} <a href={'mailto:'+email}>{email}</a></p>}<button className={s.submit} disabled={busy} type="submit">{busy?f.sending:enabled?f.submit:emailLabel}</button><p role="status" aria-live="polite" className={s.formInfo}>{state?message(state):''}</p></form>
}
