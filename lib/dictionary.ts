import az from '../messages/az.json';
import en from '../messages/en.json';
import ru from '../messages/ru.json';

export const locales = ['az', 'en', 'ru'] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { az, en, ru };

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
