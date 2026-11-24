import Link from 'next/link';
import type {Dictionary,Locale} from '@/lib/dictionary';
import type {Project,Article} from '@/lib/content';
import {art} from '@/config/site';
import {Action,Label,Photo} from './Primitives';
import {Questions,Principles} from './Interactive';
import {Statement} from './Heroes';
import s from './Studio.module.css';
export type ContentProps={d:Dictionary;l:Locale};
const number=(i:number)=>String(i+1).padStart(2,'0');
export function AboutPreview({d,l}:ContentProps){return <section className={s.paper+' '+s.aboutPreview}><div className={s.sectionHeading}><p>{d.sections.about}</p><h2>{d.about.headline}</h2></div><div className={s.aboutContent}><p>{d.home.aboutStatement}</p><p>{d.about.paragraphs[2]}</p><Action href={'/'+l+'/about'}>{d.actions.more}</Action></div></section>}
export function ProjectList({d,l,projects,mode,n}:{projects:Project[];mode:'home'|'portfolio'|'archive'|'related';n:string}&ContentProps){
 const title=mode==='archive'?d.sections.archive:mode==='related'?d.sections.related:d.sections.work;
 if(mode==='related'&&!projects.length)return null;
 return <section className={s.paper}><Label n={n}>{title}</Label>{projects.length?mode==='archive'?<div className={s.archive}>{projects.map((p,i)=><Link href={'/'+l+'/work/portfolio/'+p.slug} key={p.id}><small>{number(i)} / {p.year}</small><strong>{p.copy[l].title}</strong><span>{p.copy[l].category}</span>{p.cover&&<Photo src={p.cover.src} alt={p.cover.alt[l]} sizes="160px"/>}</Link>)}</div>:<div className={mode==='home'?s.stack:s.workGrid}>{projects.map((p,i)=><Link key={p.id} className={s.workCard} href={'/'+l+'/work/portfolio/'+p.slug}>{p.cover&&<Photo src={p.cover.src} alt={p.cover.alt[l]} sizes="(max-width:809px) 100vw,65vw"/>}<div className={s.workDetails}><small>({number(i)})</small><h3>{p.copy[l].title}</h3><span>{p.copy[l].category} © {p.year}</span></div></Link>)}</div>:<div className={s.empty}><h2>{mode==='portfolio'?d.portfolio.emptyTitle:title}</h2>{mode==='portfolio'&&<p>{d.portfolio.emptyText}</p>}<Action href={'/'+l+(mode==='portfolio'?'/contact':'/work/portfolio')}>{mode==='portfolio'?d.actions.discuss:d.actions.allWork}</Action></div>}{mode==='home'&&projects.length>0&&<Action href={'/'+l+'/work/portfolio'}>{d.actions.allWork}</Action>}</section>
}
export function ServiceSection({d,l}:{d:Dictionary;l:Locale}){return <section className={s.darkSection}><div className={s.sectionHeading}><p>{d.sections.services}</p><h2>{d.servicePage.intro}</h2></div><div className={s.serviceList}>{d.services.map(v=><Link href={'/'+l+'/services#'+v.id} key={v.id}><div><h3>{v.title}</h3><p>{v.short}</p></div><span aria-hidden>↗</span></Link>)}</div><Action href={'/'+l+'/services'}>{d.actions.allServices}</Action></section>}
export function ProcessSection({d}:{d:Dictionary;n?:string}){return <section className={s.paper}><div className={s.sectionHeading}><p>{d.sections.process}</p><h2>{d.home.promoTitle}</h2></div><div className={s.processGrid}>{d.process.map((p,i)=><article key={p.title}><p>{number(i)}</p><h3>{p.title}</h3><p>{p.text}</p></article>)}</div></section>}
export function Experience({d}:{d:Dictionary}){return <section className={s.paper}><Label n="05">{d.sections.principles}</Label><div className={s.experience}><Photo src={art('service-4')} sizes="18vw"/><Principles items={d.principles} previous={d.a11y.previous} next={d.a11y.next}/></div></section>}
export function Promo({d,l}:ContentProps){return <section className={s.promo}><div><h2>{d.home.promoTitle}</h2><p>{d.home.promoText}</p><Action href={'/'+l+'/contact'}>{d.actions.discuss}</Action></div></section>}
export function Capabilities({d,n='07'}:{d:Dictionary;n?:string}){return <section className={s.paper}><Label n={n}>{d.sections.capabilities}</Label><div className={s.caps}>{d.capabilities.map((c,i)=><div key={c}><span>{number(i)} ↗</span><h3 data-reveal>{c}</h3></div>)}</div></section>}
export function Insights({articles,d,l}:{articles:Article[]}&ContentProps){if(!articles.length)return null;return <section className={s.paper}><Label n="08">{d.sections.insights}</Label><div className={s.archive}>{articles.map(a=><Link key={a.id} href={'/'+l+'/blog/'+a.slug}><small>{a.date}</small><strong>{a.copy[l].title}</strong><span>{d.actions.read} ↗</span></Link>)}</div></section>}
export function FAQ({d}:{d:Dictionary;n?:string}){return <section className={s.faq}><div className={s.sectionHeading}><p>{d.sections.faq}</p><h2>{d.sections.faq}</h2></div><div className={s.faqBody}><Questions items={d.faq}/></div></section>}
