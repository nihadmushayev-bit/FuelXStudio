import {createFormatter} from 'next-intl';
import type {Project,Article} from '@/lib/content';
import {art} from '@/config/site';
import {InnerHero,Statement} from './Heroes';
import {Action,Label,Photo} from './Primitives';
import {FAQ,ProjectList,Insights,type ContentProps} from './Sections';
import s from './Studio.module.css';
import p from './Pages.module.css';
export function ProjectDetail({d,l,entry,all}:{entry:Project;all:Project[]}&ContentProps){
 const c=entry.copy[l];const adjacent=all.filter(x=>x.id!==entry.id);const next=all.length>1?all[(all.findIndex(x=>x.id===entry.id)+1)%all.length]:null;
 const images=[entry.desktop,entry.tablet,entry.mobile,...entry.gallery].filter(x=>x!==null);
 return <><InnerHero kind="project" title={c.title} kicker={c.category} intro={c.category+' / '+entry.year} image={entry.cover?.src||art('portfolio')} alt={entry.cover?.alt[l]}/><section className={s.paper}><Label n="01">{d.portfolio.overview}</Label><Statement indent>{c.overview}</Statement><div className={p.caseBody}><dl>{[[d.portfolio.category,c.category],[d.portfolio.year,entry.year],[d.portfolio.client,entry.client]].filter(([,v])=>v).map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><div>{[[d.sections.research,c.objectives],[d.sections.design,c.design],[d.sections.development,c.development],[d.sections.results,c.results]].map(([title,body])=><div key={title} className={s.infoRow}><b>({title})</b><p>{body}</p></div>)}{entry.liveUrl&&<a className="action" href={entry.liveUrl} target="_blank" rel="noopener noreferrer">{d.actions.live} ↗</a>}</div></div><div className={p.gallery}>{images.map((im,i)=><Photo key={i} src={im.src} alt={im.alt[l]} sizes="(max-width:809px) 100vw,70vw"/>)}</div>{next&&<Action href={'/'+l+'/work/portfolio/'+next.slug}>{d.actions.next}</Action>}</section><ProjectList l={l} d={d} projects={adjacent.slice(0,2)} mode="related" n="02"/><FAQ d={d} n="03"/></>
}
export function ArticleDetail({l,d,entry,all}:{entry:Article;all:Article[]}&ContentProps){
 const c=entry.copy[l],format=createFormatter({locale:l,timeZone:'UTC'});
 return <><InnerHero kind="article" title={c.title} kicker={c.category} intro={c.intro} image={entry.cover?.src||art('studio')} alt={entry.cover?.alt[l]}/><section className={s.paper}><Label n="01">{d.sections.insights}</Label><div className={p.article}><aside>{d.article.author}<p>{entry.author}</p>{d.article.date}<p>{format.dateTime(new Date(entry.date),{dateStyle:'long'})}</p></aside><div>{c.sections.map((item,i)=><article key={i}><small>{String(i+1).padStart(3,'0')}</small><h2>{item.title}</h2><p>{item.body}</p>{item.image&&<Photo src={item.image.src} alt={item.image.alt[l]} sizes="65vw"/>}</article>)}</div></div></section><Insights l={l} d={d} articles={all.filter(a=>a.id!==entry.id)}/><FAQ d={d} n="02"/></>
}
