# FORGE — Personal Portfolio for Harshil Makwana

A single-page personal portfolio for **Harshil Makwana, Generative AI Engineer**, built with Next.js 15, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis smooth scroll, and Motion.

---

## 🎨 Design System — "Forge" Tokens

| Color Token | Hex / Value | Exclusively Reserved For |
|---|---|---|
| `--obsidian` | `#07080B` | Page canvas background |
| `--basalt` | `#101219` | Elevated cards, sticky nav pill, interactive panels |
| `--slate` | `#191C25` | Borders, dividers, inactive progress tracks |
| `--hairline` | `rgba(232, 234, 239, 0.08)` | Subtle border overlays |
| `--titanium` | `#E8EAEF` | Primary headings, title text |
| `--ash` | `#99A1AF` | Body copy |
| `--ash-dim` | `#6B7280` | Captions & metadata (≥14px) |
| **`--aurum`** | **`#E0B26C`** | **Human craft:** Name, section kickers, credentials, primary CTA |
| **`--plasma`** | **`#6E5BFF`** | **Machine:** Agent nodes, pipeline edges, motion trails, output gradients |
| **`--ion`** | **`#4ADEDE`** | **Live state only:** Uptime pulse, stdout logs, passed verdicts, active counters |

### Signature Typographic Move
Every section kicker is JetBrains Mono, `11px`, UPPERCASE, `letter-spacing: 0.28em`, color `--aurum`, preceded by a `24px` gold hairline rule.

---

## 🚀 Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open browser
http://localhost:3000
```

---

## 📦 Production Build & Deployment

### Build Locally
```bash
npm run build
npm run start
```
`npm run build` compiles with **0 TypeScript errors** and **0 ESLint errors**.

### Deploying to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete FORGE portfolio for Harshil Makwana"
   git branch -M main
   git remote add origin https://github.com/makwana8399/portfolio.git
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new).
   - Import your `portfolio` repository.
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Click **Deploy**.

3. **Production Custom Domain**:
   - In Vercel Project Settings -> Domains, add `harshilmakwana.com` or `harshilmakwana.vercel.app`.

---

## 📄 License
© 2026 Harshil Makwana. All rights reserved.
