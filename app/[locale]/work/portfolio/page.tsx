import {context,type RouteProps} from '@/lib/request';
import {pageMeta} from '@/lib/metadata';
import {entries} from '@/lib/content';
import {art} from '@/config/site';
import {InnerHero} from '@/components/Heroes';
import {ProjectList,FAQ} from '@/components/Sections';
export async function generateMetadata({params}:RouteProps){const {d,l}=await context(params);return pageMeta(l,'/work/portfolio',d.meta.portfolio)}
export default async function Portfolio({params}:RouteProps){const {d,l}=await context(params),projects=entries('project');return <><InnerHero kind="portfolio" image={art('portfolio')} title={d.portfolio.heroTitle} kicker={d.portfolio.heroKicker} intro={d.portfolio.intro} count={projects.length}/><ProjectList d={d} l={l} projects={projects} mode="portfolio" n="01"/><FAQ d={d} n="02"/></>}
