# Lotus Spa

Standalone Vite + React + TypeScript + Tailwind CSS 4 + i18next (RU/UZ) website.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
# output: dist/
```

## Deploy

### Vercel
`vercel.json` already configured — just connect the repo.

### Nginx (VPS)
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Any static host
Upload contents of `dist/` folder.
