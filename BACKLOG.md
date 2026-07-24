# Syce — build backlog

The ordered list of work. **Take the top unclaimed lane, one agent per lane, never two agents
in the same files.** When you start a lane, mark it `IN PROGRESS (name)`. See `claude.md` for the
rules every lane must follow.

## Done
- ✅ **Brand** (`constants/theme.ts`) — Metsä palette applied (forest green nav, terracotta CTA, cream/beige surfaces, trust-badge green). Replaces the stock Expo starter colors.
- ✅ **Tab shell + mode switch** (`components/app-tabs.tsx`, `components/mode-switch.tsx`) — 5 Finnish tabs (Etusivu, Selaa, Myy, Toimitukset, Profiili), one custom bar for web + native (no more `NativeTabs`), persistent buyer/seller ↔ driver toggle (driver side inert — phase two).
- ✅ **Buyer browse** (`features/browse/*`, `src/app/index.tsx`, `src/app/explore.tsx`) — search, location/price filters, listing cards, listing detail (as a modal — see code comment on why not a routed screen). Reads real listings only (`getListings()`), honest empty state when there are none. No fake/demo listings — a made-up car for sale reads as fake inventory, which the product rules ban.
- ✅ **Delivery status / tracking** (`src/app/toimitukset.tsx`) — honest empty state ("Ei aktiivisia toimituksia"). A first pass had a fabricated driver card (name, star rating, pre-checked verification) — pulled because an invented person with a rating is exactly the fake social proof `claude.md` bans, even demo-labeled. Real UI comes back once there's a real delivery to show.
- ✅ **Home screen** (`src/app/index.tsx`) — value prop, "Sell your car" CTA, how-it-works (driver as step 2), honest pilot note.
- ✅ **Seller onboarding** (`src/app/sell.tsx`, `features/sell/*`) — verify → plate lookup → listing → pickup → review. Mock services labeled.
- ✅ **Profiili** (`src/app/profiili.tsx`) — verification status, seller's own listings, inert entry point into driver mode.

## Next (build in this order)
1. **Driver mode** — Työt / Aktiivinen / Profiili per the Figma handoff spec, wired to the mode-switch toggle. New `features/driver/`.
2. **Cost estimator** — estimate the true cost of a sale (fuel, insurance, fees, delivery) so both sides see the real number.

## Backend (do before scaling features)
5. **Supabase** — replace the in-memory `store.ts` with a real database: persist listings, add auth/accounts, wire seller + buyer + driver data. Founder creates the project and supplies keys.

## Later (human-gated, do NOT start without the founder)
6. **Stripe escrow** — hold the buyer's money until handover is confirmed. Phase 3. Never wire real money without the founder.
7. **Insurance partner** — per-trip cover for the driver. Partner-provided, later.

## Rules of the lane (short version)
- Match existing conventions (`@/` alias, `features/<domain>`, themed components, `Spacing`).
- Mock anything not real, and label it (`InfoNote tone="demo"`). No fake stats or reviews.
- Before "done": `npx tsc --noEmit`, `expo lint`, and run it (`npm run web`).
