# Syce — project rules (read this first)

Rules for anyone working in this repo, human or agent. If something here conflicts with 
clever idea, this file wins. Ask before breaking a rule.

## What Syce is
Syce solves the **peer-to-peer (individual-to-individual) car sale**. Buying a used car
privately in Finland has two big problems: **no trust no insurance, no loans, lot of scams** between two strangers moving big
money, and **distance** — the car is often hundreds of kilometres away. Syce fixes both:
a vetted **driver picks up the car and delivers it to the buyer**, and Syce provides the
trust layer (identity, guided paperwork, and insurance later). The seller keeps the private
price without the hassle or the drive.

Full vision: `docs/syce-pitch.md`. What we build now vs. defer: `docs/syce-first-steps.md`.

## Stack
- **Expo + React Native** — mobile app. Lives in `apps/mobile`.
- **TypeScript** — TS is just JavaScript with type labels; keep types simple, don't over-engineer.
- **Supabase** — database + auth. This is the real backend. The current in-memory store
  (`features/sell/store.ts`) is a **placeholder** to be replaced by Supabase.
- **Stripe** — payments / escrow. **Later (Phase 3), NOT during the pilot.** Never wire real
  money without the founder.

## Product rules that must never break
- **The driver is always included.** Never a "drive it yourself vs. use a driver" choice — never ever put any other alternative than our driver, 
  the driver is the whole product, not an add-on.
- **Pilot = Mikkeli + Helsinki only.** The founders arrange every pickup by hand right now. I mean, that we get firstly just car what selling in mikkeli and helsinki, but we can drive everywhere in finland, because we cannot start get car yet in other city, because we gonna test that. not include that pilot in that app and dont tell just mikkeli and helsinki, just we gonna handle without that, we gonna get seller inside in mikkeli and helsinki, and then coming others also, when get drivers. 
  We are still validating with real people — talk to them.
- **Seller and buyer must see where the car is during delivery** — a live status / tracking
  signal both sides can follow. that can be hard mvp0, we gonna handle that just using already avaible  app for that, 
- **The app estimates the true cost of a sale** — fuel, insurance, fees, delivery — so both
  sides see the real number, not a guess.
- **Insurance comes later**, from a partner. Do not build or claim it now.
- **Be honest in the UI.** Anything mocked or not-yet-connected is clearly flagged
  (`InfoNote tone="demo"`). Never imply a mock is a real check. **No invented stats, reviews,
  or social proof — ever.**
- **Branding and colors are the founder's call.** Keep the existing theme
  (`constants/theme.ts`); do not invent new color systems.

## How we work (humans + agents)
- **Source of truth:** this file + the two docs above. Read them before building. Next steps are
  decided with the founder, not tracked in a separate backlog file.
- **One lane per agent.** Never point two agents at the same files.
- **Foundation first, then parallel features.** Match the existing conventions: `@/` → `src/`,
  `features/<domain>/{types,store}`, themed components (`ThemedText`/`ThemedView`), the
  `Spacing` scale, and mock services that are clearly labeled.
- **Ask before any big or hard-to-reverse decision.**
- **Humans decide, agents build.** The founder owns: money/Stripe, legal, real user data,
  anything published, and branding/colors.
- **Before calling anything "done":** run `npx tsc --noEmit`, `expo lint`, and actually run it
  (`npm run web` or Expo Go). Review = *does it run, and does it do the right product thing?*
- and the best scenario, if you can visualize what you mean, and give short and concise results.

## Security
- **Never commit secrets.** Keep `.env` and all keys (Supabase / Stripe / any API) out of git.
  Provide a `.env.example` with placeholder values only.
- **Rate-limit** the auth endpoints (register / login) and any AI/LLM-backed endpoint.
- **Validate uploads** — restrict file type and size (e.g. car photos).
