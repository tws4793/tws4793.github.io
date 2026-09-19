import type { Translation } from './en';

/** 日本語 — Japanese. */
export const ja: Translation = {
  nav: {
    whereToFindMe: '連絡先',
    showCode: '{{label}}のコードを表示',
    openInNewTab: '{{label}}を新しいタブで開く',
  },
  qr: {
    region: '表示中のコード',
    open: '{{label}}を開く',
    hint: 'スマートフォンのカメラでコードを読み取ってください。',
  },
  empty: {
    message:
      '<code>{{file}}</code> に最初のリンクを追加すると、コードとともにここに表示されます。',
  },
  install: {
    action: 'インストール',
  },
  colorScheme: {
    label: 'カラーテーマ',
    light: 'ライト',
    system: 'システムに合わせる',
    dark: 'ダーク',
  },
  language: {
    label: '言語',
  },
  serviceWorker: {
    offlineReady: 'オフラインで利用できます。',
    updateAvailable: '新しいバージョンがあります。',
    reload: '再読み込み',
  },
};
