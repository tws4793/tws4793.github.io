/*
  Which mark a row wears. `contact` is the odd one out: it belongs to the
  vCard entry rather than to any link, and no `ProfileLink` should claim it.
*/
export type Platform =
  | 'telegram'
  | 'instagram'
  | 'linkedin'
  | 'github'
  | 'email'
  | 'website'
  | 'contact';

/*
  The languages the card speaks, in the order the switcher lists them:
  Singapore's four official languages first, then the rest.

  `zh` is Mandarin in Simplified characters, as Singapore writes it. `yue` is
  Cantonese — a separate language tag rather than a variant of `zh`, because
  written Cantonese has its own vocabulary and grammar and is set in
  Traditional characters. Someone who reads one does not automatically get
  the other.
*/
export const LOCALES = [
  'en',
  'zh',
  'ms',
  'ta',
  'yue',
  'ja',
  'de',
  'fr',
] as const;

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

/** One address on the saved contact. The two types vCard 3.0 actually agrees on. */
export interface ContactEmail {
  readonly kind: 'work' | 'home';
  readonly address: string;
}

/**
 * One number on the saved contact. `cell` is what vCard 3.0 calls a mobile,
 * and what an address book shows as one.
 */
export interface ContactPhone {
  readonly kind: 'cell' | 'work' | 'home';
  /** In E.164 — `+6597391300` — so it dials from anywhere. */
  readonly number: string;
}

/**
 * The details a scanner writes into someone's address book.
 *
 * Split from `links` because a vCard is not a destination: nothing opens it,
 * and the code carries the details themselves rather than a URL pointing at
 * them. See `src/lib/vcard.ts` for how the fields are encoded.
 */
export interface ContactCard {
  /** Given and family name apart, because the vCard `N` field wants them so. */
  readonly firstName: string;
  readonly lastName: string;
  /** What the row is called in the list: "Contact card". */
  readonly label: Localised;
  readonly title: Localised;
  /**
   * Written as registered, in every language. A company's legal name and its
   * internal units have no established translations to reach for — unlike a
   * job title, which does — so translating them would mean inventing names
   * that appear on no letterhead.
   */
  readonly organisation: string;
  readonly department: string;
  readonly phones: readonly ContactPhone[];
  readonly emails: readonly ContactEmail[];
  /**
   * Saved with the contact, so the address book keeps a way back to the full
   * card. It is also why the code need not carry every link: this one does.
   */
  readonly url: string;
}

/**
 * A row on the card, once the contact block and the links have been put in one
 * list — see `src/lib/entries.ts`. The shared half is what a row draws; the
 * tagged half is what its code carries and what its button does.
 */
export type CardEntry = {
  readonly id: string;
  readonly platform: Platform;
  readonly label: Localised;
} &
  /*
    Only a link has a handle. A contact card is not somewhere you are known
    by a name, so its row and its panel carry the label alone — and the type
    says so, rather than leaving every reader to wonder what a contact card's
    handle would even be.
  */
  (
    | { readonly kind: 'link'; readonly handle: string; readonly url: string }
    | { readonly kind: 'contact'; readonly contact: ContactCard }
  );

export interface Profile {
  /** Not localised: a person's name is their name in every language. */
  readonly name: string;
  readonly tagline: Localised;
  readonly location: Localised;
  readonly links: readonly ProfileLink[];
  /** Omit it and the card is links only, exactly as it was before. */
  readonly contact?: ContactCard;
}
