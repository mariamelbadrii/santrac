# CLAUDE.md — SANTRAC Website

## Project identity
This project is now the official website and equipment catalogue for **SANTRAC**, an established Egyptian heavy/industrial equipment company.

This project originally began as a startup marketplace concept called **Matchinery**. The codebase may still contain Matchinery/forklift-marketplace assumptions. Preserve useful infrastructure, but the customer-facing product is now SANTRAC.

## Core rule
Do not invent company facts, inventory, prices, years of experience, customer counts, partnerships, dealer status, warranty terms, testimonials, or service promises.

If a fact is not confirmed, leave it out or use a neutral editable placeholder.

## What SANTRAC is
- Egyptian B2B heavy/industrial equipment company.
- Primarily deals in used equipment.
- Customer trust, equipment quality, inspection before sale, customer assistance, and after-sales support are important.
- The company helps customers choose suitable equipment.
- SANTRAC is **not to be described as a marketplace startup**.
- Do not call SANTRAC an authorized dealer/distributor unless explicitly confirmed.
- Website should support English + Arabic, with proper RTL for Arabic.

## Desired brand feel
Established, trustworthy, industrial, experienced, premium but practical, modern and restrained.

Avoid:
- generic startup/SaaS language
- exaggerated claims
- fake numbers
- excessive yellow/black construction styling
- fake testimonials/logos
- overly flashy animations

## Public information architecture
- Home
- Equipment
- Dynamic Equipment Detail
- Services
- About
- Request Quote
- Contact

Potential routes:
- `/`
- `/equipment`
- `/equipment/[slug]`
- `/services`
- `/about`
- `/request-quote`
- `/contact`

## Equipment architecture
The old `forklifts` model should evolve into a general `equipment` model.

Recommended fields:
- id (internal UUID)
- slug
- category
- brand
- model
- year
- condition
- location
- availability
- price_mode
- price
- main_image
- additional_images
- description_en
- description_ar
- specifications (flexible structured object / JSON)
- featured
- published
- status (draft/published/sold/archived)
- created_at
- updated_at

Do not force forklift-only technical fields onto all equipment types.

## Public equipment experience
Equipment page:
- search by brand/model
- category filter
- brand filter
- condition filter
- location filter
- availability filter
- sorting
- desktop sidebar + results
- mobile filter drawer/sheet

Equipment cards:
- image
- category
- brand
- model
- year if available
- condition
- location
- View Details
- never expose internal UUIDs

Equipment detail:
- brand + model
- category
- gallery
- year
- condition
- location
- availability
- price / price on request
- category-specific specifications
- description
- Request Quote
- WhatsApp
- missing values use `—` or are omitted cleanly

## Quote/lead flow
Keep public enquiries account-free.

Required:
- Full Name
- Phone / WhatsApp
- What equipment do you need?
- Location

Optional:
- Company
- Email
- Brand/model preference
- Additional requirements

Preserve:
- UTM attribution
- source tracking
- lead status
- selected equipment reference internally

Suggested lead statuses:
- new
- contacted
- qualified
- quoted
- negotiating
- won
- lost

## Admin
A private admin is required so normal inventory work does not depend on Lovable/Claude.

Support only 1–2 manually authorized admin accounts initially.

Admin should allow:
- login
- dashboard
- inventory list
- add equipment
- edit equipment
- upload/change photos
- edit specs
- edit price / price mode
- change availability/status
- feature/unfeature
- publish/unpublish
- mark sold/archive
- view leads
- update lead status

Do not allow public admin registration.
Do not use shared admin credentials.
Enforce authorization server-side/database-side, not only in the UI.

## Customer accounts
Do **not** build customer accounts for V1.

Browsing, WhatsApp, and quote requests should work without login.

If customer accounts are added later, they should provide real utility such as:
- saved equipment
- enquiry history
- quotations
- recently viewed
- saved company details
- saved searches/alerts

## Localization
English + Arabic.

English can remain default unless changed later.

Arabic:
- true RTL
- navigation/forms/cards/filters adapt
- icons/arrows flip where appropriate
- brand/model names remain unchanged
- use natural professional Arabic, not overly formal government Arabic and not slang-heavy

## Tracking/integrations
Architecture should remain ready for:
- Meta Pixel / Meta Ads
- GA4
- Google Ads conversion tracking
- WhatsApp
- Search Console

Useful events:
- PageView
- ViewContent
- RequestQuoteClick
- Lead
- WhatsAppClick
- CallClick

Do not hardcode tracking IDs. Keep them in config/env.

## WhatsApp
Use one configurable business number.
Machine/equipment detail pages should prefill a message with brand/model where practical.

## SEO
Need:
- clean route metadata
- localized EN/AR titles/descriptions
- sitemap
- robots/indexability
- semantic headings
- clean slugs
- correct lang/dir/hreflang or locale equivalents

Do not keyword-stuff.

## Current known technical state from Lovable work
The earlier Matchinery project reportedly already has:
- Lovable Cloud backend
- tables for `forklifts`, `equipment_types`, `leads`, `user_roles`
- secure `has_role()` function
- access rules where public can read published inventory/categories and submit leads; admins can manage inventory/read leads
- central config for WhatsApp, phone, email, analytics IDs
- analytics event queue + UTM capture
- i18n EN/AR with RTL switching
- Zod validation and honeypot
- server-side catalogue queries
- reusable header/footer/card components
- public routes for home/about/contact and later marketplace/detail/request quote
- typecheck/build verification was an outstanding step at one point

Treat the actual repository as source of truth. Inspect before modifying.

## Immediate engineering priority
1. Inspect repo and run typecheck + production build.
2. Fix existing errors before adding features.
3. Rebrand customer-facing product from Matchinery to SANTRAC.
4. Generalize forklift-only inventory to equipment.
5. Preserve working backend/auth/analytics/i18n where useful.
6. Build admin after public architecture is stable.
7. Add real SANTRAC inventory/content.
8. QA English/Arabic + desktop/mobile.
9. Add real tracking/contact IDs.
10. Publish only after explicit approval.

## Development style
- Prefer typed, maintainable code.
- Avoid broad `any`.
- Reuse existing functions/components instead of duplicating logic.
- Do not rewrite working architecture without a reason.
- Keep V1 simple.
- Do not add AI chatbot, rentals, payments, checkout, supplier accounts, customer accounts, or other future features unless explicitly requested.
