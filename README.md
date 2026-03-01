# Neo-Industrial Portfolio (Next.js 15)

A dual-mode personal portfolio built with **Next.js App Router**:

- **Creative mode (`neo`)**: tactical + VHS/glitch-inspired experience with animated section staging.
- **Minimal mode (`minimal`)**: clean, professional layout optimized for readability.

The project follows a neo-industrial visual language (angled layouts, chamfered edges, micro-labels, glitch/invert interactions).

---

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Framer Motion
- Three.js + React Three Fiber + Drei
- Lottie (`lottie-react`)

---

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

Open `http://localhost:3000`.

### 3) Build for production

```bash
npm run build
npm run start
```

### Available scripts

- `npm run dev` – start local development server
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – run Next.js lint

---

## Routes

- `/` – Portfolio entry with mode selector (minimal/creative)
- `/?mode=minimal` – direct open of minimal shell
- `/?mode=neo` – direct open of creative shell
- `/anemo-vault` – themed tribute gallery page

---

## Project Structure

```text
app/
  layout.tsx                 # Root layout + metadata
  page.tsx                   # Mode selector + shell switching
  globals.css                # Theme tokens + utility/components styles
  anemo-vault/
    page.tsx                 # Tribute page + gallery frames
  components/
    PortfolioShell.tsx       # Creative shell (intro + staged sections)
    MinimalPortfolioShell.tsx# Minimal shell
    Hero.tsx                 # Creative hero section
    ToolsChamber.tsx         # Creative tools section
    ProjectsSection.tsx      # Creative projects + external confirm flow
    ContactSection.tsx       # Creative contact section
    LeavingSiteModal.tsx     # External-link consent modal
    SiteBootIntro.tsx        # Boot intro overlay
    StickyHeader.tsx         # Top navigation and mode badge
    ScrollFx.tsx             # Scroll visual effects
    AsciiBackground.tsx      # Animated ASCII/ambient background
    CornerScrollWheel.tsx    # Floating scroll helper UI
    AnemoImageCarousel.tsx   # Vault image carousel
app/data/
  portfolioData.ts           # Primary content source (text, projects, links)
public/
  venti/                     # Tribute page images
```

---

## Content Editing Guide

Most editable content is centralized in:

`app/data/portfolioData.ts`

Update these sections:

- `selector` – landing mode selector title/subtitle/buttons
- `profile` – display name + hero/professional summaries
- `tools` – skills/tool cards
- `projects` – title, stack, summary, external URL
- `contact` – intro + email/GitHub/LinkedIn
- `professional` – labels/CTAs for minimal mode
- `creative` – labels/CTAs/tags for creative mode

### Project display behavior

Control project list behavior with:

- `initialVisibleCount`
- `layoutMode` (`"expand"` or `"rail"`)
- expand/collapse CTA labels

This is supported in both creative and minimal modes.

---

## External Link Safety Modal

Project links are gated by a confirmation modal in:

- `app/components/LeavingSiteModal.tsx`

Preference storage key:

- `portfolio_skip_external_confirm`

When users enable **Don't show again**, the preference is persisted in `localStorage` and reused in both shells.

---

## Styling System

Global visual primitives are defined in:

- `app/globals.css`

Key classes/tokens:

- Theme colors (`--color-zzz-yellow`, `--color-accent-green`, etc.)
- `chamfer-panel` for 45° cut panel geometry
- `micro-tag` for small-caps tactical labels
- `glitch-button` (+ `.invert`) for interaction states
- `layout-stage` + `layout-rail` for creative mode section scaffolding

Design notes:

- Angled/skewed layouts are intentional.
- Rounded corners are generally avoided in favor of chamfered clip paths.
- Micro-labels (e.g., `[SYSTEM_AUTH]`) are a core style motif.

---

## Animation & Interaction Notes

- **GSAP + ScrollTrigger** orchestrates staged section movement and active-rail syncing in `PortfolioShell`.
- `SiteBootIntro` provides startup lock screen behavior before entering creative mode.
- Hero and projects include kinetic hover/entrance effects using GSAP timelines.
- Additional ambient effects are layered through `AsciiBackground`, `ScrollFx`, and overlay styles in `globals.css`.

---

## Anemo Vault Page

`/anemo-vault` is an additional themed page with:

- A local image carousel (`AnemoImageCarousel`)
- Per-frame artist attribution metadata
- Styled codex cards and return portal CTA

To update gallery frames, edit `ventiGallery` in `app/anemo-vault/page.tsx` and place assets in `public/venti`.

---

## Deployment

`vercel.json` is configured for Vercel:

- `installCommand`: `npm ci`
- `buildCommand`: `npm run build`
- `framework`: `nextjs`

You can deploy directly on Vercel by importing the repository.

---

## Maintenance Checklist

- Keep `portfolioData.ts` as the single source of truth for text and links.
- Verify external project URLs regularly.
- Optimize/replace heavy media in `public/` to keep startup performance responsive.
- Run `npm run build` before deployment.
