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
    // Material's own typeface, self-hosted and imported in `main.tsx`.
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { minBlockSize: '100dvh' } },
    },
  },
});
