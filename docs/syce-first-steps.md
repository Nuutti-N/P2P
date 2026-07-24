# Syce — what we actually build first (the honest note)

The pitch ([`syce-pitch.md`](./syce-pitch.md)) sells the finished dream. This note keeps us
honest about what is real work now vs. what is vision for later. **Never confuse the two.**

## Pitch vs. MVP — what NOT to build first
Two things in the pitch sound like features but are actually huge, licensed, partner-dependent
systems. They stay in the pitch as vision. They are **not** on the build list for a long time.

| Pitch says | Reality | What we actually do |
|---|---|---|
| "Oma minuuttipohjainen kaskovakuutus" | Building your own insurance = becoming a licensed insurance company. A solo founder does not build this. | **Partner** with a real insurer offering a per-trip product. Phase 3. |
| "Escrow-sulkutili" | Holding strangers' money = regulated payment institution (licence, capital, compliance). | **Plug into** Stripe / a licensed payment partner. The partner holds the money; the app just says "release now." Phase 3. |

Good pitches promise the dream. Smart founders build the boring 10% first.

## The logic hole we fix now
The buyer gets a 30-minute test drive on arrival and **can say no.** Then the driver is 230 km
from home with a car nobody bought. If nobody pays for that wasted trip, every rejected
delivery eats the margin alive.

**Rule, baked into the model from day one:** the buyer pays the delivery fee **up front,
non-refundable**, even if they walk away after the test drive. That's what makes the unit
economics survive real life.

## Napkin economics (per delivery)
- Buyer pays ~€150–200 for delivery.
- Driver's return ticket (bus/train) ~€50.
- Platform keeps ~€100/case + a cut of the car sale.
- At scale: 40,000 deliveries/year ≈ €4M — but that is ~13% of *every* private car sale in
  Finland, i.e. the finish line, not the start. The whole thing is built out of **delivery #1.**

## The manual-first validation ladder
We do NOT build the app first. A three-sided marketplace (seller + buyer + driver) is the
hardest kind of startup to bootstrap. We prove demand by hand, in order:

1. **Interview.** Talk to people who bought/sold a car privately in the last ~year.
   Story-style, not a survey. Listen for one thing: did the payment/trust + distance actually
   scare them, and would door-to-door delivery have made the deal easier?
2. **Concierge.** Manually shepherd a real sale end to end (pre-check Traficom data, kauppakirja,
   be present at handover) — we *are* the app, done by hand.
3. **One real manual delivery.** Line up a cross-city sale (Mikkeli ↔ Helsinki) and **drive the
   car ourselves**, get paid, and learn the true economics — before writing a line of app code.

## The MVP, when we do build it
Tiny on purpose:
- A car **listing**.
- A **"tilaa toimitus"** (request delivery) button.
- **Manual driver matching** — we match a driver by hand behind the scenes.

Trust features (escrow, insurance, verification) arrive later, with partners, once real
deliveries prove people want it.

## Dragons to keep one eye on (not solving today)
- **Driver liability.** A stranger driving a €15k car 230 km — if they crash it, who pays?
  This decides whether Syce can ever be big. Answer = insurance partner, later.
- **Return-trip pairing.** A car going Helsinki→Mikkeli for the driver's way back turns a
  wasted return into a second paid delivery. Build the matching around this once volume exists.

## Next concrete action (offline, this week)
- Talk to the one friend who recently bought a car. From that chat, get the next name.
- Aim at lining up the first cross-city sale we can drive ourselves.
