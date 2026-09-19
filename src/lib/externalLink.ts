/*
  Every outbound link on the page is built here, so the scheme check and the
  `rel` hardening are written once and cannot be forgotten when a row is added.
*/

/**
 * Schemes a contact card legitimately needs. Anything else — `javascript:`
 * above all, but also `data:` and `blob:` — would turn a profile entry into a
 * script injection point the moment the data stops being hand-written.
 */
const ALLOWED_PROTOCOLS: ReadonlySet<string> = new Set([
  'https:',
  'mailto:',
  'tel:',
]);

/**
 * Props for an anchor pointing off-site.
 *
 * `noopener` denies the opened page a handle on `window.opener`; `noreferrer`
 * withholds the referrer and covers browsers that predate `noopener`.
 *
 * @throws If the URL is malformed or uses a scheme outside the allowlist. The
 *   profile is authored by hand, so a bad entry is a mistake to surface loudly
 *   rather than a value to quietly drop.
 */
export function externalLinkProps(url: string) {
  const protocol = parseProtocol(url);
  if (!ALLOWED_PROTOCOLS.has(protocol)) {
    throw new Error(
      `The URL "${url}" uses the unsupported scheme "${protocol}". ` +
        `Links in profile.ts must be one of: ${[...ALLOWED_PROTOCOLS].join(', ')}.`,
    );
  }

  return {
    href: url,
    target: '_blank',
    rel: 'noreferrer noopener',
  } as const;
}

function parseProtocol(url: string): string {
  try {
    return new URL(url).protocol;
  } catch {
    throw new Error(`The URL "${url}" in profile.ts is not a valid URL.`);
  }
}
