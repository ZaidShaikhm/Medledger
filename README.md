# MedLedger 💊

> Pharma billing software for retail pharmacies and wholesale distributors — built with vanilla HTML, CSS, and JavaScript, served via Vite.

![MedLedger](https://img.shields.io/badge/MedLedger-Pharma%20Billing-0077CC?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/Vanilla-JS%20%2F%20CSS%20%2F%20HTML-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Recommendations](#recommendations)
- [Contributing](#contributing)

---

## About

MedLedger is a marketing and lead-generation landing page for a pharma billing platform purpose-built for the Indian pharmaceutical supply chain. It covers two distinct product tracks:

- **Retail Billing** — fast counter billing for single-store pharmacies
- **Wholesale Billing** — bulk invoice processing for distributors and C&F agents

The site is intentionally built with zero frameworks — plain HTML, CSS, and JavaScript — to keep the footprint small, the codebase readable, and the setup instant.

---

## Features

- Responsive layout — works on mobile, tablet, and desktop
- Pharma-themed design (clinical whites, pharmacy blue, medical green)
- Animated prescription card with blister-pack visual in the hero
- Product tab switcher (Retail / Wholesale feature sets)
- Lead capture form with full client-side validation
- Success modal after form submission
- Scroll-reveal animations via `IntersectionObserver`
- Accessible — semantic HTML, ARIA labels, keyboard navigation, focus trapping in modal
- `prefers-reduced-motion` respected
- No runtime dependencies — only Vite as a dev tool

---

## Project Structure

```
medledger/
├── index.html        # All markup and page structure
├── style.css         # All styles (CSS custom properties at the top)
├── script.js         # All interactivity (nav, tabs, form, modal)
├── vite.config.js    # Minimal Vite configuration
├── package.json      # npm scripts and dev dependencies
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

| Tool | Minimum version | Check |
|------|----------------|-------|
| [Node.js](https://nodejs.org/) | 18.x or higher | `node -v` |
| [npm](https://www.npmjs.com/) | 9.x or higher | `npm -v` |

> **Recommended:** Use [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage Node versions cleanly.

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/medledger.git
cd medledger
```

**2. Install dependencies**

```bash
npm install
```

This installs only one dev dependency — Vite. There are no runtime libraries.

**3. Start the development server**

```bash
npm run dev
```

Vite will start the local server. Open your browser and go to:

```
http://localhost:5173
```

The server supports **Hot Module Replacement (HMR)** — any change you save to `index.html`, `style.css`, or `script.js` reflects in the browser instantly without a manual refresh.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local Vite development server at `http://localhost:5173` |
| `npm run build` | Build a production-ready bundle into the `dist/` folder |
| `npm run preview` | Locally preview the production build before deploying |

---

## Deployment

### Build for production

```bash
npm run build
```

This outputs optimised, minified files into the `dist/` folder. Deploy that folder to any static hosting provider.

### Recommended hosting options

| Platform | How to deploy |
|----------|--------------|
| [Vercel](https://vercel.com) | `vercel` CLI or connect GitHub repo — auto-detects Vite |
| [Netlify](https://netlify.com) | Drag and drop `dist/` folder, or connect GitHub with build command `npm run build` and publish directory `dist` |
| [GitHub Pages](https://pages.github.com) | Use the [vite-plugin-gh-pages](https://github.com/skrtheboss/vite-plugin-gh-pages) package or deploy `dist/` to the `gh-pages` branch |
| [Cloudflare Pages](https://pages.cloudflare.com) | Connect GitHub, set build command `npm run build`, output directory `dist` |

---

## Recommendations

These are suggested next steps to take this from a landing page to a production-ready product.

### 1. Wire up the lead form

The form currently validates and shows a success modal but does not send data anywhere. Connect it to a real endpoint:

**Option A — Simple email notification ([Formspree](https://formspree.io))**
```js
// In script.js, inside the form submit handler, replace the comment with:
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

**Option B — CRM integration (HubSpot, Zoho, Salesforce)**
Use their respective REST APIs or embed their native form SDK.

**Option C — Your own backend**
POST the form data to your Express / Django / Laravel endpoint and save leads to a database.

---

### 2. Add a favicon

Create a `public/` folder at the root and place your favicon files there. Vite serves everything in `public/` at the root URL automatically.

```
medledger/
└── public/
    ├── favicon.ico
    ├── favicon-32x32.png
    └── apple-touch-icon.png
```

Then add to `<head>` in `index.html`:
```html
<link rel="icon" href="/favicon.ico" />
```

---

### 3. Add a custom port (optional)

If port `5173` conflicts with another service, change it in `vite.config.js`:

```js
export default defineConfig({
  server: { port: 3000 }
})
```

---

### 4. Add Open Graph meta tags for social sharing

In the `<head>` of `index.html`, add:

```html
<meta property="og:title" content="MedLedger — Pharma Billing for Retail & Wholesale" />
<meta property="og:description" content="Purpose-built pharma billing for Indian pharmacies and distributors." />
<meta property="og:image" content="https://yourdomain.com/og-image.png" />
<meta property="og:url" content="https://yourdomain.com" />
<meta name="twitter:card" content="summary_large_image" />
```

---

### 5. Swap placeholder content before going live

Find and replace the following placeholders:

| Placeholder | Replace with |
|-------------|-------------|
| `MedLedger` | Your actual product name |
| `Sunrise Pharmacy` | A real reference customer (with permission) or remove |
| `GST: 27ABCDE1234F1Z5` | A real example or remove |
| `INV-2024-08471` | Remove or use a generic example |
| `1,200+ pharmacies` | Your real customer count |
| `₹840 Cr+` | Your real billing volume |

---

### 6. Performance checklist before launch

- [ ] Run `npm run build` and test the `dist/` output with `npm run preview`
- [ ] Run a [Lighthouse](https://developer.chrome.com/docs/lighthouse/) audit (Performance, Accessibility, SEO)
- [ ] Add `loading="lazy"` to any images you add later
- [ ] Confirm Google Fonts load correctly on the production domain
- [ ] Test the form on a real mobile device

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## License

[MIT](LICENSE) — free to use, modify, and distribute.

---

<p align="center">Built with ❤️ for the Indian pharma supply chain</p>
