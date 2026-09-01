import { icon } from "../icons.mjs";
import { esc, url, pageHero, sectionHeading, faqList, demoCta, decor } from "../layout.mjs";
import {
  dashboardPreview,
  howEternWorks,
  hueFor,
  methodSection,
  testimonialsSection,
  TOPIC_HUE,
} from "../sections.mjs";
import { BRAND, FAQS, HOW_IT_WORKS_STEPS, VIDEOS, VIDEO_CATEGORIES } from "../content-etern.mjs";

/* ------------------------------------------------------------------ about */

const PILLARS = [
  { hue: "violet", icon: "lightbulb", title: "Curiosity first", body: "A child who wants to know something learns it faster than a child who is told to." },
  { hue: "blue", icon: "compass", title: "Structure without pressure", body: "Clear progression across four stages, with no race and no comparison." },
  { hue: "pink", icon: "heart", title: "Feelings count as learning", body: "Emotional skills sit beside letters and numbers, not after them." },
  { hue: "green", icon: "shield-check", title: "Safety, taught calmly", body: "Body safety and healthy habits, in language a young child can actually use." },
];

const DIFFERENCES = [
  { title: "The screen is the instruction, not the experience", body: "Sessions are short and end deliberately, handing the child a real activity to do next." },
  { title: "Four foundations, taught together", body: "Creativity, academics, emotional growth and safety are covered as one journey." },
  { title: "Built for the parent too", body: "Simple steps, calm guidance and clear visibility into what your child worked on." },
  { title: "Made for ages 3–7 only", body: "Nothing is borrowed from older-child curricula and scaled down." },
];

export function aboutPage() {
  const body = `${pageHero({
    accent: "violet",
    eyebrow: "Our story",
    title: "Building strong foundations for confident young learners.",
    description: esc(BRAND.description),
  })}

<section class="section">
  <div class="shell">
    <div class="split split--start">
      <div class="stack stack-5">
        <h2 class="display-2" style="font-size:clamp(1.875rem,1.2rem+2vw,2.5rem)">Why Etern exists</h2>
        <p class="lead">
          Children reflect what they see. Between three and seven, they build the habits that decide
          how school will feel later — attention, persistence, curiosity, the courage to try
          something they might get wrong.
        </p>
        <p class="lead">
          Etern Learning was built to give those years structure without turning them into
          schoolwork. Music, art, movement, stories, early concepts and life skills come together in
          short sessions children genuinely want to follow.
        </p>
      </div>

      <div class="grid grid--2">
        ${PILLARS.map(
          (p) => `<div class="card card--tint stack stack-3 accent-${p.hue} reveal">
          <span class="tile tile--sm tile--solid">${icon(p.icon)}</span>
          <h3 class="h3" style="font-size:1.125rem">${esc(p.title)}</h3>
          <p class="small leading-relaxed muted">${esc(p.body)}</p>
        </div>`,
        ).join("\n        ")}
      </div>
    </div>
  </div>
</section>

<section class="section section--surface">
  <div class="shell">
    ${sectionHeading({ eyebrow: "Our approach", title: "What makes Etern different.", center: true })}
    <div class="grid grid--2 mt-12">
      ${DIFFERENCES.map(
        (item, i) => `<div class="card card--pad-lg numbered-card reveal accent-${["violet", "orange", "green", "blue"][i % 4]}">
        <span class="num">0${i + 1}</span>
        <div>
          <h3 class="h3" style="font-size:1.25rem">${esc(item.title)}</h3>
          <p class="leading-relaxed muted mt-2">${esc(item.body)}</p>
        </div>
      </div>`,
      ).join("\n      ")}
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="shell">
    <div class="text-center" style="max-width:48rem;margin-inline:auto">
      <h2 class="display-2" style="font-size:clamp(1.875rem,1.2rem+2vw,2.5rem)">Our parent promise</h2>
      <p class="lead mt-6">
        Short sessions that respect your child's attention. Activities that happen away from the
        screen. Content that is safe, calm and age-appropriate. And enough visibility that you always
        know what your child is learning.
      </p>
      <p class="small muted mt-6">${esc(BRAND.address)} · ${BRAND.phone}</p>
    </div>
  </div>
</section>

${demoCta(0)}`;

  return {
    file: "about.html",
    title: "About Etern Learning — Foundations for Confident Young Learners",
    description:
      "Etern Learning creates meaningful early-learning experiences for children aged 3–7, blending creativity, academics, emotional development and safety education.",
    canonical: "/about",
    active: "about.html",
    body,
  };
}

/* ----------------------------------------------------------- how it works */

const WEEK = [
  { day: "Mon", focus: "Creative session", detail: "Music, rhythm or art — the week starts loose." },
  { day: "Tue", focus: "Early concepts", detail: "Letters, numbers or patterns in a short lesson." },
  { day: "Wed", focus: "Off-screen build", detail: "A hands-on activity using household objects." },
  { day: "Thu", focus: "Feelings & words", detail: "Naming emotions, storytelling, conversation." },
  { day: "Fri", focus: "Life & safety skills", detail: "Practical habits taught calmly." },
  { day: "Sat", focus: "Free explore", detail: "Your child picks any activity they liked." },
];

export function howItWorksPage() {
  const body = `${pageHero({
    accent: "blue",
    eyebrow: "How it works",
    title: "Twenty quiet minutes. Then the real thing.",
    description:
      "Etern sessions are short by design. The screen explains the idea, then hands your child something to actually do.",
  })}

<section class="section">
  <div class="shell">
    ${sectionHeading({ eyebrow: "The flow", title: "Four steps, every session." })}
    <div class="grid grid--4 mt-12">
      ${HOW_IT_WORKS_STEPS.map(
        (step, i) => `<div class="card card--tint stack stack-3 reveal accent-${["blue", "green", "pink", "amber"][i % 4]}">
        <span class="numbered-card"><span class="num">0${i + 1}</span></span>
        <h3 class="h3" style="font-size:1.125rem">${esc(step.title)}</h3>
        <p class="small leading-relaxed muted">${esc(step.description)}</p>
      </div>`,
      ).join("\n      ")}
    </div>
  </div>
</section>

${methodSection()}

<section class="section section--cream">
  <div class="shell">
    ${sectionHeading({
      eyebrow: "A week with Etern",
      title: "What it looks like in a normal week.",
      description: "Nothing here needs printing, buying or planning.",
    })}
    <div class="grid grid--3 mt-12">
      ${WEEK.map(
        (item, i) => `<div class="card card--tint flex items-start gap-4 reveal accent-${["violet", "blue", "green", "pink", "amber", "orange"][i % 6]}" style="border-radius:1.75rem">
        <span class="tile tile--solid" style="font-family:var(--font-display);font-size:0.875rem;font-weight:700">${item.day}</span>
        <div>
          <h3 style="font-family:var(--font-sans);font-size:1rem;font-weight:600">${esc(item.focus)}</h3>
          <p class="small leading-relaxed muted mt-2">${esc(item.detail)}</p>
        </div>
      </div>`,
      ).join("\n      ")}
    </div>
  </div>
</section>

${howEternWorks()}

<section class="section">
  <div class="shell">
    <div class="split split--wide-right split--start">
      <div>
        ${sectionHeading({
          eyebrow: "Questions",
          title: "Everything parents ask us first.",
          description: "Still unsure? A free demo answers most of it in fifteen minutes.",
        })}
        <a class="btn btn--primary mt-6" href="book-demo.html">Book a Free Demo</a>
      </div>
      ${faqList(FAQS)}
    </div>
  </div>
</section>

${demoCta(0)}`;

  return {
    file: "how-it-works.html",
    title: "How Etern Learning Works — Short Sessions, Real Activities",
    description:
      "See how a week of Etern Learning fits into family life: guided sessions, off-screen activities, gentle progression and clear visibility for parents.",
    canonical: "/how-it-works",
    active: "how-it-works.html",
    body,
  };
}

/* ---------------------------------------------------------------- parents */

const BENEFITS = [
  { hue: "violet", icon: "clock", title: "Short by design", body: "Sessions end on purpose, so screen time never quietly becomes an hour." },
  { hue: "blue", icon: "eye", title: "You can see everything", body: "Each session shows what was covered and what to try together next." },
  { hue: "green", icon: "bar-chart", title: "Progress without pressure", body: "Gentle streaks and milestones — encouragement, not scoreboards." },
  { hue: "amber", icon: "shield-check", title: "Safe content, always", body: "No ads, no open comments, no recommendations pulling your child elsewhere." },
];

const ROUTINE = [
  "Pick a 15–20 minute window that already exists in your day.",
  "Sit close for the first few sessions, then let your child lead.",
  "Do the off-screen activity the same day, even briefly.",
  "Talk about it at dinner — recall is where learning sticks.",
];

export function parentsPage() {
  const body = `${pageHero({
    accent: "green",
    eyebrow: "For parents",
    title: "You stay in the loop, without becoming the teacher.",
    description:
      "Etern is built to fit into family life: short sessions, real activities, and a clear view of how your child is growing.",
    actions: `<div class="flex flex-wrap gap-3 mt-2">
        <a class="btn btn--primary btn--lg" href="book-demo.html">Book a Free Demo</a>
        <a class="btn btn--outline btn--lg" href="activities.html">Try an activity free</a>
      </div>`,
  })}

<section class="section">
  <div class="shell">
    ${sectionHeading({ eyebrow: "Why parents choose us", title: "Four things we refuse to compromise." })}
    <div class="grid grid--4 mt-12">
      ${BENEFITS.map(
        (b) => `<div class="card card--tint stack stack-3 accent-${b.hue} reveal">
        <span class="tile tile--sm tile--solid">${icon(b.icon)}</span>
        <h3 class="h3" style="font-size:1.125rem">${esc(b.title)}</h3>
        <p class="small leading-relaxed muted">${esc(b.body)}</p>
      </div>`,
      ).join("\n      ")}
    </div>
  </div>
</section>

${dashboardPreview(0)}

<section class="section section--cream">
  <div class="shell">
    <div class="split split--center">
      ${sectionHeading({
        eyebrow: "Making it a routine",
        title: "Four habits that make Etern work.",
        description:
          "Consistency matters far more than length. Ten focused minutes beats an unfocused hour.",
      })}
      <ol class="stack stack-3">
        ${ROUTINE.map(
          (step, i) => `<li class="card flex items-start gap-4 reveal accent-${["violet", "orange", "green", "blue"][i % 4]}" style="border-radius:1.75rem">
          <span class="tile tile--sm tile--solid" style="border-radius:999px;font-family:var(--font-display);font-size:1rem;font-weight:700;width:2.4rem;height:2.4rem">${i + 1}</span>
          <p class="leading-relaxed">${esc(step)}</p>
        </li>`,
        ).join("\n        ")}
      </ol>
    </div>
  </div>
</section>

${testimonialsSection()}

<section class="section">
  <div class="shell">
    ${sectionHeading({ eyebrow: "Parent FAQ", title: "Straight answers.", center: true })}
    <div class="mt-10" style="max-width:48rem;margin-inline:auto">
      ${faqList(FAQS)}
    </div>
  </div>
</section>

${demoCta(0)}`;

  return {
    file: "parents.html",
    title: "For Parents — Calm, Visible Early Learning | Etern Learning",
    description:
      "How Etern Learning supports parents: short screen time, off-screen activities, progress you can see, and safety-first content for ages 3–7.",
    canonical: "/parents",
    active: "parents.html",
    body,
  };
}

/* ----------------------------------------------------------------- videos */

export function videosPage() {
  const cards = VIDEOS.map(
    (video) => `<article class="card card-link stack-4 reveal accent-${hueFor(TOPIC_HUE, video.category)}"
      data-video
      data-title="${esc(video.title.toLowerCase())}"
      data-keywords="${esc(video.description.toLowerCase())}"
      data-category="${esc(video.category)}">
      <div class="thumb">
        <span class="thumb__play">${icon("play")}</span>
        <span class="thumb__time">${video.duration}</span>
      </div>
      <div class="flex items-center gap-2 tiny muted">
        <span class="pill pill--plain">${esc(video.category)}</span>
        <span>Ages ${esc(video.ageLabel)}</span>
      </div>
      <h2 class="h3" style="font-size:1.125rem">${esc(video.title)}</h2>
      <p class="small leading-relaxed muted">${esc(video.description)}</p>
    </article>`,
  ).join("\n      ");

  const body = `${pageHero({
    accent: "pink",
    eyebrow: "Video library",
    title: "Watch, then go and do it.",
    description: "Every video is short and ends with something to try away from the screen.",
  })}

<section class="section">
  <div class="shell" data-filter-root data-filter-target="[data-video]" data-filter-noun="video|videos">
    <div class="flex flex-wrap items-center justify-between gap-5">
      <div class="search-field" style="width:100%;max-width:20rem">
        ${icon("search")}
        <input class="field" type="search" data-filter-search placeholder="Search videos" aria-label="Search videos">
      </div>
      <div class="chip-row" data-filter-group="category">
        <button type="button" class="chip" data-value="All" aria-pressed="true">All</button>
        ${VIDEO_CATEGORIES.map((c) => `<button type="button" class="chip" data-value="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join("\n        ")}
      </div>
    </div>

    <p class="small muted mt-6" data-filter-count aria-live="polite"></p>

    <div class="grid grid--3 mt-6" data-filter-results>
      ${cards}
    </div>

    <div class="empty-state mt-6" data-filter-empty hidden>
      <h2 class="h3">No videos match that.</h2>
      <button type="button" class="btn btn--outline" data-filter-clear>Clear filters</button>
    </div>

    <p class="note mt-8">
      Video playback is a placeholder for now — real lesson videos will stream here once the content
      library is connected.
    </p>
  </div>
</section>

<section class="section section--surface">
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Inside the app",
      title: "The full library lives in the Etern app.",
      center: true,
    })}
    <div class="flex flex-wrap justify-center gap-3 mt-8">
      <a class="btn btn--primary btn--lg" href="${BRAND.apps.ios}" target="_blank" rel="noreferrer noopener">App Store</a>
      <a class="btn btn--outline btn--lg" href="${BRAND.apps.android}" target="_blank" rel="noreferrer noopener">Google Play</a>
    </div>
  </div>
</section>

${demoCta(0)}`;

  return {
    file: "videos.html",
    title: "Video Library — Guided Lessons & Activities | Etern Learning",
    description:
      "Browse Etern Learning's video library: short guided lessons, creative activities, emotional-skill stories and safety talks for children aged 3–7.",
    canonical: "/videos",
    active: "",
    scripts: ["assets/js/filters.js"],
    body,
  };
}

/* ------------------------------------------------------------------ legal */

const PRIVACY_SECTIONS = [
  { heading: "Information we collect", body: "We collect the parent's name, email address and phone number when an account or demo is requested, plus the child's first name and age range used to personalise learning content." },
  { heading: "How we use it", body: "Information is used to deliver lessons, track learning progress, respond to enquiries and improve our programs. We do not sell personal data." },
  { heading: "Children's data", body: "Accounts are created and controlled by a parent or guardian. Children do not have public profiles, cannot message other users, and see no advertising inside Etern Learning." },
  { heading: "Data retention and deletion", body: "Parents may request correction or deletion of their account and their child's learning records at any time by contacting us." },
  { heading: "Security", body: "Data is stored with access controls so that a parent can only read and write records belonging to their own family." },
];

const TERMS_SECTIONS = [
  { heading: "Using Etern Learning", body: "Accounts are for family use. A parent or guardian is responsible for supervising their child's use of the platform and for the accuracy of the information provided." },
  { heading: "Content and intellectual property", body: "Lessons, activities, videos, illustrations and written material belong to Etern Learning Private Limited and may be used for personal, non-commercial learning only." },
  { heading: "Programs and demos", body: "Free demo sessions are offered without obligation. Program availability, schedules and pricing may change; we will always confirm details before enrolment." },
  { heading: "Acceptable use", body: "Do not copy, resell, redistribute or attempt to disrupt the platform. We may suspend accounts that misuse the service." },
  { heading: "Changes to these terms", body: "We may update these terms as the platform grows. Continued use after an update means the revised terms apply." },
];

function legalPage({ file, title, description, canonical, hero, sections, closing }) {
  const body = `${pageHero(hero)}

<section class="section">
  <div class="shell">
    <div class="legal-doc">
      ${sections
        .map(
          (s) => `<div class="stack stack-3">
        <h2>${esc(s.heading)}</h2>
        <p class="leading-relaxed muted">${esc(s.body)}</p>
      </div>`,
        )
        .join("\n      ")}
      ${closing}
      <p class="note">This summary is provided for clarity and will be replaced by the full reviewed text.</p>
    </div>
  </div>
</section>`;

  return { file, title, description, canonical, active: "", body };
}

export function privacyPage() {
  return legalPage({
    file: "privacy.html",
    title: "Privacy Policy — Etern Learning",
    description:
      "How Etern Learning collects, uses and protects information for parents and children using our early-learning platform.",
    canonical: "/privacy",
    hero: {
      eyebrow: "Legal",
      title: "Privacy Policy",
      description: "A plain-language summary of how we handle your family's information.",
    },
    sections: PRIVACY_SECTIONS,
    closing: `<div class="stack stack-3">
        <h2>Contact us</h2>
        <p class="leading-relaxed muted">${esc(BRAND.address)}<br>
          <a href="mailto:${BRAND.email}">${BRAND.email}</a> · <a href="${BRAND.phoneHref}">${BRAND.phone}</a>
        </p>
      </div>`,
  });
}

export function termsPage() {
  return legalPage({
    file: "terms.html",
    title: "Terms of Use — Etern Learning",
    description:
      "The terms that apply when parents and children use Etern Learning's website, app, programs and activities.",
    canonical: "/terms",
    hero: {
      eyebrow: "Legal",
      title: "Terms of Use",
      description: "The basics of what you can expect from us, and what we ask of you.",
    },
    sections: TERMS_SECTIONS,
    closing: `<div class="stack stack-3">
        <h2>Questions</h2>
        <p class="leading-relaxed muted">
          <a href="mailto:${BRAND.email}">${BRAND.email}</a> · <a href="${BRAND.phoneHref}">${BRAND.phone}</a>
        </p>
      </div>`,
  });
}

/* -------------------------------------------------------------------- 404 */

export function notFoundPage() {
  const body = `<section class="section section--cream" style="padding-top:6rem">
  <div class="shell">
    <div class="text-center" style="max-width:32rem;margin-inline:auto">
      <p class="display-1 gradient-text" style="font-size:6rem">404</p>
      <h1 class="h3 mt-4">Page not found</h1>
      <p class="muted mt-2">The page you're looking for doesn't exist or has been moved.</p>
      <div class="flex flex-wrap justify-center gap-3 mt-8">
        <a class="btn btn--primary btn--lg" href="${url("index.html", 0)}">Go home</a>
        <a class="btn btn--outline btn--lg" href="${url("activities.html", 0)}">Try an activity</a>
      </div>
    </div>
  </div>
</section>`;

  return {
    file: "404.html",
    title: "Page not found — Etern Learning",
    description: "The page you're looking for doesn't exist or has been moved.",
    canonical: "/404",
    active: "",
    extraHead: '<meta name="robots" content="noindex">',
    body,
  };
}
