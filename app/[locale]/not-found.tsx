import {headers} from 'next/headers';
import {Missing} from '@/components/Missing';
import {isLocale} from '@/lib/dictionary';
export default async function NotFound(){const l=(await headers()).get('x-studio-locale')||'az';return <Missing l={isLocale(l)?l:'az'}/>}
