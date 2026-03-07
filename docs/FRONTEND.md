# Frontend Architecture — GoodMatter

---

## Design Philosophy

The frontend is built on **Jony Ive's design principles** — every element exists for a reason, whitespace is a feature, and the interface should feel invisible while being unmistakably premium.

### Core Principles
1. **Reductive** — Remove until it breaks, then add one thing back
2. **Purposeful** — Every pixel, color, and animation serves a function
3. **Material** — UI elements should feel like they have physical weight and depth
4. **Quiet confidence** — The design doesn't shout; it earns trust through craft

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── globals.css               # Design system (tokens, reset, utilities)
│   ├── layout.tsx                # Root layout (HTML, fonts, Header, Footer)
│   ├── page.tsx                  # Home page
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── investors/
│   │   ├── page.tsx              # Investor login
│   │   └── dashboard/
│   │       ├── page.tsx          # Curated dealflow
│   │       └── [id]/
│   │           └── page.tsx      # Deal detail
│   └── founders/
│       └── page.tsx              # Impact Studio
├── components/
│   ├── ui/                       # Design system primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── SectionHeading.tsx
│   ├── layout/                   # Structural components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── home/                     # Home-page specific
│       ├── LogoBelt.tsx
│       ├── ValueProposition.tsx
│       ├── FeaturedDeals.tsx
│       └── TeamSection.tsx
└── lib/
    └── supabase/                 # Supabase clients
        ├── client.ts
        └── server.ts
```

---

## Design System

### CSS Custom Properties (Design Tokens)

All design decisions are encoded as CSS custom properties in `globals.css`, ensuring a single source of truth.

#### Colors
```css
:root {
  /* Backgrounds */
  --color-bg:           #FAFAFA;
  --color-surface:      #FFFFFF;
  --color-surface-alt:  #F5F5F5;

  /* Text */
  --color-text:         #1A1A1A;
  --color-text-muted:   #6B6B6B;

  /* Accent */
  --color-accent:       #C8A96E;
  --color-accent-hover: #B8963E;

  /* Borders & Glass */
  --color-border:       #E8E8E8;
  --color-glass:        rgba(255, 255, 255, 0.72);
}
```

#### Typography
```css
:root {
  --font-family:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-xs:   0.75rem;   /* 12px */
  --font-size-sm:   0.875rem;  /* 14px */
  --font-size-base: 1rem;      /* 16px */
  --font-size-lg:   1.125rem;  /* 18px */
  --font-size-xl:   1.5rem;    /* 24px */
  --font-size-2xl:  2rem;      /* 32px */
  --font-size-3xl:  3rem;      /* 48px */
  --font-size-4xl:  4rem;      /* 64px */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
}
```

#### Spacing
```css
:root {
  --space-xs:  0.25rem;   /* 4px */
  --space-sm:  0.5rem;    /* 8px */
  --space-md:  1rem;      /* 16px */
  --space-lg:  1.5rem;    /* 24px */
  --space-xl:  2rem;      /* 32px */
  --space-2xl: 3rem;      /* 48px */
  --space-3xl: 4rem;      /* 64px */
  --space-4xl: 6rem;      /* 96px */
  --space-5xl: 8rem;      /* 128px */
}
```

#### Shadows & Radii
```css
:root {
  --shadow-sm:    0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:    0 4px 12px rgba(0,0,0,0.06);
  --shadow-lg:    0 8px 24px rgba(0,0,0,0.08);
  --shadow-xl:    0 16px 48px rgba(0,0,0,0.10);
  --radius-sm:    8px;
  --radius-md:    12px;
  --radius-lg:    16px;
  --radius-full:  9999px;
}
```

---

## Component Library

### Button (`Button.tsx`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'glass'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `fullWidth` | `boolean` | `false` | Stretch to container width |
| `href` | `string` | — | Renders as `<a>` if provided |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction |

**Styles:**
- **Primary**: Gold background (`--color-accent`), white text, subtle hover darken + 2px lift
- **Secondary**: Transparent background, gold border, gold text
- **Ghost**: No background or border, text only, underline on hover
- **Glass**: Frosted glass background, semi-transparent

### Card (`Card.tsx`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'glass' \| 'outlined'` | `'default'` | Visual style |
| `hoverable` | `boolean` | `false` | Lift + shadow on hover |
| `padding` | `'sm' \| 'md' \| 'lg'` | `'md'` | Internal spacing |

### Input (`Input.tsx`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Floating label text |
| `type` | `string` | `'text'` | Input type |
| `as` | `'input' \| 'textarea' \| 'select'` | `'input'` | Element type |
| `error` | `string` | — | Error message below input |
| `options` | `{value, label}[]` | — | Options for select variant |

### SectionHeading (`SectionHeading.tsx`)

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Main heading text |
| `subtitle` | `string` | Optional descriptive text below |
| `align` | `'left' \| 'center'` | Text alignment |
| `accent` | `boolean` | Show gold accent line |

---

## Layout Components

### Header (`Header.tsx`)

**Behavior:**
- Transparent on page load; gains frosted glass background (`backdrop-filter: blur(20px)`) after 50px scroll
- Fixed position, `z-index: 1000`
- Logo on the left: "GoodMatter" in semibold Inter
- Navigation links centered: Home | Private Access for Investors | Impact Studio for Founders | About | Contact Us
- Two CTA buttons on the right: "Investor Login" (ghost) | "Apply as Founder" (primary)
- **Mobile (< 768px)**: Hamburger icon replaces nav + buttons; slide-out panel from right

### Footer (`Footer.tsx`)

Three-column layout:
1. Brand + short description
2. Quick links
3. Social + contact email

---

## Page Compositions

### Home Page (`/`)
```
┌─────────────────────────────────────┐
│ Header (transparent → glass on scroll) │
├─────────────────────────────────────┤
│ Hero Section                        │
│   Large heading (48-64px)           │
│   Subheading + Description          │
│   [Join as Investor] [Submit Startup] │
├─────────────────────────────────────┤
│ Logo Belt (infinite CSS scroll)     │
├─────────────────────────────────────┤
│ Value Propositions (4-card grid)    │
├─────────────────────────────────────┤
│ Featured Deals (card grid/scroll)   │
├─────────────────────────────────────┤
│ Team Section (headshot grid)        │
├─────────────────────────────────────┤
│ Closing CTA Band                   │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

### Investors Page (`/investors`)
```
Login Form → on success → redirect to /investors/dashboard
```

### Dashboard (`/investors/dashboard`)
```
Grid of DealCards → click → /investors/dashboard/[id]
```

### Impact Studio (`/founders`)
```
Intro → Value Props → 4-Step Process → Services Grid → Virtual CFO Plans → BLKBOOK → CTA
```

---

## Animation Strategy

All animations follow the Ive principle: **felt, not seen**.

| Animation | Trigger | Duration | Easing |
|---|---|---|---|
| Fade-in + slide up | Element enters viewport | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Card hover lift | Mouse enter | 300ms | `ease-out` |
| Header glass transition | Scroll > 50px | 300ms | `ease` |
| Logo belt scroll | Continuous | 30s linear | `linear` (infinite) |
| Button hover scale | Mouse enter | 200ms | `ease-out` |
| Page transitions | Route change | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` |

**Implementation**: Framer Motion for complex animations (viewport-triggered, layout); CSS transitions for simple hover states.

---

## Responsive Breakpoints

```css
/* Mobile first */
@media (min-width: 640px)  { /* sm — landscape phones */ }
@media (min-width: 768px)  { /* md — tablets */ }
@media (min-width: 1024px) { /* lg — small laptops */ }
@media (min-width: 1280px) { /* xl — desktops */ }
@media (min-width: 1536px) { /* 2xl — large screens */ }
```

### Key Responsive Behaviors
- **Hero heading**: 32px (mobile) → 48px (tablet) → 64px (desktop)
- **Navigation**: Hamburger (mobile) → full nav (desktop)
- **Card grids**: 1 column (mobile) → 2 columns (tablet) → 3-4 columns (desktop)
- **Sections**: Reduced vertical padding on mobile
- **Logo belt**: Narrower viewport clips more logos; animation speed maintained

---

## SEO Strategy

| Element | Implementation |
|---|---|
| Metadata | `generateMetadata()` in each `page.tsx`; unique title + description per page |
| Heading hierarchy | Single `<h1>` per page; logical `<h2>` → `<h3>` nesting |
| Semantic HTML | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| Open Graph | `og:title`, `og:description`, `og:image` for social sharing |
| Sitemap | Auto-generated via `next-sitemap` or manual `sitemap.ts` |
| Robots | Allow all crawling; index public pages; noindex dashboard |

---

## Accessibility

- All interactive elements have visible focus states (gold outline ring)
- Color contrast ratios meet WCAG AA (4.5:1 for body text, 3:1 for large text)
- Form inputs have associated `<label>` elements
- Images have descriptive `alt` attributes
- Keyboard navigation works for all interactive elements
- `aria-label` on icon-only buttons
- Skip-to-content link for keyboard users
