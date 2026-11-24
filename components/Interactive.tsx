'use client';
import {useId,useState} from 'react';
import type {Dictionary} from '@/lib/dictionary';
import s from './Studio.module.css';
export function Questions({items}:{items:Dictionary['faq']}){
 const [current,setCurrent]=useState(-1);const id=useId();
 return <div className={s.questions}>{items.map((item,i)=><div key={item.q} className={s.question} data-open={current===i}><h3><button type="button" aria-expanded={current===i} aria-controls={id+i} onClick={()=>setCurrent(current===i?-1:i)}>{item.q}<i aria-hidden>+</i></button></h3><div id={id+i} className={s.answer} inert={current!==i}><div><p>{item.a}</p></div></div></div>)}</div>
}
export function Principles({items,previous,next}:{items:Dictionary['principles'];previous:string;next:string}){
 const [at,set]=useState(0);const item=items[at];
 return <div className={s.principleBody}><div className={s.carouselCopy} aria-live="polite" key={at}><h3>{item.text}</h3><p>{String(at+1).padStart(2,'0')} / {item.title}</p></div><div className={s.carouselButtons}><button aria-label={previous} onClick={()=>set((at+items.length-1)%items.length)}>←</button><button aria-label={next} onClick={()=>set((at+1)%items.length)}>→</button></div></div>
}
