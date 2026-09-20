import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { entriesOf } from './src/lib/entries';
import { localise } from './src/lib/localise';
import { profile } from './src/data/profile';

/** Matches the Material primary used by the theme and by the generated icons. */
const THEME_COLOR = '#1976d2';

/*
  Home-screen label. Android truncates past roughly 12 characters, so a long
  name falls back to its first word rather than being cut mid-word.
*/
const shortName =
  profile.name.length <= 12
    ? profile.name
    : (profile.name.split(/\s+/).at(0) ?? profile.name);

/*
  Long-press shortcuts into a specific code. Most launchers show at most four,
  and the order in profile.ts is already "most useful first", so the top four
  are the right four. `App` validates the `code` parameter against the same
  list before trusting it.

  A manifest is written once at build time and cannot follow the language the
  visitor later picks, so these are English — the profile's mandatory
  fallback — whatever else the card is translated into.
*/
const shortcuts = entriesOf(profile)
  .slice(0, 4)
  .map((entry) => {
    const label = localise(entry.label, 'en');
    return {
      name: `${label} code`,
      short_name: label,
      description:
        entry.kind === 'contact'
          ? `Show the code that saves ${profile.name} to your contacts`
          : `Show the code for ${entry.handle}`,
      url: `./?code=${encodeURIComponent(entry.id)}`,
    };
  });

// `base: './'` keeps asset URLs relative so the built site works when served
// from a sub-path (GitHub Pages project sites, for example). `start_url` and
// `scope` below are relative for the same reason.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      /*
        A contact card is something you hold up to someone. Reloading it out
        from under them mid-scan would be worse than showing a stale code for
        a few seconds, so an update waits for an explicit tap.
      */
      registerType: 'prompt',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'apple-touch-icon-180x180.png',
      ],
      manifest: {
        name: `${profile.name} — contact card`,
        short_name: shortName,
        description: localise(profile.tagline, 'en'),
        start_url: '.',
        scope: '.',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: THEME_COLOR,
        background_color: THEME_COLOR,
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        shortcuts,
      },
      workbox: {
        /*
          The whole site is a handful of static files, so everything is
          precached — including the self-hosted Roboto, which is why the page
          renders correctly offline rather than falling back to a system font.
        */
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
