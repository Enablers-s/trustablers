# Trustablers website

Static website for **Trustablers**, the corporate law firm of the Enabler-S group.

No build step: open `index.html`. Layout:

```
index.html            home page
practice-areas.html   the six practice areas in detail (served at /practice-areas)
about.html            about the firm (served at /about)
contact.html          enquiry form, contact details and FAQ (served at /contact)
404.html              not-found page
css/
  styles.css          all styles (tokens, header, footer, every page)
js/
  main.js             every page: sister-site links, menu, dropdown, reveal-on-scroll, enquiry form
  lead-form.js        sends enquiries to the Google Form (contact page only)
assets/               logos and media
fonts/                self-hosted web fonts (open licence)
robots.txt, sitemap.xml, vercel.json
```

The header, footer and WhatsApp button are repeated in each HTML page; when you change one, change all four.

## Links to Enabler-S and sister brands
All addresses are in the `LIVE` / `LOCAL` lists at the top of `js/main.js`. Locally the repos are expected side by side:

```
enabler/
  webpage1/      Enabler-S (repo: enabler-s)
  bizablers/     finablers/     trustablers/     brandora/     techablers/
```

When a brand gets its own domain, change its line in `LIVE`.

## Where enquiries go
The contact page form posts to the Google Form **Bizabler-S website enquiries** in the enablers26@gmail.com Google
account (shared with the Bizabler-S site). Trustablers enquiries have `Trustablers: contact page` in the **Source**
column of the linked Google Sheet (Forms → Responses → View in Sheets). To give Trustablers its own form, change the
address and question IDs in `js/lead-form.js`.
WhatsApp buttons go straight to +971 54 558 6455; nothing from them is stored.

Practice area buttons link to `contact.html?area=<id>`, which pre-selects that area in the form.

## Deploying on Vercel
Import this repo in Vercel as a new project named **`trustablers`**: Framework preset **Other**, no build command, no output directory (the repo root is the site). Nothing else to configure; there are no environment variables.

| Site | GitHub repo | Vercel project name | Live address |
|---|---|---|---|
| Enabler-S | Enablers-s/enabler-s | `enabler-s` | https://enabler-s.vercel.app |
| Bizabler-S | Enablers-s/bizablers | `bizablers` | https://bizablers.vercel.app |
| Finablers | Enablers-s/finablers | `finablers` | https://finablers.vercel.app |
| Trustablers | Enablers-s/trustablers | `trustablers` | https://trustablers.vercel.app |
| Brandora | Enablers-s/brandora | `brandora-s` (brandora.vercel.app is taken) | https://brandora-s.vercel.app |

If this site ends up with a different address (for example a custom domain), update the `canonical`/`og:` tags in each page, robots.txt and sitemap.xml.

Already set up for production:
- `vercel.json`: security headers (Content-Security-Policy allowing only this site's own scripts, fonts and media, plus posting enquiries to Google Forms; clickjacking protection; nosniff; referrer and permissions policies) and long caching for fonts and media
- `.vercelignore`: keeps source files and notes out of the published site
- `404.html`: branded "page not found" page
- `robots.txt`, `sitemap.xml`, and share-preview tags (`og:` / Twitter) with `assets/og.jpg`
