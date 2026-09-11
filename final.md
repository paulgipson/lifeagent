# LifeAgentPaul — project status

Last updated: September 2026. Use this file with `build.md` (full product spec) to track what ships and what is still open.

---

## Completed

### Site foundation
- **Next.js 16** (App Router) with **React 19**, **TypeScript**, **Tailwind CSS 4**
- Global layout, fonts, design tokens, `InsuranceAgency` structured data with `areaServed` for every licensed state
- `sitemap.xml` and `robots.txt` (thank-you and API excluded)
- Analytics loader (`components/Analytics.tsx`) for GA4 / Meta Pixel via env vars; event helper in `lib/analytics.ts`

### Conversion-ordered homepage (`app/page.tsx`)
Hero + form → carrier marquee → value banner → how it works → four coverage cards → why Paul → meet Paul → about + verifiable licenses → reviews (hidden until real) → stats → FAQ (with `FAQPage` schema) → bottom form. Sticky call / quote bar on mobile.

### Product landing pages (`app/[product]/page.tsx`, content in `lib/products.ts`)
`/term`, `/whole-life`, `/iul`, `/final-expense` — matched headline, bullets, "who it's for", 3 objection FAQs, form with coverage preselected. Unknown slugs 404. Hero form also honours `?coverage=` deep links.

### Lead capture (`lib/leads.ts`)
- Short form (`QuoteForm`) used in the hero, bottom CTA, and product pages → Web3Forms email + `POST /api/quote`
- `/api/quote` validates, logs, and forwards to `LEAD_WEBHOOK_URL` (CRM / Zapier / GHL) when set
- Success → `/thank-you?name=&email=&phone=&coverage=` (no second data-entry step)
- State dropdowns list **licensed states only** plus "Another state"; out-of-footprint leads are flagged in the subject line and payload and shown a referral message
- UTM / gclid / fbclid captured with every lead

### Multi-step quote wizard (`/get-quote`)
- 6 steps: Goal → Beneficiary → Budget → DOB → Health (+ tobacco) → Contact; "takes about 60 seconds · step X of 6" hint
- Fake OTP step **removed**; final step submits the full payload through `submitLead` and redirects to `/thank-you`
- Final-expense-only shoppers get a $0–$300 budget range

### Thank-you page (appointment capture)
- Personalised headline, click-to-call, one-tap SMS with prefilled message
- Inline **Cal.com** booking embed prefilled from the form (enable with `NEXT_PUBLIC_CAL_LINK`), fires `booking_complete`
- Active next-steps copy (Paul's number to save, exact call time if booked)

### Trust & compliance clean-up
- Removed fabricated testimonials (sections hide until real reviews are added), "SEEN on TikTok" strip, "DoorDash of insurance" kicker, developer notes in form errors, footer placeholder text
- Footer disclaimer lists all licensed states (generated from `lib/licenses.ts`)
- Annuity / variable-product copy removed; site focuses on term, whole life, IUL, final expense
- Blog hidden from nav and `noindex` until it has content

---

## Still needed to launch

| Item | Notes |
|------|--------|
| **Cal.com link** | Default is `lifeagentpaul/quote-call` (created in Cal.com). Override with `NEXT_PUBLIC_CAL_LINK` in Vercel if needed. |
| **CRM webhook** | Set `LEAD_WEBHOOK_URL` so leads land in a CRM / sheet and trigger an instant SMS to Paul and the lead. |
| **Analytics IDs** | Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_META_PIXEL_ID`; mark `lead` and `booking_complete` as conversions. |
| **Real reviews** | Add attributable Google reviews to `testimonialsSection.items` and set `reviewsUrl`. |
| **Legal review** | TCPA consent language, privacy/terms, and the FAQ price ranges should be confirmed by counsel / compliance. |
| **Video** | Optional 30-second intro from Paul: set `thankYouVideoYoutubeId` in `lib/thankYouPage.ts`. |
| **Web3Forms** | Confirm the access key belongs to Paul's account and add `lifeagentpaul.com` to allowed domains. |
