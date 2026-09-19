# tws4793.github.io

A personal contact card. One page, one row per way to reach me, and a
scannable code for each. Built with Vite, React, TypeScript and Material UI,
and installable as a progressive web app that works with no network at all.

## Getting started

Requires Node 22+ (see `.nvmrc`). Yarn comes from Corepack — the version is
pinned in `package.json`, so there is nothing to install globally.

```bash
corepack enable
yarn install
yarn dev          # http://localhost:5173
```

Other scripts:

| Script              | Does                                      |
| ------------------- | ----------------------------------------- |
| `yarn build`        | Production build into `dist/`             |
| `yarn preview`      | Serve the built output locally            |
| `yarn typecheck`    | `tsc --noEmit`                            |
| `yarn format`       | Rewrite with Prettier                     |
| `yarn format:check` | Fail if anything is unformatted (CI gate) |

`yarn generate-pwa-assets` regenerates the icons in `public/` from
`public/favicon.svg`. Its output is committed, so an ordinary build — and CI —
never needs to run it.

There is a dev container at `.devcontainer/devcontainer.json` with Node 22,
the GitHub CLI and the Claude Code CLI. `~/.claude` is mounted as a named
volume, so `claude` stays authenticated across rebuilds. The VS Code extension
for Claude Code is not pinned in the config — install it from the marketplace
if you want the in-editor version alongside the CLI.

## Editing the page

`src/data/profile.ts` is the only file you need to touch. Everything else
reads from it, including the browser tab title.

Order is the design. Contact channels come first — how someone reaches you —
then proof, how someone checks you out. The first entry is the code shown when
the page opens, so it should be whichever one you scan at people.

`label` and `handle` are separate fields on purpose. The label can say what the
destination is _for_ rather than what the platform is called: a photography
Instagram reads better as **Photography** than as **Instagram**, and it tells a
recruiter the account is not your personal one.

Adding a platform means adding it to the `Platform` union in `src/types.ts`
_and_ mapping it to an icon in `src/components/PlatformIcon.tsx`. TypeScript
will refuse to build until you do both, which is intended.

Link URLs are checked against an allowlist of schemes — `https:`, `mailto:`
and `tel:` — in `src/lib/externalLink.ts`. A typo or a pasted `javascript:`
URL throws on render rather than reaching an `href`.

Everything is placeholder text right now — search the repo for `PLACEHOLDER`.

## Design notes

This version is built with [Material UI](https://mui.com) and deliberately
looks like it: stock palette, stock Roboto type scale, Material's own icon set,
and Material's list and card anatomy. The point is to show what the page costs
and what it gains when the design language comes from the library rather than
from a hand-written stylesheet. There are no CSS files in `src/` at all —
every style is either the theme or an `sx` prop.

The page is one `Card`. `CardHeader` carries the avatar, name, tagline and a
location `Chip`; below it a two-column `Grid` puts the code on the left and the
list of links on the right, collapsing to one column below the `md` breakpoint.

Material's list anatomy decides which control does what. Selecting a code is
the row's _primary_ action, so the whole row is the `ListItemButton` and the
selected row gets Material's standard `selected` tint. Opening the destination
is the _secondary_ action, so it is the trailing icon button. The previous
version had these the other way round, which needed a custom hairline and a
custom accent bar to explain itself; here the component does the explaining.

### The theme

`src/theme.ts` is close to stock on purpose — the shape radius, Roboto, and
the two colour schemes, and little else. `cssVariables` emits the theme as CSS
custom properties, so switching schemes is a class swap on `<html>` rather
than a React re-render.

`colorSchemeSelector: 'class'` is the line that makes the in-page toggle
possible; MUI's `'media'` default would pin the page to the OS setting with no
way to override it.

### Light and dark

`ThemeProvider` is given `defaultMode="system"`, so a first visit follows the
OS. `src/components/ColorSchemeToggle.tsx` then offers light / system / dark as
three segments rather than a single sun-moon button: with only two states there
is nowhere to put "follow the OS", which is the state most people want.
`useColorScheme` persists the choice to `localStorage`.

`mode` is `undefined` on the first render, before the stored value is read
back. The toggle renders nothing until it resolves, which is what keeps it
from flashing the wrong segment.

The code panel is the one thing that does _not_ follow the scheme. A decoder
needs dark modules on a light quiet zone, so that `Paper` is pinned to
`common.white` in both schemes.

### Outbound links

Every `href` on the page is built by `externalLinkProps` in
`src/lib/externalLink.ts`, which checks the URL against an allowlist of schemes
(`https:`, `mailto:`, `tel:`) and attaches `rel="noreferrer noopener"`. Writing
it once means a new row cannot forget either. A `javascript:` or `data:` URL —
or a plain typo — throws on render rather than reaching an attribute.

## Progressive web app

`vite-plugin-pwa` supplies the manifest and the Workbox service worker, and
`@vite-pwa/assets-generator` supplies the icons. Neither is hand-written:
a service worker is easy to write and hard to write _correctly_, and six icon
sizes are not worth drawing by hand.

### It works offline, properly

Every file in the build is precached, so the card opens with the radio off.
That includes the typeface: Roboto is self-hosted through `@fontsource/roboto`
and imported in `main.tsx` rather than linked from Google Fonts, because a
cross-origin stylesheet is exactly the request that fails on a plane. Only the
weights the theme asks for, and only the Latin subset.

This matters more here than on most sites. The moment you actually need this
page is the moment you are standing in front of someone in a building with no
signal, and a QR code that cannot render is worse than a phone number.

### Updates ask first

`registerType: 'prompt'`, not `'autoUpdate'`. A contact card is something you
hold up to someone; reloading it out from under them mid-scan would be worse
than showing a stale code for a few seconds. `ServiceWorkerPrompts.tsx` raises
a snackbar with a **Reload** action instead, and that snackbar has no
auto-hide — one that dismissed itself would leave the old version running with
nothing left to say so.

### The manifest comes from `profile.ts`

`vite.config.ts` imports the profile and builds the manifest from it, so the
installed app's name, description and shortcuts cannot drift from the page.
The first four links become launcher shortcuts pointing at `./?code=<id>`, so
a long-press on the installed icon goes straight to a particular code.

That parameter arrives from outside the app, so `App` matches it against the
profile rather than passing it to `findLinkById`, which throws on an id it does
not recognise. An unknown or hostile `?code=` falls back to the first link.

### Installing

`InstallButton.tsx` captures `beforeinstallprompt` and offers the install from
a button in the page. It renders nothing when the browser has not offered an
invitation — already installed, or Firefox, or iOS Safari, which has no such
event and installs from the share sheet instead. A button that could not do
anything would only puzzle people.

## Wallpapers

`tools/wallpaper.py` renders the site's URL as an iPhone 17 Pro Max wallpaper
(1320×2868, so it maps 1:1 with no resampling).

```bash
pip install segno pillow
python tools/wallpaper.py     # writes to wallpapers/
```

Three variants come out:

- **`wallpaper-petrol`** — matches the site. Highest contrast, scans anywhere.
- **`wallpaper-dark-dimmed`** — black field, correct polarity kept but the
  quiet zone dimmed to a grey slab. Still scans anywhere.
- **`wallpaper-dark-inverted`** — light modules straight onto black. Best
  looking and darkest, but inversion flips the decoder's core assumption. Fine
  on iOS Camera 14+ and Google Lens, unreliable on older Android cameras and
  third-party scanner apps.

The script prints the measured module/background contrast for each. Keep it
above 4:1. Modules are drawn at a whole number of pixels each, because
fractional module edges are the usual reason a code shown on a screen fails to
scan.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`: install, format
check, type check, build, then publish `dist/` to the **`gh-pages`** branch via
`peaceiris/actions-gh-pages`.

**One-time setup:** Settings → Pages → Source: _Deploy from a branch_ →
`gh-pages` / `root`. The workflow writes the branch but cannot flip that
setting for you, so the first deploy will appear to do nothing until you do.

`vite.config.ts` sets `base: './'`, so the build works from a sub-path as well
as from the domain root.

If the old version of this repo had a `CNAME` file for a custom domain, copy it
into `public/` — Vite passes that directory through to `dist/` untouched, and
without it the deploy will drop the domain.
