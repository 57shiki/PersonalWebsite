---
name: shiqihu.com
description: Personal portfolio for Shiqi Hu — a full stack engineer's field notes, built to stand apart.
colors:
  parchment: "#f1ede6"
  warm-linen: "#ebe3db"
  stone-edge: "#d1c7bd"
  warm-grain: "#cbad8d"
  leather: "#a48374"
  espresso: "#3a2d28"
  muted-earth: "#6e5a50"
  dark-bg: "#2a201c"
  dark-surface: "#3a2d28"
  dark-border: "#5c4a42"
  dark-muted: "#cbbfb6"
typography:
  display:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.35rem + 3.9vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.9vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.08em"
    fontFeature: '"liga" 1, "calt" 1'
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "5rem"
  section: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.warm-grain}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.leather}"
    textColor: "{colors.parchment}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.espresso}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-ghost-hover:
    backgroundColor: "{colors.warm-linen}"
  tech-tag:
    backgroundColor: "{colors.warm-linen}"
    textColor: "{colors.muted-earth}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  input:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  input-focus:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.espresso}"
  card:
    backgroundColor: "{colors.warm-linen}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: shiqihu.com

## 1. Overview

**Creative North Star: "The Field Notes"**

This is the portfolio of someone who notices things. Not the engineer who shows up with a slide deck — the one who arrives with a notebook full of observations, sketches an architecture on the back of an envelope, and ships the thing before the deck is finished. The visual system embodies that: warm, precise, and quietly confident. Every design decision earns its presence the way a field note earns its margin.

The system is light-first with a warm hand-laid palette — parchment backgrounds, stone borders, a Warm Grain accent that reads like late-afternoon light on a wooden desk. Dark mode inverts to the same chromatic warmth, deeper and quieter. Typography is tight and intentional: semibold headings with slightly negative tracking, generous body leading, monospace labels used sparingly to signal precision without performing "developer."

The site should feel like the work: confident enough not to explain itself, specific enough to be trusted, and warm enough that a hiring manager actually reads it. It explicitly rejects the dark-mode hero port that says "Hi, I'm a developer," the corporate résumé that quantifies everything and humanizes nothing, and the agency site that makes the portfolio about the portfolio.

**Key Characteristics:**
- Warm tonal palette, flat by default, depth through surface layering not shadow
- Typography-led hierarchy with negative-tracked headings and generous body line-height
- Monospace labels reserved for metadata and technical tags — never for body prose
- Motion: purposeful, not decorative; Apple-paced transitions, no scroll choreography by default
- Photography section treated as character, not decoration

## 2. Colors: The Warm Grain Palette

A single-family palette of warm neutrals with one earthy accent. Every color belongs to the same chromatic family; the range goes from deep espresso (primary text) through terracotta tones to parchment (page ground).

### Primary

- **Warm Grain** (`#cbad8d`): The primary accent. Used on primary buttons, focus rings, active nav markers, and decorative highlights. The color of grain in afternoon sun. Used with restraint — it anchors the eye without competing with content.

- **Leather** (`#a48374`): The hover/active and secondary accent. Deeper than Warm Grain, closer to the text family. Used on hover states, the wordmark period, role label text, and link arrows. Carries weight without being heavy.

### Neutral

- **Espresso** (`#3a2d28`): Primary text on light backgrounds; page background in dark mode. The deepest, warmest dark. All body copy, headings, and high-contrast UI use this.

- **Muted Earth** (`#6e5a50`): Secondary text, nav links at rest, descriptive body text in cards. AA-compliant (≥4.5:1) on Parchment backgrounds.

- **Stone Edge** (`#d1c7bd`): Borders, dividers, chip borders, form-field strokes at rest. Quiet structure.

- **Warm Linen** (`#ebe3db`): Card and secondary surface backgrounds. One tonal step above Parchment. The page reads as layered, not flat.

- **Parchment** (`#f1ede6`): Page background in light mode. The ground. Warm without demanding attention.

**Dark Mode:**
- `#2a201c` → bg; `#3a2d28` → surface; `#5c4a42` → border; `#cbbfb6` → muted text; `#f1ede6` → primary text; `#cbad8d` → accent (unchanged).

### Named Rules

**The One Accent Rule.** Warm Grain (`#cbad8d`) is used on ≤10% of any given viewport. It marks decisions — buttons, active nav, focus states. It never fills backgrounds, headings, or long runs of text. Its rarity is what makes it register.

**The No-Pop Rule.** No color outside this family. No blues for links, no red for errors. Error states use Espresso-weight text; success uses Leather. The palette is closed.

## 3. Typography

**Body/Heading Font:** Hanken Grotesk (weights 400 / 500 / 600), self-hosted via the Astro Fonts API with a metric-matched system-ui fallback.
**Label/Mono Font:** JetBrains Mono (weights 400 / 500), self-hosted, used only for labels.

**Character:** One warm humanist grotesque carries the entire hierarchy — the closest free analog to Apple's San Francisco, with a touch more warmth in the curves. A single family in three weights creates cleaner hierarchy than a competing pair, and matches the "content earns its space" principle: the type is confident enough not to call attention to itself. JetBrains Mono is the only second face, and it earns its place as a precision instrument on tech tags and the wordmark — never as a costume.

**Loading:** Fonts are downloaded at build time and self-hosted as woff2 (no runtime third-party request). The body face (Hanken Grotesk) is preloaded; the mono is not. Astro generates a metric-matched fallback so the swap causes no layout shift.

### Hierarchy

- **Display** (semibold 600, `clamp(2.25rem, 1.35rem + 3.9vw, 3.75rem)`, leading 1.05, tracking −0.028em): Hero name only. One instance per page. Exposed as the `text-display` Tailwind token.
- **Headline** (semibold 600, `clamp(1.75rem, 1.3rem + 1.9vw, 2.5rem)`, leading 1.12, tracking −0.022em): Section headings (h2). Large text — meets AA at 3:1 against all backgrounds. Exposed as the `text-h2` token.
- **Title** (semibold 600, `1.125rem`, leading 1.4): Card titles, project names, experience roles.
- **Body** (regular 400, `1rem`, leading 1.6): Prose, descriptions, tagline. Line length capped at 65ch.
- **Label** (JetBrains Mono, regular 400, `0.75rem`, tracking 0.08em): Tech tags, nav wordmark, metadata stamps. Used sparingly. Never for body prose.

### Named Rules

**The Mono-Restraint Rule.** Monospace type signals precision; it should appear where precision is the message. Tech tags, the wordmark, and metadata labels: yes. Section intros, card descriptions, nav labels: no. If a sentence is in mono, ask why.

**The No-Eyebrow Rule.** Section headings do not carry numbered eyebrow labels ("01 — Skills", "02 — Projects"). This pattern is AI scaffolding, not brand voice. The section heading is sufficient; its position in the scroll carries the sequence. The `eyebrow` prop in SectionHeading should be used only for genuinely non-sequential context labels, never numbering.

## 4. Elevation

Flat by default; depth through tonal surface layering, never through shadows. The three-stop tonal stack (Parchment → Warm Linen → surface overlays) creates hierarchy without lifting elements off the page. The nav uses `backdrop-filter: blur` to float above content as a functional signal of stickiness — this is the one architectural exception, not a decorative move.

There are no box-shadows in this system. Cards distinguish themselves through background tint (`bg-surface/50`) and border (`border-border`) rather than elevation. Hover states on cards use a subtle `translateY(-1px)` transform — a physical acknowledgment, not a float.

### Named Rules

**The Flat-by-Default Rule.** Surfaces are flat at rest. `backdrop-filter` is permitted on sticky nav. No `box-shadow` elsewhere. If you feel the urge to add a shadow to a card, add a border instead.

## 5. Components

### Buttons

Crisp and decisive. They sit where they're placed and do exactly what they say.

- **Shape:** Gently rounded (0.5rem / `rounded-lg`). Not pill, not sharp.
- **Primary:** Warm Grain background (`#cbad8d`), Espresso text, 10px 20px padding, semibold 500, `transition-opacity hover:opacity-90`. Opacity fade on hover — understated, not theatrical.
- **Ghost:** Transparent background, Stone Edge border, Espresso text. Same shape and padding. Hover: Warm Linen fill, no border-color change. Transition-colors.
- **Focus:** `outline: 2px solid var(--accent-strong)`, `outline-offset: 2px`.

### Tech Tags / Chips

Precision instruments, not decoration.

- **Style:** Warm Linen background, Stone Edge border, Muted Earth text, JetBrains Mono `text-xs`, `rounded-full`, `px-3 py-1`.
- **Purpose:** Technology labels only. Non-interactive. Rendered as `<span>`, not `<button>`.

### Cards / Containers

- **Corner style:** Softly rounded (0.75rem / `rounded-xl`).
- **Background:** `bg-surface/50` — 50% opacity Warm Linen, letting Parchment bleed through for depth.
- **Shadow:** None. See Elevation.
- **Border:** `border-border` (Stone Edge, 1px).
- **Hover:** `hover:-translate-y-1` on project cards; duration 300ms ease-out. Not on content-only cards.
- **Internal padding:** 24px (1.5rem).

### Inputs / Fields

- **Style:** Parchment background, Stone Edge border (1px), 0.5rem radius, 10px 16px padding.
- **Focus:** Border shifts to Leather (`--accent-strong`). No glow, no box-shadow. Outline suppressed (`focus:outline-none`) in favor of border-color shift. The change is crisp and immediate — exactly as long as needed.
- **Placeholder:** Muted Earth at 70% opacity. AA-adjacent; check on production if this reads too light.
- **Error:** No dedicated error color. Error states use Espresso-weight copy ("Please fill in all fields.") and a visible status role. The palette is closed — no red import.

### Navigation

- **Style:** Sticky, 64px height, Parchment background at 80% opacity, `backdrop-filter: blur` for the depth signal. Stone Edge bottom border at 60% opacity.
- **Wordmark:** `font-mono text-lg font-semibold tracking-tight` — `steven.` with Leather period. The period is punctuation-as-personality.
- **Nav links:** Muted Earth at rest, Espresso on hover/active, `text-sm`, no underline. Active link additionally gets `font-medium`. `IntersectionObserver` drives the active state from scroll position.
- **Résumé CTA:** Ghost button style, `hidden sm:inline-block`. Mobile: not shown in nav (accessible through hero CTA).
- **Mobile:** Nav links hidden below `md` breakpoint. Mobile nav TBD; current design has no hamburger menu.

### SectionHeading

- **Eyebrow (optional):** Leather text, JetBrains Mono `text-sm tracking-wide`. When used: only for non-sequential context, not numbering. See The No-Eyebrow Rule.
- **Heading (h2):** Headline scale. `mb-10` bottom margin to the section content.

## 6. Do's and Don'ts

### Do:

- **Do** use Warm Grain (`#cbad8d`) for primary interactive elements and focus states only. Its rarity is its power.
- **Do** use Leather (`#a48374`) for hover states, secondary accents, and role-label text — never for primary text at body size.
- **Do** use Muted Earth (`#6e5a50`) for secondary body copy. It is AA-compliant on Parchment; verify contrast if background changes.
- **Do** cap body line length at 65ch. The max-w-2xl constraint in hero prose and the max-w-5xl column container enforce this.
- **Do** use `text-wrap: balance` on h1 and h2 elements to prevent widow lines.
- **Do** use JetBrains Mono only for metadata, tech tags, and the wordmark. If you're typing a paragraph in mono, stop.
- **Do** treat the photography section as character. It is not filler. It belongs.
- **Do** respect `prefers-reduced-motion`: all transform/opacity animations must have an instant or crossfade fallback.
- **Do** write alt text with voice: "Fog clearing over Mount Rainier at dawn" beats "mountain photo".

### Don't:

- **Don't** use numbered section eyebrows ("01 — Skills"). This is AI scaffolding. The SectionHeading `eyebrow` prop exists for genuine context labels — use it selectively.
- **Don't** swap Hanken Grotesk for Inter, Geist, or a system-default sans. The single-family Hanken hierarchy is the committed identity; reflex sans-serifs erase it.
- **Don't** add `box-shadow` to cards. The palette creates depth through tonal layering. A shadow is a category error here.
- **Don't** use border-left greater than 1px as a colored stripe on any element. Side-stripe borders are an absolute ban.
- **Don't** use `background-clip: text` with a gradient. Gradient text is an absolute ban.
- **Don't** use colors outside the Warm Grain palette family. No blues for links. No red for errors. The palette is closed.
- **Don't** make the site feel like a corporate LinkedIn résumé (blue-and-white, professional-headshot energy, quantified bullets stacked from top to bottom, no personality).
- **Don't** make the site feel brutalist or maximalist (harsh contrasts, deliberately rough type, unconventional layout for its own sake). Warmth and craft are the voice.
- **Don't** add cursor effects, scroll-jacking, or parallax. The Apple reference is restraint — motion that reveals, not motion that performs.
- **Don't** use progress bars or percentage displays for skill levels. They quantify what should be demonstrated.
- **Don't** render an empty skills progress bar, project card count, or placeholder that reads as "AI template."
