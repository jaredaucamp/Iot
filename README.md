# Extra Dimensions — Smart Utility Solutions Website

A complete marketing website for **Extra Dimensions**, the marketing and
installation partner of **Precision Meters** (smart water metering) and
**PUCo** (smart electricity metering) in South Africa.

The site targets property owners and managers of **complexes, blocks of
flats, estates and shopping centres**, and includes two lead-generation
forms:

1. **Book an Assessment** (`signup.html`) — for property owners/managers who
   want a smart water/electricity meter installation quote.
2. **Become an Installer** (`become-a-partner.html`) — for people who want to
   be trained and recruited as certified installers.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — services, benefits, target markets, how it works, FAQ |
| `water-meters.html` | Smart water meter solutions detail page |
| `electricity-meters.html` | Smart electricity meter solutions detail page |
| `become-a-partner.html` | Installer recruitment & training sign-up |
| `signup.html` | Free site assessment / installation lead form |
| `thank-you.html` | Confirmation page shown after a form submits (no-JS fallback) |

No build step, framework or dependencies — it's plain HTML, CSS and
JavaScript, so it can be hosted anywhere that serves static files.

## Running locally

Just open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

### Option A — Netlify (recommended, forms work with zero extra setup)

The forms already include `data-netlify="true"` and a hidden `form-name`
field, which is exactly what Netlify needs to auto-detect and capture form
submissions — no backend or third-party form service required.

1. Push this repo to GitHub (already done if you're reading this on the repo).
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project** → select this repo.
3. Build command: leave blank. Publish directory: `.` (already set in `netlify.toml`).
4. Deploy. Submissions to **Book an Assessment** and **Become an Installer**
   will appear under **Site settings → Forms** in your Netlify dashboard, and
   you can enable email notifications there (Site settings → Forms →
   Form notifications) so every new lead lands in your inbox.

### Option B — Any other static host (Vercel, GitHub Pages, cPanel, etc.)

The pages will work everywhere, but the built-in Netlify form capture only
works on Netlify. If you host elsewhere, swap the `<form>` tags in
`signup.html` and `become-a-partner.html` for a form service such as
[Formspree](https://formspree.io) (free tier available):

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

and remove the `data-netlify` / `netlify-honeypot` attributes (they're
harmless if left in, just unused).

## Branding

Colors, fonts and spacing are defined as CSS variables at the top of
`css/style.css` — update `--navy-800`, `--green-500`, `--blue-water`, etc. to
match your exact brand palette if it differs from the flyer.

Contact details, phone number and address are pulled from the Extra
Dimensions flyer and are set directly in the footer of every page — update
them in each HTML file if they ever change (a simple find-and-replace across
files works well here).

## Real photos

The current design uses icons and gradients in place of real site photos
(the flyer photos weren't available as image files). Swap in real
installation photos by adding them to the `assets/` folder and referencing
them from the hero sections and service cards for an even stronger, more
trustworthy first impression.

## Next steps worth considering

- Connect a real booking/calendar tool (e.g. Calendly) for the "Book a Free
  Site Assessment" CTA if you want instant scheduling instead of a callback.
- Add real customer logos/testimonials once you have a few completed
  installations to reference.
- Add Google Analytics or Plausible for traffic tracking.
- Register a custom domain (e.g. `www.extra-dimensions.co.za`) and point it
  at your hosting provider.
