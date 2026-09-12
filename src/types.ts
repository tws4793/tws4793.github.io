export type Platform =
  'telegram' | 'instagram' | 'linkedin' | 'github' | 'email' | 'website';

export interface ProfileLink {
  /** Stable key, also used to identify the currently displayed code. */
  readonly id: string;
  readonly platform: Platform;
  /**
   * What the destination is for, in your words. Prefer the purpose over the
   * platform name where it disambiguates: "Photography" reads better than
   * "Instagram" when the account is not your personal one.
   */
  readonly label: string;
  /** How you are known there: "@handle", "in/your-name". */
  readonly handle: string;
  /** Absolute URL encoded into the QR code and opened on tap. */
  readonly url: string;
}

export interface Profile {
  readonly name: string;
  readonly tagline: string;
  readonly location: string;
  readonly links: readonly ProfileLink[];
}
