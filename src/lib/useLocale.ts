import { useTranslation } from 'react-i18next';
import { toLocale } from '../i18n';
import { localise } from './localise';
import type { Locale, Localised } from '../types';

/**
 * The bridge between the two halves of the translation story: `t` for the
 * interface's own strings, `l` for profile text that carries its own
 * translations.
 *
 * They are returned together because almost every component needs both, and a
 * component that reached for `localise` directly would have to re-derive the
 * current language and would not re-render when it changed.
 */
export function useLocale() {
  const { t, i18n } = useTranslation();
  const locale = toLocale(i18n.language);

  return {
    t,
    locale,
    /** Resolves profile text for the language now in force. */
    l: (value: Localised) => localise(value, locale),
    /** Switches language; the detector writes the choice to localStorage. */
    setLocale: (next: Locale) => void i18n.changeLanguage(next),
  };
}
