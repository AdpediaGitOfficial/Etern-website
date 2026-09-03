/** Sections and cards reused across more than one page. */

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { icon } from "./icons.mjs";
import { esc, url, sectionHeading, decor } from "./layout.mjs";
import {
  AGE_STAGES,
  HOW_IT_WORKS_STEPS,
  JOURNAL_POSTS,
  METHOD_STEPS,
  PROGRAMS,
  TESTIMONIALS,
} from "./content-etern.mjs";

export const PROGRAM_ICONS = {
  palette: "palette",
  "book-open": "book-open",
  "heart-handshake": "heart-handshake",
  "shield-check": "shield-check",
};

const STEP_ICONS = {
  "play-circle": "play-circle",
  hand: "hand",
  sparkles: "sparkles",
  users: "users",
};

/* ------------------------------------------------------------------ hues */

/** One hue per program, so a program keeps its colour across the whole site. */
export const PROGRAM_HUE = {
  "creative-skill-development": "violet",
  "academic-foundation": "blue",
  "social-emotional-growth": "green",
  "safety-and-wellbeing": "amber",
};

/** One hue per activity category. */
export const CATEGORY_HUE = {
  Colors: "pink",
  Shapes: "blue",
  Counting: "amber",
  Letters: "violet",
  Memory: "green",
  Matching: "teal",
  Creativity: "orange",
  Storytelling: "pink",
  "Problem solving": "violet",
};

/** One hue per journal / video category. */
export const TOPIC_HUE = {
  Parenting: "violet",
  Activities: "orange",
  Learning: "blue",
  "Child Development": "green",
  Safety: "teal",
  Creativity: "pink",
  Lessons: "blue",
  Creative: "pink",
};

/** The mark each journal topic carries on its card. */
export const TOPIC_ICON = {
  Parenting: "hand-heart",
  Activities: "scissors",
  Learning: "cards",
  "Child Development": "seedling",
  Safety: "shield-check",
  Creativity: "palette",
  Lessons: "book-open",
  Creative: "palette",
};

export const hueFor = (map, key, fallback = "violet") => map[key] ?? fallback;

/** The four age stages, in the reference's colour order. */
const STAGE_STYLE = [
  { hue: "violet", art: "stage-discover.webp", ratio: "460 / 517" },
  { hue: "amber", art: "stage-explore.webp", ratio: "460 / 721" },
  { hue: "green", art: "stage-build.webp", ratio: "460 / 685" },
  { hue: "blue", art: "stage-grow.webp", ratio: "460 / 738" },
];

/**
 * The picture in the parent-dashboard band.
 *
 * Drop a photograph into assets/img/ named parent-child.png (or .jpg/.webp)
 * and the next build uses it; the illustration is the fallback when no photo
 * is there. The slot crops any aspect ratio to the same box, so the column
 * keeps its width and alignment either way — see .dash-band__photo img.
 *
 * A cut-out with a transparent background (PNG/WebP) sits best on the violet,
 * and a portrait-ish crop of the subjects survives the slot's crop best.
 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const DASHBOARD_PHOTO =
  ["parent-child.png", "parent-child.webp", "parent-child.jpg", "parent-child.svg"]
    .map((name) => `assets/img/${name}`)
    .find((path) => existsSync(join(ROOT, path))) ?? "assets/img/parent-child.svg";

/**
 * The artwork in the home hero.
 *
 * Drop a new illustration into assets/img/ named hero-scene.png (or .webp
 * /.jpg) and the next build uses it; hero.jpg, the supplied original, is the
 * fallback. Compose it like the current one, with the subject on the right and
 * open sky on the left for the headline — see .home-hero__art.
 */
export const HERO_ART =
  ["hero-scene.png", "hero-scene.webp", "hero-scene.jpg", "hero.jpg"]
    .map((name) => `assets/img/${name}`)
    .find((path) => existsSync(join(ROOT, path))) ?? "assets/img/hero.jpg";

/** The five method moves. */
const METHOD_STYLE = [
  { hue: "violet", icon: "search" },
  { hue: "blue", icon: "hand-heart" },
  { hue: "pink", icon: "palette" },
  { hue: "amber", icon: "message-heart" },
  { hue: "green", icon: "seedling" },
];

export function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* ------------------------------------------------------------------ cards */

export function programCard(program, depth = 0) {
  const hue = hueFor(PROGRAM_HUE, program.slug);
  return `<a class="card card--tint card-link stack-5 accent-${hue} reveal"
   href="${url(`programs/${program.slug}.html`, depth)}">
  <div class="flex items-start justify-between gap-4">
    <span class="tile tile--lg tile--solid">${icon(PROGRAM_ICONS[program.icon] ?? "palette")}</span>
    <span class="pill" style="background:oklch(1 0 0 / 0.65)">Ages ${program.ageMin}–${program.ageMax}</span>
  </div>
  <div class="stack stack-3">
    <h3 class="h3">${esc(program.title)}</h3>
    <p class="small leading-relaxed muted">${esc(program.shortDescription)}</p>
  </div>
  <div class="chip-row">
    ${program.skills
      .slice(0, 3)
      .map((skill) => `<span class="pill" style="background:oklch(1 0 0 / 0.65)">${esc(skill)}</span>`)
      .join("\n    ")}
  </div>
  <span class="link-arrow">Explore program ${icon("arrow-up-right")}</span>
</a>`;
}

export function activityCard(activity, depth = 0) {
  const hue = hueFor(CATEGORY_HUE, activity.category);
  return `<a class="card card--tint card-link stack-4 accent-${hue} reveal"
   href="${url(`activities/${activity.slug}.html`, depth)}"
   data-activity
   data-title="${esc(activity.title.toLowerCase())}"
   data-keywords="${esc([activity.description, ...activity.skills].join(" ").toLowerCase())}"
   data-category="${esc(activity.category)}"
   data-difficulty="${activity.difficulty}"
   data-age-min="${activity.ageMin}" data-age-max="${activity.ageMax}">
  <div class="flex items-start justify-between">
    <span class="tile tile--lg tile--duo">${icon(activity.icon)}</span>
    <span class="pill" style="background:oklch(1 0 0 / 0.65)">Ages ${activity.ageMin}–${activity.ageMax}</span>
  </div>
  <div>
    <h3 class="h3" style="font-size:1.25rem">${esc(activity.title)}</h3>
    <p class="small leading-relaxed muted mt-2">${esc(activity.description)}</p>
  </div>
  <div class="chip-row">
    <span class="pill pill--solid">${esc(activity.category)}</span>
    <span class="pill" style="background:oklch(1 0 0 / 0.65)">${activity.difficulty}</span>
    <span class="pill pill--stars" style="background:oklch(1 0 0 / 0.65)">${icon("star")}${activity.points}</span>
  </div>
  <span class="link-arrow">Play now ${icon("arrow-right")}</span>
</a>`;
}

/**
 * A journal cover.
 *
 * Posts that have a photograph show it; the rest keep the drawn plate, sized
 * and framed identically so a mixed grid still reads as one system.
 *
 * @param {object} post
 * @param {number} depth
 * @param {"wide"|"tall"} [shape]
 */
export function journalCover(post, depth = 0, shape = "wide") {
  const mod = shape === "wide" ? " cover--wide" : "";
  if (!post.image) {
    return `<span class="cover${mod}">${icon(TOPIC_ICON[post.category] ?? "book-open")}</span>`;
  }
  return `<img class="cover-photo${mod}" src="${url(`assets/img/${post.image}.webp`, depth)}"
       width="720" height="410" loading="lazy" decoding="async"
       alt="${esc(post.imageAlt ?? "")}">`;
}

export function journalCard(post, depth = 0) {
  const hue = hueFor(TOPIC_HUE, post.category);
  return `<article class="reveal accent-${hue}" style="height:100%"
   data-post
   data-title="${esc(post.title.toLowerCase())}"
   data-keywords="${esc(post.excerpt.toLowerCase())}"
   data-category="${esc(post.category)}">
  <a class="card card-link stack-4" href="${url(`journal/${post.slug}.html`, depth)}">
    ${journalCover(post, depth)}
    <div class="flex items-center gap-3 tiny muted">
      <span class="pill pill--solid">${esc(post.category)}</span>
      <span>${formatDate(post.date)} · ${post.readingMinutes} min</span>
    </div>
    <h3 class="h3" style="font-size:1.2rem">${esc(post.title)}</h3>
    <p class="small leading-relaxed muted">${esc(post.excerpt)}</p>
    <span class="link-arrow">Read more ${icon("arrow-right")}</span>
  </a>
</article>`;
}

/* --------------------------------------------------------------- sections */

/**
 * The age journey: four solid colour blocks that select a stage, and a detail
 * panel for the chosen one. With JavaScript off, every panel is shown.
 */
export function ageJourney(depth = 0) {
  const cards = AGE_STAGES.map((stage, i) => {
    const style = STAGE_STYLE[i] ?? STAGE_STYLE[0];
    return `<button type="button" class="stage-card stage-card--${i + 1} accent-${style.hue} reveal"
        data-stage-tab="${stage.id}" aria-pressed="${i === 0}" aria-controls="stage-${stage.id}">
        <span class="stage-card__age">${stage.ageLabel}</span>
        <span class="stage-card__name">${esc(stage.stage)}</span>
        <span class="stage-card__line">${esc(stage.headline)}</span>
        <span class="stage-card__spark" aria-hidden="true"></span>
        <img class="stage-card__art" src="${url(`assets/img/${style.art}`, depth)}"
             style="aspect-ratio:${style.ratio}" alt="" loading="lazy" decoding="async">
      </button>`;
  });
  const [firstCard, ...restCards] = cards;

  const panels = AGE_STAGES.map((stage, i) => {
    const style = STAGE_STYLE[i] ?? STAGE_STYLE[0];
    return `<div class="stage-panel accent-${style.hue}" id="stage-${stage.id}" data-stage-panel="${stage.id}"${
      i > 0 ? " hidden" : ""
    }>
      <div class="stack stack-4">
        <p class="leading-relaxed muted">${esc(stage.description)}</p>
        <div>
          <h3 class="label">Skills in focus</h3>
          <div class="chip-row mt-3">
            ${stage.skills.map((s) => `<span class="pill">${esc(s)}</span>`).join("\n            ")}
          </div>
        </div>
      </div>

      <div class="stack stack-5">
        <div>
          <h3 class="label">Learning objectives</h3>
          <ul class="dot-list mt-3">
            ${stage.objectives.map((o) => `<li>${esc(o)}</li>`).join("\n            ")}
          </ul>
        </div>
        <div>
          <h3 class="label">Example lessons</h3>
          <p class="small mt-2">${esc(stage.sampleLessons.join(" · "))}</p>
        </div>
      </div>

      <div class="stack stack-5 card card--tint" style="padding:1.35rem">
        <div>
          <h3 class="label">For parents</h3>
          <p class="small mt-2">${esc(stage.parentBenefit)}</p>
        </div>
        <div>
          <h3 class="label">Recommended programs</h3>
          <ul class="stack stack-2 mt-2">
            ${stage.recommendedPrograms
              .map((slug) => {
                const program = PROGRAMS.find((p) => p.slug === slug);
                if (!program) return "";
                return `<li><a class="link-arrow" href="${url(`programs/${slug}.html`, depth)}">${esc(program.title)} ${icon("arrow-right")}</a></li>`;
              })
              .join("\n            ")}
          </ul>
        </div>
        <a class="btn btn--accent btn--block mt-auto" href="${url("book-demo.html", depth)}">Book a free demo</a>
      </div>
    </div>`;
  }).join("\n\n    ");

  return `<section class="section section--surface" data-stages>
  ${decor([
    ["green-soft", "pebble", 11, "right:-3.5rem;top:-2rem", "float-slow"],
    ["pink-soft", "pebble", 9, "left:-4rem;bottom:4%", "float-slow"],
    ["blue", "dot", 1.5, "right:14%;top:21%", "float-mid"],
    ["teal", "star", 1.2, "right:17.5%;top:29%"],
    ["amber", "dot", 1, "left:47%;top:22%"],
  ])}

  <svg class="shape float-mid" aria-hidden="true" viewBox="0 0 120 54"
       style="width:6rem;height:2.7rem;left:53%;top:11%" fill="none">
    <path d="M8 34c10-22 22-22 32 0s22 22 32 0 22-22 32 0" stroke="var(--pink)"
          stroke-width="14" stroke-linecap="round" opacity="0.85"/>
  </svg>

  <svg class="shape float-slow" aria-hidden="true" viewBox="0 0 90 110"
       style="width:5.4rem;height:6.6rem;right:22%;top:6%" fill="none">
    <path d="M64 4a54 54 0 1 0 18 92A44 44 0 0 1 64 4z" fill="var(--amber)" opacity="0.9"/>
  </svg>

  <svg class="shape" aria-hidden="true" viewBox="0 0 70 46"
       style="width:4.4rem;height:2.9rem;left:38%;top:20%" fill="var(--orange)">
    <g opacity="0.55">
      ${[0, 1, 2, 3]
        .flatMap((row) => [0, 1, 2, 3, 4].map((col) => `<circle cx="${7 + col * 14}" cy="${7 + row * 11}" r="2.6"/>`))
        .join("")}
    </g>
  </svg>
  <div class="shell">
    <div class="stage-grid">
      <div class="stage-col">
        <div class="stage-intro">
          <p class="eyebrow">Age journey</p>
          <h2>Personalised Learning<br>for Every Age &amp; Stage</h2>
          <p class="lead">From curious beginners to confident learners, the age-based journey grows
            with your child. Pick a stage to see what learning looks like.</p>
          <a class="link-arrow" href="${url("programs.html", depth)}">View all programs ${icon("arrow-right")}</a>
        </div>

        ${firstCard}
      </div>

      ${restCards.join("\n      ")}
    </div>

    ${panels}
  </div>
</section>`;
}

/**
 * The Etern method as a wheel: five nodes around a hub, each opening its own
 * detail. The plain rows underneath are the no-JavaScript version.
 */
export function methodSection() {
  const step = (i) => METHOD_STYLE[i] ?? METHOD_STYLE[0];

  const nodes = METHOD_STEPS.map((move, i) => {
    const { hue, icon: mark } = step(i);
    const angle = (360 / METHOD_STEPS.length) * i;
    return `<button type="button" class="wheel__node" data-move="${move.number}"
        aria-pressed="${i === 0}" aria-controls="move-detail"
        style="--angle:${angle}deg;--node-ink:var(--${hue}-ink);--node-solid:var(--${hue})">
        <span class="wheel__mark">${icon(mark)}</span>
        ${esc(move.title)}
      </button>`;
  }).join("\n      ");

  const details = METHOD_STEPS.map((move, i) => {
    const { hue } = step(i);
    return `<div class="wheel__detail accent-${hue}" data-move-panel="${move.number}"${i > 0 ? " hidden" : ""}>
        <span class="num">${move.number}</span>
        <h3>${esc(move.title)}</h3>
        <p class="lead">${esc(move.description)}</p>
        <p class="wheel__outcome">${esc(move.outcome)}</p>
      </div>`;
  }).join("\n      ");

  const fallback = METHOD_STEPS.map((move, i) => {
    const { hue } = step(i);
    return `<div class="method-row accent-${hue}">
        <span class="method-row__num">${move.number}</span>
        <div>
          <h3>${esc(move.title)}</h3>
          <p class="body">${esc(move.description)}</p>
        </div>
        <p class="outcome">${esc(move.outcome)}</p>
      </div>`;
  }).join("\n      ");

  return `<section class="section section--cream">
  ${decor([
    ["violet-soft", "pebble", 18, "left:-6rem;bottom:-4rem"],
    ["amber-soft", "drop", 11, "right:-3rem;top:12%", "float-slow"],
    ["teal-soft", "dot", 4, "left:12%;top:9%"],
  ])}
  <div class="shell">
    ${sectionHeading({
      eyebrow: "The Etern method",
      title: "From Curiosity to Confidence.",
      description:
        "Five moves repeated in every session. It is a rhythm, not a curriculum a child has to keep up with — tap a move to see it.",
      center: true,
    })}

    <div class="wheel" data-wheel>
      <div class="wheel__ring">
        <div class="wheel__hub">
          <b>Etern<br>Method</b>
          <span>5 moves</span>
        </div>
      ${nodes}
      </div>
      <div id="move-detail">
      ${details}
      </div>
    </div>

    <div class="mt-12" data-wheel-fallback hidden>
      ${fallback}
    </div>
  </div>
</section>`;
}

export function howEternWorks() {
  const hues = ["blue", "green", "pink", "amber"];
  const outcomes = {
    watch: "Watch a lesson.",
    do: "Complete an activity.",
    create: "Create something.",
    share: "Share it with parents.",
  };

  return `<section class="section">
  ${decor([["green-soft", "pebble", 14, "right:-4rem;top:20%", "float-mid"]])}
  <div class="shell">
    ${sectionHeading({
      eyebrow: "How Etern works",
      title: "Learning Beyond the Screen.",
      description:
        "A short guided lesson opens the door. Everything that matters happens after it — with hands, objects and a parent to show it to.",
      center: true,
    })}

    <div class="step-grid" data-steps>
      ${HOW_IT_WORKS_STEPS.map(
        (step, i) => `<button type="button" class="step-card accent-${hues[i % hues.length]} reveal"
        data-step="${step.id}" aria-pressed="${i === 0}" aria-controls="step-detail">
        <span class="label">Step ${i + 1}</span>
        <span class="tile tile--solid">${icon(STEP_ICONS[step.icon] ?? "play-circle")}</span>
        <span class="step-card__title">${esc(step.title)}</span>
        <span class="small leading-relaxed muted">${esc(step.description)}</span>
      </button>`,
      ).join("\n      ")}
    </div>

    <div class="step-detail" id="step-detail" aria-live="polite">
      ${HOW_IT_WORKS_STEPS.map(
        (step, i) => `<div data-step-panel="${step.id}"${i > 0 ? " hidden" : ""}
        class="flex items-center justify-between gap-6 full accent-${hues[i % hues.length]}" style="flex-wrap:wrap">
        <div>
          <h3 class="h3" style="font-size:1.25rem">${esc(step.title)}</h3>
          <p class="muted mt-2">${esc(step.detail)}</p>
        </div>
        <p class="step-detail__outcome">${outcomes[step.id]}</p>
      </div>`,
      ).join("\n      ")}
    </div>
  </div>
</section>`;
}

/**
 * The parent dashboard band: copy, the dashboard card itself, and a picture of
 * a parent and child ending on the same line as the card.
 */
export function dashboardPreview(depth = 0, cta = { href: "parents.html", label: "Explore Dashboard" }) {
  const stats = [
    { label: "Activities Completed", value: "24", icon: "trending-up", accent: "amber" },
    { label: "Time Spent", value: "4h 30m", icon: "clock", accent: "green" },
    { label: "Skills Learned", value: "18", icon: "sparkles", accent: "orange" },
    { label: "Streak", value: "7 Days", icon: "flame", accent: "green" },
  ];

  const recent = [
    {
      art: "assets/img/activity-stories.webp",
      title: "Story: The Little Explorer",
      when: "1 hr ago",
      percent: 100,
      accent: "violet",
    },
    {
      art: "assets/img/activity-self-help.webp",
      title: "Self Help: Big Feelings",
      when: "4 hrs ago",
      percent: 80,
      accent: "amber",
    },
  ];

  return `<section class="section section--solid accent-violet dash-band">
  <span class="shape shape--pebble" aria-hidden="true" style="--shape-fill:oklch(1 0 0 / 0.09);width:20rem;height:20rem;left:-7rem;bottom:-7rem"></span>
  <span class="shape shape--dot float-mid" aria-hidden="true" style="--shape-fill:var(--teal);width:4.5rem;height:4.5rem;left:1%;bottom:6%;opacity:0.9"></span>
  <span class="shape shape--star float-slow" aria-hidden="true" style="--shape-fill:var(--amber);width:2.2rem;height:2.2rem;left:52%;top:8%"></span>
  <span class="shape shape--diamond" aria-hidden="true" style="--shape-fill:var(--pink);width:1.1rem;height:1.1rem;left:13%;bottom:22%"></span>
  <span class="shape shape--diamond float-mid" aria-hidden="true" style="--shape-fill:var(--blue);width:1.3rem;height:1.3rem;right:14%;top:16%"></span>
  <svg class="shape" aria-hidden="true" viewBox="0 0 100 55" style="width:7rem;height:3.85rem;left:24%;bottom:5%;background:none" fill="none" stroke-linecap="round">
    <path d="M8 52a42 42 0 0 1 84 0" stroke="var(--pink)" stroke-width="9"/>
    <path d="M20 52a30 30 0 0 1 60 0" stroke="var(--amber)" stroke-width="9"/>
    <path d="M32 52a18 18 0 0 1 36 0" stroke="var(--blue)" stroke-width="9"/>
  </svg>

  <div class="shell">
    <div class="dash-band__grid">
      <div class="stack stack-5">
        <h2>Learning That Parents Love.<br>Progress You Can See.</h2>
        <p class="lead">Our parent dashboard helps you stay connected with your child's learning journey.</p>
        <a class="dash-band__link" href="${url(cta.href, depth)}">${esc(cta.label)} ${icon("arrow-right")}</a>
      </div>

      <div class="dash reveal" data-dash>
        <p class="dash__greet">Hi, Parent!</p>
        <p class="dash__sub">Here's what's happening with your child today.</p>

        <div class="dash__stats">
          ${stats
            .map(
              (stat) => `<div class="dash__stat accent-${stat.accent}">
            <span class="dash__stat-head">
              <span>${icon(stat.icon)}</span>
              <b>${esc(stat.label)}</b>
            </span>
            <p class="dash__stat-value" data-count-to="${stat.value}">${stat.value}</p>
          </div>`,
            )
            .join("\n          ")}
        </div>

        <h3 class="dash__title">Recent Activity</h3>
        <ul class="dash__activity">
          ${recent
            .map(
              (item) => `<li class="dash__act accent-${item.accent}">
            <img class="dash__act-thumb" src="${url(item.art, depth)}" width="128" height="128"
                 alt="" loading="lazy" decoding="async">
            <span class="dash__act-body">
              <b>${esc(item.title)}</b>
              <span>Completed · ${item.when}</span>
            </span>
            <span class="dash__act-progress accent-green">
              <span class="meter"><span style="--value:${item.percent}%"></span></span>
              <i>${item.percent}%</i>
            </span>
          </li>`,
            )
            .join("\n          ")}
        </ul>
      </div>

      <div class="dash-band__photo">
        <img src="${url(DASHBOARD_PHOTO, depth)}" width="320" height="380"
             alt="A parent and child looking at a tablet together" loading="lazy" decoding="async">
      </div>
    </div>
  </div>
</section>`;
}

/** Testimonials as a snap-scrolling carousel with dots. */
export function testimonialsSection() {
  const hues = ["violet", "amber", "blue", "pink"];

  return `<section class="section section--cream">
  ${decor([
    ["teal-soft", "pebble", 13, "left:-4rem;bottom:8%"],
    ["orange-soft", "dot", 5, "right:9%;top:12%", "float-mid"],
  ])}
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Real reviews. Real trust.",
      title: "Loved by Parents. Trusted by Families.",
      description: "Reviews from families using Etern Learning today.",
      center: true,
    })}

    <div class="quotes" data-carousel>
      <div class="quotes__track" data-carousel-track tabindex="0" role="group" aria-label="Parent reviews">
        ${TESTIMONIALS.map(
          (t, i) => `<figure class="quote-card accent-${hues[i % hues.length]}">
          <div class="quote-card__top">
            <span class="quote-card__mark">${icon("quote")}</span>
            <div class="stars" aria-label="${t.rating} out of 5 stars">
              ${Array.from({ length: t.rating }, () => icon("star")).join("")}
            </div>
          </div>
          <blockquote>${esc(t.quote)}</blockquote>
          <figcaption>
            <span class="avatar" aria-hidden="true">${esc(t.parentName.charAt(0))}</span>
            <span>
              <span class="font-semibold" style="display:block">${esc(t.parentName)}</span>
              <span class="tiny muted" style="display:block">${esc(t.role)}${t.childAge ? ` · child aged ${esc(t.childAge)}` : ""}</span>
            </span>
          </figcaption>
        </figure>`,
        ).join("\n        ")}
      </div>
      <div class="quotes__dots" data-carousel-dots></div>
    </div>
  </div>
</section>`;
}

export function journalTeaser(depth = 0) {
  return `<section class="section">
  ${decor([["pink-soft", "drop", 12, "right:-3rem;top:8%", "float-slow"]])}
  <div class="shell">
    <div class="flex flex-wrap items-end justify-between gap-6">
      ${sectionHeading({
        eyebrow: "Etern journal",
        title: "Ideas for Raising Curious Minds.",
        description:
          "Short, practical writing on early learning, creativity, screen time and safety.",
      })}
      <a class="btn btn--outline" href="${url("journal.html", depth)}">View all articles ${icon("arrow-right")}</a>
    </div>

    <div class="grid grid--3 mt-12">
      ${JOURNAL_POSTS.slice(0, 3)
        .map((post) => journalCard(post, depth))
        .join("\n      ")}
    </div>
  </div>
</section>`;
}
