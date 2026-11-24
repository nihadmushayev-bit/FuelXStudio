import {NextResponse,type NextRequest} from 'next/server';
const ids=['az','en','ru'];
export function proxy(req:NextRequest){
 const path=req.nextUrl.pathname;
 if(path==='/'){const saved=req.cookies.get('studio-locale')?.value;const url=req.nextUrl.clone();url.pathname='/'+(saved&&ids.includes(saved)?saved:'az');const res=NextResponse.redirect(url,307);res.headers.set('Cache-Control','private, no-store');res.headers.set('Vary','Cookie');return res}
 const l=path.split('/')[1];if(l==='bs'){const url=req.nextUrl.clone();url.pathname='/ru'+path.slice(3);return NextResponse.redirect(url,308)}if(!ids.includes(l))return NextResponse.rewrite(new URL('/az/'+['page-missing',...path.split('/').filter(Boolean)].join('/'),req.url));
 const requestHeaders=new Headers(req.headers);requestHeaders.set('x-studio-locale',l);const res=NextResponse.next({request:{headers:requestHeaders}});if(req.cookies.get('studio-locale')?.value!==l)res.cookies.set('studio-locale',l,{path:'/',maxAge:31536000,sameSite:'lax'});return res;
}
export const config={matcher:['/((?!api(?:/|$)|_next(?:/|$)|assets(?:/|$)|media(?:/|$)|.*\\..*).*)']};
