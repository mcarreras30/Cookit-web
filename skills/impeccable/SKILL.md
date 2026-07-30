---
name: impeccable
description: "Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers websites, landing pages, dashboards, product UI, app shells, components, forms, settings, onboarding, and empty states. Handles UX review, visual hierarchy, information architecture, cognitive load, accessibility, performance, responsive behavior, theming, anti-patterns, typography, fonts, spacing, layout, alignment, color, motion, micro-interactions, UX copy, error states, edge cases, i18n, and reusable design systems or tokens. Also use for bland designs that need to become bolder or more delightful, loud designs that should become quieter, live browser iteration on UI elements, or ambitious visual effects that should feel technically extraordinary. Not for backend-only or non-UI tasks."
argument-hint: "[command] [target]"
user-invocable: true
license: Apache 2.0. Based on Anthropic's frontend-design skill. See NOTICE.md for attribution.
---

Designs and iterates production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.

## Setup

Before any design work or file edits:

1. Load context (PRODUCT.md / DESIGN.md).
2. Identify the register (brand or product) and load the matching reference.
3. If the user invoked a sub-command (e.g. `craft`, `audit`), load its reference file too.

### Context gathering

Two files at the project root:
- **PRODUCT.md**: required. Users, brand, tone, anti-references, strategic principles.
- **DESIGN.md**: optional, strongly recommended. Colors, typography, elevation, components.

If PRODUCT.md is missing/empty: run `/impeccable teach`, then resume the original task.

### Register

Every design task is **brand** (marketing, landing, campaign: design IS the product) or **product** (app UI, dashboard, tool: design SERVES the product).

## Shared Design Laws

### Color

- Use OKLCH. Reduce chroma as lightness approaches 0 or 100.
- Never use `#000` or `#fff`. Tint every neutral toward the brand hue (chroma 0.005–0.01).
- Pick a **color strategy** first:
  - **Restrained**: tinted neutrals + one accent ≤10%.
  - **Committed**: one saturated color carries 30–60% of the surface.
  - **Full palette**: 3–4 named roles, used deliberately.
  - **Drenched**: the surface IS the color.

### Theme

Dark vs. light is never a default. Write one sentence of physical scene (who, where, ambient light, mood) before choosing. If the sentence doesn't force the answer, add more detail.

### Typography

- Cap body line length at 65–75ch.
- Hierarchy through scale + weight contrast (≥1.25 ratio between steps).

### Layout

- Vary spacing for rhythm. Same padding everywhere is monotony.
- Cards are the lazy answer. Nested cards are always wrong.
- Don't wrap everything in a container.

### Motion

- Don't animate CSS layout properties.
- Ease out with exponential curves (ease-out-quart/quint/expo). No bounce, no elastic.

### Absolute Bans

- **Side-stripe borders**: `border-left`/`border-right` > 1px as colored accent. Rewrite with full borders, background tints, or nothing.
- **Gradient text**: `background-clip: text` + gradient. Use a solid color instead.
- **Glassmorphism as default**: purposeful only.
- **The hero-metric template**: big number, small label, supporting stats, gradient accent.
- **Identical card grids**: same-sized cards with icon + heading + text repeated endlessly.
- **Modal as first thought**: exhaust inline/progressive alternatives first.

### Copy

- Every word earns its place.
- **No em dashes.** Use commas, colons, semicolons, periods, or parentheses.

### The AI Slop Test

If someone could look at this and say "AI made that" without doubt, it's failed.

**Category-reflex check (two levels):**
1. First-order: could someone guess the palette from the category alone ("observability → dark blue")? If yes, rework.
2. Second-order: could someone guess the aesthetic family from category + anti-references? If yes, rework further.

## Commands

| Command | Category | Description |
|---|---|---|
| `craft [feature]` | Build | Shape, then build a feature end-to-end |
| `shape [feature]` | Build | Plan UX/UI before writing code |
| `teach` | Build | Set up PRODUCT.md and DESIGN.md context |
| `document` | Build | Generate DESIGN.md from existing project code |
| `extract [target]` | Build | Pull reusable tokens and components into design system |
| `critique [target]` | Evaluate | UX design review with heuristic scoring |
| `audit [target]` | Evaluate | Technical quality checks (a11y, perf, responsive) |
| `polish [target]` | Refine | Final quality pass before shipping |
| `bolder [target]` | Refine | Amplify safe or bland designs |
| `quieter [target]` | Refine | Tone down aggressive or overstimulating designs |
| `distill [target]` | Refine | Strip to essence, remove complexity |
| `harden [target]` | Refine | Production-ready: errors, i18n, edge cases |
| `onboard [target]` | Refine | Design first-run flows, empty states, activation |
| `animate [target]` | Enhance | Add purposeful animations and motion |
| `colorize [target]` | Enhance | Add strategic color to monochromatic UIs |
| `typeset [target]` | Enhance | Improve typography hierarchy and fonts |
| `layout [target]` | Enhance | Fix spacing, rhythm, and visual hierarchy |
| `delight [target]` | Enhance | Add personality and memorable touches |
| `overdrive [target]` | Enhance | Push past conventional limits |
| `clarify [target]` | Fix | Improve UX copy, labels, and error messages |
| `adapt [target]` | Fix | Adapt for different devices and screen sizes |
| `optimize [target]` | Fix | Diagnose and fix UI performance |
| `live` | Iterate | Visual variant mode: iterate on elements in the browser |

### Routing rules

1. **No argument**: render the command table above. Ask what they'd like to do.
2. **First word matches a command**: follow that command's instructions. Everything after is the target.
3. **First word doesn't match**: general design invocation using full argument as context.
