import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` keeps asset URLs relative so the built site works when served
// from a sub-path (GitHub Pages project sites, for example).
export default defineConfig({
  plugins: [react()],
  base: './',
});
