import 'server-only';
import type {Locale} from './dictionary';
import {database} from './storage.mjs';
import {features} from '@/config/site';
export type StudioImage={src:string;alt:Record<Locale,string>};
type Base={id:string;slug:string;cover:StudioImage|null};
export type Project=Base & {kind:'project';year:number;client:string;featured:boolean;copy:Record<Locale,{title:string;category:string;overview:string;objectives:string;design:string;development:string;results:string}>;desktop:StudioImage|null;tablet:StudioImage|null;mobile:StudioImage|null;gallery:StudioImage[];liveUrl:string|null;services:string[]};
export type Article=Base & {kind:'article';date:string;author:string;copy:Record<Locale,{title:string;category:string;intro:string;sections:{title:string;body:string;image:StudioImage|null}[]}>};
export function entries(kind:'project'):Project[];
export function entries(kind:'article'):Article[];
export function entries(kind:'project'|'article') {
 if(kind==='article'&&!features.showArticles)return [];
 const rows=database().prepare('SELECT payload FROM entries WHERE kind=? AND published=1 ORDER BY id').all(kind);
 return rows.map((row:{payload:unknown})=>JSON.parse(String(row.payload)));
}
