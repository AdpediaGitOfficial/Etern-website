import { icon } from "../icons.mjs";
import { esc, url, sectionHeading, demoCta, decor, rainbow } from "../layout.mjs";
import {
  HERO_ART,
  ageJourney,
  dashboardPreview,
  howEternWorks,
  journalTeaser,
  methodSection,
  programCard,
  testimonialsSection,
} from "../sections.mjs";
import { PROGRAMS } from "../content-etern.mjs";
import { ACTIVITIES } from "../content-activities.mjs";

/** Hotspots mapped onto the miniature-world artwork (percentages of the box). */
const HOTSPOTS = [
  { label: "Grow", x: 50, y: 18, w: 26, h: 22, depth: 6 },
  { label: "Explore new worlds", x: 53, y: 23, w: 9, h: 8, depth: 10 },
  { label: "Learn", x: 19, y: 24, w: 17, h: 20, depth: 22 },
  { label: "Express yourself", x: 79, y: 25, w: 18, h: 20, depth: 22 },
  { label: "Move & play", x: 12, y: 50, w: 15, h: 20, depth: 26 },
  { label: "Build & discover", x: 87, y: 52, w: 15, h: 20, depth: 26 },
  { label: "Create something new", x: 14, y: 79, w: 16, h: 20, depth: 34 },
  { label: "Ask. Experiment. Discover.", x: 33, y: 80, w: 15, h: 20, depth: 34 },
  { label: "Kick, run, balance", x: 51, y: 81, w: 16, h: 20, depth: 34 },
  { label: "Everyday life skills", x: 70, y: 81, w: 14, h: 20, depth: 34 },
  { label: "Play & learn", x: 87, y: 79, w: 15, h: 20, depth: 34 },
];

const FEATURES = [
  { icon: "lightbulb", title: "Interactive Learning", body: "Engaging activities that make learning fun", accent: "violet" },
  { icon: "users", title: "Age-Based Journey", body: "Personalised learning for every stage", accent: "orange" },
  { icon: "shield-check", title: "Safe & Secure", body: "A safe digital environment for your child", accent: "green" },
  { icon: "bar-chart", title: "Track Progress", body: "Monitor growth and achievements", accent: "blue" },
  { icon: "heart", title: "Parent Connected", body: "Stay involved in your child's learning", accent: "pink" },
];

function hero() {
  const hotspots = HOTSPOTS.map(
    (h) => `<button type="button" class="hotspot" data-depth="${h.depth}"
          style="left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%"
          aria-label="${esc(h.label)}">
          <span class="hotspot__label">${esc(h.label)}</span>
        </button>`,
  ).join("\n        ");

  return `<section class="home-hero">
  <span class="home-hero__sky" aria-hidden="true"></span>
  ${decor([
    ["violet-soft", "pebble", 16, "left:-7rem;top:52%", "float-slow"],
    ["amber", "star", 2.4, "left:2%;top:58%", "float-mid"],
    ["teal-soft", "dot", 5, "left:11%;bottom:9%"],
    ["blue-soft", "pebble", 22, "right:-8rem;top:-6rem", "float-slow"],
    ["pink-soft", "drop", 9, "right:2%;bottom:4%", "float-mid"],
  ])}

  <div class="shell home-hero__grid">
    <div class="home-hero__copy">
      <p class="home-hero__eyebrow">${icon("sparkles")} Learning made playful, ages 3–7</p>

      <h1 class="display-1">
        A Little Curiosity.<br>
        A Lifetime of<br>
        ${rainbow("Possibilities.")}
      </h1>

      <p class="home-hero__keywords">
        <span class="k1">Play.</span>
        <span class="k2">Explore.</span>
        <span class="k3">Create.</span>
        <span class="k4">Grow.</span>
      </p>

      <p class="lead" style="max-width:30rem">
        Etern Learning nurtures confident young minds through interactive learning, creative
        exploration, and meaningful real-world experiences for children aged 3–7.
      </p>

      <div class="hero-cta">
        <a class="btn btn--primary btn--xl" href="programs.html">Explore Learning ${icon("arrow-right")}</a>
        <a class="btn btn--soft btn--xl" href="book-demo.html">Book a Free Demo ${icon("calendar-days")}</a>
      </div>
    </div>

    <div class="scene" data-scene>
      <div class="scene__sky">
        <span class="scene__ground" aria-hidden="true"></span>

        <div class="scene__stage" data-scene-stage>
          <img class="scene__img" src="${HERO_ART}" width="1200" height="900"
               alt="A floating world of tiny islands where children paint, read, code, dance, cook and play football around a treehouse"
               fetchpriority="high" decoding="async">
          ${hotspots}
        </div>
      </div>

      <div class="scene__bar">
        <p class="scene__hint">
          <span>${icon("mouse-pointer", { class: "i1" })} Drag to rotate</span>
          <span>${icon("sparkles", { class: "i2" })} Hover an island</span>
        </p>

        <div class="scene__controls" data-scene-controls hidden>
          <button type="button" data-scene-nudge="-1" aria-label="Rotate left">${icon("chevron-left")}</button>
          <button type="button" data-scene-nudge="1" aria-label="Rotate right">${icon("chevron-right")}</button>
          <button type="button" data-scene-toggle aria-label="Pause animation" data-icon-pause="${esc(icon("pause"))}" data-icon-play="${esc(icon("play"))}">${icon("pause")}</button>
          <button type="button" data-scene-reset aria-label="Reset view">${icon("rotate-ccw")}</button>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function featureStrip() {
  return `<div class="shell feature-strip">
  <ul class="reveal">
    ${FEATURES.map(
      (f) => `<li class="accent-${f.accent}">
      <span class="tile">${icon(f.icon)}</span>
      <span style="min-width:0">
        <b>${esc(f.title)}</b>
        <p>${esc(f.body)}</p>
      </span>
    </li>`,
    ).join("\n    ")}
  </ul>
</div>`;
}

function programsSection() {
  return `<section class="section">
  ${decor([
    ["violet-soft", "pebble", 15, "left:-5rem;top:10%", "float-slow"],
    ["amber-soft", "dot", 5, "right:7%;bottom:12%", "float-mid"],
  ])}
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Programs",
      title: "Our Learning Programs",
      description:
        "Comprehensive programs designed to nurture every aspect of your child's development — creativity, academics, emotional growth and safety, taught together.",
      center: true,
    })}
    <div class="grid grid--4 mt-14">
      ${PROGRAMS.map((p) => programCard(p, 0)).join("\n      ")}
    </div>
  </div>
</section>`;
}

function tryLesson() {
  const featured = ACTIVITIES.filter((a) => a.featuredOnHome);

  const tabs = featured
    .map(
      (a, i) => `<button type="button" class="chip chip--lg" data-lesson-tab="${a.slug}" aria-pressed="${i === 0}">
        <span aria-hidden="true">${a.emoji}</span> ${esc(a.title)}
      </button>`,
    )
    .join("\n      ");

  const briefs = featured
    .map(
      (a, i) => `<div data-lesson-brief="${a.slug}"${i > 0 ? " hidden" : ""}>
      <h3 class="h3" style="font-size:1.125rem">${esc(a.title)}</h3>
      <p class="small leading-relaxed muted mt-2">${esc(a.longDescription)}</p>
      <dl class="grid mt-4 small" style="grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem">
        <div><dt class="label">Ages</dt><dd class="font-semibold mt-2">${a.ageMin}–${a.ageMax}</dd></div>
        <div><dt class="label">Level</dt><dd class="font-semibold mt-2">${a.difficulty}</dd></div>
        <div><dt class="label">Stars</dt><dd class="font-semibold mt-2">${a.points}</dd></div>
      </dl>
    </div>`,
    )
    .join("\n      ");

  const data = featured.map((a) => ({
    slug: a.slug,
    title: a.title,
    engine: a.engine,
    rounds: a.rounds ?? null,
    pairs: a.pairs ?? null,
  }));

  return `<section class="section section--cream" id="try-a-lesson">
  ${decor([
    ["green-soft", "pebble", 14, "right:-4rem;bottom:6%", "float-mid"],
    ["pink-soft", "dot", 4, "left:6%;top:10%"],
  ])}
  <div class="shell">
    <div class="split split--start" style="gap:3rem">
      <div class="stack stack-6">
        ${sectionHeading({
          eyebrow: "Try it now — no signup",
          title: "Try a Little Etern Adventure",
          description:
            "Real activities from the Etern library, playable right here. Hand your phone to your child and watch what happens.",
        })}

        <div class="chip-row" data-lesson-tabs>
      ${tabs}
        </div>

        <div class="card" style="border-radius:var(--radius-2xl)">
      ${briefs}
        </div>

        <a class="btn btn--outline w-fit" href="activities.html">Browse all activities ${icon("arrow-right")}</a>
      </div>

      <div class="card" style="border-radius:2.25rem;padding:1.5rem;box-shadow:var(--shadow-lift)">
        <div data-player data-player-source="lesson-data"></div>
        <noscript>
          <p class="small muted">These activities need JavaScript to play.
            <a class="link-arrow" href="activities.html">See the full activity library</a>
          </p>
        </noscript>
      </div>
    </div>
  </div>

  <script type="application/json" id="lesson-data">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>
</section>`;
}

export function homePage() {
  return {
    file: "index.html",
    title: "Etern Learning — A Little Curiosity. A Lifetime of Possibilities.",
    description:
      "Early learning for children aged 3–7. Creativity, academic foundation, social-emotional growth and safety, delivered through short guided lessons and real off-screen activities.",
    canonical: "/",
    active: "",
    scripts: ["assets/js/hero-scene.js", "assets/js/activity-player.js"],
    body: [
      hero(),
      featureStrip(),
      ageJourney(0),
      programsSection(),
      tryLesson(),
      methodSection(),
      howEternWorks(),
      dashboardPreview(0),
      testimonialsSection(),
      journalTeaser(0),
      demoCta(0),
    ].join("\n\n"),
  };
}
