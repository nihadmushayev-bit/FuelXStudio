import type {MetadataRoute} from 'next';
import {routes,studio} from '@/config/site';
import {entries} from '@/lib/content';
import {locales} from '@/lib/dictionary';
export const dynamic='force-dynamic';
export default function sitemap():MetadataRoute.Sitemap{
 if(!studio.baseUrl)return [];
 const paths=[...Object.values(routes),...entries('project').map(x=>'/work/portfolio/'+x.slug),...entries('article').map(x=>'/blog/'+x.slug)];
 return paths.flatMap(path=>locales.map(l=>({url:studio.baseUrl+'/'+l+path,alternates:{languages:Object.fromEntries([...locales.map(a=>[a,studio.baseUrl+'/'+a+path]),['x-default',studio.baseUrl+'/az'+path]])}})));
}
