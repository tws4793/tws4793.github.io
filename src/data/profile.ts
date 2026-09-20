import type { Profile } from '../types';

/*
  The only file you need to edit to make the page yours.

  Order is the design. The contact card first (everything about you, in one
  scan), then contact channels (how someone reaches you), then proof (how
  someone checks you out). The first entry is the code shown when the page
  opens, so it should be the one you scan at people.

  Replace every PLACEHOLDER below before deploying.

  Any of `tagline`, `location` and a link's `label` may be written either as a
  plain string or as one string per language. English is required in the object
  form, and stands in wherever a language is missing.

  Platform names are translated too, wherever the language has an established
  form of its own: Japanese and Tamil write them in their own scripts, and
  Mandarin has real names for some services (电报, 领英) but none for Instagram
  or GitHub. Where no such form exists, leave the language out of the object
  and it falls back to the Latin name — that is why GitHub lists only `ta` and
  `ja`, and why LinkedIn has no `yue`, Hong Kong writing it in Latin.
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
    de: 'Senior Software Engineer bei ST Engineering. Außerdem Hobbyfotograf.',
    fr: 'Ingénieur logiciel senior chez ST Engineering. Également photographe amateur.',
  },
  location: {
    en: 'Singapore',
    zh: '新加坡',
    ms: 'Singapura',
    ta: 'சிங்கப்பூர்',
    yue: '新加坡',
    ja: 'シンガポール',
    de: 'Singapur',
    fr: 'Singapour',
  },
  /*
    The details a scanner writes straight into an address book. Remove this
    block and the card goes back to being links only.

    The job title is translated where the language has a settled way of saying
    it — the same renderings the tagline above uses. The company and the
    department are not: they are a registered name and an internal unit, and
    neither has a translation that anyone would recognise on a name card.
  */
  contact: {
    firstName: 'Wei Shen',
    lastName: 'Teo',
    label: {
      en: 'Contact card',
      zh: '名片',
      ms: 'Kad nama',
      ta: 'தொடர்பு அட்டை',
      yue: '名片',
      ja: '名刺',
      de: 'Visitenkarte',
      fr: 'Carte de visite',
    },
    title: {
      en: 'Senior Software Engineer',
      zh: '高级软件工程师',
      ms: 'Jurutera Perisian Kanan',
      ta: 'மூத்த மென்பொருள் பொறியாளர்',
      yue: '高級軟件工程師',
      ja: 'シニアソフトウェアエンジニア',
      fr: 'Ingénieur logiciel senior',
    },
    organisation: 'ST Engineering IHQ Pte. Ltd.',
    department: 'Data Analytics, Group Engineering Centre',
    phones: [{ kind: 'cell', number: '+6597391300' }],
    emails: [
      { kind: 'work', address: 'weishen.teo@stengg.com' },
      { kind: 'home', address: 'tws4793@gmail.com' },
    ],
    url: 'https://tws4793.github.io/',
  },
  links: [
    {
      id: 'telegram',
      platform: 'telegram',
      label: {
        en: 'Telegram',
        zh: '电报',
        yue: '電報',
        ta: 'டெலிகிராம்',
        ja: 'テレグラム',
      },
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
        de: 'Geschäftliche E-Mail',
        fr: 'E-mail professionnel',
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
        de: 'Private E-Mail',
        fr: 'E-mail personnel',
      },
      handle: 'tws4793@gmail.com',
      url: 'mailto:tws4793@gmail.com',
    },
    {
      id: 'linkedin',
      platform: 'linkedin',
      label: {
        en: 'LinkedIn',
        zh: '领英',
        ta: 'லிங்க்ட்இன்',
        ja: 'リンクトイン',
      },
      handle: 'in/teo-wei-shen',
      url: 'https://www.linkedin.com/in/teo-wei-shen/',
    },
    {
      id: 'github',
      platform: 'github',
      label: {
        en: 'GitHub',
        ta: 'கிட்ஹப்',
        ja: 'ギットハブ',
      },
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
        ta: 'புகைப்பட இன்ஸ்டாகிராம்',
        yue: '攝影 Instagram',
        ja: '写真用インスタグラム',
        de: 'Instagram (Fotografie)',
        fr: 'Instagram (photographie)',
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
        ta: 'தனிப்பட்ட இன்ஸ்டாகிராம்',
        yue: '私人 Instagram',
        ja: '個人用インスタグラム',
        de: 'Instagram (privat)',
        fr: 'Instagram (personnel)',
      },
      handle: '@tws4793',
      url: 'https://instagram.com/tws4793',
    },
  ],
};
