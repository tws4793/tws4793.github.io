import type { Profile, ProfileLink } from '../types';

/*
  The only file you need to edit to make the page yours.

  Order is the design. Contact channels first (how someone reaches you), then
  proof (how someone checks you out). The first entry is the code shown when
  the page opens, so it should be the one you scan at people.

  Replace every PLACEHOLDER below before deploying.

  Any of `tagline`, `location` and a link's `label` may be written either as a
  plain string or as one string per language. Brand names — Telegram, GitHub,
  LinkedIn — read the same everywhere and stay plain strings; anything that is
  a description rather than a name is worth translating. English is required
  in the object form, and stands in wherever a language is missing.
*/
export const profile: Profile = {
  name: 'TEO Wei Shen',
  tagline: {
    en: 'Senior Software Engineer at ST Engineering. Also hobbyist photographer.',
    zh: '新加坡科技工程有限公司高级软件工程师，业余摄影爱好者。',
    ms: 'Jurutera Perisian Kanan di ST Engineering. Juga jurugambar amatur.',
    ta: 'ST Engineering நிறுவனத்தில் மூத்த மென்பொருள் பொறியாளர். பொழுதுபோக்காகப் புகைப்படக் கலைஞர்.',
    yue: '新加坡科技工程有限公司高級軟件工程師，得閒鍾意影相。',
    ja: 'ST Engineering のシニアソフトウェアエンジニア。趣味は写真撮影。',
  },
  location: {
    en: 'Singapore',
    zh: '新加坡',
    ms: 'Singapura',
    ta: 'சிங்கப்பூர்',
    yue: '新加坡',
    ja: 'シンガポール',
  },
  links: [
    {
      id: 'telegram',
      platform: 'telegram',
      label: 'Telegram',
      handle: '@tws4793',
      url: 'https://t.me/tws4793',
    },
    {
      id: 'work',
      platform: 'email',
      label: {
        en: 'Business Email',
        zh: '公司邮箱',
        ms: 'E-mel Kerja',
        ta: 'பணி மின்னஞ்சல்',
        yue: '公司電郵',
        ja: '仕事用メール',
      },
      handle: 'weishen.teo@stengg.com',
      url: 'mailto:weishen.teo@stengg.com',
    },
    {
      id: 'personal',
      platform: 'email',
      label: {
        en: 'Personal Email',
        zh: '个人邮箱',
        ms: 'E-mel Peribadi',
        ta: 'தனிப்பட்ட மின்னஞ்சல்',
        yue: '私人電郵',
        ja: '個人用メール',
      },
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
      label: {
        en: 'Photography Instagram',
        zh: '摄影 Instagram',
        ms: 'Instagram Fotografi',
        ta: 'புகைப்பட Instagram',
        yue: '攝影 Instagram',
        ja: '写真 Instagram',
      },
      handle: '@tws.cr3',
      url: 'https://instagram.com/tws.cr3',
    },
    {
      id: 'personal-instagram',
      platform: 'instagram',
      label: {
        en: 'Personal Instagram',
        zh: '个人 Instagram',
        ms: 'Instagram Peribadi',
        ta: 'தனிப்பட்ட Instagram',
        yue: '私人 Instagram',
        ja: '個人 Instagram',
      },
      handle: '@tws4793',
      url: 'https://instagram.com/tws4793',
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
