import {notFound} from 'next/navigation';
import {context,type RouteProps} from '@/lib/request';
import {pageMeta} from '@/lib/metadata';
import {entries} from '@/lib/content';
import {ProjectDetail} from '@/components/Details';
export async function generateMetadata({params}:RouteProps){const {l,slug}=await context(params),e=entries('project').find(x=>x.slug===slug);if(!e)notFound();return pageMeta(l,'/work/portfolio/'+slug,{title:e.copy[l].title,description:e.copy[l].overview},e.cover?.src)}
export default async function Page({params}:RouteProps){const {l,d,slug}=await context(params),all=entries('project'),entry=all.find(x=>x.slug===slug);if(!entry)notFound();return <ProjectDetail l={l} d={d} entry={entry} all={all}/>}
