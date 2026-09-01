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
assets/js/*.js             five small scripts, listed below
assets/img/                logo, favicon, hero scene, dashboard picture, OG card
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
| `site.js` | sticky header, mobile menu, scroll reveals, age-stage selector, method wheel, testimonial carousel, stat counters, newsletter, back-to-top |
| `activity-player.js` | the choice and memory games |
| `filters.js` | search and filter chips on the activity, journal and video lists |
| `article.js` | reading-progress bar and share button |
| `book-demo.js` | the booking wizard, slot scheduling and calendar files |

FAQs are `<details>` elements and need no JavaScript at all. The method wheel
falls back to a plain list of the five moves when scripting is off.

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

## The home hero artwork

The hero is a single wide illustration, `assets/img/hero-scene.webp`, whose
left half is open sky. From 1024px up it covers the whole hero and the copy sits
over that open half behind a soft wash of daylight; below that the hero stacks,
with the picture above the copy and cropped to the islands on phones.

To change the artwork, drop a file into `assets/img/` named `hero-scene.png`
(or `.webp` / `.jpg`) and rebuild — `tools/sections.mjs` (`HERO_ART`) picks up
the first one that exists, falling back to `hero.jpg`. Compose it like this one,
with the subject on the right and open sky on the left, so the headline has
somewhere quiet to sit; 16:9 keeps the hero's proportions.

`hero.jpg` is the supplied original, kept beside the optimised `.webp` the site
loads. `1.png`–`4.png` are the character cut-outs that were tried in the hero
and taken back out; nothing loads them.

## The age-stage cards

The four stage cards on the home page each carry a child illustration,
`assets/img/stage-discover.webp`, `stage-explore.webp`, `stage-build.webp` and
`stage-grow.webp` — transparent cut-outs of the supplied `1.png`–`4.png`,
keyed off their white backgrounds and cropped to the subject.

Each card is also the selector for the stage detail below it. To change a
picture, replace the file and keep the name; its aspect ratio is written into
the card markup by `STAGE_STYLE` in `tools/sections.mjs`, so update the `ratio`
there to match a differently shaped file.

## The parent-dashboard photo

The violet dashboard band on the home and parents pages gives its whole
right-hand side to a picture: from 1280px up the copy and the dashboard card
share the left column and the picture fills the band's full height, running out
to its right edge. Below 1280px the band stacks and the picture is dropped. It currently uses `assets/img/parent-child.webp`, a
transparent cut-out of a parent and child, cropped to the slot's portrait box.
`assets/img/parent-child.svg` is a flat illustration kept as the fallback.

To change the picture, drop a new one into `assets/img/` named
`parent-child.png` (or `.webp` / `.jpg`) and rebuild — `tools/sections.mjs`
picks up the first one that exists, preferring `.png`, then `.webp`, `.jpg`
and finally the illustration.

- A **cut-out with a transparent background** (PNG or WebP) sits best on the
  violet; a photo with its own background will show that background as a
  rectangle.
- The slot is sized to the current cut-out's shape (1255 × 1280) and uses
  `object-fit: contain`, so the whole picture is always shown — a differently
  shaped file keeps the same column width and simply sits shorter or taller in
  it, never cropped. Change `aspect-ratio` on `.dash-band__photo img` to match a
  new picture's own proportions.
- The picture is anchored to the bottom right of its panel, so a taller or
  shorter file still sits on the band's bottom edge.

The two Recent Activity rows in the same card use the app's own artwork,
`assets/img/activity-stories.webp` and `assets/img/activity-self-help.webp` —
128 x 128 square crops of the full cards kept beside them as
`activity-stories-card.png` and `activity-self-help-card.png`. Swap a row's
picture by pointing its `art` path at another file in `dashboardPreview()`
(`tools/sections.mjs`); the tile crops whatever it is to a rounded square.

## Icons

Every mark on the site is an inline SVG from `tools/icons.mjs` — one 24 x 24
grid, a 1.75 stroke, round caps and joins, no icon font and no network request.
`icon(name)` returns the markup; unknown names throw at build time, so a typo
never ships as a blank.

Nothing in the page chrome is an emoji. Activities, journal topics and the five
method moves each name an icon (`icon:` in `tools/content-activities.mjs`,
`TOPIC_ICON` and `METHOD_STYLE` in `tools/sections.mjs`), and marks are set in
one of two ways:

- `.tile--duo` — the hue washed across a rounded tile, a hairline ring, a
  highlight in the top left and the mark in the family's ink. Used wherever an
  icon labels a card.
- `.cover` — a larger plate for card artwork, with the mark on a white
  medallion in the middle.

The emoji that remain are inside the activities themselves — the apples,
animals and faces a child chooses between, and the confetti when they get one
right. Those are content, not interface, and they are meant to be picture-first.

## Design system

`assets/css/etern.css` holds the whole thing: colour tokens in `oklch`, the
Outfit / Plus Jakarta Sans type scale, and component classes (`.btn`, `.card`,
`.pill`, `.section`, `.dash`, `.wheel`, `.player`, `.wizard`…).

Colour works through **seven hue families** — violet, blue, teal, green, amber,
orange and pink. Each family carries three roles:

| token | role |
| --- | --- |
| `--<hue>` | the saturated fill, for solid blocks and buttons |
| `--<hue>-soft` | the pastel tint, for cards and icon tiles |
| `--<hue>-ink` | the same hue darkened until it reads as text on cream |

Put `.accent-violet`, `.accent-blue`, `.accent-teal`, `.accent-green`,
`.accent-amber`, `.accent-orange` or `.accent-pink` on a container and its
children pick the family up through `--accent-soft`, `--accent-ink` and
`--accent-solid`. `.card--tint`, `.tile--solid`, `.pill--solid`,
`.section--solid` all read those.

Which hue a program, activity category or journal topic gets is decided once in
`tools/sections.mjs` (`PROGRAM_HUE`, `CATEGORY_HUE`, `TOPIC_HUE`), so a program
keeps its colour everywhere it appears.

The only external request the pages make is the Google Fonts stylesheet. Drop
the two `<link rel="preconnect">` tags and the fonts stylesheet from
`tools/layout.mjs` if you want the site fully self-hosted — the CSS falls back
to a system sans stack.

## Notes on the content

Journal articles and the video library are marked `placeholder: true` in
`tools/content-etern.mjs`; they are sample copy waiting for the real thing. The
parent dashboard shows example figures. Programs, testimonials, contact details
and app-store links are the real ones.
