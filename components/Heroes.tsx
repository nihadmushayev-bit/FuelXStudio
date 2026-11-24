import Image from 'next/image';
import {art} from '@/config/site';
import type {Dictionary,Locale} from '@/lib/dictionary';
import {Action,Marks,Photo,Ticks,year} from './Primitives';
import s from './Studio.module.css';
export function HomeHero({d,l}:{d:Dictionary;l:Locale}){
 return <section className={s.hero+' homeHero'}><Photo src={art('hero')} className="heroImage" priority/><div className={s.heroShade}/><div className={s.heroContent}><div className={s.intro}><h1 className="srOnly">{d.home.heroTitle} — FUEL X STUDIO</h1><div>{d.home.heroLines.map(line=><p className="heroLine" key={line}><span>{line}</span></p>)}</div><div className={s.heroActions}><Action href={'/'+l+'/contact'}>{d.actions.start}</Action><Action secondary href={'/'+l+'/work/portfolio'}>{d.actions.explore}</Action></div></div>
 <Marks/><div className={s.heroBottom}><div className="disciplines">{d.home.disciplines.map((word,i)=><span key={word}>{i===0?'01/ ':''}{word}</span>)}</div><Ticks/><div className="brandMask"><Image src="/assets/brand/fuel-x-logo.webp" width={1600} height={251} alt="FUEL X" sizes="(max-width:809px) 100vw, 75vw" priority/></div></div></div></section>
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
