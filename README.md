# Used Medical Equipment Japan — usedmedicaljapan.com

Next.js 16 (App Router, JavaScript) + Tailwind CSS v4 + shadcn/ui + Embla + Framer Motion.
Static site, deployed on Netlify from `main`. The quote form sends inquiries through a Google Apps
Script web app (Google Sheet + email + WhatsApp), protected by Google reCAPTCHA.

## Run locally
Requires Node.js 20 or newer.

    npm install
    cp .env.example .env.local   # then add the Apps Script URL (and reCAPTCHA site key)
    npm run dev        # http://localhost:3000

## Quote form → Google Sheet + WhatsApp
"Send inquiry" posts to a Google Apps Script web app, which checks the CAPTCHA, saves the inquiry
to a Google Sheet and forwards it to the company's WhatsApp (and email). "Send on WhatsApp" opens the
visitor's own WhatsApp with the request filled in.

1. Create a Google Sheet, open **Extensions → Apps Script**, paste in `google-apps-script/quote-form.gs`,
   set `NOTIFY_EMAIL` at the top (or `""` for no emails) and save.
2. **Deploy → New deployment → Web app**, Execute as **Me**, Who has access **Anyone**. Approve the
   permissions (on the "unverified app" screen: Advanced → Go to project → Allow — it's your own script).
3. Put the Web app URL (ends in `/exec`) in `.env.production` (live site) and `.env.local` (local):

       NEXT_PUBLIC_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXX/exec

After editing the script use **Manage deployments → Edit → New version** to keep the same URL.
Without the URL, the form falls back to opening the visitor's email app.

### WhatsApp notification (CallMeBot)
1. On the phone with the receiving WhatsApp number, add the CallMeBot number shown on
   https://www.callmebot.com/blog/free-api-whatsapp-messages/ and send it: `I allow callmebot to send me messages`
2. CallMeBot replies with an API key.
3. In Apps Script → **Project Settings → Script properties**, add `CALLMEBOT_PHONE` (digits only,
   e.g. `819061170042`) and `CALLMEBOT_APIKEY`. Each inquiry then arrives as a WhatsApp message.

### CAPTCHA (Google reCAPTCHA v2)
1. At https://www.google.com/recaptcha/admin create a **reCAPTCHA v2 → "I'm not a robot" Checkbox** key,
   with the domains `usedmedicaljapan.com`, the Netlify domain and `localhost`.
2. Put the **site key** in `.env.production` (and `.env.local`) as `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`.
3. Put the **secret key** in Apps Script → Script properties as `RECAPTCHA_SECRET`.

Both keys are needed: the site key shows the check, the secret key makes the script reject requests without it.

The script contacts Google (reCAPTCHA) and CallMeBot, so it needs the "Connect to an external service"
permission. If inquiries fail with "could not be sent", run any function (e.g. `doGet`) once from the
Apps Script editor and approve the permissions.

Production check:

    npm run build
    npm start

## Deploy
- **Netlify (current):** every push to `main` deploys automatically. Build settings come from
  `.env.production`, so nothing needs to be set in the Netlify dashboard.
- **Domain:** usedmedicaljapan.com still serves the old WordPress site. Point its DNS (Namecheap) to
  Netlify when ready to launch, and add the domain to the reCAPTCHA key.

## Where to edit content
| File | What |
|---|---|
| `src/data/site.js` | Email, phone, WhatsApp number, address |
| `src/data/equipment.js` | 9 imaging category pages: text, specs, brands, FAQs, images |
| `src/data/equipment-range.js` | Full equipment range (names by group): home, equipment page and quote form dropdown |
| `src/data/equipment.ja.js` | Japanese text for the 9 products |
| `src/data/content.js` / `content.ja.js` | Process steps, services, FAQs, company profile (English / Japanese) |
| `src/views/*` | Page layouts with their English and Japanese copy side by side |
| `public/images/equipment/` | Images (WebP) |

Add a new product: add one object to `equipment.js` — the page, menu, sitemap and footer update automatically.

## Structure
    src/app/(site)/            English routes (home, equipment, [slug], services, how-it-works, about, contact)
    src/app/ja/                Japanese site: one buyback landing page at /ja for sellers in Japan
    src/views/                 One component per page (ja-landing-page.jsx is the Japanese page)
    src/components/ui/         shadcn components (JS)
    src/components/layout/     Header, footer, WhatsApp button
    src/components/shared/     Section, headings, timeline, FAQ, breadcrumbs, seal, CTA
    src/components/equipment/  Tiles, grid, slider, gallery, spec/brand tables, sub-nav
    src/components/home/       Hero, fact strip, why Japan
    src/components/forms/      Quote form (Apps Script → Sheet, email, WhatsApp; reCAPTCHA; email fallback)
    google-apps-script/        The Apps Script code — paste into the Sheet's Apps Script after any change

## Before launch
- Confirm the mailbox info@usedmedicaljapan.com receives mail.
- iStock images need a licence or replacement; angiography.webp is watermarked and still in use.
- Add the site to Google Search Console and submit /sitemap.xml.
