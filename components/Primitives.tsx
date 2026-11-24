import Link from 'next/link';
import Image from 'next/image';
import type {ReactNode} from 'react';
export const year=()=>new Date().getFullYear();
export function Action({href,children,secondary=false}:{href:string;children:ReactNode;secondary?:boolean}){
 return <Link href={href} className={'action'+(secondary?' secondary':'')}><span>{children}</span><span aria-hidden className="actionArrow">↗</span></Link>
}
export function Label({n,children}:{n:string;children:ReactNode}){
 return <div className="sectionLabel"><span><b aria-hidden/> ({n})</span><span>({children})</span><span>© {year()}</span></div>
}
export function Ticks(){return <div className="ticks" aria-hidden><span>© {year()}</span><i/ ><span>{String(year()).slice(-2)}′</span></div>}
export function Marks(){return <div className="marks" aria-hidden><i>+</i><i>+</i><i>+</i><i>+</i></div>}
export function Photo({src,alt='',sizes='100vw',priority=false,position,className=''}:{src:string;alt?:string;sizes?:string;priority?:boolean;position?:string;className?:string}){
 return <div className={'photo '+className}><Image fill src={src} alt={alt} sizes={sizes} priority={priority} unoptimized={src.startsWith('/media/')} style={position?{objectPosition:position}:undefined}/></div>
}
