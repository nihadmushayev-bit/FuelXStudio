import {context,type RouteProps} from '@/lib/request';
import {pageMeta} from '@/lib/metadata';
import {entries} from '@/lib/content';
import {HomeHero} from '@/components/Heroes';
import {AboutPreview,ServiceSection,ProcessSection,Promo,FAQ} from '@/components/Sections';
export async function generateMetadata({params}:RouteProps){const {l,d}=await context(params);return pageMeta(l,'',d.meta.home)}
export default async function Home({params}:RouteProps){const {d,l}=await context(params);
 return <><HomeHero l={l} d={d}/><ServiceSection d={d} l={l}/><AboutPreview d={d} l={l}/><ProcessSection d={d}/><FAQ d={d}/><Promo d={d} l={l}/></>
}
