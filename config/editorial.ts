export const founderPortraits:Record<string,{src:string;alt:string}|undefined>={};
type Translated=Record<'az'|'en'|'bs',string>;
export const testimonials:{author:string;organization?:string;quote:Translated}[]=[];
export const verifiedStatistics:{value:string;label:Translated}[]=[];
export const legalPages:{slug:string;title:Translated;body:Translated;published:boolean}[]=[];
