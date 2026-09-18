# SANTRAC Project Context

## Background
The project started as **Matchinery**, a B2B industrial equipment marketplace concept in Egypt, initially focused on forklifts.

The direction has changed:
**The website will now be used for SANTRAC itself.**

The project should become SANTRAC’s official company website + equipment catalogue + lead-generation system.

## Original Matchinery architecture worth preserving
Reported existing pieces:
- backend/database in Lovable Cloud
- `forklifts`
- `equipment_types`
- `leads`
- `user_roles`
- secure role-checking function `has_role()`
- public inventory read access
- public lead submission
- admin-only lead read / inventory management permissions
- central config
- UTM capture
- analytics events
- EN/AR i18n
- RTL switching
- server-side catalogue functions
- Zod validation
- honeypot
- header/footer
- reusable listing cards
- public routes

Known old files/components mentioned:
- `src/lib/config.ts`
- `src/lib/analytics.ts`
- `src/lib/i18n.tsx`
- `src/lib/catalog-schemas.ts`
- `catalog.server.ts`
- `catalog.functions.ts`
- `src/lib/display.ts`
- `src/components/site/Header.tsx`
- `src/components/site/Footer.tsx`
- `SiteLayout.tsx`
- `src/components/ForkliftCard.tsx`
- `src/routes/__root.tsx`
- `src/routes/index.tsx`
- `src/routes/about.tsx`
- `src/routes/contact.tsx`
- `src/routes/forklifts.index.tsx`
- `src/routes/forklifts.$slug.tsx`
- `src/routes/request-quote.tsx`

Important: inspect the actual repo because names/state may differ.

## Current SANTRAC business understanding
Based on the CEO questionnaire and conversation:

### Confirmed/strongly indicated
- SANTRAC deals primarily in **used equipment**.
- SANTRAC serves broad B2B sectors.
- Brands visible in notes appear to include TCM, Komatsu, Toyota, Caterpillar. Confirm before publishing if exact list matters.
- SANTRAC does **not** appear to be an authorized dealer/distributor.
- Equipment quality is a major reason customers trust SANTRAC.
- Inspection before sale is part of the process.
- SANTRAC offers some form of warranty, but exact terms are not yet documented and should not be invented.
- SANTRAC provides services in addition to sale, but exact service wording still needs confirmation.
- SANTRAC helps customers choose suitable equipment.
- Importing is part of the business.
- The intended customer feeling is **trust**.

### Not safe to publish yet without confirmation
- exact founding year
- exact years of experience
- exact number of machines sold
- exact warranty terms
- exact service list
- official dealer/distributor status
- major customer names/logos
- mission statement
- vision statement
- 3–5 brand words
- exact geography/export footprint

If unconfirmed, omit.

## CEO questionnaire areas already covered
Do not waste CEO time by asking the same things again.

Covered:
- company name / founding
- founder
- how company started
- headquarters / service areas
- equipment types
- new vs used
- industries served
- main brands
- authorized dealer status
- what differentiates the company
- why customers trust the company
- company values
- equipment inspection
- warranty
- services alongside sales
- help choosing suitable equipment
- years of experience
- notable numbers/achievements
- milestones
- main customer types
- import/export geography
- desired customer feeling
- mission
- vision
- 3–5 descriptors
- what customer should remember from About page

Some final answers were unanswered or illegible, but development can proceed without blocking.

## Current website direction

### Public pages
- Home
- Equipment
- Equipment Detail
- Services
- About
- Request Quote
- Contact

### Home
Temporary hero direction:
- eyebrow: `HEAVY & INDUSTRIAL EQUIPMENT`
- H1: `Equipment you can rely on.`
- supporting text: `Explore SANTRAC's available equipment and speak directly with our team to find the right machine for your operation.`
- CTA: `View Equipment`
- CTA: `Request a Quote`

Possible sections:
- Featured Equipment
- Equipment Categories
- Why SANTRAC
- Services
- WhatsApp assistance CTA
- About preview

Do not show fake/unconfirmed stats.

### Why SANTRAC
Use conservative claims around:
- equipment quality
- careful equipment selection
- inspection before sale
- customer assistance
- after-sales support
- helping customers choose suitable equipment

### Equipment catalogue
Need:
- search by brand/model
- category
- brand
- condition
- location
- availability
- sorting
- responsive cards
- mobile filter drawer

### Equipment detail
Need:
- gallery
- brand/model
- category
- year
- condition
- location
- availability
- price mode
- flexible specs
- description
- Request Quote
- WhatsApp

### Services
Only publish services that are confirmed.
Potential themes:
- equipment sales
- equipment sourcing/help choosing equipment
- inspection before sale
- after-sales support

### About
Should communicate:
- established business
- experience
- quality
- trust
- long-term customer relationships
- practical help choosing equipment

Do not invent years, counts, awards, mission/vision.

## Admin requirements
The owner should not need Lovable or Claude for normal daily operations.

Need a private admin with 1–2 manually authorized accounts.

Suggested routes:
- `/admin/login`
- `/admin`
- `/admin/inventory`
- `/admin/inventory/new`
- `/admin/inventory/[id]/edit`
- `/admin/leads`

Admin capabilities:
- add/edit equipment
- upload/change images
- edit price
- price mode
- specs
- availability
- publish/unpublish
- feature/unfeature
- mark sold/archive
- manage leads
- update lead status

Security:
- no public admin registration
- no shared password
- server-side/db permission enforcement

## Customer account decision
Do not build customer profiles in V1.

Reason: B2B customers should be able to browse, WhatsApp, and request quotes without registration.

If customer profiles are added later, useful features should include:
- saved equipment
- enquiry history
- quotations
- recently viewed
- company profile
- saved searches/alerts

## Meta / WhatsApp / Google plan

### Meta
Potential events:
- PageView
- ViewContent
- RequestQuoteClick
- Lead
- WhatsAppClick
- CallClick

### WhatsApp
V1:
- click-to-WhatsApp
- prefilled equipment enquiry

Future:
- WhatsApp Business API
- database-linked conversations
- automation / AI if desired

### Google
- GA4
- Google Ads conversion tracking
- Search Console
- SEO

Architecture should support this without hardcoded IDs.

## SEO direction
Need:
- localized EN/AR metadata
- clean slugs
- sitemap
- robots/indexing
- semantic headings
- good page titles/descriptions
- correct RTL/lang handling
- proper mobile experience

## Logo
The original SANTRAC logo supplied by the user contains:
- red geometric panel
- white stylized forklift
- wordmark split visually as SAN / TRAC
- tagline: `ON THE TRAC`

A cleaner modernized version was generated in ChatGPT.

The logo may still change. Treat current logo as provisional.

## Code ownership / workflow
Recommended:
- Lovable for fast visual/app generation
- GitHub as canonical source/history/backup
- Claude Code for deeper code work
- backend remains Lovable Cloud unless intentionally migrated

Once connected:
- Claude Code edits locally
- commit
- push
- merge to `main`
- Lovable syncs from GitHub if integration is configured

Before major Claude Code edits:
- connect project to GitHub
- ensure clean build
- commit a baseline snapshot

## Immediate next steps for Claude Code
1. Inspect repo structure.
2. Run install / typecheck / build.
3. Fix existing errors first.
4. Identify remaining Matchinery strings/routes/schema assumptions.
5. Plan SANTRAC migration with minimal destructive changes.
6. Generalize inventory model from forklift-only to equipment.
7. Preserve leads, auth, analytics, i18n, UTM logic.
8. Rebrand public UI.
9. Build Services page.
10. Build admin.
11. Add real SANTRAC content/inventory.
12. QA English/Arabic and mobile/desktop.
13. Add real contact/tracking config.
14. Only then publish.

## Tone for all generated copy
Use simple, clear, professional English and Arabic.

Avoid:
- corporate fluff
- dramatic claims
- fake superlatives
- “world-class”
- “industry-leading”
- “revolutionizing”
- startup jargon
- statements that SANTRAC is a marketplace

The website should feel experienced and trustworthy, not loud.
