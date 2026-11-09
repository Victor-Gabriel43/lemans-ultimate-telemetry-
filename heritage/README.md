# Racing Heritage Archive

A digital museum and technical encyclopaedia of racing cars. Each vehicle has a sourced historical profile, technical specifications, teams, drivers, race results, an interactive timeline and a complete livery archive with a side-by-side comparison tool.

The first complete collection is the **Porsche 963 LMDh**, from its January 2022 rollout up to 9 November 2026. Fourteen more cars (919 Hybrid, 956, 962, 499P, 488 GTE, 296 GT3, GR010, V-Series.R, 9X8, M Hybrid V8, AMG GT3, Ford GT, R18, GT-R LM Nismo) are catalogued as **in research**. Their pages say so, and they show no history until it has been sourced.

## Quick start

```bash
cd heritage
npm install
cp .env.example .env          # DATABASE_URL (SQLite by default), ADMIN_PASSWORD
npx prisma db push            # create the schema
npm run db:seed               # load the researched dataset
npm run dev                   # http://localhost:3100
```

Production: `npm run build && npm start`. Set `ADMIN_PASSWORD` and `SITE_URL`. In production the curator dashboard stays locked until a password is set. In development it is open, and a banner says so.

## Architecture

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16 (App Router) + React 19 + TypeScript** | Server components render database pages to HTML (fast, SEO-friendly), and interactive parts are small client islands. |
| Styling | **Tailwind CSS 4** with design tokens in `app/globals.css` | Dark archival look: charcoal palette, Instrument Serif display type, Inter body, JetBrains Mono metadata. |
| Data | **Prisma 6 + SQLite** (dev), PostgreSQL-ready | The schema avoids enums, scalar lists and `Json` columns, so switching `provider` to `postgresql` needs no model changes. |
| Admin | Server actions + one generic CRUD UI driven by `lib/admin-schema.ts` | To add an entity or field you edit one config block, not new pages. |

```
heritage/
├─ prisma/
│  ├─ schema.prisma          relational model (see below)
│  ├─ seed.ts                idempotent loader
│  └─ data/
│     ├─ porsche-963.ts      researched dataset: sources, specs, entries, results, liveries, timeline
│     └─ collection.ts       manufacturers + in-research catalogue
├─ lib/
│  ├─ queries.ts             catalogue search, facets, global search, source lookup
│  ├─ liveries.ts            livery filters (year, team, car number, championship, type)
│  ├─ vocab.ts               controlled vocabularies (verification, livery types…)
│  ├─ admin-schema.ts        declarative admin model definitions
│  ├─ admin-actions.ts       server actions: save/delete/cite, login
│  └─ auth.ts                password-cookie auth for /admin
├─ components/               LiveryArt (SVG livery renderer), Gallery (zoom lightbox),
│                            TimelineExplorer, CompareTool, FilterBar, cards, citations
└─ app/                      routes (below)
```

### Data model

`Manufacturer` · `Vehicle` · `Spec` · `Championship` · `Team` (factory | customer) · `Driver` · `Entry` (vehicle × team × championship × season × car number, with drivers) · `Event` · `Result` · `Livery` (with `parentId` + `isVariation`) · `LiveryDriver` · `Photo` (attachable to a vehicle, livery or timeline entry; front/rear/side/top/detail views) · `TimelineEntry` · `Source` · `SourceRef`.

- **Attribution.** `SourceRef` (entityType + entityId) lets any record cite any number of sources. Sources show next to each statement (↗) and in a full list on every profile.
- **Verification.** Every historical record carries `verified | reported | unverified`, and the badge always shows. Unverified data is never presented as fact. The dashboard has a research queue of every record still awaiting confirmation.
- **Liveries vs. variations.** A genuinely new design is its own record. A seasonal or sponsor update points to its parent design with `isVariation = true`, so minor changes are never counted as new liveries.
- **Scale.** Vehicle pages use generic queries, and nothing is hard-coded per car. Adding the next car means adding data (through the dashboard or a seed file), not code.

### Routes

| URL | Purpose |
|---|---|
| `/` | Cinematic hero, featured 963 introduction, featured liveries, collection, milestones timeline, recently added, browse by manufacturer, search |
| `/vehicles` | Catalogue with URL-driven filters: manufacturer, category, year, championship, team, country, era; plus sorting |
| `/vehicles/[slug]` | Profile: overview, specifications, racing history (WEC, IMSA, Le Mans/Daytona/Sebring), factory vs customer teams, drivers, achievements, gallery, liveries, sources |
| `/vehicles/[slug]/liveries` | Livery archive filtered by year, team, car number, championship, type; variations can be hidden |
| `/vehicles/[slug]/liveries/[livery]` | Individual livery profile (all 13 required fields, front/rear/side/top photo slots, sources) |
| `/vehicles/[slug]/timeline` | Interactive season-by-season timeline |
| `/vehicles/[slug]/compare?l=a,b,c` | Side-by-side comparison of up to 4 liveries (shareable URL) |
| `/liveries`, `/teams/[slug]`, `/drivers/[slug]`, `/search?q=`, `/sources` | Global livery archive, team and driver pages, global search, research method |
| `/admin` | Curator dashboard: vehicles, photographs, liveries, teams, drivers, seasons/entries, events, results, timeline, references, specs |

SEO: per-page metadata and canonical URLs, Schema.org `Vehicle` JSON-LD, `sitemap.xml` and `robots.txt`. Vehicle and livery pages are statically generated and refreshed after each admin save.

## Research and accuracy policy

- Source priority: manufacturer and team archives (Porsche Newsroom, Team Penske), FIA / ACO / IMSA / WEC, photo agencies, then reputable publications. Wikipedia is used only for cross-checking.
- The Porsche 963 dataset cites **56 sources**, with 157 citations across its records.
- Where sources disagree (for example the 2023 Daytona classification), or only one outlet reported something, the record is marked **reported**. Where a detail is plausible but not yet confirmed (for example some 2024 WEC line-ups), it is marked **unverified**. The JDC-Miller livery history is an explicit placeholder.
- **Images.** No photographs are bundled, because press images need licensing. Galleries and timelines instead show **archival illustrations** drawn from each livery's palette, always captioned *"colours approximate, not a photograph"*. Credited photos can be added in the dashboard (URL, credit and licence are required). Once a front, rear, side or top view is attached, its slot on the livery page is marked as filled.

## Switching to PostgreSQL

1. In `prisma/schema.prisma` set `provider = "postgresql"` and point `DATABASE_URL` at your database.
2. Run `npx prisma db push && npm run db:seed`.
3. SQLite's `contains` is case-insensitive, but PostgreSQL's is not. Add `mode: "insensitive"` to the `contains` filters in `lib/queries.ts` and `lib/liveries.ts`.
