import type { Profile, ProfileLink } from '../types';

/*
  The only file you need to edit to make the page yours.

  Order is the design. Contact channels first (how someone reaches you), then
  proof (how someone checks you out). The first entry is the code shown when
  the page opens, so it should be the one you scan at people.

  Replace every PLACEHOLDER below before deploying.
*/
export const profile: Profile = {
  name: 'TEO Wei Shen',
  tagline:
    'Senior Software Engineer at ST Engineering. Also hobbyist photographer.',
  location: 'Singapore',
  links: [
    {
      id: 'telegram',
      platform: 'telegram',
      label: 'Telegram',
      handle: '@tws4793',
      url: 'https://t.me/tws4793',
    },
    {
      id: 'email',
      platform: 'email',
      label: 'Email',
      handle: 'tws4793@gmail.com',
      url: 'mailto:tws4793@gmail.com',
    },
    {
      id: 'linkedin',
      platform: 'linkedin',
      label: 'LinkedIn',
      handle: 'in/teo-wei-shen',
      url: 'https://www.linkedin.com/in/teo-wei-shen/',
    },
    {
      id: 'github',
      platform: 'github',
      label: 'GitHub',
      handle: '@tws4793',
      url: 'https://github.com/tws4793',
    },
    {
      id: 'photography',
      platform: 'instagram',
      label: 'Photography',
      handle: '@tws.cr3',
      url: 'https://instagram.com/tws.cr3',
    },
  ],
};

export function findLinkById(id: string): ProfileLink {
  const match = profile.links.find((link) => link.id === id);
  if (!match) {
    throw new Error(`No link in profile.ts has the id "${id}".`);
  }
  return match;
}
