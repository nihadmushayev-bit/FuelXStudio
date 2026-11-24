import {context,type RouteProps} from '@/lib/request';
import {pageMeta} from '@/lib/metadata';
import {AboutPage} from '@/components/Pages';
export async function generateMetadata({params}:RouteProps){const {l,d}=await context(params);return pageMeta(l,'/about',d.meta.about)}
export default async function Page({params}:RouteProps){const {l,d}=await context(params);return <AboutPage l={l} d={d}/>}
