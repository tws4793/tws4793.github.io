import type { Translation } from './en';

/** Français — French. Formal "vous", as on any professional card. */
export const fr: Translation = {
  nav: {
    whereToFindMe: 'Où me trouver',
    showCode: 'Afficher le code {{label}}',
    openInNewTab: 'Ouvrir {{label}} dans un nouvel onglet',
  },
  qr: {
    region: 'Code affiché',
    open: 'Ouvrir {{label}}',
    hint: 'Pointez l’appareil photo du téléphone vers le code.',
  },
  empty: {
    message:
      'Ajoutez votre premier lien dans <code>{{file}}</code> et il apparaîtra ici avec son propre code.',
  },
  install: {
    action: 'Installer',
  },
  colorScheme: {
    label: 'Thème de couleurs',
    light: 'Clair',
    system: 'Selon le système',
    dark: 'Sombre',
  },
  language: {
    label: 'Langue',
  },
  serviceWorker: {
    offlineReady: 'Prêt à fonctionner hors ligne.',
    updateAvailable: 'Une nouvelle version est disponible.',
    reload: 'Recharger',
  },
};
