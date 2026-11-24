import Image from 'next/image';
import {art} from '@/config/site';
import type {Dictionary,Locale} from '@/lib/dictionary';
import {Action,Marks,Photo,Ticks,year} from './Primitives';
import s from './Studio.module.css';
export function HomeHero({d,l}:{d:Dictionary;l:Locale}){
 return <section className={s.hero+' homeHero'}><div className={s.heroContent}><div className={s.intro}><p className={s.eyebrow}>FUEL X STUDIO · {d.home.edition}</p><h1>{d.home.heroTitle}</h1><p className={s.heroDescription}>{d.home.heroLines.join(' ')}</p><div className={s.heroActions}><Action href={'/'+l+'/contact'}>{d.actions.start}</Action><Action secondary href={'/'+l+'/services'}>{d.actions.allServices}</Action></div></div><div className={s.heroVisual}><Photo src={art('hero')} className="heroImage" priority/><div className={s.heroVisualCaption}>FUEL X STUDIO <span>{d.home.disciplines.join(' / ')}</span></div></div></div></section>
}
export function InnerHero({kind,title,kicker,intro,image,alt='',count}:{kind:'about'|'portfolio'|'project'|'article'|'services'|'missing';title:string;kicker:string;intro:string;image:string;alt?:string;count?:number}){
 const inset=kind==='about'||kind==='article';
 return <section className={s.innerHero+' '+s[kind]}><Photo src={image} alt={inset?'':alt} className="heroImage" priority/><div className={s.heroShade}/>
 {inset?<div className={s.inset}><Photo src={image} alt={alt} priority sizes="(max-width:809px) 92vw,65vw"/><Marks/><h1 className="innerTitle">{title}</h1><div className={s.insetMeta}><b>({kicker})</b><span>{intro}</span><b>© {year()}</b></div></div>:<div className={s.innerCaption}><div>{(kind==='portfolio'||kind==='services')&&<span className={s.kicker}>{kicker}{count!==undefined&&<sup>({String(count).padStart(2,'0')})</sup>}</span>}<h1 className="innerTitle">{title}</h1></div><p>{intro}</p><b>© {year()}</b></div>}
 </section>
}
export function Statement({children,indent=false}:{children:string;indent?:boolean}){
 return <h2 data-ink className={s.statement+(indent?' '+s.indent:'')}>{children.split(/\s+/).map((w,i)=><span key={i}>{w} </span>)}</h2>
}
