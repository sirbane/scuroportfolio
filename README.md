# Scuro — Portfolio

> Field Notes from the Edge of Code & Country

A cinematic, dark-mode single-page portfolio for a developer who walks Kenya's open land, builds AI tools, and watches markets while offline.

## Sections

1. **Hero** — *Walking slow in a world that won't stop*
2. **The Journey** — Healing narrative: land, dogs, dawn walks
3. **Scuro Walks** — AI-automated adventure storytelling + TikTok embeds
4. **Plain Speak AI** — Browser extension that translates tech jargon
5. **Market Watcher** — AI-powered MT5 trading on gold, oil & currencies
6. **Contact** — WhatsApp, SMS, FaceTime — no email

---

## Setup

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Customise

### 1. Phone number
In `app/page.js`, find:
```js
const PHONE = '+254700000000'; // replace with real number
```
Replace with your actual WhatsApp/FaceTime number.

### 2. TikTok videos
The TikTok video IDs are already set to your @scurowalks videos:
- `7611897363770166546`
- `7611907436244471047`

To add more, add a `<TikTokEmbed videoId="..." />` to the tiktok-grid div.

### 3. Market data
The terminal in the Market Watcher section shows static demo data.
To make it live, connect to a real MT5 API or trading data feed.

---

## Deploy to Vercel

### Option A — CLI
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import Git Repository
3. Vercel auto-detects Next.js — click Deploy

No environment variables required for the base deployment.

---

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **Google Fonts** — Fraunces, Space Mono, DM Sans
- **TikTok Embed API** — official iframe embed
- **Vercel** — deployment platform
