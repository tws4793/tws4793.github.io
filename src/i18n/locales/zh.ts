import type { Translation } from './en';

/** 简体中文 — Singapore uses Simplified Chinese. */
export const zh: Translation = {
  nav: {
    whereToFindMe: '联系方式',
    showCode: '显示{{label}}的二维码',
    openInNewTab: '在新标签页中打开{{label}}',
  },
  qr: {
    region: '当前二维码',
    open: '打开{{label}}',
    hint: '用手机相机扫描二维码。',
  },
  contact: {
    save: '保存联系人',
    hint: '扫描二维码即可把我加入通讯录，或直接保存名片文件。',
  },
  empty: {
    message:
      '在 <code>{{file}}</code> 中添加第一个链接，它会连同二维码一起显示在这里。',
  },
  install: {
    action: '安装',
  },
  colorScheme: {
    label: '配色方案',
    light: '浅色',
    system: '跟随系统',
    dark: '深色',
  },
  language: {
    label: '语言',
  },
  serviceWorker: {
    offlineReady: '已可离线使用。',
    updateAvailable: '有新版本可用。',
    reload: '重新加载',
  },
};
