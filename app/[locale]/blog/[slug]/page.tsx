import {notFound} from 'next/navigation';
import {context,type RouteProps} from '@/lib/request';
import {pageMeta} from '@/lib/metadata';
import {entries} from '@/lib/content';
import {ArticleDetail} from '@/components/Details';
export async function generateMetadata({params}:RouteProps){const {l,slug}=await context(params),e=entries('article').find(x=>x.slug===slug);if(!e)notFound();return pageMeta(l,'/blog/'+slug,{title:e.copy[l].title,description:e.copy[l].intro},e.cover?.src)}
export default async function Page({params}:RouteProps){const {l,d,slug}=await context(params),all=entries('article'),entry=all.find(x=>x.slug===slug);if(!entry)notFound();return <ArticleDetail l={l} d={d} entry={entry} all={all}/>}
