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

const FEATURES = [
  { icon: "lightbulb", title: "Interactive Learning", body: "Engaging activities that make learning fun", accent: "violet" },
  { icon: "users", title: "Age-Based Journey", body: "Personalised learning for every stage", accent: "orange" },
  { icon: "shield-check", title: "Safe & Secure", body: "A safe digital environment for your child", accent: "green" },
  { icon: "bar-chart", title: "Track Progress", body: "Monitor growth and achievements", accent: "blue" },
  { icon: "heart", title: "Parent Connected", body: "Stay involved in your child's learning", accent: "pink" },
];

function hero() {
  return `<section class="home-hero">
  <img class="home-hero__art" src="${HERO_ART}" width="1920" height="1080"
       alt="A floating world of tiny islands above the clouds, where children read, paint, garden, play music, build robots and kick a football around a glowing treehouse"
       fetchpriority="high" decoding="async">
  <span class="home-hero__veil" aria-hidden="true"></span>

  ${decor([
    ["amber", "star", 2.2, "left:4%;top:22%", "float-mid"],
    ["teal-soft", "dot", 4.5, "left:9%;bottom:26%"],
    ["pink-soft", "drop", 8, "left:29%;bottom:12%", "float-mid"],
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

      <p class="lead">
        Etern Learning nurtures confident young minds through interactive learning, creative
        exploration, and meaningful real-world experiences for children aged 3–7.
      </p>

      <div class="hero-cta">
        <a class="btn btn--primary btn--xl" href="programs.html">Explore Learning ${icon("arrow-right")}</a>
        <a class="btn btn--soft btn--xl" href="book-demo.html">Book a Free Demo ${icon("calendar-days")}</a>
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
      (a, i) => `<button type="button" class="try-chip" data-lesson-tab="${a.slug}" aria-pressed="${i === 0}">
          <span aria-hidden="true">${a.emoji}</span> ${esc(a.title)}
        </button>`,
    )
    .join("\n        ");

  const briefs = featured
    .map(
      (a, i) => `<div data-lesson-brief="${a.slug}"${i > 0 ? " hidden" : ""}>
          <p class="try-brief">${esc(a.longDescription)}</p>
          <ul class="try-meta">
            <li><span class="label">Ages</span><b>${a.ageMin}–${a.ageMax}</b></li>
            <li><span class="label">Level</span><b>${esc(a.difficulty)}</b></li>
            <li><span class="label">Stars</span><b>${icon("star")}${a.points}</b></li>
          </ul>
        </div>`,
    )
    .join("\n        ");

  const data = featured.map((a) => ({
    slug: a.slug,
    title: a.title,
    engine: a.engine,
    rounds: a.rounds ?? null,
    pairs: a.pairs ?? null,
  }));

  return `<section class="section section--cream try-band" id="try-a-lesson">
  ${decor([
    ["pink-soft", "pebble", 13, "left:-5rem;top:-3rem", "float-slow"],
    ["green-soft", "pebble", 15, "right:-4rem;bottom:-4rem", "float-mid"],
    ["amber", "star", 1.4, "left:47%;top:9%", "float-mid"],
    ["pink", "star", 0.9, "left:4%;bottom:8%"],
  ])}

  <div class="shell try-grid">
    <div class="try-copy">
      <p class="eyebrow">${icon("sparkles")} Try it now — no signup</p>
      <h2>Try a Little<br><span class="rainbow-text">Etern Adventure</span></h2>
      <p class="lead">Real activities from the Etern library, playable right here. Hand your phone
        to your child and watch what happens.</p>

      <div class="try-chips" data-lesson-tabs>
        ${tabs}
      </div>

      <div class="try-briefs">
        ${briefs}
      </div>

      <a class="btn btn--primary btn--lg" href="${url("activities.html", 0)}">Browse all activities ${icon("arrow-right")}</a>
    </div>

    <div class="try-stage">
      <div class="device">
        <span class="device__cam" aria-hidden="true"></span>
        <div class="device__screen">
          <div data-player data-player-source="lesson-data"></div>
          <noscript>
            <p class="small muted">These activities need JavaScript to play.
              <a class="link-arrow" href="${url("activities.html", 0)}">See the full activity library</a>
            </p>
          </noscript>
        </div>
        <span class="device__bar" aria-hidden="true"></span>
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
    scripts: ["assets/js/activity-player.js"],
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
