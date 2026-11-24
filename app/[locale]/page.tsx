import {context,type RouteProps} from '@/lib/request';
import {pageMeta} from '@/lib/metadata';
import {entries} from '@/lib/content';
import {HomeHero} from '@/components/Heroes';
import {AboutPreview,ProjectList,ServiceSection,ProcessSection,Experience,Promo,Capabilities,Insights,FAQ} from '@/components/Sections';
export async function generateMetadata({params}:RouteProps){const {l,d}=await context(params);return pageMeta(l,'',d.meta.home)}
export default async function Home({params}:RouteProps){const {d,l}=await context(params),all=entries('project');
 return <><HomeHero l={l} d={d}/><AboutPreview d={d} l={l}/><ProjectList d={d} l={l} projects={all.filter(x=>x.featured)} n="02" mode="home"/><ServiceSection d={d} l={l}/><ProcessSection d={d}/><Experience d={d}/><ProjectList d={d} l={l} projects={all} mode="archive" n="06"/><Promo d={d} l={l}/><Capabilities d={d}/><Insights d={d} l={l} articles={entries('article')}/><FAQ d={d}/></>
}
