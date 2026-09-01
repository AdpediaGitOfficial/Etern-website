/**
 * Page shell: <head>, header, footer and the shared page furniture.
 *
 * Everything here produces plain HTML strings. The generated pages have no
 * client framework — the only JavaScript is the small progressive-enhancement
 * bundle in assets/js.
 */

import { icon } from "./icons.mjs";
import { BRAND } from "./content-etern.mjs";

export const SITE_URL = "https://www.eternlearning.com";

export const NAV_LINKS = [
  { to: "about.html", label: "Explore" },
  { to: "programs.html", label: "Programs" },
  { to: "how-it-works.html", label: "How It Works" },
  { to: "activities.html", label: "Activities" },
  { to: "parents.html", label: "For Parents" },
  { to: "journal.html", label: "Journal" },
];

const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { to: "about.html", label: "About Etern" },
      { to: "how-it-works.html", label: "How It Works" },
      { to: "videos.html", label: "Video Library" },
      { to: "journal.html", label: "Etern Journal" },
    ],
  },
  {
    title: "Learning",
    links: [
      { to: "programs.html", label: "Programs" },
      { to: "activities.html", label: "Activities" },
      { to: "parents.html", label: "For Parents" },
      { to: "book-demo.html", label: "Book a Free Demo" },
    ],
  },
];

/** Escape text destined for an HTML text node or a double-quoted attribute. */
export function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Resolve a site-relative path for a page nested `depth` folders deep. */
export function url(to, depth = 0) {
  if (/^(https?:|mailto:|tel:|#)/.test(to)) return to;
  return "../".repeat(depth) + to;
}

/* ------------------------------------------------------------------ shell */

function head({ title, description, canonical, depth, extraHead = "" }) {
  const p = "../".repeat(depth);
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="Etern Learning">
<meta name="theme-color" content="#f9f6ef">
<link rel="canonical" href="${esc(SITE_URL + canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Etern Learning">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(SITE_URL + canonical)}">
<meta property="og:image" content="${esc(SITE_URL)}/assets/img/etern-og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(SITE_URL)}/assets/img/etern-og.png">
<link rel="icon" href="${p}assets/img/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="${p}assets/img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&amp;family=Plus+Jakarta+Sans:wght@400..800&amp;display=swap">
<link rel="stylesheet" href="${p}assets/css/etern.css">
${extraHead}`;
}

/* ----------------------------------------------------------------- header */

function logo(depth) {
  return `<a class="logo" href="${url("index.html", depth)}" aria-label="Etern Learning home">
  <img src="${url("assets/img/etern-mark.svg", depth)}" alt="" width="44" height="44">
  <span class="logo-word"><b>etern</b><span>Learning</span></span>
</a>`;
}

function header(active, depth) {
  const links = NAV_LINKS.map(
    (l) =>
      `<a href="${url(l.to, depth)}"${l.to === active ? ' aria-current="page"' : ""}>${l.label}</a>`,
  ).join("\n        ");

  return `<header class="site-header" data-site-header>
  <nav class="shell site-nav" aria-label="Main">
    ${logo(depth)}
    <div class="nav-links">
        ${links}
    </div>
    <div class="nav-actions">
      <a class="btn btn--ghost" href="${url("book-demo.html", depth)}#contact">Talk to us</a>
      <a class="btn btn--primary" href="${url("book-demo.html", depth)}">Book a Free Demo</a>
    </div>
    <button type="button" class="nav-toggle" data-menu-open aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
      ${icon("menu")}
    </button>
  </nav>
</header>

<div class="mobile-menu" id="mobile-menu" data-menu hidden>
  <div class="mobile-menu__top">
    ${logo(depth)}
    <button type="button" class="nav-toggle" data-menu-close aria-label="Close menu">${icon("x")}</button>
  </div>
  <div class="mobile-menu__links">
    ${NAV_LINKS.map((l) => `<a href="${url(l.to, depth)}">${l.label}</a>`).join("\n    ")}
  </div>
  <div class="mobile-menu__cta">
    <a class="btn btn--primary btn--lg btn--block" href="${url("book-demo.html", depth)}">Book a Free Demo</a>
    <a class="btn btn--outline btn--lg btn--block" href="${BRAND.whatsapp}" target="_blank" rel="noreferrer noopener">Chat on WhatsApp</a>
  </div>
</div>`;
}

/* ----------------------------------------------------------------- footer */

function footer(depth) {
  const columns = FOOTER_COLUMNS.map(
    (col) => `<div class="stack stack-4">
        <h2 class="label">${col.title}</h2>
        <ul class="footer-links">
          ${col.links.map((l) => `<li><a href="${url(l.to, depth)}">${l.label}</a></li>`).join("\n          ")}
        </ul>
      </div>`,
  ).join("\n\n      ");

  const socials = [
    ["instagram", BRAND.social.instagram, "Instagram"],
    ["facebook", BRAND.social.facebook, "Facebook"],
    ["linkedin", BRAND.social.linkedin, "LinkedIn"],
    ["youtube", BRAND.social.youtube, "YouTube"],
  ]
    .map(
      ([name, href, label]) =>
        `<a href="${href}" target="_blank" rel="noreferrer noopener" aria-label="${label}">${icon(name)}</a>`,
    )
    .join("\n          ");

  return `<footer class="site-footer">
  <div class="shell">
    <div class="footer-grid">
      <div class="stack stack-5">
        ${logo(depth)}
        <p class="small leading-relaxed muted" style="max-width:20rem">
          A little curiosity today becomes a lifetime of possibilities. Early learning for children
          aged 3–7, built on play, creativity and confidence.
        </p>
        <div class="social-row">
          ${socials}
        </div>
      </div>

      ${columns}

      <div class="stack stack-4">
        <h2 class="label">Contact</h2>
        <ul class="contact-list">
          <li>${icon("phone")}<a href="${BRAND.phoneHref}">${BRAND.phone}</a></li>
          <li>${icon("mail")}<a href="mailto:${BRAND.email}">${BRAND.email}</a></li>
          <li>${icon("map-pin")}<span class="leading-relaxed">${esc(BRAND.address)}</span></li>
        </ul>
        <div class="store-links">
          <a href="${BRAND.apps.ios}" target="_blank" rel="noreferrer noopener">App Store</a>
          <a href="${BRAND.apps.android}" target="_blank" rel="noreferrer noopener">Google Play</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© <span data-year>${new Date().getFullYear()}</span> Etern Learning Private Limited. All rights reserved.</p>
      <nav aria-label="Legal">
        <a href="${url("privacy.html", depth)}">Privacy Policy</a>
        <a href="${url("terms.html", depth)}">Terms &amp; Conditions</a>
        <a href="${BRAND.whatsapp}" target="_blank" rel="noreferrer noopener">WhatsApp</a>
      </nav>
    </div>
  </div>
</footer>`;
}

/* ------------------------------------------------------------ public API */

/**
 * Render one complete HTML document.
 *
 * @param {object} page
 * @param {string} page.title
 * @param {string} page.description
 * @param {string} page.canonical   path portion of the canonical URL
 * @param {string} page.body        page markup (goes inside <main>)
 * @param {string} [page.active]    nav link to mark as current
 * @param {number} [page.depth]     folder depth of the output file
 * @param {string[]} [page.scripts] extra scripts, relative to the site root
 * @param {string} [page.extraHead]
 * @param {string} [page.beforeMain]
 */
export function renderPage(page) {
  const depth = page.depth ?? 0;
  const p = "../".repeat(depth);
  const scripts = ["assets/js/site.js", ...(page.scripts ?? [])]
    .map((src) => `<script src="${p}${src}" defer></script>`)
    .join("\n");

  return `<!doctype html>
<html lang="en" class="no-js">
<head>
${head({ ...page, depth })}
<script>document.documentElement.classList.remove("no-js");</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${page.beforeMain ?? ""}
<div class="page">
${header(page.active ?? "", depth)}

<main id="main">
${page.body}
</main>

${footer(depth)}
</div>
${scripts}
</body>
</html>
`;
}

/* ------------------------------------------------------- shared sections */

export function pageHero({ eyebrow, title, description, actions = "" }) {
  return `<section class="page-hero">
  <div class="blob" style="width:24rem;height:24rem;background:var(--primary-soft);left:-5rem;top:-6rem"></div>
  <div class="blob" style="width:18rem;height:18rem;background:color-mix(in oklab, var(--sun) 50%, transparent);right:0;top:2.5rem"></div>
  <div class="shell">
    <div class="page-hero__inner reveal">
      <span class="eyebrow">${esc(eyebrow)}</span>
      <h1>${title}</h1>
      ${description ? `<p class="lead" style="max-width:36rem">${description}</p>` : ""}
      ${actions}
    </div>
  </div>
</section>`;
}

export function sectionHeading({ eyebrow, title, description, center = false, tag = "h2" }) {
  return `<div class="section-heading${center ? " section-heading--center" : ""}">
  ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ""}
  <${tag}>${title}</${tag}>
  ${description ? `<p class="lead">${description}</p>` : ""}
</div>`;
}

export function faqList(faqs) {
  return `<div class="faq">
  ${faqs
    .map(
      (faq) => `<details>
    <summary>${esc(faq.question)}${icon("chevron-down")}</summary>
    <p class="faq__answer">${esc(faq.answer)}</p>
  </details>`,
    )
    .join("\n  ")}
</div>`;
}

const DEMO_POINTS = [
  "A 1-to-1 walkthrough of the programs",
  "Stage matched to your child's age",
  "Your questions answered, no obligation",
];

export function demoCta(depth = 0) {
  return `<section class="demo-cta" id="contact">
  <div class="shell">
    <div class="demo-panel reveal">
      <div class="blob" style="width:18rem;height:18rem;background:color-mix(in oklab, var(--sun) 50%, transparent);right:-2.5rem;top:-4rem"></div>
      <div class="demo-panel__grid">
        <div class="stack stack-6">
          <span class="demo-panel__tag">${icon("calendar-check")} Free demo session</span>
          <h2>Ready to Begin Their Learning Journey?</h2>
          <p class="leading-relaxed" style="max-width:32rem;color:color-mix(in oklab, var(--primary-foreground) 85%, transparent)">
            Book a free session and see how Etern Learning supports your child's growth through
            structured, joyful learning.
          </p>
          <ul class="demo-panel__points">
            ${DEMO_POINTS.map((point) => `<li><span>${icon("check")}</span>${esc(point)}</li>`).join("\n            ")}
          </ul>
        </div>

        <div class="demo-panel__card">
          <h3 class="h3">Two minutes to book</h3>
          <p class="small muted">
            Tell us about your child, pick a date and time, and we will confirm the session.
          </p>
          <a class="btn btn--primary btn--lg btn--block mt-2" href="${url("book-demo.html", depth)}">
            Book a Free Demo ${icon("arrow-right")}
          </a>
          <a class="btn btn--outline btn--lg btn--block" href="${BRAND.whatsapp}" target="_blank" rel="noreferrer noopener">
            Chat on WhatsApp
          </a>
          <p class="tiny muted text-center">Or call ${BRAND.phone} · ${BRAND.email}</p>
        </div>
      </div>
    </div>
  </div>
</section>`;
}
