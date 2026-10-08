# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Vite + React 19 + TypeScript + Tailwind CSS v4 + Three.js (no image generation in this harness, so code-first build path). Chosen for instant bilingual client-side switching, a WebGL hero, and a single command to run (`npm run dev`).

## Users

Algerian buyers (individuals, families, fleet buyers) shopping for a new car, comparing Chinese brands against used imports, who need transparent pricing in DZD and Sharia-compliant financing before visiting a showroom. Primary language Arabic (RTL), secondary English (LTR).

## Product Purpose

Showcase and qualify leads for Al-Nour Auto, a showroom selling new Chinese cars in Algeria. Success: a visitor understands the offer (6 brands, indicative DZD prices, Mourabaha financing), simulates a monthly payment, and submits a qualified lead (name, 58-wilaya selector, validated Algerian phone) through a pre-filled WhatsApp message.

## Positioning

One showroom, six Chinese brands, an in-page Mourabaha simulator with no hidden fees, and delivery to any of the 58 wilayas. The mechanism a neighbor cannot copy: transparent monthly payment math shown before any contact is made.

## Operating Context

Mobile-first traffic, often on WhatsApp as the de-facto commerce channel. Visits happen in person after online qualification. Bilingual switch must not reload the page.

## Capabilities and Constraints

- Bilingual AR (default, RTL) / EN (LTR), instant toggle, persisted.
- Catalog: Geely, Chery, Jetour, Baic, Changan, DFSK with technical sheets and indicative DZD prices.
- Mourabaha simulator: price slider, down payment 20-70%, term 12-60 months, real-time monthly payment and full cost breakdown.
- Lead capture: name, wilaya (all 58), Algerian mobile validation (05/06/07 + 8 digits), model of interest, WhatsApp deep link (wa.me) with pre-filled message.
- Hero contains an interactive procedural Three.js studio that follows the cursor.
- Placeholder contact number until the showroom supplies the real WhatsApp line (single config constant).
- No backend: leads flow through WhatsApp only.

## Brand Commitments

Name: Al-Nour Auto. Brief-pinned visual constraints (recorded as binding, not expanded): dark zinc-950 palette, amber/gold accents, modern editorial typography, zero AI-cliché patterns. No existing logo assets; a simple geometric monogram is authored for the nav.

## Evidence on Hand

No photography, logos, testimonials, or legal documents supplied. Must not be fabricated: customer quotes, review scores, delivery statistics, official brand logos, real addresses or phone numbers. Prices and specifications are indicative simulation data and must be labelled as such.

## Product Principles

1. Show the math before asking for the contact.
2. Arabic-first: every string, layout direction, and validation message exists in Arabic first.
3. One accent, one theme, one radius: consistency over novelty.
4. Nothing on the page claims more than the showroom can prove.

## Accessibility & Inclusion

WCAG AA contrast on the dark theme, keyboard operable filters/forms/modal, visible focus rings, labels in Arabic, `prefers-reduced-motion` honored by the 3D hero and scroll reveals, `lang`/`dir` updated on switch.
