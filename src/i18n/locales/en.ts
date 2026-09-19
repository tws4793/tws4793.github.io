/*
  English is the source of truth for the shape of a translation: every other
  locale is typed as `Translation`, so adding a key here and forgetting it in
  zh, ms or ta fails the build rather than falling back silently at runtime.
*/
export const en = {
  nav: {
    whereToFindMe: 'Where to find me',
    showCode: 'Show the {{label}} code',
    openInNewTab: 'Open {{label}} in a new tab',
  },
  qr: {
    region: 'Code on show',
    open: 'Open {{label}}',
    hint: 'Point a phone camera at the code.',
  },
  empty: {
    /*
      <code> wraps the filename. A named tag rather than a numbered one, so a
      translator can see what it is, and can move it to wherever the sentence
      needs it in their language.
    */
    message:
      'Add your first link in <code>{{file}}</code> and it will appear here with its own code.',
  },
  install: {
    action: 'Install',
  },
  colorScheme: {
    label: 'Colour scheme',
    light: 'Light',
    system: 'Match system',
    dark: 'Dark',
  },
  language: {
    label: 'Language',
  },
  serviceWorker: {
    offlineReady: 'Ready to work offline.',
    updateAvailable: 'A new version is available.',
    reload: 'Reload',
  },
} as const;

/** The shape every locale must fill. */
export type Translation = {
  readonly [Section in keyof typeof en]: {
    readonly [Key in keyof (typeof en)[Section]]: string;
  };
};
