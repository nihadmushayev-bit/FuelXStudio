import type {ReactNode} from 'react';
import {context,type RouteProps} from '@/lib/request';
import {studio} from '@/config/site';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {Motion} from '@/components/Motion';
import '@/styles/globals.css';
export const dynamic='force-dynamic';
export default async function LocaleLayout({children,params}:{children:ReactNode}&RouteProps){
 const {d,l}=await context(params);
 const schema={'@context':'https://schema.org','@type':'Organization',name:studio.name,email:studio.email,sameAs:[studio.instagram,studio.linkedin],founder:d.founders.map(f=>({'@type':'Person',name:f.name})),...(studio.baseUrl?{url:studio.baseUrl,logo:studio.baseUrl+'/assets/brand/fuel-x-logo.webp'}:{})};
 return <html lang={l}><body><a className="skip" href="#main">{d.nav.skip}</a><Header l={l} nav={d.nav} a11y={d.a11y} socials={[studio.instagram,studio.linkedin]}/><main id="main" tabIndex={-1}>{children}</main><Footer l={l} d={d}/><Motion/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/></body></html>
}
