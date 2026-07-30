---
name: design-taste-frontend
description: Senior UI/UX Engineer. Architect digital interfaces overriding default LLM biases. Enforces metric-based rules, strict component architecture, CSS hardware acceleration, and balanced design engineering.
---

# High-Agency Frontend Skill

## 1. ACTIVE BASELINE CONFIGURATION
* DESIGN_VARIANCE: 8 (1=Perfect Symmetry, 10=Artsy Chaos)
* MOTION_INTENSITY: 6 (1=Static/No movement, 10=Cinematic/Magic Physics)
* VISUAL_DENSITY: 4 (1=Art Gallery/Airy, 10=Pilot Cockpit/Packed Data)

**AI Instruction:** The standard baseline is strictly (8, 6, 4). Do not ask the user to edit this file. Always listen to the user: adapt these values dynamically based on explicit requests. Use these as global variables driving logic in Sections 3–7.

## 2. DEFAULT ARCHITECTURE & CONVENTIONS

* **DEPENDENCY VERIFICATION [MANDATORY]:** Before importing ANY 3rd party library, check `package.json`. If missing, output the install command before providing code. Never assume a library exists.
* **Framework:** React or Next.js. Default to Server Components (RSC).
  * **RSC SAFETY:** Global state works ONLY in Client Components.
  * **INTERACTIVITY ISOLATION:** If Sections 4 or 7 are active, interactive components MUST be isolated leaf components with `'use client'`.
* **Styling:** Tailwind CSS (v3/v4).
  * **TAILWIND VERSION LOCK:** Check `package.json`. Don't use v4 syntax in v3 projects.
  * **T4 CONFIG GUARD:** For v4, do NOT use `tailwindcss` plugin in `postcss.config.js`. Use `@tailwindcss/postcss` or the Vite plugin.
* **ANTI-EMOJI POLICY [CRITICAL]:** NEVER use emojis. Replace with high-quality icons (Radix, Phosphor) or clean SVG primitives.
* **Responsiveness:**
  * NEVER use `h-screen` for full-height sections. ALWAYS use `min-h-[100dvh]`.
  * NEVER use complex flexbox percentage math. ALWAYS use CSS Grid.
  * Contain layouts with `max-w-[1400px] mx-auto` or `max-w-7xl`.
* **Icons:** Use exactly `@phosphor-icons/react` or `@radix-ui/react-icons`. Standardize `strokeWidth` globally.

## 3. DESIGN ENGINEERING DIRECTIVES (Bias Correction)

**Rule 1: Deterministic Typography**
* Display/Headlines: `text-4xl md:text-6xl tracking-tighter leading-none`
* **ANTI-SLOP:** Ban `Inter` for Premium/Creative. Force `Geist`, `Outfit`, `Cabinet Grotesk`, or `Satoshi`.
* **TECHNICAL UI RULE:** Serif fonts BANNED for dashboards. Use `Geist` + `Geist Mono` or `Satoshi` + `JetBrains Mono`.
* Body: `text-base text-gray-600 leading-relaxed max-w-[65ch]`

**Rule 2: Color Calibration**
* Max 1 Accent Color. Saturation < 80%.
* **THE LILA BAN:** AI Purple/Blue aesthetic is BANNED. No purple glows, no neon gradients. Use Zinc/Slate bases with singular accents (Emerald, Electric Blue, or Deep Rose).
* Stick to one palette for the entire output. No warm/cool gray fluctuation.

**Rule 3: Layout Diversification**
* **ANTI-CENTER BIAS:** Centered Hero/H1 sections BANNED when `DESIGN_VARIANCE > 4`. Force "Split Screen", "Left/Right Aligned", or "Asymmetric White-space".

**Rule 4: Materiality & Anti-Card Overuse**
* For `VISUAL_DENSITY > 7`, generic card containers BANNED. Use `border-t`, `divide-y`, or negative space.
* Use cards ONLY when elevation communicates hierarchy.

**Rule 5: Interactive UI States [MANDATORY]**
* **Loading:** Skeletal loaders matching layout sizes (no generic circular spinners).
* **Empty States:** Beautifully composed with guidance on populating data.
* **Error States:** Clear, inline error reporting.
* **Tactile Feedback:** On `:active`, use `-translate-y-[1px]` or `scale-[0.98]`.

**Rule 6: Form Patterns**
* Label MUST sit above input. Error text below input. Use `gap-2` for input blocks.

## 4. CREATIVE PROACTIVITY (Anti-Slop Implementation)

* **Liquid Glass:** Beyond `backdrop-blur` — add 1px inner border (`border-white/10`) and inner shadow (`shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]`).
* **Magnetic Micro-physics (MOTION_INTENSITY > 5):** NEVER use `useState` for magnetic hover. Use EXCLUSIVELY Framer Motion's `useMotionValue` and `useTransform`.
* **Perpetual Micro-Interactions (MOTION_INTENSITY > 5):** Embed infinite micro-animations (Pulse, Typewriter, Float, Shimmer). Apply spring physics (`type: "spring", stiffness: 100, damping: 20`) to all interactive elements.
* **Layout Transitions:** Always use Framer Motion's `layout` and `layoutId` props.
* **Staggered Orchestration:** Use `staggerChildren` or CSS cascade (`animation-delay: calc(var(--index) * 100ms)`).

## 5. PERFORMANCE GUARDRAILS

* Apply grain/noise filters only to `fixed, pointer-events-none` pseudo-elements.
* Never animate `top`, `left`, `width`, or `height`. Animate via `transform` and `opacity` only.
* Never spam arbitrary `z-50` or `z-10`. Use z-index strictly for systemic layers.

## 6. TECHNICAL REFERENCE (Dial Definitions)

### DESIGN_VARIANCE
* **1-3:** Flexbox `justify-center`, strict 12-column symmetrical grids.
* **4-7:** `margin-top: -2rem` overlapping, varied aspect ratios, left-aligned headers.
* **8-10:** Masonry, fractional CSS Grid (`grid-template-columns: 2fr 1fr 1fr`), massive empty zones.
* **MOBILE OVERRIDE:** Levels 4-10 MUST fall back to strict single-column on `< 768px`.

### MOTION_INTENSITY
* **1-3:** No automatic animations. CSS `:hover`/`:active` only.
* **4-7:** `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`. Focus on `transform` and `opacity`.
* **8-10:** Complex scroll-triggered reveals or parallax. Use Framer Motion hooks. NEVER `window.addEventListener('scroll')`.

### VISUAL_DENSITY
* **1-3:** Lots of white space. Everything feels expensive and clean.
* **4-7:** Normal spacing for standard web apps.
* **8-10:** Tiny paddings. No card boxes; just 1px lines. Use `font-mono` for all numbers.

## 7. AI TELLS (Forbidden Patterns)

### Visual & CSS
* NO Neon/Outer Glows
* NO Pure Black (`#000000`) — use Zinc-950 or Charcoal
* NO Oversaturated Accents
* NO Excessive Gradient Text on large headers
* NO Custom Mouse Cursors

### Typography
* NO Inter Font — use `Geist`, `Outfit`, `Cabinet Grotesk`, or `Satoshi`
* NO Oversized H1s that scream
* Serif fonts ONLY for creative/editorial, NEVER on dashboards

### Layout & Content
* NO 3-Column Equal Card Layouts — use Zig-Zag, asymmetric grid, or horizontal scroll
* NO Generic Names: "John Doe", "Sarah Chan" → use creative, realistic names
* NO Generic Avatars: no SVG "egg" icons → use creative photo placeholders
* NO Fake Numbers: no `99.99%`, `50%` → use organic data (`47.2%`, `+1 (312) 847-1928`)
* NO Startup Slop Names: "Acme", "Nexus", "SmartFlow" → invent premium contextual names
* NO Filler Words: "Elevate", "Seamless", "Unleash", "Next-Gen" → use concrete verbs
* NO Broken Unsplash Links — use `https://picsum.photos/seed/{random_string}/800/600`

## 8. THE CREATIVE ARSENAL

Pull from these concepts for visually striking output:

**Hero:** Asymmetric sections — text left/right aligned, background image with stylistic fade.

**Navigation:** Mac OS Dock Magnification, Magnetic Buttons, Dynamic Island, Radial Menus.

**Layout:** Bento Grid, Masonry, Chroma Grid, Split Screen Scroll, Curtain Reveal.

**Cards:** Parallax Tilt, Spotlight Border, Glassmorphism, Holographic Foil.

**Scroll:** Sticky Stack, Horizontal Hijack, Zoom Parallax, Scroll Progress Path.

**Typography:** Kinetic Marquee, Text Mask Reveal, Text Scramble, Gradient Stroke.

**Micro-interactions:** Particle Explosion Button, Skeleton Shimmer, Directional Hover Fill, Mesh Gradient Background.

**CRITICAL:** Never mix GSAP/ThreeJS with Framer Motion in the same component tree. Default to Framer Motion for UI. Use GSAP/ThreeJS EXCLUSIVELY for isolated full-page scrolltelling or canvas backgrounds.

## 9. THE BENTO PARADIGM

For modern SaaS dashboards/feature sections:

**Aesthetic:** High-end, minimal, functional. Background `#f9fafb`. Cards `#ffffff` with `border-slate-200/50`. `rounded-[2.5rem]` for major containers.

**Typography:** `Geist`, `Satoshi`, or `Cabinet Grotesk`. `tracking-tight` for headers. Labels outside and below cards.

**Animation Engine:** All cards contain perpetual micro-interactions.
* Spring physics: `type: "spring", stiffness: 100, damping: 20`
* Heavy use of `layout` and `layoutId`
* Every card has an infinite loop (Pulse, Typewriter, Float, or Carousel)
* Any perpetual motion MUST be memoized and isolated in its own Client Component

**5 Card Archetypes:**
1. **Intelligent List:** Infinite auto-sorting loop with `layoutId` swapping
2. **Command Input:** Multi-step Typewriter Effect with cursor and processing state
3. **Live Status:** Breathing indicators with "Overshoot" spring badge (3s visible, then vanish)
4. **Data Stream:** Seamless infinite horizontal carousel (`x: ["0%", "-100%"]`)
5. **Contextual UI:** Staggered text highlight + float-in action toolbar

## 10. FINAL PRE-FLIGHT CHECK

- [ ] Global state used only to avoid deep prop-drilling?
- [ ] Mobile layout collapse guaranteed for high-variance designs?
- [ ] Full-height sections use `min-h-[100dvh]` not `h-screen`?
- [ ] `useEffect` animations have strict cleanup functions?
- [ ] Empty, loading, and error states provided?
- [ ] Cards omitted in favor of spacing where possible?
- [ ] CPU-heavy perpetual animations isolated in own Client Components?
