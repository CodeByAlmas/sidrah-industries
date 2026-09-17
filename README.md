# Sidrah Industries — website

Corporate and product-catalogue site for Sidrah Industries, Magarwara, Unnao (industrial woven fabric and multiple-ply yarn). Built for Indian and export buyers, with every enquiry routed to WhatsApp rather than a shopping cart.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · three.js + React Three Fiber · lucide-react

---

## Run it

```bash
npm install
cp .env.example .env.local     # then fill in the real WhatsApp number
npm run dev                    # http://localhost:3000
```

Build and deploy:

```bash
npm run build && npm start
```

Deploys to Vercel with no configuration — push the repo, import it, paste the env vars. Netlify and any Node host also work.

---

## Before it goes live — the checklist

### 1. WhatsApp number (required)
`.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER=919XXXXXXXXX`
Digits only, country code first, no `+` and no spaces. Every quote button on the site uses it.

### 2. Minimum order quantities and specs
All of it lives in **`src/data/products.ts`**. Values marked `// confirm` in that file are placeholders written so the pages look real — width, GSM, lead times and MOQs need the factory's actual figures.

### 3. Company details
**`src/data/site.ts`** — address, PIN code, phone, email, capacity figures, machinery list, target markets, navigation.

### 4. Logo
Drop the artwork at `public/logo/sidrah-logo.svg` (or a 2× PNG), then in **`src/components/layout/Logo.tsx`** uncomment the `<Image>` block and delete the typographic block below it. The slot is already reserved at **176 × 44 px** with clear space allowed, so nothing else on the page shifts when the real logo goes in.

### 5. Product photography
Put files in `public/products/` and list them in the product's `images: []` array, e.g. `images: ["/products/heavy-canvas-1.jpg"]`. Until then each product draws its own generated weave swatch, using the `swatch` colours in the same file — so the catalogue never looks like grey placeholder boxes.

### 6. Hero background video
The hero background is one full-bleed layer. Open `src/components/three/HeroBackground.tsx` and set:

```ts
const HERO_VIDEO = "/videos/factory-hero.mp4";
const HERO_POSTER = "/factory/hero-poster.jpg";
```

That is the only change needed — the clip immediately fills the whole hero, keeps the pointer parallax, and the scrim over it keeps the headline readable. Until you set it, the WebGL cloth fills the same layer, so the hero is never an empty black box.

Keep the clip short, muted and roughly 4–8 MB, or a buyer on mobile data in Germany sits waiting on it. For a longer walkthrough, host it on Mux, Cloudflare Stream or YouTube and swap the `<video>` element for their player.

### 7. Factory photos and section video
- Photos: `public/factory/*.jpg`, then fill the `src` values in the `gallery` array in `src/app/infrastructure/page.tsx`.
- Video: `public/videos/*.mp4`, then uncomment the `src` and `poster` lines in the `VideoShowcase` calls on the home and infrastructure pages. The player, poster frame and layout are already built — you are only supplying the file.

> For clips over ~20 MB, host on YouTube, Vimeo or Mux and swap the `<video>` element in `src/components/sections/VideoShowcase.tsx` for an iframe. Large MP4s in `public/` will slow the site down for European visitors.

### 8. Map
`src/app/contact/page.tsx` — replace the map placeholder with the Google Maps embed iframe for the factory.

---

## Folder structure

```
sidrah-industries/
├─ public/
│  ├─ logo/         logo artwork          ← client to supply
│  ├─ products/     product photography   ← client to supply
│  ├─ factory/      machine & floor shots ← client to supply
│  └─ videos/       loom footage          ← client to supply
└─ src/
   ├─ app/
   │  ├─ layout.tsx            fonts, metadata, JSON-LD, all global chrome
   │  ├─ globals.css           design tokens + type scale (edit colours here)
   │  ├─ page.tsx              home
   │  ├─ products/page.tsx     catalogue
   │  ├─ products/[slug]/      one page per product, generated from data
   │  ├─ infrastructure/       machinery, photo grid, video
   │  ├─ about/ · contact/ · not-found.tsx
   │  └─ sitemap.ts · robots.ts
   ├─ components/
   │  ├─ layout/     Navbar · Footer · Logo
   │  ├─ three/      HeroBackground · WeaveCloth    the full-bleed hero layer
   │  ├─ sections/   CatalogueGrid · VideoShowcase · EnquiryForm
   │  ├─ ui/
   │  │   Preloader.tsx        loom-threading intro, once per session
   │  │   ShedTransition.tsx   page transition
   │  │   Warp.tsx             the vertical hairlines behind every page
   │  │   Reveal.tsx           one observer driving all reveals
   │  │   ScrollThread.tsx     scroll progress
   │  │   Cursor.tsx           custom cursor: dot, label disc, swatch
   │  │   Button.tsx           the roll-over button + Actions wrapper
   │  │   WeaveSwatch.tsx
   │  └─ ProductRow.tsx        a catalogue entry as a swatch-book row
   ├─ data/          site.ts · products.ts   ← the two files the client edits
   └─ lib/           whatsapp.ts · utils.ts
```

**Adding a product** takes one step: append an object to the `products` array in `src/data/products.ts`. Its catalogue tile, detail page, sitemap entry, footer link and pre-written WhatsApp message all appear automatically.

---

## Design notes

**The idea.** The site is built like a loom. Vertical hairlines — the warp — run the full height of every page on the same column positions the content sits on. Section headings are crossed by a single horizontal rule, the weft, which draws itself across as you reach it. Nothing decorative was added on top of that; the structure is the design.

**Palette.** The page is raw greige cloth (`#ddd6c4`), the type is ink (`#141613`), and the one accent is vat indigo (`#26406f`) — the dye cotton has been taken to for centuries. Indigo appears only on interactive things, so a buyer's eye always lands on the next action.

**Type.** Syne for display (unusual proportions, engineered rather than corporate), Karla for body, Azeret Mono for specification tables where monospace earns its place by aligning numbers.

**The preloader** threads the loom: warps drop in one at a time, a shuttle passes a single weft across, the curtain lifts in columns. It plays on **every page load, including a refresh**. Client-side navigation between pages does not remount it, so it never interrupts browsing — only a genuine load plays it.

**Page transitions** use the shed — the gap a shuttle passes through. The screen closes in staggered columns, the new page mounts behind it, and it reopens from the other side.

**Buttons** fill from the bottom like a weft pass while the label rolls over to an identical copy. Navigation links do the same, with a rule wiping in underneath. The catalogue is a swatch book rather than a card grid: full-width rows that invert on hover, with a fabric sample that follows the cursor on desktop.

**The hero** is a real length of cloth in WebGL, running full bleed behind the headline. Warp and weft are shaded separately in the fragment shader with a genuine over-under interlace, and indigo pools in the folds. The whole layer answers the pointer — and on a phone, the handset's own tilt — with a scrim over it holding the type legible. Client-side only, so it never blocks first paint. The factory footage drops into this exact layer when it is ready.

**The cursor** has three states and one object: a small cream dot in difference blend (visible on both the greige page and the dark bands) with a ring lagging behind it; an indigo disc carrying a one-word label over anything actionable; and, over a catalogue row, a fabric sample in place of the ring — the way a buyer holds a swatch up while reading the book. It only mounts for fine pointers, so touch devices keep the native cursor and none of it renders.

## Responsiveness

Built mobile-first from 360px up. Specifics worth knowing before you edit anything:

- **One gutter variable.** `--pad` in `globals.css` drives the shell padding, the warp spacing, the hero meta strip and the catalogue row hover bleed. Change it once and the whole grid stays aligned at every width.
- **Hover states are gated behind `@media (hover:hover)`.** On a touchscreen a tap would otherwise leave a button stuck in its hovered state; touch gets an `:active` equivalent instead.
- **The preloader, the page transition and the warp all scale down.** Phones get 7 threads instead of 17, 4 curtain and shed columns instead of 8, and a shorter run — the same sequence at full length feels slow on a small screen.
- **The catalogue row restacks.** Under 768px the MOQ, status chip and swatch move to a strip below the product name instead of squeezing into a right-hand column.
- **The filter rail scrolls sideways** rather than wrapping into a three-line block.
- **Form inputs are 16px minimum,** which is what stops iOS zooming the page when a field is focused.
- **The mobile sheet** scrolls if it ever outgrows a short handset, sits its links low so they fall under the thumb, closes on Escape, and locks the page behind it without losing your scroll position on close.
- **Safe areas** are respected via `--safe-b`, so nothing sits under the iPhone home indicator.
- **The hero uses `100svh`,** not `100vh`, so mobile browser chrome does not cut the buttons off.

**Quality floor.** Skip link, visible focus rings, and `prefers-reduced-motion` honoured everywhere — under it the preloader shortens to a beat, the shed transition is skipped entirely, the hero stops tracking the pointer, and all reveals resolve instantly.

## Possible next steps

- **German language version.** Next.js App Router handles this with an `app/[locale]/` segment. Worth doing once the EU buyer conversations start — the copy is short enough to translate cleanly.
- **Downloadable PDF catalogue**, generated from the same `products.ts` data.
- **Enquiry logging.** Right now enquiries go straight to WhatsApp with no record. If the client wants a trail, add a form endpoint (Resend, Formspree or a Next.js route handler) alongside the WhatsApp button.
