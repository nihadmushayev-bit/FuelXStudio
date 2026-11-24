'use client';
import {useLayoutEffect} from 'react';
import {usePathname} from 'next/navigation';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function Motion(){
 const path=usePathname();
 useLayoutEffect(()=>{
  const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{
   const lineEase='cubic-bezier(0.44,0,0.34,0.98)';
   // The reference uses a damped spring; this sampled ratio matches its settling curve.
   const spring=(t:number)=>1-Math.exp(-8*t)*(1+3*t);
   gsap.fromTo('.siteHeader .headerRow',{y:-100},{y:0,duration:1,ease:spring,clearProps:'transform'});
   gsap.from('.desktopNav a',{y:-10,autoAlpha:0,delay:.4,stagger:.1,duration:.5,ease:'power2.out',clearProps:'all'});
   gsap.from('.heroImage img',{scale:1.2,duration:1,ease:'sine.inOut',clearProps:'transform'});
   gsap.from('.heroLine span',{y:10,opacity:0,stagger:.2,delay:.4,duration:.5,ease:lineEase,clearProps:'all'});
   gsap.from('.brandMask img',{yPercent:104,delay:.1,duration:1.15,ease:spring,clearProps:'transform'});
   gsap.from('.disciplines span',{y:10,opacity:0,delay:.9,stagger:.2,duration:.5,clearProps:'all'});
   gsap.from('.marks i',{y:(i)=>i%2?100:-100,opacity:0,delay:.8,duration:.8,ease:spring,clearProps:'all'});
   gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>{gsap.from(el,{y:34,clipPath:'inset(0 0 100% 0)',duration:.72,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true},clearProps:'all'})});
   gsap.utils.toArray<HTMLElement>('[data-ink]').forEach(el=>{const words=el.querySelectorAll('span');gsap.fromTo(words,{opacity:.32},{opacity:1,stagger:1,ease:'none',scrollTrigger:{trigger:el,start:'top 85%',end:'bottom 50%',scrub:true}})});
   gsap.utils.toArray<HTMLElement>('[data-parallax] img').forEach(el=>{gsap.fromTo(el,{yPercent:-4,scale:1.1},{yPercent:4,scale:1.1,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:true}})});
   const refresh=()=>ScrollTrigger.refresh();document.fonts.ready.then(()=>{if(document.body.contains(document.querySelector('main')))refresh()});window.addEventListener('pageshow',refresh);
   return()=>window.removeEventListener('pageshow',refresh);
  });
  return()=>mm.revert();
 },[path]);
 return null;
}
