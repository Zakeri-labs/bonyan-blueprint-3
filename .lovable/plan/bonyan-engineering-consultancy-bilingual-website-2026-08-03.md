# Bonyan Engineering Consultancy — Bilingual Website

A premium, conversion-focused bilingual (EN/AR) site for Bonyan Construction for Engineering Consultancy, Al Mabelah, Al Seeb, Muscat, Oman. Visual system mirrors the uploaded reference: deep navy sections, amber/gold accents, sharp low-radius cards, ghosted section numbers, cinematic architectural photography with dark overlays.

## Visual system

- Palette taken from the reference (it defines a clear one): deep navy base (#0E1B2E / #142640 panels), warm ivory band (#F4F0E8) for the testimonials section, amber-gold accent (#D9A233) for CTAs and highlighted words, soft concrete grey for body text on dark.
- Accents used sparingly — gold only on buttons, "Learn more" arrows, highlighted heading words, section numbers.
- Typography: Manrope (EN) + IBM Plex Sans Arabic (AR), loaded via link tag in the root route. Large editorial headings with a bold/gold split, compact uppercase eyebrows, generous line height.
- Cards: small radius (~4-6px), thin borders, image-top on service cards, hover border/gold transition and subtle image zoom.
- Imagery: AI-generated cinematic Omani architecture (villa, mosque, school, compound, commercial, engineering review, site meeting), warm desaturated grading, all easily replaceable via a single assets map.

## Language system

- Full EN/AR translation dictionary in `src/i18n/` (one file per language, typed keys). No inline strings in components.
- English is the default at `/`; Arabic mirrored routes at `/ar`, `/ar/about`, `/ar/services`, `/ar/contact`.
- Locale drives `lang`/`dir` on `<html>`, full RTL mirroring: nav order, grids, icons, arrows, timeline flow, carousel controls, form alignment, drawer side.
- Switcher (EN | AR) in desktop header, mobile header, and footer; switching keeps the current page.
- Phone, email, URLs stay unchanged in both languages.

## Pages

Homepage — exactly 8 sections, in order:

1. Hero — full-bleed architectural image behind the transparent header, eyebrow, split-color headline, subheadline, two CTAs, capability labels.
2. Trust bar — slim dark band with four icon+label proof signals, then the "Built on trust" credibility row (6 signals, founded 2021, Muscat-based, etc.).
3. Services — six cards with image tops, icons, titles, short copy, direction-aware "Learn more" arrow linking to the matching Services-page anchor; three prioritized cards get stronger emphasis.
4. About / positioning — split image + text, four value blocks, CTA to About.
5. Portfolio — asymmetric editorial grid of 5 categories (villa, school, mosque, compound, commercial) with location and scope placeholders; horizontal swipe on mobile.
6. Process — four numbered steps with connector line, reversed in RTL.
7. Testimonials — ivory band, three placeholder cards explicitly labeled as placeholders, unverified rating UI, prev/next controls + dots.
8. Final CTA / contact — architectural panel, two CTAs, phone/WhatsApp/email/location cards, compact inquiry form.

Lightweight pages: About (intro banner, overview, 2021 founding, market positioning, values, expertise, CTA), Services (intro, six cards, per-service detail block with anchor ids and project types, CTA), Contact (intro, four contact cards, form, map placeholder, business-hours placeholder, CTA).

Footer: logo placeholder, name, slogan, placeholder social links, quick links, services links, contact block, EN/AR switcher, consultation CTA, copyright.

Mobile: fixed bottom bar (Home, Services, Portfolio, Contact, WhatsApp) with body padding so nothing is covered; hamburger drawer mirrored in Arabic.

## Content integrity

All contact details render as editable placeholders (`[PHONE]`, `[WHATSAPP]`, `[EMAIL]`, `[BUSINESS HOURS]`) with the fixed location line. No invented projects, clients, awards, certifications, or statistics. Testimonials read as placeholders.

## Technical notes

- TanStack Start file routes: `src/routes/index.tsx`, `about.tsx`, `services.tsx`, `contact.tsx`, and an `ar/` mirror rendering the same components with the Arabic locale.
- Shared page components in `src/components/site/` (Header, MobileDrawer, LanguageSwitcher, Hero, TrustBar, ServiceCard, AboutSplit, PortfolioGrid, ProcessSteps, TestimonialCarousel, ContactCards, InquiryForm, Footer, MobileBottomNav) — all locale-aware via a small `useLocale()` helper derived from the route path.
- Design tokens added to `src/styles.css` in oklch; no hardcoded color utilities in components.
- Per-route `head()` with localized title, description, og tags, canonical, and `hreflang` alternates for en/ar.
- Inquiry form is client-side validated with localized messages and shows a localized success state (no backend; submissions are not stored yet).
- Animation: CSS-only scroll reveals and hover transitions, `prefers-reduced-motion` respected. Images lazy-loaded except the hero, with fixed aspect ratios to avoid layout shift.

## Not included

No blog, dashboard, portal, per-service pages, per-project pages, backend, or database.
