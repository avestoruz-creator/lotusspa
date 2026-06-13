# 🪷 Lotus Spa — Official Website

Premium spa website for **Lotus Spa** — Sauna, Hammam & Massage center in Tashkent, Uzbekistan.

> Live demo: [lotus-spa.onhercules.app](https://lotus-spa.onhercules.app)

---

## ✨ Features

- **Full landing page** — Hero, Why Us, Services grid, Massage list, Sauna/Hammam, Body Care, Spa Programs, Pricing tables, Promos, Branches, Footer
- **Individual service pages** — Each massage/sauna has its own page with image, description, price, what's included list, other procedures grid, and CTA buttons
- **Interactive pricing table** — Switch between branches (Karasaray, Sergeli, C1) and weekday/weekend
- **Scroll animations** — Smooth entrance animations powered by Framer Motion
- **Mobile-first design** — Fully responsive on all screen sizes
- **Premium typography** — Raleway font (Google Fonts) with warm taupe/parchment palette
- **SEO ready** — Full meta tags, Open Graph, Twitter Card, JSON-LD structured data
- **Online booking** — Telegram and phone call CTA buttons on every service card

---

## 🗂 Project Structure

```
lotusspa/
├── index.html                  # Entry HTML with SEO meta tags, Open Graph, JSON-LD
├── src/
│   ├── App.tsx                 # Router: / and /service/:key routes
│   ├── index.css               # Global styles, CSS variables, Raleway font, color palette
│   ├── main.tsx                # React entry point
│   ├── lib/
│   │   └── services-data.ts    # All services data (massages, saunas), images, contacts
│   └── pages/
│       ├── Index.tsx           # Main landing page (all sections)
│       └── service/
│           └── page.tsx        # Individual service detail page
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5+ | Type safety |
| Vite | 7 | Build tool |
| React Router DOM | 7 | Client-side routing |
| Tailwind CSS | 4 | Styling |
| Motion (Framer Motion) | 12 | Animations |
| Lucide React | latest | Icons |
| Raleway (Google Fonts) | — | Typography |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/avestoruz-creator/lotusspa.git
cd lotusspa

# Install dependencies
pnpm install
# or
npm install
```

### Development

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
pnpm build
# or
npm run build
```

The built files will be in the `dist/` folder. Deploy the contents of `dist/` to any static hosting provider.

### Preview Production Build

```bash
pnpm preview
# or
npm run preview
```

---

## 🌐 Deployment

This is a **static React SPA** (Single Page Application). You can deploy it to:

### Vercel (Recommended)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com), import repository
3. Framework: Vite (auto-detected)
4. Click Deploy

### Netlify
1. Go to [netlify.com](https://netlify.com), drag & drop `dist/` folder
2. Or connect GitHub repository for auto-deploy

### Nginx (Self-hosted)
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/lotusspa/dist;
    index index.html;

    # SPA routing — send all requests to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

> **Important for SPA routing:** Always configure your server to serve `index.html` for all routes (see Nginx config above). Without this, direct links to `/service/klassik` will return 404.

### Apache (.htaccess)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 📞 Contact Information

| | |
|---|---|
| **Phone** | +998 71 205 95 65 |
| **Telegram** | [@spalotus01](https://t.me/spalotus01) |
| **Instagram** | [@lotus_spa.uz](https://instagram.com/lotus_spa.uz) |

---

## 🏢 Branches

| Branch | District |
|---|---|
| Karasaray | Karasaray |
| Sergeli / Aviasozlar | Sergeli |
| C1 / Parkent | Center |

---

## 📄 Services

### Massages
- Klassik massaj (60/90 min)
- Aroma massaj (60/90 min)
- Ozdorovitelny massaj (60/90 min)
- Silovoy massaj (60/90 min)
- Akvamylny massaj (60 min)
- Massaj goryachimi kamnyami (90 min)

### Sauna & Hammam
- Klassicheskaya sauna
- Sauna VIP
- Hammam

### Body Care
- Skrab (20 min)
- Piling kese (20 min)
- Pennaya moyka (20 min)
- Parka (klassicheskaya, aroma, medovaya)

### Spa Programs
- Klassik (70 min) — 620,000 UZS
- Sport (60 min) — 600,000 UZS
- Zdorovye (75 min) — 700,000 UZS
- Tsar Solomon (90 min) — 870,000 UZS
- Medovy (60 min) — 580,000 UZS

---

## 🎨 Design

- **Font:** Raleway (Google Fonts) — weights 200, 300, 400, 500, 600
- **Primary color:** Deep mocha brown `oklch(0.32 0.04 55)`
- **Accent:** Warm gold `oklch(0.68 0.09 72)`
- **Background:** Warm parchment `oklch(0.965 0.008 70)`
- **Style:** Premium minimal, telo.uz inspired layout

---

## 📝 Customization

### Update Contact Info
Edit `src/lib/services-data.ts`:
```ts
export const PHONE    = "+998 71 205 95 65";
export const TEL_HREF = "tel:+998712059565";
export const TG_LINK  = "https://t.me/spalotus01";
export const LOGO_URL = "https://your-logo-url.com/logo.png";
```

### Update Prices
Edit pricing data in `src/pages/Index.tsx` — `pricingData` object.

### Add/Edit Services
Edit `src/lib/services-data.ts` — `massageServices` and `saunaServices` arrays.

---

## 📜 License

All rights reserved © 2025 Lotus Spa, Tashkent, Uzbekistan.
