import Link from 'next/link';
import Image from 'next/image';
import {routes,studio} from '@/config/site';
import type {Dictionary,Locale} from '@/lib/dictionary';
import {Action,Ticks} from './Primitives';
export function Footer({l,d}:{l:Locale;d:Dictionary}){
 return <footer className="footer"><div className="footerInside"><div className="footerFlex"><div><h2>{d.footer.headline}</h2><a className="footerEmail" href={'mailto:'+studio.email}>{studio.email}</a><Action href={'/'+l+'/contact'}>{d.actions.contact}</Action></div><div className="footerLinks">{Object.entries(routes).map(([k,r],i)=><Link href={'/'+l+r} key={k}>{d.nav[k as keyof typeof routes]} <sup>0{i+1}</sup></Link>)}<a href={studio.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={studio.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div><div className="footerBrand"><Image src="/assets/brand/fuel-x-logo.webp" width={1300} height={204} sizes="(max-width:809px) 100vw, 75vw" alt="FUEL X"/><Ticks/></div></div></footer>
}
