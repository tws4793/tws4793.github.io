import type { Translation } from './en';

/** Deutsch — German. Formal "Sie": this is a professional contact card. */
export const de: Translation = {
  nav: {
    whereToFindMe: 'So erreichen Sie mich',
    showCode: '{{label}}-Code anzeigen',
    openInNewTab: '{{label}} in neuem Tab öffnen',
  },
  qr: {
    region: 'Angezeigter Code',
    open: '{{label}} öffnen',
    hint: 'Richten Sie die Handykamera auf den Code.',
  },
  contact: {
    save: 'Kontakt speichern',
    hint: 'Code scannen, um mich zu den Kontakten hinzuzufügen, oder die Datei speichern.',
  },
  empty: {
    message:
      'Fügen Sie Ihren ersten Link in <code>{{file}}</code> hinzu, und er erscheint hier mit eigenem Code.',
  },
  install: {
    action: 'Installieren',
  },
  colorScheme: {
    label: 'Farbschema',
    light: 'Hell',
    system: 'Systemeinstellung',
    dark: 'Dunkel',
  },
  language: {
    label: 'Sprache',
  },
  serviceWorker: {
    offlineReady: 'Offline einsatzbereit.',
    updateAvailable: 'Eine neue Version ist verfügbar.',
    reload: 'Neu laden',
  },
};
