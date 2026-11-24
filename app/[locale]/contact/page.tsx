import {context,type RouteProps} from '@/lib/request';
import {pageMeta} from '@/lib/metadata';
import {art,studio} from '@/config/site';
import {ContactForm} from '@/components/ContactForm';
import {Photo} from '@/components/Primitives';
import {FAQ} from '@/components/Sections';
import s from '@/components/Pages.module.css';
export async function generateMetadata({params}:RouteProps){const {l,d}=await context(params);return pageMeta(l,'/contact',d.meta.contact)}
export default async function Contact({params,searchParams}:RouteProps&{searchParams:Promise<{type?:string}>}){
 const {d,l}=await context(params),q=await searchParams;
 return <><section className={s.contactHero}><div className={s.contactPhoto}><Photo src={art('contact')} sizes="42vw" priority/><span aria-hidden><i/></span></div><div className={s.contactContent}><h1>{d.contact.heroTitle}”</h1><p>{d.contact.intro}</p><ContactForm f={d.form} l={l} email={studio.email} enabled={studio.formEnabled} initialType={q.type} emailLabel={d.contact.emailLabel}/><div className={s.contactMeta}><a href={'mailto:'+studio.email}>{studio.email}</a><a href={studio.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={studio.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div></section><FAQ d={d} n="01"/></>
}
