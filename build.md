# LifeAgentPaul.com — Build Specification

This document decomposes the reference insurance landing page (Insurance Elevated Pro–style) into implementable components, features, and acceptance criteria. Use it as the single source of truth for design, content, and engineering for **LifeAgentPaul.com**.

---

## 1. Project goals

| Goal | Notes |
|------|--------|
| **Primary** | High-trust lead capture (quote requests) for life insurance |
| **Secondary** | Educate visitors on services, process, and Paul’s value proposition |
| **Brand** | Replace generic “agency” copy with Paul-specific messaging; keep layout/UX patterns from the reference |

---

## 2. Design system (reference → adapt)

### 2.1 Color palette

- **Primary teal / cyan:** Hero gradients, icons, secondary CTAs, stat numerals, links on dark backgrounds  
- **Black:** High-contrast bands, primary solid buttons (`GET MY QUOTE` style), footer  
- **White / off-white:** Header, cards, text on dark sections  
- **Light gray:** Subtle section borders, form field backgrounds (optional)

**LifeAgentPaul:** Define CSS variables (e.g. `--color-brand`, `--color-surface-dark`) so teal can be tuned without refactoring components.

### 2.2 Typography

- **Family:** Clean sans-serif (e.g. **Montserrat**, **Open Sans**, or **DM Sans**)  
- **Hierarchy:** Display size for hero headline; H2 for section titles; body ~16–18px; tight line-height on banners, relaxed in long-form “About” copy  
- **Weights:** 400 body, 600–700 headings and buttons  

### 2.3 Global UI patterns

- Rounded corners on cards and buttons (match reference degree)  
- **Primary CTA:** Solid black button, white label, hover darkening or slight scale  
- **Secondary CTA:** Outline on light background; inverse on dark sections  
- **Icons:** Simple line or filled icons in brand teal for lists and process steps  
- **Spacing:** Generous vertical rhythm between sections; consistent horizontal padding (`clamp` for responsive gutters)

---

## 3. Page map (single-page marketing site)

Order matches the reference; anchor IDs support in-page nav and footer links.

| # | Section | Anchor suggestion |
|---|---------|-------------------|
| 1 | Header (sticky optional) | `#top` |
| 2 | Hero + lead form | `#quote` |
| 3 | Value proposition banner | `#value` |
| 4 | Life insurance features | `#life` |
| 5 | Partner logo bar 1 | `#carriers` |
| 6 | Health insurance features | `#health` |
| 7 | Partner logo bar 2 | *(same block or `#carriers-2`)* |
| 8 | Lifestyle / emotional | `#why-us` |
| 9 | Agent spotlight + quote card | `#agent` |
| 10 | Mid-page CTA (teal gradient) | `#get-started` |
| 11 | “Taking insurance to the next level” (3-column value grid) | `#benefits` |
| 12 | About + image collage | `#about` |
| 13 | Statistics band | `#stats` |
| 14 | How it works (3 steps) | `#how-it-works` |
| 15 | Footer | `#contact` |

---

## 4. Component-by-component specification

### 4.1 Header (`SiteHeader`)

**Layout**

- **Left:** Logo mark + wordmark “LifeAgentPaul” (or logo + tagline)  
- **Center or right:** Nav links — Home, About Us, Services, Contact Us (adjust labels to final IA)  
- **Far right:** Teal **“Get a Quote”** button → scroll to `#quote` or open quote modal  

**Behavior**

- Optional **sticky** header on scroll with subtle shadow  
- **Mobile:** Hamburger menu; full-screen or slide-down panel; CTA remains visible in header or fixed bottom bar (decision in QA)  

**Assets**

- SVG logo (scalable); provide dark-on-light variant for header  

**Acceptance**

- Keyboard navigable; focus states visible; skip link to main content  

---

### 4.2 Hero (`HeroSection`)

**Layout (desktop)**

- **Background:** Teal-to-cyan gradient (full width)  
- **Left column:**  
  - **H1:** e.g. “A New Era of Health and Life Insurance” → **replace with Paul-specific headline**  
  - **Subhead:** 1–2 sentences value proposition  
  - **Bullets:** 3–5 items with teal checkmarks (e.g. Fast & easy, Competitive rates, Free consultation — final copy TBD)  
  - **Trust strip:** Row of “as seen in” or media logos (Forbes, Yahoo Finance, MSN style) — **only if licensed / accurate for Paul**  

**Right column**

- **Card:** White panel, shadow, padding  
- **Title:** “GET YOUR FREE QUOTE” (or brand casing per style guide)  
- **Form fields (reference + recommended):**  
  - Full name (required)  
  - Email (required, validated)  
  - Phone (required, mask optional)  
  - Zip code (required; US format)  
  - Coverage type (select: Term Life, Whole Life, Health, Medicare, Other — **finalize options with Paul**)  
- **Submit:** Black button — “GET MY QUOTE” / “GET MY FREE QUOTE”  

**Behavior**

- Client-side validation with accessible error messages  
- Submit → API route or third-party (see §8)  
- Success: inline thank-you or redirect to thank-you page  

**Responsive**

- Stack: headline + bullets first, form second (or form first on mobile if conversion priority — A/B later)  

---

### 4.3 Value proposition banner (`ValueBanner`)

**Visual:** Full-width black band  

**Content**

- **Headline:** “No app fees. No broker fees. We do the work for you.” (adapt for Paul’s actual model)  
- **Subline:** One sentence expansion  
- **Link:** “Learn More” → scroll to `#about` or dedicated fees page  

**Acceptance**

- Sufficient color contrast (WCAG AA for text on black)  

---

### 4.4 Life insurance feature block (`FeatureSplitLife`)

**Layout:** Two columns  

**Left**

- **H2:** “Protection that Matters Most”  
- Body paragraph  
- **Buttons:** Outline “Learn More” (→ `#life` detail or anchor); solid black “Get a Life Quote” (→ form with life pre-selected or `#quote`)  

**Right**

- Vertical list: Term, Whole, Final expense, etc., each with small icon + label  

**Responsive:** Single column; image/list under text if icons are decorative only  

---

### 4.5 Partner logo bar — row 1 (`CarrierMarquee` variant A)

**Visual:** Black background, logos in white or monochrome  

**Content:** Carrier logos (Aetna, Humana, Ethos, etc.) — **use only carriers Paul is appointed with; obtain logo usage rights**  

**Behavior (optional enhancement)**

- CSS marquee / infinite scroll with `prefers-reduced-motion: reduce` → static wrap  

---

### 4.6 Health insurance feature block (`FeatureSplitHealth`)

Mirror §4.4 with mirrored or alternate layout for visual variety  

**H2 example:** “Comprehensive Health Coverage. Simplified.”  

**CTA:** “Get a Health Quote”  

**Right:** List items (network breadth, plan types, Medicare, etc.)  

---

### 4.7 Partner logo bar — row 2 (`CarrierMarquee` variant B)

Second set of carriers (Cigna, UnitedHealthcare, etc.) — same technical requirements as §4.5  

---

### 4.8 Lifestyle section (`LifestyleSplit`)

**Layout:** Image left, copy right (swap on mobile if needed)  

**Image:** High-quality lifestyle (family, security, freedom) — **replace with licensed stock or Paul-provided photography**  

**Copy**

- **H2:** e.g. “Life is full of surprises. Be ready for them all.” (reference) / align with brand voice  
- Paragraph + “Learn More” → `#about` or blog  

---

### 4.9 Agent / testimonial section (`AgentSpotlight`)

**Layout:** Copy left; image right  

**Copy**

- **H2:** “Personalized Insurance. Full-service.” (fix grammar vs reference)  
- Supporting paragraph about 1:1 service  

**Image:** Professional portrait of **Paul** (consistent crop, high resolution)  

**Quote card:** Black box overlapping image bottom (or below on mobile) with short mission quote or testimonial in white type  

**Acceptance**

- Quote attributable; no fabricated reviews  

---

### 4.10 Mid-page CTA (`MidPageCta`)

**Background:** Teal gradient (can echo hero)  

**Content:** Short punchy headline + **“Get Started”** → `#quote`  

**Centered** text and button  

---

### 4.11 Three-column value grid (`ValuePillars`)

**H2:** “Taking Insurance to the Next Level”  

**Three columns:** Each with **teal circle icon** (shield, document, person — or custom), title, short body  

**Use case:** Differentiators (advocacy, technology, ongoing support) — **Paul-specific bullets**  

---

### 4.12 About section (`AboutCollage`)

**Left:** **H2:** “Insurance Elevated Pro” → **rebrand to “Life Agent Paul” / Paul’s legal entity name**  
- Several paragraphs: story, licensing, states served, mission  

**Right:** Collage of 3–4 images (family, meeting, lifestyle) — grid or masonry  

**CTA:** “Learn More” if a longer About page exists  

---

### 4.13 Statistics band (`StatsBar`)

**Background:** Black  

**H2 (optional):** “We’re Good with Numbers.”  

**Three stats (example from reference):**

| Stat | Label |
|------|--------|
| 15k+ | Clients served (or **use Paul’s real metrics** — do not invent) |
| 700+ | Agents / partners (if accurate for Paul’s upline or network) |
| 30+ | Carriers represented |

**Rule:** If Paul is solo, replace with metrics that are honest (years experience, families protected, carriers, etc.)  

---

### 4.14 How it works (`HowItWorks`)

**H2:** “Protect your loved ones in 3 simple steps.”  

**Three steps:** Each with teal circular icon, step title, one-line description  

**Example flow:** Contact → Compare options → Enroll / Get covered  

---

### 4.15 Footer (`SiteFooter`)

**Background:** Black  

**Columns**

- Logo + short bio / disclaimer  
- Quick links (mirror header + Privacy, Terms)  
- Contact: phone (click-to-call), email, address / service area  
- Social icons (only profiles that exist and are maintained)  

**Bottom bar:** Copyright © year LifeAgentPaul.com · Privacy Policy · Terms of Service  

**Legal:** Insurance licensing disclosure by state as required; “not affiliated with CMS” etc. if Medicare — **compliance review before launch**  

---

## 5. Cross-cutting features

### 5.1 Forms & lead capture

- **Hero form** is the primary conversion surface  
- Field-level validation; spam protection (honeypot + optional Turnstile/reCAPTCHA)  
- Consent checkbox if required for SMS/email marketing (TCPA/CAN-SPAM)  
- Store leads: database, CRM (HubSpot, GoHighLevel, etc.), or email notification  

### 5.2 SEO

- Semantic HTML (`header`, `main`, `section`, `footer`; one `h1`)  
- Meta title/description; Open Graph image (Paul or brand graphic)  
- `robots.txt`, `sitemap.xml` if multi-page later  
- LocalBusiness / InsuranceAgent structured data if NAP is stable  

### 5.3 Performance

- Lazy-load below-fold images; WebP/AVIF with fallbacks  
- Preload critical font weights only  
- Lighthouse targets: performance ≥ 90 on mobile for marketing page (reasonable budget)  

### 5.4 Accessibility

- WCAG 2.1 AA target  
- Form labels associated with inputs; errors announced to screen readers  
- Pause/stop for any auto-scrolling carousels; respect `prefers-reduced-motion`  

### 5.5 Analytics

- Privacy-friendly analytics (Plausible, Fathom, or GA4 with consent banner if EU traffic)  
- Events: `quote_submit`, `cta_click` (with section id), `phone_click`  

---

## 6. Backend & integrations (decision checklist)

| Item | Options |
|------|---------|
| Hosting | Vercel, Netlify, Cloudflare Pages, traditional VPS |
| Framework | Next.js, Astro, or static HTML/CSS if scope stays one page |
| Forms | Serverless function + Resend/SendGrid; Supabase insert; Zapier |
| CRM | Email alert first; CRM webhook second |
| Domain | DNS for lifeagentpaul.com; SSL |

---

## 7. Content inventory (deliverables for launch)

- [ ] Final hero headline, subhead, bullet list  
- [ ] All section headlines and body copy (Paul voice)  
- [ ] Approved carrier logos + list of appointments  
- [ ] Paul bio, headshot, quote for agent section  
- [ ] Real stats or revised stat labels  
- [ ] Privacy Policy & Terms (legal template reviewed)  
- [ ] Licensing / compliance footer text  
- [ ] Optional: media logos only with permission  

---

## 8. Build phases (suggested)

1. **Foundation:** Repo, design tokens, layout shell, header/footer  
2. **Hero + form** (UI + validation + submit stub)  
3. **Remaining sections** in order (static content)  
4. **Marquees / motion** with reduced-motion fallbacks  
5. **Backend:** Persist leads, notifications, spam control  
6. **SEO, analytics, compliance** pass  
7. **Responsive QA** (breakpoints: 360, 768, 1024, 1280+)  
8. **Content swap** from placeholder to final Paul copy and assets  

---

## 9. Reference vs. LifeAgentPaul

| Reference element | LifeAgentPaul action |
|-------------------|----------------------|
| “Insurance Elevated Pro” naming | Replace with Paul’s DBA/legal name everywhere |
| Generic stats | Use verifiable numbers only |
| Stock agent photo | Paul’s portrait |
| Carrier logos | Only appointed carriers; legal approval |
| Hero trust logos | Include only if factually correct and permitted |

---

*This spec is derived from the reference landing structure and the full-page capture provided for the project. Adjust copy, metrics, and compliance to Paul’s actual business before production launch.*
