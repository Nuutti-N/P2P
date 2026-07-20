# How a private car sale really works in Finland

The domain knowledge behind the app. Every pain point here is a product opportunity.
(Researched 2026-07. Sources at the bottom — verify details against Traficom before building flows around them.)

## The full journey, step by step

### 1. Seller decides to sell
- Figures out a price by browsing Nettiauto/Tori for similar cars (no trusted valuation for private sellers).
- Alternative they compare against: sell to a dealer (Kamux etc.) — instant but ~10%+ below market.
- **Pain:** pricing is guesswork; undervaluing loses money, overpricing means months of waiting.

### 2. Listing
- Photos, description, mileage, inspection (katsastus) status. Free on Nettiauto/Tori for private sellers.
- **Pain:** effort + strangers calling; scam "buyers" appear immediately (fake payment services, overpayment scams, phishing links).

### 3. Buyer does homework (or doesn't)
- Free from Traficom by reg number: technical data, tax status, inspection history and recorded mileage.
- Paid history report (Biltema/Autotalli-style) for import/damage history.
- Check that the **seller is actually the registered owner** — if names don't match, walk away (classic fraud signal).
- Check for outstanding vehicle tax (unpaid tax follows the car!) and finance/lien on the car.
- **Pain:** most buyers don't know what to check; this is where bad deals are born.

### 4. Test drive & inspection
- Meet in person; buyer test-drives. Smart buyers pay ~€100–200 for an independent condition check (kuntotarkastus) at a shop.
- **Pain:** no-shows waste seller evenings; sellers fear handing keys to strangers; buyers fear hidden faults.

### 5. The deal — kauppakirja (bill of sale)
- **Consumer protection law does NOT apply between two private people — only kauppalaki (Sale of Goods Act).** "Sold as is" is mostly what you get; disputes are hard and expensive. This is THE reason private buying feels unsafe.
- A written kauppakirja signed by both parties is essential: parties, car, price, date, known faults, "sold as inspected" terms. If/LähiTapiola offer free PDF templates today.
- **Pain:** many skip it or use a bad template; nothing is verified about either party's identity.

### 6. Payment — the scariest moment
- €5,000–30,000 moving between strangers. Options today: cash (robbery risk, counterfeit), regular bank transfer (seller waits, or buyer drives away trusting the seller), mobile transfer limits.
- **No escrow option exists for private car sales in Finland today. This is our core product.**
- Scams: stolen/fake banking apps showing "transfer done", bounced foreign transfers, buyer "pays" with forged receipt.

### 7. Ownership transfer — surprisingly digital and good
- Seller creates a 6-character **digital certificate (varmenne)** in Traficom e-services, or files a notification of transfer (luovutusilmoitus) with the buyer's personal ID code.
- Buyer registers the change in Traficom My e-Services with the certificate. **Max 7 days** after ownership changes.
- Seller MUST file the transfer notification immediately — otherwise the seller keeps paying vehicle tax and gets the buyer's speeding tickets.
- **Pain:** the rails are good but people don't know the steps/order; done wrong, the seller stays liable for a car they no longer own.

### 8. Insurance
- Liikennevakuutus (mandatory traffic insurance) must be valid from the moment ownership transfers — in practice the buyer arranges it same day; the seller's insurance ends at the transfer notification.
- **Pain:** buyers forget; there's a gap where the car is uninsured. (Product: insurance partner offer inside the deal flow = affiliate revenue.)

### 9. After the sale
- Buyer discovers a fault → angry calls, threats of court. With no signed kauppakirja and no evidence of the car's handover condition, it's word against word.
- **Pain/product:** our handover checklist + photos + condition statement inside the app becomes the evidence both sides wish they had.

## Where the money is (recap)
| Pain | Our product | Revenue |
|---|---|---|
| Payment fear | Escrow-style hold (Stripe) | 2–3% transaction fee |
| Identity fear | FTN bank-ID verified users | included (the trust moat) |
| Paperwork confusion | Guided kauppakirja + Traficom flow | included |
| Hidden faults | Inspection booking partner | referral fee |
| Insurance gap | In-flow insurance offer | affiliate |
| "I don't want to drive there" | Vetted driver delivery | €99–299/delivery |
| Pricing guesswork | Data-driven valuation | free (acquisition hook) |

## Customer interview questions (step 1 of validation)
Ask people who sold/bought privately within ~1 year:
1. Walk me through the whole sale — from decision to money in account. Where did it get stressful?
2. How did you handle the payment moment? What were you afraid of?
3. Did you make a written kauppakirja? Why/why not?
4. How did the Traficom transfer go? Who figured out the steps?
5. What almost made the deal fall through?
6. Did you consider selling to a dealer instead? What price difference would have made you?
7. If a service handled payment safety + paperwork + delivery for €200–300, would you have used it? (Watch the face, not the words.)
8. Would you have paid someone to drive the car to the buyer / pick it up? How much?

## Concierge test checklist (step 2 of validation)
Manually shepherd 2–3 real sales:
- [ ] Find a seller (friends/family or an active Nettiauto lister)
- [ ] Pre-check the car's Traficom data for the buyer; verify seller = registered owner
- [ ] Provide kauppakirja template, filled in
- [ ] Be present (or on call) at handover; run a photo condition checklist
- [ ] Guide the payment (bank transfer confirmed together before keys)
- [ ] Walk both through varmenne → registration → insurance, same day
- [ ] Afterwards: ask both what they'd have paid for this. That number is our take rate.

## Sources
- [Traficom — buying and selling a vehicle](https://traficom.fi/en/drivers-and-vehicles/buying-and-selling-vehicle)
- [Traficom — selling a used vehicle (FI)](https://traficom.fi/fi/autoilijat/ajoneuvon-osto-ja-myynti/kaytetyn-ajoneuvon-myynti)
- [Financer — buying a used car from a private seller, guide 2026 (FI)](https://financer.fi/oma-talous/auton-osto-yksityiselta-myyjalta/)
- [If — papers needed in a car sale, kauppakirja template (FI)](https://www.if.fi/henkiloasiakkaat/vakuutukset/autovakuutus/auton-vaihto/autokaupassa-tarvittavat-paperit)
- [LähiTapiola — selling a car and insurance (FI)](https://www.lahitapiola.fi/henkilo/vakuutukset/ajoneuvovakuutukset/autovakuutus/auton-myynti/)
- [Moottori — buying a used car from a private person (FI)](https://moottori.fi/uutinen/kaytetyn-auton-ostaminen-yksityiselta-myyjalta/)
- [Autoliitto — buying a used car (FI)](https://www.autoliitto.fi/autoilu-ja-liikenne/autoiluvinkit/kaytetyn-auton-osto/)
- [Suomi.fi — car buyer's checklist (FI)](https://www.suomi.fi/kansalaiselle/oikeudet-ja-osallistuminen-yhteiskuntaan/tervetuloa-taysi-ikaiseksi/opas/auton-rattiin/auton-ostajan-muistilista)
