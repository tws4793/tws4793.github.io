import type { Translation } from './en';

/*
  粵語 — written Cantonese, in Traditional characters.

  Not a copy of zh with the characters converted. Written Cantonese has its
  own words and grammar — 嘅 for possession, 喺 for location, 呢 for "this",
   咗 for the perfective — and a Cantonese reader handed Standard Written
  Chinese would notice immediately that it was not their language.
*/
export const yue: Translation = {
  nav: {
    whereToFindMe: '聯絡方法',
    showCode: '顯示{{label}}嘅二維碼',
    openInNewTab: '喺新分頁開{{label}}',
  },
  qr: {
    region: '而家顯示緊嘅二維碼',
    open: '開{{label}}',
    hint: '用手機鏡頭掃呢個二維碼。',
  },
  empty: {
    message:
      '喺 <code>{{file}}</code> 入面加你第一個連結，佢就會連埋二維碼喺度顯示。',
  },
  install: {
    action: '安裝',
  },
  colorScheme: {
    label: '色彩模式',
    light: '淺色',
    system: '跟系統',
    dark: '深色',
  },
  language: {
    label: '語言',
  },
  serviceWorker: {
    offlineReady: '而家可以離線用喇。',
    updateAvailable: '有新版本喇。',
    reload: '重新載入',
  },
};
