'use client';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
import type {Locale,Dictionary} from '@/lib/dictionary';
const links=[['home',''],['portfolio','/work/portfolio'],['about','/about'],['contact','/contact']] as const;
export function Header({l,nav,a11y,socials}:{l:Locale;nav:Dictionary['nav'];a11y:Dictionary['a11y'];socials:string[]}){
 const path=usePathname();const [open,setOpen]=useState(false);const trigger=useRef<HTMLButtonElement>(null);const panel=useRef<HTMLElement>(null);
 const close=()=>setOpen(false);
 useEffect(()=>{const frame=requestAnimationFrame(close);return()=>cancelAnimationFrame(frame)},[path]);
 useEffect(()=>{if(!open)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';
  const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){close();trigger.current?.focus()}if(e.key==='Tab'){
   const elements=Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href],button')??[]).filter(el=>el.getClientRects().length);
   if(!elements.length)return;const first=elements[0],last=elements.at(-1)!;
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }};const media=matchMedia('(min-width:810px)');const resize=()=>{if(media.matches)close()};document.addEventListener('keydown',onKey);media.addEventListener('change',resize);
  return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',onKey);media.removeEventListener('change',resize)}},[open]);
 const items=links.map(([key,to],i)=><Link key={key} onClick={close} aria-current={(path==='/'+l+to||(to&&path.startsWith('/'+l+to+'/')))?'page':undefined} href={'/'+l+to}><span>{nav[key]}</span><sup>0{i+1}</sup></Link>);
 const langs=<div className="langs" aria-label={nav.language}>{(['az','en','ru'] as const).map((loc,i)=><span key={loc}>{i>0&&<i aria-hidden>/</i>}<Link lang={loc} hrefLang={loc} aria-current={l===loc?'true':undefined} href={path.replace(/^\/(az|en|ru)(?=\/|$)/,'/'+loc)} onClick={close}>{loc.toUpperCase()}</Link></span>)}</div>;
 return <header ref={panel} className={'siteHeader'+(open?' isOpen':'')} onBlur={e=>{if(open&&!e.currentTarget.contains(e.relatedTarget))trigger.current?.focus()}}>
 <div className="headerRow"><Link className="navLogo" href={'/'+l} aria-label={nav.homeLink} onClick={close}><Image src="/assets/brand/fuel-nav-white.png" width={100} height={19} alt="FUEL" priority/></Link><nav className="desktopNav" aria-label={nav.menu}>{items}</nav>
 <div className="languagePanel">{langs}</div>
 <button type="button" ref={trigger} className="menuButton" aria-label={open?a11y.closeMenu:a11y.openMenu} aria-expanded={open} aria-controls="compact-nav" onClick={()=>setOpen(!open)}><i/><i/></button></div>
 <div className="compact" id="compact-nav" inert={!open}><nav aria-label={nav.menu}>{items}</nav><div className="compactEnd">{langs}<span>{socials.map((s,i)=><a key={s} href={s} target="_blank" rel="noopener noreferrer">{i?'LinkedIn':'Instagram'}</a>)}</span></div></div></header>
}
