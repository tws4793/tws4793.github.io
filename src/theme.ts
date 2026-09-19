import { createTheme } from '@mui/material/styles';

/**
 * Material UI's baseline theme, kept close to stock on purpose: this is the
 * Material look, not the hand-rolled one it replaced.
 *
 * `colorSchemes` declares both schemes; `cssVariables` emits the whole theme
 * as CSS custom properties so switching between them is a class swap on
 * `<html>` rather than a React re-render. `colorSchemeSelector: 'class'` is
 * what makes that class swap — and therefore the in-page toggle — possible;
 * the `'media'` default would pin the page to the OS setting.
 */
/*
  Roboto is Material's own typeface, self-hosted and imported in `main.tsx` —
  but only its Latin subset, which covers English and Malay and has no Chinese,
  Japanese or Tamil glyphs at all. Those fall through to system families.

  Shipping web fonts for them was the other option and a bad one: a CJK webfont
  runs to several megabytes, and everything here is precached by the service
  worker, so every visitor would pay for a language most of them will never
  pick. Every platform in common use already carries these faces.

  Each stack still leads with Roboto so Latin runs — handles, email addresses,
  "Instagram", "ST Engineering" — keep Material's typeface rather than the
  Latin glyphs bundled into a CJK font, which are rarely as good.

  Chinese, Japanese and Cantonese need separate stacks rather than one shared
  CJK entry. They share characters but not their shapes: 直, 今 and 骨 are all
  drawn differently in Simplified Chinese, Traditional Chinese and Japanese,
  and a reader notices immediately when a page is set in the wrong one.
*/
const ROBOTO = 'Roboto';
const GENERIC = 'Helvetica, Arial, sans-serif';

const FONT_STACKS = {
  latin: `${ROBOTO}, ${GENERIC}`,
  // Tamil: Apple, Windows, Android/Linux.
  tamil: `${ROBOTO}, "Tamil Sangam MN", "Nirmala UI", "Noto Sans Tamil", ${GENERIC}`,
  // Mandarin as Singapore writes it: Simplified. Apple, Windows, Android/Linux.
  chineseSimplified: `${ROBOTO}, "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", "Noto Sans SC", ${GENERIC}`,
  // Cantonese: Traditional, with Hong Kong character shapes where available.
  chineseTraditional: `${ROBOTO}, "PingFang HK", "PingFang TC", "Microsoft JhengHei", "Noto Sans CJK HK", "Noto Sans CJK TC", ${GENERIC}`,
  // Japanese: Apple, Windows, Android/Linux.
  japanese: `${ROBOTO}, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, "Noto Sans CJK JP", "Noto Sans JP", ${GENERIC}`,
} as const;

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: {
    /*
      Light's stock `background.default` is plain white, which leaves the card
      with nothing to sit on. Grey behind it is the usual Material answer; dark
      already separates the two and stays stock.
    */
    light: { palette: { background: { default: '#f5f5f5' } } },
    dark: true,
  },

  shape: { borderRadius: 12 },

  typography: {
    /*
      Indirection on purpose. Every component that sets a font ends up with
      `font-family: var(--app-font-stack)`, and the variable is redefined per
      language on <html> below — so the stack follows the language without any
      component style having to win a specificity fight.
    */
    fontFamily: 'var(--app-font-stack)',
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { minBlockSize: '100dvh' },
        ':root': { '--app-font-stack': FONT_STACKS.latin },
        /*
          `<html lang>` is kept in step with the chosen language by
          `src/i18n`, which is what makes these selectors fire.
        */
        ':root:lang(ta)': { '--app-font-stack': FONT_STACKS.tamil },
        ':root:lang(zh)': { '--app-font-stack': FONT_STACKS.chineseSimplified },
        ':root:lang(yue)': {
          '--app-font-stack': FONT_STACKS.chineseTraditional,
        },
        ':root:lang(ja)': { '--app-font-stack': FONT_STACKS.japanese },
      },
    },
  },
});
