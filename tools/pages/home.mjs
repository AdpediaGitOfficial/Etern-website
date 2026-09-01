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
