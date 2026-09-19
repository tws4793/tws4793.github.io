export type Platform =
  'telegram' | 'instagram' | 'linkedin' | 'github' | 'email' | 'website';

/** Singapore's four official languages, in the order the switcher lists them. */
export const LOCALES = ['en', 'zh', 'ms', 'ta'] as const;

export type Locale = (typeof LOCALES)[number];

/**
 * Profile text that may be written once, or once per language.
 *
 * A plain string is the common case and stays readable for a card that is only
 * ever in one language. The record form requires `en`, so there is always
 * something to fall back to when a language is left untranslated.
 */
export type Localised =
  | string
  | (Readonly<Partial<Record<Locale, string>>> & { readonly en: string });

export interface ProfileLink {
  /** Stable key, also used to identify the currently displayed code. */
  readonly id: string;
  readonly platform: Platform;
  /**
   * What the destination is for, in your words. Prefer the purpose over the
   * platform name where it disambiguates: "Photography" reads better than
   * "Instagram" when the account is not your personal one.
   */
  readonly label: Localised;
  /** How you are known there: "@handle", "in/your-name". */
  readonly handle: string;
  /** Absolute URL encoded into the QR code and opened on tap. */
  readonly url: string;
}

export interface Profile {
  /** Not localised: a person's name is their name in every language. */
  readonly name: string;
  readonly tagline: Localised;
  readonly location: Localised;
  readonly links: readonly ProfileLink[];
}
