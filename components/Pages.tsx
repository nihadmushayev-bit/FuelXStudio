import Link from 'next/link';
import {art,features} from '@/config/site';
import {founderPortraits} from '@/config/editorial';
import {entries} from '@/lib/content';
import {InnerHero,Statement} from './Heroes';
import {Action,Label,Photo} from './Primitives';
import {Capabilities,FAQ,ProcessSection,ProjectList,type ContentProps} from './Sections';
import s from './Studio.module.css';
import p from './Pages.module.css';
export function AboutPage({d,l}:ContentProps){
 return <><InnerHero kind="about" title={d.about.headline} kicker={d.about.heroKicker} intro={d.about.intro} image={art('about')}/><section className={s.paper}><Label n="01">{d.sections.story}</Label><Statement indent>{d.about.paragraphs[0]}</Statement><div className={p.story}><Photo src={art('studio')} sizes="(max-width:809px) 90vw,32vw"/><div><h2>{d.about.heroTitle}</h2>{d.about.paragraphs.slice(1).map(line=><p key={line}>{line}</p>)}<div className={p.miniEssay}><h3>({d.sections.philosophy})</h3><p>{d.about.philosophy}</p><h3>({d.sections.approach})</h3><p>{d.about.approach}</p></div></div></div></section>
 <section className={s.paper}><Label n="02">{d.sections.founders}</Label><div className={p.founders}>{d.founders.map((f,i)=><article key={f.id}><small>(0{i+1})</small><div><h2 data-reveal>{f.name}</h2><b>{f.role}</b></div><p>{f.bio}</p>{features.showFounderPortraits&&founderPortraits[f.id]&&<Photo src={founderPortraits[f.id]!.src} alt={founderPortraits[f.id]!.alt}/>}</article>)}</div></section>
 <ProcessSection d={d} n="03"/><Capabilities d={d} n="04"/><ProjectList l={l} d={d} projects={entries('project').filter(v=>v.featured)} mode="home" n="05"/><section className={s.paper}><Action href={'/'+l+'/contact'}>{d.actions.start}</Action></section><FAQ d={d} n="06"/></>
}
export function ServicesPage({d,l}:ContentProps){const projects=entries('project');return <><InnerHero kind="services" title={d.servicePage.heroTitle} kicker={d.servicePage.heroKicker} intro={d.servicePage.intro} image={art('service-1')}/>
 {d.services.map((v,i)=>{const related=projects.filter(x=>x.services.includes(v.id));const caps=v.id==='mobile-apps'?v.capabilities.filter((_,idx)=>idx<v.capabilities.length-3||Object.values(features.mobilePlatforms)[idx-(v.capabilities.length-3)]):v.capabilities;return <section key={v.id} id={v.id} className={i%2===0?s.paper:s.darkSection}><Label n={'0'+(i+1)}>{v.title}</Label><div className={p.servicePage}><Photo src={art('service-'+(i+1))} sizes="(max-width:809px) 100vw,40vw"/><div><h2 data-reveal>{v.title}</h2><h3>{v.short}</h3><p>{v.description}</p><h4>({d.servicePage.capabilities})</h4><ul>{caps.map(item=><li key={item}>{item}</li>)}</ul><h4>({d.servicePage.process})</h4><p>{v.process}</p>{related.length>0&&<><h4>({d.servicePage.related})</h4>{related.map(x=><Link className="action" key={x.id} href={'/'+l+'/work/portfolio/'+x.slug}>{x.copy[l].title} ↗</Link>)}</>}<Action href={'/'+l+'/contact?type='+v.id}>{d.actions.quote}</Action></div></div></section>})}<FAQ d={d} n="06"/></>}
