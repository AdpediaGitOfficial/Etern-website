/** Sections and cards reused across more than one page. */

import { icon } from "./icons.mjs";
import { esc, url, sectionHeading } from "./layout.mjs";
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

export function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* ------------------------------------------------------------------ cards */

export function programCard(program, depth = 0) {
  return `<a class="card card--bordered card-link stack-5 accent-${program.accent} reveal"
   href="${url(`programs/${program.slug}.html`, depth)}">
  <div class="flex items-start justify-between gap-4">
    <span class="tile tile--lg">${icon(PROGRAM_ICONS[program.icon] ?? "palette")}</span>
    <span class="pill pill--outline">Ages ${program.ageMin}–${program.ageMax}</span>
  </div>
  <div class="stack stack-3">
    <h3 class="h3">${esc(program.title)}</h3>
    <p class="small leading-relaxed muted">${esc(program.shortDescription)}</p>
  </div>
  <div class="chip-row">
    ${program.skills
      .slice(0, 3)
      .map((skill) => `<span class="pill pill--plain">${esc(skill)}</span>`)
      .join("\n    ")}
  </div>
  <span class="link-arrow">View program ${icon("arrow-up-right")}</span>
</a>`;
}

export function activityCard(activity, depth = 0) {
  return `<a class="card card--bordered card-link stack-4 accent-${activity.accent} reveal"
   href="${url(`activities/${activity.slug}.html`, depth)}"
   data-activity
   data-title="${esc(activity.title.toLowerCase())}"
   data-keywords="${esc([activity.description, ...activity.skills].join(" ").toLowerCase())}"
   data-category="${esc(activity.category)}"
   data-difficulty="${activity.difficulty}"
   data-age-min="${activity.ageMin}" data-age-max="${activity.ageMax}">
  <div class="flex items-start justify-between">
    <span class="tile tile--lg" style="font-size:1.75rem" aria-hidden="true">${activity.emoji}</span>
    <span class="pill pill--outline">Ages ${activity.ageMin}–${activity.ageMax}</span>
  </div>
  <div>
    <h3 class="h3" style="font-size:1.25rem">${esc(activity.title)}</h3>
    <p class="small leading-relaxed muted mt-2">${esc(activity.description)}</p>
  </div>
  <div class="chip-row">
    <span class="pill">${esc(activity.category)}</span>
    <span class="pill pill--plain">${activity.difficulty}</span>
    <span class="pill pill--plain">${activity.points} ⭐</span>
  </div>
  <span class="link-arrow">Play now ${icon("arrow-right")}</span>
</a>`;
}

export function journalCard(post, depth = 0) {
  return `<article class="reveal" style="height:100%"
   data-post
   data-title="${esc(post.title.toLowerCase())}"
   data-keywords="${esc(post.excerpt.toLowerCase())}"
   data-category="${esc(post.category)}">
  <a class="card card-link stack-4" href="${url(`journal/${post.slug}.html`, depth)}">
    <div class="flex items-center gap-3 tiny muted">
      <span class="pill">${esc(post.category)}</span>
      <span>${formatDate(post.date)} · ${post.readingMinutes} min</span>
    </div>
    <h3 class="h3" style="font-size:1.25rem">${esc(post.title)}</h3>
    <p class="small leading-relaxed muted">${esc(post.excerpt)}</p>
    <span class="link-arrow">Read more ${icon("arrow-right")}</span>
  </a>
</article>`;
}

/* --------------------------------------------------------------- sections */

export function ageJourney(depth = 0) {
  const stages = AGE_STAGES.map(
    (stage, index) => `<details class="stage accent-${stage.accent} reveal"${index === 0 ? " open" : ""}>
    <summary>
      <span class="stage__age">${stage.ageLabel}</span>
      <span class="stage__head">
        <span class="stage__step">Stage ${index + 1}</span>
        <span class="stage__name">${esc(stage.stage)}</span>
        <span class="stage__line">${esc(stage.headline)}</span>
      </span>
      <span class="stage__chev">${icon("chevron-down")}</span>
    </summary>
    <div class="stage__body">
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

      <div class="stack stack-5 card card--surface" style="border:0">
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
        <a class="btn btn--primary btn--block mt-auto" href="${url("book-demo.html", depth)}">Book a free demo</a>
      </div>
    </div>
  </details>`,
  ).join("\n\n  ");

  return `<section class="section section--surface">
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Age journey",
      title: "Where Is Your Child on Their Learning Journey?",
      description:
        "Four stages, each with its own pace and expectations. Open a stage to see what learning actually looks like at that age.",
    })}
    <div class="stage-list">
  ${stages}
    </div>
  </div>
</section>`;
}

export function methodSection() {
  return `<section class="section section--dark">
  <div class="blob" style="width:26rem;height:26rem;background:color-mix(in oklab, var(--primary) 40%, transparent);right:-6rem;top:2.5rem"></div>
  <div class="blob" style="width:20rem;height:20rem;background:color-mix(in oklab, var(--accent) 40%, transparent);left:-4rem;bottom:0"></div>
  <div class="shell">
    ${sectionHeading({
      eyebrow: "The Etern method",
      title: "From Curiosity to Confidence.",
      description:
        '<span style="color:color-mix(in oklab, var(--background) 70%, transparent)">Five moves repeated in every session. It is a rhythm, not a curriculum a child has to keep up with.</span>',
    })}
    <div class="mt-14">
      ${METHOD_STEPS.map(
        (step) => `<div class="method-row reveal">
        <span class="method-row__num">${step.number}</span>
        <div>
          <h3>${esc(step.title)}</h3>
          <p class="body">${esc(step.description)}</p>
        </div>
        <p class="outcome">${esc(step.outcome)}</p>
      </div>`,
      ).join("\n      ")}
    </div>
  </div>
</section>`;
}

export function howEternWorks() {
  const outcomes = {
    watch: "Watch a lesson.",
    do: "Complete an activity.",
    create: "Create something.",
    share: "Share it with parents.",
  };

  return `<section class="section section--surface">
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
        (step, i) => `<button type="button" class="step-card accent-${step.accent} reveal"
        data-step="${step.id}" aria-pressed="${i === 0}" aria-controls="step-detail">
        <span class="label">Step ${i + 1}</span>
        <span class="tile">${icon(STEP_ICONS[step.icon] ?? "play-circle")}</span>
        <span class="step-card__title">${esc(step.title)}</span>
        <span class="small leading-relaxed muted">${esc(step.description)}</span>
      </button>`,
      ).join("\n      ")}
    </div>

    <div class="step-detail" id="step-detail" aria-live="polite">
      ${HOW_IT_WORKS_STEPS.map(
        (step, i) => `<div data-step-panel="${step.id}"${i > 0 ? " hidden" : ""} class="flex items-center justify-between gap-6 full" style="flex-wrap:wrap">
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

export function dashboardPreview() {
  const skills = [
    { label: "Cognitive Skills", value: 82, accent: "primary" },
    { label: "Creativity", value: 91, accent: "coral" },
    { label: "Communication", value: 76, accent: "accent" },
    { label: "Social Skills", value: 85, accent: "leaf" },
  ];
  const stats = [
    { label: "Day learning streak", value: "7", icon: "flame", accent: "coral" },
    { label: "Activities completed", value: "12", icon: "trending-up", accent: "primary" },
    { label: "New skills", value: "4", icon: "sparkles", accent: "sun" },
  ];
  const badges = [
    ["Little Explorer", "⭐"],
    ["Creative Mind", "🎨"],
    ["Problem Solver", "🧩"],
    ["Story Explorer", "📚"],
  ];

  return `<section class="section">
  <div class="shell">
    <div class="split split--wide-right split--center">
      ${sectionHeading({
        eyebrow: "Parent dashboard",
        title: "Parents Stay Connected.",
        description:
          "You see what your child worked on, which skills are growing and where they need another week of practice — without asking them a single question.",
      })}

      <div class="dash reveal">
        <div class="dash__profile">
          <div class="flex items-center gap-4">
            <span class="dash__avatar" aria-hidden="true">🦊</span>
            <div>
              <p class="label">Child profile</p>
              <p class="h3" style="font-size:1.25rem">Aarav · 5 years</p>
            </div>
          </div>
          <span class="pill accent-leaf" style="font-weight:600">Stage: Build</span>
        </div>

        <div class="dash__stats">
          ${stats
            .map(
              (s) => `<div class="dash__stat accent-${s.accent}">
            <span class="tile tile--sm">${icon(s.icon)}</span>
            <b>${s.value}</b>
            <p class="tiny muted">${esc(s.label)}</p>
          </div>`,
            )
            .join("\n          ")}
        </div>

        <div class="dash__panel">
          <div class="flex items-center justify-between">
            <h3 class="h3" style="font-size:1.125rem">Weekly progress</h3>
            <span class="label">Last 7 days</span>
          </div>
          <div class="stack stack-4 mt-6">
            ${skills
              .map(
                (skill) => `<div class="accent-${skill.accent}">
              <div class="flex items-center justify-between small">
                <span class="font-semibold">${esc(skill.label)}</span>
                <span class="font-semibold muted">${skill.value}%</span>
              </div>
              <div class="meter"><span style="--value:${skill.value}%"></span></div>
            </div>`,
              )
              .join("\n            ")}
          </div>
        </div>

        <div class="dash__panel">
          <div class="flex items-center gap-2">
            <span style="color:var(--primary);display:grid">${icon("award")}</span>
            <h3 class="h3" style="font-size:1.125rem">Recent achievements</h3>
          </div>
          <div class="badge-row">
            ${badges.map(([label, emoji]) => `<span><span aria-hidden="true">${emoji}</span>${esc(label)}</span>`).join("\n            ")}
          </div>
        </div>

        <p class="tiny muted mt-4" style="padding-inline:0.5rem">
          Sample dashboard shown with example data.
        </p>
      </div>
    </div>
  </div>
</section>`;
}

export function testimonialsSection() {
  return `<section class="section section--cream">
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Real reviews. Real trust.",
      title: "What Parents Are Saying.",
      description: "Reviews from families using Etern Learning today.",
      center: true,
    })}

    <div class="grid grid--2 mt-14">
      ${TESTIMONIALS.map(
        (t) => `<figure class="card card--pad-lg card--soft quote-card reveal">
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
      ).join("\n      ")}
    </div>
  </div>
</section>`;
}

export function journalTeaser(depth = 0) {
  return `<section class="section">
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
