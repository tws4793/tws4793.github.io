# tws4793.github.io

A personal contact card. One page, one row per way to reach me, and a
scannable code for each. Built with Vite, React and TypeScript.

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
_and_ adding a glyph to `src/components/PlatformIcon.tsx`. TypeScript will
refuse to build until you do both, which is intended.

Everything is placeholder text right now — search the repo for `PLACEHOLDER`.

## Design notes

The hero is the code, not the avatar. One bright paper panel on a dark petrol
field, and swapping which code it shows is the only animation on the page.

The panel sizes itself with a container query rather than a viewport
breakpoint: when it is wide (any phone) the caption sits alongside the code so
the code does not eat the screen; when it is narrow (the desktop side column)
it stacks and the code runs full width. That is why the phone view reads like a
name badge and the desktop view reads like a card.

`--qr-paper` and `--qr-ink` in `src/styles/tokens.css` are deliberately not
theme-swapped. Camera apps need dark modules on a light quiet zone, so those
two hold still while every other token flips for the light scheme.

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
