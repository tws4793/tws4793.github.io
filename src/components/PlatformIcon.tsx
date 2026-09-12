import type { ReactElement } from 'react';
import type { Platform } from '../types';

interface PlatformIconProps {
  readonly platform: Platform;
}

const GLYPHS: Record<Platform, ReactElement> = {
  telegram: (
    <>
      <path d="M21.6 3.9 2.9 10.5a.55.55 0 0 0 .05 1.04l4.85 1.48 1.8 5.36a.55.55 0 0 0 .95.18l2.45-2.93 4.76 3.46a.55.55 0 0 0 .86-.3l3.5-14.2a.55.55 0 0 0-.52-.7Z" />
      <path d="M7.8 13 21 4.4l-9.9 10.9-.55 3.4" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="8.4" r="1" fill="currentColor" stroke="none" />
      <path d="M8 11.2V17" />
      <path d="M12 17v-3.2a2.2 2.2 0 0 1 4.4 0V17" />
    </>
  ),
  github: (
    /*
      Deliberately not the Octocat: that mark is GitHub's trademarked
      illustration. The row label already says where it goes, so a generic
      code glyph carries the meaning without borrowing the logo.
    */
    <>
      <path d="M9 8.2 4.4 12 9 15.8" />
      <path d="m15 8.2 4.6 3.8-4.6 3.8" />
      <path d="M13.1 5.6l-2.2 12.8" />
    </>
  ),
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 7 7.3 5.2a1.5 1.5 0 0 0 1.8 0L20.2 7" />
    </>
  ),
  website: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.4 12h17.2" />
      <path d="M12 3c2.4 2.4 3.6 5.4 3.6 9S14.4 18.6 12 21c-2.4-2.4-3.6-5.4-3.6-9S9.6 5.4 12 3Z" />
    </>
  ),
};

export function PlatformIcon({ platform }: PlatformIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[platform]}
    </svg>
  );
}

export function QrGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3.5" y="3.5" width="6" height="6" rx="1.2" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="1.2" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1.2" />
      <path
        d="M14.5 14.5h2.4v2.4h-2.4zm3.6 0h2.4v2.4h-2.4zm-3.6 3.6h2.4v2.4h-2.4zm3.6 0h2.4v2.4h-2.4z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
