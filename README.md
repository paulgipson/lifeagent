This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Configuration (environment variables)

Create `.env.local` (git-ignored) and set what you use. Everything is optional; the site degrades gracefully.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CAL_LINK` | Cal.com event path, e.g. `paul-gipson/15min`. Enables the inline booking calendar on `/thank-you` (prefilled with the lead's name, email, phone). |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms key for lead emails (falls back to the key in `lib/web3forms.ts`). |
| `LEAD_WEBHOOK_URL` | Server-side webhook (Zapier, Make, GoHighLevel, etc.). Every lead is POSTed here as JSON by `/api/quote`. |
| `LEAD_WEBHOOK_SECRET` | Optional; sent as `X-Lead-Secret` header with the webhook. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID. Events: `form_start`, `form_submit`, `form_error`, `wizard_step`, `wizard_complete`, `lead`, `phone_click`, `sms_click`, `cta_click`, `booking_open`, `booking_complete`. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID (`Lead` and `Schedule` standard events are fired). |

## Content

- Marketing copy: `lib/content.ts` · product pages: `lib/products.ts` · wizard: `lib/quoteWizardContent.ts` · thank-you: `lib/thankYouPage.ts`
- Licensed states (drives form dropdowns, disclaimers, trust strip): `lib/licenses.ts`
- Testimonials are intentionally empty until you have real, attributable reviews — add them in `lib/content.ts` (`testimonialsSection.items`) and `lib/thankYouPage.ts`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
