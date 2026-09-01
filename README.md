# Etern Learning — website

The eternlearning.com marketing site as **plain static HTML, CSS and vanilla
JavaScript**. No framework, no bundler, no package manager, no third-party
runtime, no Lovable.

Open `index.html` in a browser and the whole site works.

---

## What's here

```
index.html                 home
about.html                 about Etern
programs.html              programs index
programs/<slug>.html       4 program pages
how-it-works.html          method + weekly rhythm + FAQ
activities.html            filterable activity library
activities/<slug>.html     9 playable activity pages
parents.html               for parents + sample dashboard
journal.html               journal index
journal/<slug>.html        6 articles
videos.html                video library
book-demo.html             6-step demo booking + contact
privacy.html  terms.html   legal
404.html                   not found

assets/css/etern.css       the entire design system, one file
assets/js/*.js             five small ES modules, listed below
assets/img/                logo, favicon, hero artwork, OG card
robots.txt  sitemap.xml

tools/                     the generator that produced the HTML above
```

## Running it

Any static host works — GitHub Pages, Netlify, Cloudflare Pages, S3, nginx,
or a folder on a USB stick. There is no build step to run first.

Locally:

```sh
python3 -m http.server 8000     # then open http://localhost:8000
```

Configure your host's 404 handler to serve `404.html`.

## Editing content

Page copy lives in two files:

- `tools/content-etern.mjs` — brand details, programs, age stages, method
  steps, testimonials, journal posts, videos, FAQs
- `tools/content-activities.mjs` — the playable activities and their rounds

Edit those, then regenerate the HTML:

```sh
node tools/build.mjs
```

That is the only command in the project. It uses Node's standard library only
— there is no `npm install`, no lockfile and no `node_modules`. Node 18+.

The generator is a convenience, not a dependency: the committed `.html` files
are the site. Edit them by hand instead if you prefer, and ignore `tools/`.

### How the generator is put together

| File | Role |
| --- | --- |
| `tools/build.mjs` | writes every page and `sitemap.xml` |
| `tools/layout.mjs` | `<head>`, header, footer, page hero, FAQ, demo CTA |
| `tools/sections.mjs` | sections and cards used on more than one page |
| `tools/icons.mjs` | the inline SVG icon set |
| `tools/pages/*.mjs` | one function per page |

## JavaScript

Every page is complete and readable with JavaScript disabled. The scripts only
add behaviour on top:

| File | Adds |
| --- | --- |
| `site.js` | sticky header, mobile menu, scroll reveals, step switcher |
| `hero-scene.js` | tilt / drag / parallax on the home hero artwork |
| `activity-player.js` | the choice and memory games |
| `filters.js` | search and filter chips on the activity, journal and video lists |
| `article.js` | reading-progress bar and share button |
| `book-demo.js` | the booking wizard, slot scheduling and calendar files |

Accordions (age stages, FAQs) are `<details>` elements and need no JavaScript
at all.

## The booking form

`book-demo.html` has no server behind it. When the wizard is completed it hands
the finished request to WhatsApp or email, and offers a Google Calendar link
and a downloadable `.ics`.

To POST it somewhere instead (Formspree, Basin, a serverless function…), set
the endpoint on the form in `tools/pages/book-demo.mjs` and rebuild:

```html
<form data-wizard data-endpoint="https://example.com/your-endpoint" …>
```

It sends `application/json` and falls back to the WhatsApp/email handoff if the
request fails.

Demo slots are published in India Standard Time (fixed UTC+5:30) and rendered
in the visitor's own time zone.

## Design system

`assets/css/etern.css` holds the whole thing: colour tokens in `oklch`, the
Fraunces/Plus Jakarta Sans type scale, and component classes (`.btn`, `.card`,
`.pill`, `.section`, `.stage`, `.player`, `.wizard`…). Accent colours are
applied by putting `.accent-primary`, `.accent-sky`, `.accent-leaf`,
`.accent-sun` or `.accent-coral` on a container; children read them through
`--accent-soft`, `--accent-ink` and `--accent-solid`.

The only external request the pages make is the Google Fonts stylesheet. Drop
the two `<link rel="preconnect">` tags and the fonts stylesheet from
`tools/layout.mjs` if you want the site fully self-hosted — the CSS falls back
to a system serif and sans stack.

## Notes on the content

Journal articles and the video library are marked `placeholder: true` in
`tools/content-etern.mjs`; they are sample copy waiting for the real thing.
The parent dashboard on `parents.html` shows example data and says so. Programs,
testimonials, contact details and app-store links are the real ones.
