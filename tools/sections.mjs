/** Sections and cards reused across more than one page. */

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

export const STEP_ICONS = {
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

export const hueFor = (map, key, fallback = "violet") => map[key] ?? fallback;

/** The four age stages, in the reference's colour order. */
const STAGE_STYLE = [
  { hue: "violet", emoji: "🧸" },
  { hue: "orange", emoji: "🔤" },
  { hue: "green", emoji: "🧱" },
  { hue: "blue", emoji: "🚀" },
];

/** The five method moves. */
const METHOD_STYLE = [
  { hue: "violet", emoji: "🔍" },
  { hue: "blue", emoji: "🤲" },
  { hue: "pink", emoji: "🎨" },
  { hue: "amber", emoji: "💬" },
  { hue: "green", emoji: "🌱" },
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
    <span class="tile tile--lg" style="background:oklch(1 0 0 / 0.7);font-size:1.85rem" aria-hidden="true">${activity.emoji}</span>
    <span class="pill" style="background:oklch(1 0 0 / 0.65)">Ages ${activity.ageMin}–${activity.ageMax}</span>
  </div>
  <div>
    <h3 class="h3" style="font-size:1.25rem">${esc(activity.title)}</h3>
    <p class="small leading-relaxed muted mt-2">${esc(activity.description)}</p>
  </div>
  <div class="chip-row">
    <span class="pill pill--solid">${esc(activity.category)}</span>
    <span class="pill" style="background:oklch(1 0 0 / 0.65)">${activity.difficulty}</span>
    <span class="pill" style="background:oklch(1 0 0 / 0.65)">${activity.points} ⭐</span>
  </div>
  <span class="link-arrow">Play now ${icon("arrow-right")}</span>
</a>`;
}

export function journalCard(post, depth = 0) {
  const hue = hueFor(TOPIC_HUE, post.category);
  return `<article class="reveal accent-${hue}" style="height:100%"
   data-post
   data-title="${esc(post.title.toLowerCase())}"
   data-keywords="${esc(post.excerpt.toLowerCase())}"
   data-category="${esc(post.category)}">
  <a class="card card-link stack-4" href="${url(`journal/${post.slug}.html`, depth)}">
    <span class="cover" style="aspect-ratio:16/9;border-radius:1.25rem;font-size:2.6rem;background:linear-gradient(140deg, var(--accent-soft), oklch(1 0 0))" aria-hidden="true">${
      { Parenting: "🫶", Activities: "✂️", Learning: "🧠", "Child Development": "🌱", Safety: "🛡️", Creativity: "🎨" }[
        post.category
      ] ?? "📖"
    }</span>
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
  const tabs = AGE_STAGES.map((stage, i) => {
    const style = STAGE_STYLE[i] ?? STAGE_STYLE[0];
    return `<button type="button" class="stage-tab accent-${style.hue} reveal"
      data-stage-tab="${stage.id}" aria-pressed="${i === 0}" aria-controls="stage-${stage.id}">
      <span class="stage-tab__emoji" aria-hidden="true">${style.emoji}</span>
      <span class="stage-tab__age">${stage.ageLabel}</span>
      <span class="stage-tab__name">${esc(stage.stage)}</span>
      <span class="stage-tab__line">${esc(stage.headline)}</span>
    </button>`;
  }).join("\n      ");

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
    ["pink-soft", "pebble", 12, "left:-4rem;top:14%", "float-slow"],
    ["blue-soft", "dot", 5, "right:6%;top:8%", "float-mid"],
  ])}
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Age journey",
      title: "Personalised Learning for Every Age & Stage",
      description:
        "From curious beginners to confident learners, the age-based journey grows with your child. Pick a stage to see what learning looks like.",
    })}
    <div class="stage-tabs">
      ${tabs}
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
    const { hue, emoji } = step(i);
    const angle = (360 / METHOD_STEPS.length) * i;
    return `<button type="button" class="wheel__node" data-move="${move.number}"
        aria-pressed="${i === 0}" aria-controls="move-detail"
        style="--angle:${angle}deg;--node-ink:var(--${hue}-ink);--node-solid:var(--${hue})">
        <span aria-hidden="true">${emoji}</span>
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

/** The parent dashboard, on a full violet ground. */
export function dashboardPreview(depth = 0) {
  const skills = [
    { label: "Literacy", value: 85, accent: "blue" },
    { label: "Numeracy", value: 78, accent: "green" },
    { label: "Creativity", value: 92, accent: "pink" },
    { label: "Problem Solving", value: 80, accent: "amber" },
  ];
  const stats = [
    { label: "Activities completed", value: "24", icon: "trending-up", accent: "violet" },
    { label: "Time spent", value: "4h 30m", icon: "clock", accent: "blue" },
    { label: "Day streak", value: "7", icon: "flame", accent: "orange" },
  ];
  const badges = [
    ["Little Explorer", "⭐"],
    ["Creative Mind", "🎨"],
    ["Problem Solver", "🧩"],
    ["Story Explorer", "📚"],
  ];

  return `<section class="section section--solid accent-violet">
  <span class="shape shape--pebble" aria-hidden="true" style="--shape-fill:oklch(1 0 0 / 0.1);width:22rem;height:22rem;left:-6rem;bottom:-8rem"></span>
  <span class="shape shape--dot" aria-hidden="true" style="--shape-fill:oklch(1 0 0 / 0.09);width:8rem;height:8rem;right:8%;top:12%"></span>
  <div class="shell">
    <div class="split split--wide-right split--center">
      <div class="stack stack-6">
        ${sectionHeading({
          eyebrow: "Parent dashboard",
          title: "Learning That Parents Love.<br>Progress You Can See.",
          description:
            "You see what your child worked on, which skills are growing and where they need another week of practice — without asking them a single question.",
        })}
        <a class="btn btn--white btn--lg w-fit" href="${url("parents.html", depth)}">
          Explore the dashboard ${icon("arrow-right")}
        </a>
      </div>

      <div class="dash reveal" data-dash>
        <div class="dash__profile">
          <div class="flex items-center gap-4">
            <span class="dash__avatar" aria-hidden="true">🦊</span>
            <div>
              <p class="label">Hi, Parent! 👋</p>
              <p class="h3" style="font-size:1.2rem">Aarav · 5 years</p>
            </div>
          </div>
          <span class="pill pill--solid accent-green">Stage: Build</span>
        </div>

        <div class="dash__stats">
          ${stats
            .map(
              (s) => `<div class="dash__stat accent-${s.accent}">
            <span class="tile tile--sm">${icon(s.icon)}</span>
            <b data-count-to="${s.value}">${s.value}</b>
            <p>${esc(s.label)}</p>
          </div>`,
            )
            .join("\n          ")}
        </div>

        <div class="dash__panel">
          <div class="flex items-center justify-between">
            <h3 class="h3" style="font-size:1.1rem">Learning progress</h3>
            <span class="label">Last 7 days</span>
          </div>
          <div class="stack stack-4 mt-6">
            ${skills
              .map(
                (skill) => `<div class="accent-${skill.accent}">
              <div class="flex items-center justify-between small">
                <span class="font-semibold">${esc(skill.label)}</span>
                <span class="font-semibold muted" style="font-variant-numeric:tabular-nums">${skill.value}%</span>
              </div>
              <div class="meter"><span style="--value:${skill.value}%"></span></div>
            </div>`,
              )
              .join("\n            ")}
          </div>
        </div>

        <div class="dash__panel">
          <div class="flex items-center gap-2">
            <span style="color:var(--violet);display:grid">${icon("award")}</span>
            <h3 class="h3" style="font-size:1.1rem">Recent achievements</h3>
          </div>
          <div class="badge-row">
            ${badges.map(([label, emoji]) => `<span><span aria-hidden="true">${emoji}</span>${esc(label)}</span>`).join("\n            ")}
          </div>
        </div>

        <p class="tiny muted mt-4" style="padding-inline:0.5rem">Sample dashboard shown with example data.</p>
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
