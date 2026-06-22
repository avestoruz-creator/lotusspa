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
