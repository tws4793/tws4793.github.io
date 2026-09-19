import type { Locale, Localised } from '../types';

/**
 * Resolves profile text for one language.
 *
 * Deliberately free of React and i18next so the build can call it too: the web
 * app manifest is generated from the profile in `vite.config.ts`, and it needs
 * the same answer the page would give.
 *
 * Falls back to English rather than to the key or to empty, because a card
 * showing the wrong language is useful and a card showing nothing is not.
 */
export function localise(value: Localised, locale: Locale): string {
  if (typeof value === 'string') {
    return value;
  }
  return value[locale] ?? value.en;
}
