# Portfolio — Afthar N N

Personal portfolio built with Next.js (App Router) and TypeScript.

## Stack

- **Next.js 16** + React 19, App Router, Turbopack
- **TypeScript**
- **Tailwind CSS v4** — theme tokens defined in `app/globals.css`
- **Framer Motion** — scroll and entrance animations
- **Locomotive Scroll** (Lenis) — smooth scrolling
- **lucide-react** — UI icons · **react-icons** — brand logos

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run lint    # eslint
```

## Structure

```
app/                      routes, root layout, global styles
components/
  layout/                 app shell, loader, smooth scroll, header
  providers/              theme provider (light/dark)
  sections/               hero, banner, about, skills
  ui/                     reusable primitives
lib/                      helpers
public/                   logo, resume PDF
```

## Theming

Light and dark palettes are CSS variables on `:root` and `.dark` in
`app/globals.css`. A small script in the root layout applies the stored
preference before first paint so the theme never flashes. Light is the default;
the toggle lives in the menu panel.

## Content

Copy and data are separated from components so they can be edited without
touching markup:

- `components/sections/hero/content.ts` — hero lines
- `components/sections/skills/skills-data.ts` — skills and brand icons
- `components/layout/header/links.ts` — navigation links
