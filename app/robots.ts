import type {MetadataRoute} from 'next';
import {studio} from '@/config/site';
export const dynamic='force-dynamic';
export default function robots():MetadataRoute.Robots{return studio.baseUrl?{rules:{userAgent:'*',allow:'/',disallow:'/api/'},sitemap:studio.baseUrl+'/sitemap.xml'}:{rules:{userAgent:'*',disallow:'/'}}}
