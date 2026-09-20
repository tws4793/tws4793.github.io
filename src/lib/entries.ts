import type { CardEntry, Profile } from '../types';

/*
  The list holds two different things — a contact card and a set of links —
  and the row, the panel and the manifest all want to treat them alike: an
  icon, a label and a code. `CardEntry` is that common shape, with the
  differences (the handle, what the code carries, what the button does) left
  in the `kind` tag for the places that genuinely care.

  React-free, like `localise`, because `vite.config.ts` builds the launcher
  shortcuts from the same list the page renders.
*/

/**
 * Every entry on the card, in the order it is listed.
 *
 * The contact card goes first: it is the one you hold up to someone, and the
 * first entry is what the page opens on.
 */
export function entriesOf(profile: Profile): readonly CardEntry[] {
  const links = profile.links.map((link): CardEntry => ({
    kind: 'link',
    ...link,
  }));

  if (!profile.contact) {
    return links;
  }

  return [
    {
      kind: 'contact',
      id: 'contact',
      platform: 'contact',
      label: profile.contact.label,
      contact: profile.contact,
    },
    ...links,
  ];
}

export function findEntryById(
  entries: readonly CardEntry[],
  id: string,
): CardEntry {
  const match = entries.find((entry) => entry.id === id);
  if (!match) {
    throw new Error(`No entry on the card has the id "${id}".`);
  }
  return match;
}
