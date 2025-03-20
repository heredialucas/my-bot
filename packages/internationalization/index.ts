import 'server-only';
import type en from './dictionaries/en.json';
import languine from './languine.json';

export const locales = [
  languine.locale.source,
  ...languine.locale.targets,
] as const;

export type Locale = typeof locales[number];
export type Dictionary = any;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  // Make sure the locale is valid, fallback to 'en' if not
  const validLocale = locales.includes(locale as Locale) ? locale as Locale : 'es';
  const dictionary = await dictionaries[validLocale]();

  return dictionary;
};
