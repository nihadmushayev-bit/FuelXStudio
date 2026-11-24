import {context,type RouteProps} from '@/lib/request';
import {pageMeta} from '@/lib/metadata';
import {ServicesPage} from '@/components/Pages';
export async function generateMetadata({params}:RouteProps){const {l,d}=await context(params);return pageMeta(l,'/services',d.meta.services)}
export default async function Page({params}:RouteProps){const {l,d}=await context(params);return <ServicesPage l={l} d={d}/>}
