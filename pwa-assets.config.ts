import {
  defineConfig,
  minimal2023Preset,
} from '@vite-pwa/assets-generator/config';

/*
  Every icon the manifest needs is generated from `public/favicon.svg` by
  `yarn generate-pwa-assets`, rather than being drawn by hand at six sizes.
  The output is committed, so a plain `yarn build` needs neither this config
  nor its `sharp` dependency.
*/
export default defineConfig({
  headLinkOptions: { preset: '2023' },
  images: ['public/favicon.svg'],
  preset: {
    ...minimal2023Preset,
    /*
      No padding anywhere: the source is already full-bleed. Padding would
      letterbox the maskable icon onto a background colour and leave Android's
      mask cutting into blank space instead of into the icon.
    */
    transparent: { ...minimal2023Preset.transparent, padding: 0 },
    maskable: { ...minimal2023Preset.maskable, padding: 0 },
    apple: { ...minimal2023Preset.apple, padding: 0 },
  },
});
