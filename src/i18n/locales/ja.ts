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
  contact: {
    save: '連絡先を保存',
    hint: 'コードを読み取って連絡先に追加するか、ファイルを保存してください。',
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
