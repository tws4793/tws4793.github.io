import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { profile } from './data/profile';
import { theme } from './theme';

// Keeps the tab title in step with profile.ts rather than duplicating the
// name into index.html.
document.title = `${profile.name} — contact card`;

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
