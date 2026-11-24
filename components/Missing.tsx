import type {Locale} from '@/lib/dictionary';
import {getDictionary} from '@/lib/dictionary';
import {Action} from './Primitives';
import s from './Pages.module.css';
export function Missing({l}:{l:Locale}){const d=getDictionary(l);return <section className={s.missing}><h1>404</h1><h2>{d.error.title}</h2><p>{d.error.text}</p><Action href={'/'+l}>{d.error.back}</Action></section>}
