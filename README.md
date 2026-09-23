# Lotus Spa — Standalone Version

Pure Vite + React + TypeScript + Tailwind CSS + i18next app. No Convex, no Hercules dependencies.

## Stack
- Vite 7 + React 19 + TypeScript
- Tailwind CSS 4
- react-router-dom v7 (BrowserRouter)
- i18next + react-i18next (RU / UZ)
- motion (animations)
- lucide-react (icons)
- next-themes (dark mode)
- sonner (toasts)

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy on Vercel

1. Push this branch to GitHub
2. Import repo in Vercel
3. Set **Framework**: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click Deploy

The `vercel.json` already handles SPA routing rewrites.

## Deploy on any static host (Nginx / Apache)

```bash
npm run build   # output → dist/
```

Upload the `dist/` folder. Configure server to redirect all 404 → `index.html`.

## Localization
- Russian: `src/locales/ru/common.json`
- Uzbek: `src/locales/uz/common.json`

Add a new language: create `src/locales/<code>/common.json`, add to `SUPPORTED_LOCALES` in `src/i18n.ts`.

## Price list images (section «Цены» → slider)

The full service menu of every branch is shown as an image slider in the pricing section
(`src/components/price-menu-slider.tsx`). Images are served from `public/images/price/`:

| File | Purpose |
| --- | --- |
| `public/images/price/<branch>-<lng>.webp` | 2000 px preview shown in the slider |
| `public/images/price/full/<branch>-<lng>.jpg` | 4200 px version opened in a new tab / downloaded |
| `assets/price-source/<branch>-<lng>.jpg` | original 6000 px print files (not served) |

`<branch>` = `karasaray` · `sergeli` · `c1`, `<lng>` = `ru` · `uz`.

To update a price list, replace the source file and regenerate both web versions (ImageMagick):

```bash
convert assets/price-source/karasaray-ru.jpg -strip -resize 2000x -quality 80 public/images/price/karasaray-ru.webp
convert assets/price-source/karasaray-ru.jpg -strip -resize 4200x -interlace Plane -quality 82 public/images/price/full/karasaray-ru.jpg
```
