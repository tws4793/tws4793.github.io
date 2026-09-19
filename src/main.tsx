/*
  Roboto is self-hosted rather than pulled from Google Fonts: the service
  worker precaches these files with the rest of the build, so an offline visit
  renders in the real typeface instead of falling back to a system font. Only
  the weights the theme actually asks for, and only the Latin subset.
*/
import '@fontsource/roboto/latin-300.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { profile } from './data/profile';
// Side-effect import: initialises i18next before the first render reads it.
import './i18n';
import { theme } from './theme';

// Keeps the tab title in step with profile.ts rather than duplicating the
// name into index.html.
document.title = `${profile.name}`;

const container = document.getElementById('root');
if (!container) {
  throw new Error('index.html is missing the #root element.');
}

createRoot(container).render(
  <StrictMode>
    {/* `defaultMode="system"` follows the OS until the toggle says otherwise. */}
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
