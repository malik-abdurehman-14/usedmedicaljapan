# Used Medical Equipment Japan — usedmedicaljapan.com

Next.js 16 (App Router, JavaScript) + Tailwind CSS v4 + shadcn/ui + Embla + Framer Motion.
Static site. The quote form saves requests to a Google Sheet through a Google Apps Script web app.

## Run locally
Requires Node.js 20 or newer.

    npm install
    cp .env.example .env.local   # then add the Apps Script URL
    npm run dev        # http://localhost:3000

## Quote form → Google Sheets
1. Create a Google Sheet, open **Extensions → Apps Script**, paste in `google-apps-script/quote-form.gs`,
   set `NOTIFY_EMAIL` at the top (or `""` for no emails) and save.
2. **Deploy → New deployment → Web app**, Execute as **Me**, Who has access **Anyone**. Approve the
   permissions (on the "unverified app" screen: Advanced → Go to project → Allow — it's your own script).
3. Copy the Web app URL (ends in `/exec`) into `.env.local` and your host's environment variables:

       NEXT_PUBLIC_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXX/exec

4. Restart / redeploy (the value is baked in at build time) and send a test request.

After editing the script use **Manage deployments → Edit → New version** to keep the same URL.
Without the variable, the form falls back to opening the visitor's email app; WhatsApp always works.

Production check:

    npm run build
    npm start

## Deploy
- **Vercel (recommended):** push to GitHub → import repo on vercel.com → Deploy. No settings needed.
- **Netlify:** import repo; Netlify auto-detects Next.js.
- Then point usedmedicaljapan.com (Namecheap DNS) to the host.

## Where to edit content
| File | What |
|---|---|
| `src/data/site.js` | Email, phone, WhatsApp number, address (placeholders!) |
| `src/data/equipment.js` | 9 products: text, specs, brands, FAQs, images |
| `src/data/content.js` | Process steps, services, FAQs, company profile, Japanese page text |
| `public/images/equipment/` | Images (WebP) |

Add a new product: add one object to `equipment.js` — the page, menu, sitemap and footer update automatically.

## Structure
    src/app/(site)/            English pages (home, equipment, [slug], services, how-it-works, about, contact)
    src/app/ja/                Japanese page (equipment purchase from Japanese hospitals)
    src/components/ui/         shadcn components (JS)
    src/components/layout/     Header, footer, WhatsApp button
    src/components/shared/     Section, headings, timeline, FAQ, breadcrumbs, seal, CTA
    src/components/equipment/  Tiles, grid, slider, gallery, spec/brand tables, sub-nav
    src/components/home/       Hero, fact strip, why Japan
    src/components/forms/      Quote form (Google Sheet via Apps Script, email fallback, WhatsApp)

## Before launch
- Replace all `[placeholder]` values (site.js, content.js, About page).
- iStock images (angiography, c-arm*, x-ray-dr, mri-render) need a licence or replacement — two are watermarked.
- Add the site to Google Search Console and submit /sitemap.xml.
