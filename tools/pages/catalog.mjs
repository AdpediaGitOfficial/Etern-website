import { icon } from "../icons.mjs";
import { esc, url, pageHero, sectionHeading, demoCta, decor } from "../layout.mjs";
import {
  PROGRAM_ICONS,
  PROGRAM_HUE,
  CATEGORY_HUE,
  TOPIC_HUE,
  hueFor,
  activityCard,
  journalCard,
  programCard,
  formatDate,
} from "../sections.mjs";
import { AGE_STAGES, JOURNAL_CATEGORIES, JOURNAL_POSTS, PROGRAMS } from "../content-etern.mjs";
import { ACTIVITIES, ACTIVITY_CATEGORIES } from "../content-activities.mjs";

/* --------------------------------------------------------------- programs */

export function programsIndexPage() {
  const body = `${pageHero({
    accent: "violet",
    eyebrow: "Programs",
    title: "Our Learning Programs",
    description:
      "Every Etern program is built around short guided lessons and a real activity afterwards. Together they cover how a child creates, learns, feels and stays safe.",
  })}

<section class="section">
  <div class="shell">
    <div class="grid grid--2">
      ${PROGRAMS.map((p) => programCard(p, 0)).join("\n      ")}
    </div>
  </div>
</section>

<section class="section section--surface">
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Stages",
      title: "Matched to your child's stage.",
      description:
        "Programs adapt across four stages so a three-year-old and a seven-year-old are never given the same session.",
    })}
    <div class="grid grid--4 mt-12">
      ${AGE_STAGES.map(
        (stage, i) => `<div class="card card--tint card--pad-lg reveal accent-${["violet", "orange", "green", "blue"][i % 4]}">
        <p class="h3" style="font-size:2rem;color:var(--accent-ink)">${stage.ageLabel}</p>
        <h3 class="h3" style="font-size:1.25rem;margin-top:0.5rem">${esc(stage.stage)}</h3>
        <p class="small leading-relaxed muted mt-2">${esc(stage.description)}</p>
      </div>`,
      ).join("\n      ")}
    </div>
  </div>
</section>

${demoCta(0)}`;

  return {
    file: "programs.html",
    title: "Programs — Four Foundations for Children Aged 3–7 | Etern Learning",
    description:
      "Creative Skill Development, Academic Foundation, Social-Emotional Growth and Safety & Wellbeing — Etern Learning's four foundation programs for children aged 3 to 7.",
    canonical: "/programs",
    active: "programs.html",
    body,
  };
}

export function programDetailPage(program) {
  const d = 1;
  const hue = hueFor(PROGRAM_HUE, program.slug);
  const related = PROGRAMS.filter((p) => p.slug !== program.slug);
  const activities = ACTIVITIES.filter(
    (a) => a.ageMin <= program.ageMax && a.ageMax >= program.ageMin,
  ).slice(0, 4);

  const body = `<section class="page-hero accent-${hue}">
  ${decor([
    ["violet-soft", "pebble", 20, "left:-6rem;top:-5rem", "float-slow"],
    ["amber-soft", "dot", 5, "right:12%;bottom:12%", "float-mid"],
  ])}
  <div class="shell">
    <div class="split split--wide-left split--center">
      <div class="stack stack-5 items-start">
        <a class="back-link" href="${url("programs.html", d)}">${icon("arrow-left")} All programs</a>
        <span class="eyebrow">${esc(program.category)} · Ages ${program.ageMin}–${program.ageMax}</span>
        <h1>${esc(program.title)}</h1>
        <p class="lead" style="max-width:36rem">${esc(program.shortDescription)}</p>
        <div class="flex flex-wrap gap-3">
          <a class="btn btn--accent btn--lg" href="${url("activities.html", d)}">Start Learning</a>
          <a class="btn btn--outline btn--lg" href="${url("book-demo.html", d)}">Book a Free Demo</a>
        </div>
      </div>
      <div class="program-art" role="img" aria-label="${esc(program.title)}">
        ${icon(PROGRAM_ICONS[program.icon] ?? "palette")}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="shell">
    <div class="split split--wide-left split--start">
      <div class="stack stack-8">
        <div class="stack stack-4">
          <h2>About this program</h2>
          <p class="lead">${esc(program.description)}</p>
        </div>

        <div>
          <h2 class="h3" style="font-size:1.5rem">Learning outcomes</h2>
          <ul class="grid grid--2 mt-4" style="gap:0.75rem">
            ${program.outcomes
              .map(
                (o) => `<li class="card flex items-start gap-3 small" style="border-radius:var(--radius-md);padding:1rem">
              <span class="tile tile--sm accent-leaf" style="width:1.25rem;height:1.25rem;border-radius:999px;margin-top:0.15rem">${icon("check", { size: 12 })}</span>
              <span>${esc(o)}</span>
            </li>`,
              )
              .join("\n            ")}
          </ul>
        </div>

        <div>
          <h2 class="h3" style="font-size:1.5rem">Try activities from this program</h2>
          <div class="grid grid--2 mt-4" style="gap:0.75rem">
            ${activities
              .map(
                (a) => `<a class="card card-link flex items-center gap-4" style="border-radius:var(--radius-md);padding:1rem;flex-direction:row"
              href="${url(`activities/${a.slug}.html`, d)}">
              <span class="tile" style="background:var(--surface);font-size:1.5rem">${a.emoji}</span>
              <span class="grow">
                <span class="font-semibold" style="display:block">${esc(a.title)}</span>
                <span class="tiny muted" style="display:block">${a.difficulty} · ${a.points} stars</span>
              </span>
              ${icon("arrow-right", { class: "muted", size: 16 })}
            </a>`,
              )
              .join("\n            ")}
          </div>
        </div>
      </div>

      <aside class="stack stack-5">
        <div class="card card--tint card--pad-lg">
          <h2 class="label">Skills built</h2>
          <div class="chip-row mt-3">
            ${program.skills.map((s) => `<span class="pill">${esc(s)}</span>`).join("\n            ")}
          </div>
        </div>

        <div class="card card--surface card--pad-lg">
          <h2 class="label">At a glance</h2>
          <dl class="stack stack-3 mt-3 small">
            <div class="flex justify-between"><dt class="muted">Age range</dt><dd class="font-semibold">${program.ageMin}–${program.ageMax} years</dd></div>
            <div class="flex justify-between"><dt class="muted">Category</dt><dd class="font-semibold">${esc(program.category)}</dd></div>
            <div class="flex justify-between"><dt class="muted">Format</dt><dd class="font-semibold">Guided + off-screen</dd></div>
          </dl>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--surface">
  <div class="shell">
    ${sectionHeading({ eyebrow: "Related", title: "Explore the other foundations." })}
    <div class="grid grid--3 mt-12">
      ${related.map((p) => programCard(p, d)).join("\n      ")}
    </div>
  </div>
</section>

${demoCta(d)}`;

  return {
    file: `programs/${program.slug}.html`,
    depth: 1,
    title: `${program.title} — Etern Learning Program (Ages ${program.ageMin}–${program.ageMax})`,
    description: program.shortDescription,
    canonical: `/programs/${program.slug}`,
    active: "programs.html",
    body,
  };
}

/* ------------------------------------------------------------- activities */

const AGE_FILTERS = [
  { label: "All ages", min: 3, max: 7 },
  { label: "3–4", min: 3, max: 4 },
  { label: "4–5", min: 4, max: 5 },
  { label: "5–6", min: 5, max: 6 },
  { label: "6–7", min: 6, max: 7 },
];

export function activitiesIndexPage() {
  const body = `${pageHero({
    accent: "orange",
    eyebrow: "Activities",
    title: "Try a Little Etern Adventure",
    description:
      "Every activity below actually works — pick one, hand over the screen, and watch your child think.",
  })}

<section class="section">
  <div class="shell" data-filter-root data-filter-target="[data-activity]" data-filter-noun="activity|activities">
    <div class="filter-panel">
      <div class="search-field">
        ${icon("search")}
        <input class="field" type="search" data-filter-search placeholder="Search activities, skills…" aria-label="Search activities">
      </div>

      <div class="stack stack-4">
        <div class="filter-row" data-filter-group="category">
          <span class="label">Category</span>
          <div class="chip-row">
            <button type="button" class="chip" data-value="All" aria-pressed="true">All</button>
            ${ACTIVITY_CATEGORIES.map((c) => `<button type="button" class="chip" data-value="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join("\n            ")}
          </div>
        </div>

        <div class="filter-row" data-filter-group="age">
          <span class="label">Age</span>
          <div class="chip-row">
            ${AGE_FILTERS.map(
              (a, i) =>
                `<button type="button" class="chip" data-value="${a.min}-${a.max}" aria-pressed="${i === 0}">${esc(a.label)}</button>`,
            ).join("\n            ")}
          </div>
        </div>

        <div class="filter-row" data-filter-group="difficulty">
          <span class="label">Difficulty</span>
          <div class="chip-row">
            <button type="button" class="chip" data-value="All" aria-pressed="true">All</button>
            ${["Easy", "Medium", "Challenge"].map((d) => `<button type="button" class="chip" data-value="${d}" aria-pressed="false">${d}</button>`).join("\n            ")}
          </div>
        </div>
      </div>
    </div>

    <p class="small muted mt-6" data-filter-count aria-live="polite"></p>

    <div class="grid grid--3 mt-6" data-filter-results>
      ${ACTIVITIES.map((a) => activityCard(a, 0)).join("\n      ")}
    </div>

    <div class="empty-state mt-6" data-filter-empty hidden>
      ${icon("sliders")}
      <div>
        <h2 class="h3">No activities match those filters.</h2>
        <p class="small muted mt-2">Try widening the age range or clearing the search.</p>
      </div>
      <button type="button" class="btn btn--outline" data-filter-clear>Clear filters</button>
    </div>
  </div>
</section>

${demoCta(0)}`;

  return {
    file: "activities.html",
    title: "Interactive Activities for Children Aged 3–7 | Etern Learning",
    description:
      "Play free Etern Learning activities: colours, shapes, counting, letters, memory and problem solving — all working, all designed for ages 3 to 7.",
    canonical: "/activities",
    active: "activities.html",
    scripts: ["assets/js/filters.js"],
    body,
  };
}

export function activityDetailPage(activity) {
  const d = 1;
  const hue = hueFor(CATEGORY_HUE, activity.category);
  const related = ACTIVITIES.filter(
    (a) => a.slug !== activity.slug && (a.category === activity.category || a.ageMin <= activity.ageMax),
  ).slice(0, 3);

  const data = [
    {
      slug: activity.slug,
      title: activity.title,
      engine: activity.engine,
      rounds: activity.rounds ?? null,
      pairs: activity.pairs ?? null,
    },
  ];

  const body = `<section class="page-hero accent-${hue}">
  ${decor([
    ["pink-soft", "pebble", 18, "left:-5rem;top:-4rem", "float-slow"],
    ["teal-soft", "dot", 4.5, "right:16%;bottom:18%", "float-mid"],
  ])}
  <div class="shell">
    <div class="page-hero__inner">
      <a class="back-link" href="${url("activities.html", d)}">${icon("arrow-left")} All activities</a>
      <span class="eyebrow">${esc(activity.category)} · ${activity.difficulty} · Ages ${activity.ageMin}–${activity.ageMax}</span>
      <h1 class="flex items-center gap-4" style="font-size:clamp(2.2rem,1.4rem+2.6vw,3rem)">
        <span class="tile" style="width:4rem;height:4rem;border-radius:1.5rem;font-size:1.875rem" aria-hidden="true">${activity.emoji}</span>
        ${esc(activity.title)}
      </h1>
      <p class="lead" style="max-width:38rem">${esc(activity.longDescription)}</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="shell">
    <div class="split split--wide-left split--start" style="gap:2rem">
      <div class="card" style="border-radius:2.5rem;padding:1.5rem;box-shadow:var(--shadow-lift)">
        <div data-player data-player-source="activity-data"></div>
        <noscript>
          <p class="small muted">This activity needs JavaScript to play. Everything else on the page
            works without it.</p>
        </noscript>
      </div>

      <aside class="stack stack-5">
        <div class="card card--tint card--pad-lg">
          <h2 class="label">Skills practised</h2>
          <ul class="dot-list mt-3">
            ${activity.skills.map((s) => `<li>${esc(s)}</li>`).join("\n            ")}
          </ul>
        </div>

        <div class="card card--surface card--pad-lg">
          <h2 class="label">Try it off screen</h2>
          <p class="small leading-relaxed mt-3">
            Once your child finishes, repeat the same idea with real objects around the house — that
            is where the learning settles.
          </p>
        </div>

        <div class="card card--pad-lg accent-violet card--tint">
          <h2 class="h3" style="font-size:1.125rem">Want the full library?</h2>
          <p class="small mt-2">Book a free demo and we will match your child to the right stage.</p>
          <a class="btn btn--primary btn--block mt-4" href="${url("book-demo.html", d)}">Book a Free Demo</a>
        </div>
      </aside>
    </div>
  </div>

  <script type="application/json" id="activity-data">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>
</section>

<section class="section section--surface">
  <div class="shell">
    ${sectionHeading({ eyebrow: "Keep going", title: "More little adventures." })}
    <div class="grid grid--3 mt-10">
      ${related
        .map(
          (a) => `<a class="card card-link flex items-center gap-4" style="border-radius:var(--radius-3xl);padding:1.25rem;flex-direction:row"
        href="${url(`activities/${a.slug}.html`, d)}">
        <span class="tile" style="background:var(--surface);font-size:1.5rem">${a.emoji}</span>
        <span class="grow">
          <span class="font-semibold" style="display:block">${esc(a.title)}</span>
          <span class="tiny muted" style="display:block">${esc(a.category)}</span>
        </span>
        ${icon("arrow-right", { class: "muted", size: 16 })}
      </a>`,
        )
        .join("\n      ")}
    </div>
  </div>
</section>

${demoCta(d)}`;

  return {
    file: `activities/${activity.slug}.html`,
    depth: 1,
    title: `${activity.title} — Free Activity for Ages ${activity.ageMin}–${activity.ageMax} | Etern Learning`,
    description: activity.description,
    canonical: `/activities/${activity.slug}`,
    active: "activities.html",
    scripts: ["assets/js/activity-player.js"],
    body,
  };
}

/* ---------------------------------------------------------------- journal */

export function journalIndexPage() {
  const featured = JOURNAL_POSTS.find((p) => p.featured) ?? JOURNAL_POSTS[0];
  const rest = JOURNAL_POSTS;

  const body = `${pageHero({
    accent: "pink",
    eyebrow: "Etern journal",
    title: "Ideas for Raising Curious Minds.",
    description: "Short, practical reads for parents — no jargon, no lectures.",
  })}

<section class="section">
  <div class="shell" data-filter-root data-filter-target="[data-post]" data-filter-noun="article|articles">
    <a class="card card--tint card-link split split--wide-left split--center accent-${hueFor(TOPIC_HUE, featured.category)}"
       style="border-radius:2.25rem;padding:1.75rem" href="journal/${featured.slug}.html">
      <div class="stack stack-4">
        <span class="pill pill--solid w-fit" style="letter-spacing:0.14em;text-transform:uppercase">Featured · ${esc(featured.category)}</span>
        <h2 class="display-2" style="font-size:clamp(1.75rem,1.2rem+1.8vw,2.25rem)">${esc(featured.title)}</h2>
        <p class="leading-relaxed muted">${esc(featured.excerpt)}</p>
        <p class="tiny muted">${formatDate(featured.date)} · ${featured.readingMinutes} min read</p>
        <span class="link-arrow">Read the article ${icon("arrow-right")}</span>
      </div>
      <div class="cover" aria-hidden="true">📖</div>
    </a>

    <div class="flex flex-wrap items-center justify-between gap-5 mt-12">
      <div class="search-field" style="width:100%;max-width:20rem">
        ${icon("search")}
        <input class="field" type="search" data-filter-search placeholder="Search the journal" aria-label="Search articles">
      </div>
      <div class="chip-row" data-filter-group="category">
        <button type="button" class="chip" data-value="All" aria-pressed="true">All</button>
        ${JOURNAL_CATEGORIES.map((c) => `<button type="button" class="chip" data-value="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join("\n        ")}
      </div>
    </div>

    <p class="small muted mt-6" data-filter-count aria-live="polite"></p>

    <div class="grid grid--3 mt-6" data-filter-results>
      ${rest.map((p) => journalCard(p, 0)).join("\n      ")}
    </div>

    <div class="empty-state mt-6" data-filter-empty hidden>
      <h2 class="h3">Nothing matches that search.</h2>
      <button type="button" class="btn btn--outline" data-filter-clear>Clear filters</button>
    </div>
  </div>
</section>

${demoCta(0)}`;

  return {
    file: "journal.html",
    title: "Etern Journal — Ideas for Raising Curious Minds",
    description:
      "Practical writing on early learning, activity-based teaching, screen time, creativity and child safety for parents of 3–7 year olds.",
    canonical: "/journal",
    active: "journal.html",
    scripts: ["assets/js/filters.js"],
    body,
  };
}

export function journalDetailPage(post) {
  const d = 1;
  const hue = hueFor(TOPIC_HUE, post.category);
  const related = JOURNAL_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category,
  ).slice(0, 3);
  const fallback = JOURNAL_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const others = related.length ? related : fallback;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Etern Learning" },
  };

  const body = `<div class="read-progress" data-read-progress aria-hidden="true"></div>

<article>
  <section class="page-hero accent-${hue}">
    ${decor([
      ["violet-soft", "pebble", 18, "left:-5rem;top:-4rem", "float-slow"],
      ["amber-soft", "dot", 4.5, "right:14%;top:22%"],
    ])}
    <div class="shell">
      <div class="page-hero__inner" style="max-width:44rem;margin-inline:auto">
        <a class="back-link" href="${url("journal.html", d)}">${icon("arrow-left")} Etern Journal</a>
        <span class="pill pill--solid w-fit" style="letter-spacing:0.14em;text-transform:uppercase">${esc(post.category)}</span>
        <h1 style="font-size:clamp(2.1rem,1.3rem+3vw,3rem)">${esc(post.title)}</h1>
        <div class="flex flex-wrap items-center gap-3 small muted full">
          <span>${esc(post.author)}</span><span>·</span>
          <span>${formatDate(post.date)}</span><span>·</span>
          <span>${post.readingMinutes} min read</span>
          <button type="button" class="btn btn--outline" style="margin-left:auto" data-share
                  data-share-title="${esc(post.title)}">${icon("share")} Share</button>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="prose" style="margin-inline:auto">
        <p class="article-lead">${esc(post.excerpt)}</p>
        ${post.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section section--surface">
    <div class="shell">
      ${sectionHeading({ eyebrow: "Keep reading", title: "Related articles." })}
      <div class="grid grid--3 mt-10">
        ${others
          .map(
            (p) => `<a class="card card--tint card-link stack-3 accent-${hueFor(TOPIC_HUE, p.category)}" href="${url(`journal/${p.slug}.html`, d)}">
          <span class="pill pill--solid w-fit">${esc(p.category)}</span>
          <h3 class="h3" style="font-size:1.125rem">${esc(p.title)}</h3>
          <span class="link-arrow">Read ${icon("arrow-right")}</span>
        </a>`,
          )
          .join("\n        ")}
      </div>
    </div>
  </section>
</article>

${demoCta(d)}`;

  return {
    file: `journal/${post.slug}.html`,
    depth: 1,
    title: `${post.title} | Etern Journal`,
    description: post.excerpt,
    canonical: `/journal/${post.slug}`,
    active: "journal.html",
    scripts: ["assets/js/article.js"],
    extraHead: `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
    body,
  };
}
