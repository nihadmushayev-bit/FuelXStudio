import {notFound} from 'next/navigation';
import {getDictionary,isLocale} from './dictionary';
export type RouteProps={params:Promise<{locale:string;slug?:string}>};
export async function context(params:RouteProps['params']){
 const {locale,slug}=await params;if(!isLocale(locale))notFound();
 return {l:locale,d:getDictionary(locale),slug};
}
