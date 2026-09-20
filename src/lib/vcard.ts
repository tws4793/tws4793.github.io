import { localise } from './localise';
import type { ContactCard, Locale } from '../types';

/*
  vCard 3.0 (RFC 2426), not 4.0. It is the version every phone camera, scanner
  app and address book agrees on; 4.0 is the better spec and the worse choice
  here, because a contact that fails to import is worth nothing.

  Kept deliberately short. A QR code grows with its payload, and a code that
  needs a steady hand and good light is a code people give up on — so the card
  carries who you are and how to write to you, and `URL` points at this page
  for everything else.

  React-free, like `localise`, so the build can call it too.
*/

/** vCard's own separators, which have to be escaped inside a value (RFC 2426 §2). */
function escapeValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/([,;])/g, '\\$1');
}

/**
 * A property line. Components are escaped individually and then joined with a
 * bare `;`, which is how structured values like `N` and `ORG` are built.
 */
function line(name: string, ...components: readonly string[]): string {
  return `${name}:${components.map(escapeValue).join(';')}`;
}

/**
 * A property carrying a `TYPE` parameter — `TEL;TYPE=CELL:…`. The type sits in
 * the parameter, which is not escaped the way a value is.
 */
function typedLine(name: string, kind: string, value: string): string {
  return `${name};TYPE=${kind.toUpperCase()}:${escapeValue(value)}`;
}

/**
 * The text a scanner turns into an address-book entry.
 *
 * Localised, because the card is: someone reading it in Japanese saves a
 * contact whose job title is in Japanese. The name, the company and its
 * internal units stay as written — see `ContactCard`.
 */
export function buildVCard(contact: ContactCard, locale: Locale): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    // family;given;additional;prefix;suffix — the three unused ones stay empty.
    line('N', contact.lastName, contact.firstName, '', '', ''),
    /*
      Display name. Given name first, the order an address book sorts and
      greets by, even though the card's own header writes the family name
      first and in capitals, as Singapore does on a passport.
    */
    line('FN', `${contact.firstName} ${contact.lastName}`),
    line('ORG', contact.organisation, contact.department),
    line('TITLE', localise(contact.title, locale)),
    // Phone before email, the order the details are read off a name card.
    ...contact.phones.map((phone) =>
      typedLine('TEL', phone.kind, phone.number),
    ),
    ...contact.emails.map((email) =>
      typedLine('EMAIL', email.kind, email.address),
    ),
    line('URL', contact.url),
    'END:VCARD',
  ];

  // CRLF: the spec says so, and Outlook is one of the parsers that means it.
  return `${lines.join('\r\n')}\r\n`;
}

/** `Wei-Shen-Teo.vcf` — recognisable in a downloads folder a week later. */
export function vCardFileName(contact: ContactCard): string {
  const name = `${contact.firstName} ${contact.lastName}`.trim();
  return `${name.replace(/\s+/g, '-')}.vcf`;
}

/**
 * Hands the vCard to the browser as a file, for the visitor who is reading on
 * the same device the code is on and so has nothing to point a camera at.
 *
 * Built here rather than as an `href`: `externalLink.ts` refuses `blob:` for
 * good reason, and this URL is one we minted from our own data a line ago.
 */
export function downloadVCard(contact: ContactCard, locale: Locale): void {
  const blob = new Blob([buildVCard(contact, locale)], {
    type: 'text/vcard;charset=utf-8',
  });
  const href = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = vCardFileName(contact);
  anchor.click();

  // Revoked on the next tick: Safari reads the URL after `click` returns.
  setTimeout(() => URL.revokeObjectURL(href), 0);
}
