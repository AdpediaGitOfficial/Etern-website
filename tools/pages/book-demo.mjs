import { icon } from "../icons.mjs";
import { esc, pageHero } from "../layout.mjs";
import { BRAND, DEMO_INTERESTS, FAQS } from "../content-etern.mjs";
import { faqList } from "../layout.mjs";

const STEPS = ["Child", "Age", "Interests", "Time", "Contact", "Confirm"];
const AGE_OPTIONS = ["3", "4", "5", "6", "7"];

export function bookDemoPage() {
  const progress = STEPS.map(
    (label, i) => `<div${i === 0 ? ' class="is-done is-current"' : ""} data-wizard-tick>
        <i></i><span>${label}</span>
      </div>`,
  ).join("\n      ");

  const body = `${pageHero({
    eyebrow: "Free demo",
    title: "Let's find the right starting point.",
    description: "Six quick questions. No payment details, no obligation.",
  })}

<section class="section">
  <div class="shell">
    <form class="wizard" data-wizard novalidate
          data-endpoint=""
          data-whatsapp="${BRAND.whatsapp}"
          data-email="${BRAND.email}">
      <div class="wizard__progress">
      ${progress}
      </div>

      <div class="wizard__card">
        <!-- 1 ------------------------------------------------------------ -->
        <fieldset class="wizard__step" data-step="0">
          <legend class="h3" style="font-size:1.5rem">Who are we meeting?</legend>
          <div class="form-field">
            <label for="childName">Child's first name</label>
            <input class="field field--boxy" id="childName" name="childName" maxlength="60"
                   placeholder="e.g. Aarav" autocomplete="off" required>
          </div>
        </fieldset>

        <!-- 2 ------------------------------------------------------------ -->
        <fieldset class="wizard__step" data-step="1" hidden>
          <legend class="h3" style="font-size:1.5rem">How old is <span data-child-name>your child</span>?</legend>
          <div class="age-pick" data-pick="childAge" role="group" aria-label="Child's age">
            ${AGE_OPTIONS.map((age) => `<button type="button" data-value="${age}" aria-pressed="false">${age}</button>`).join("\n            ")}
          </div>
          <p class="small muted" data-stage-hint hidden></p>
        </fieldset>

        <!-- 3 ------------------------------------------------------------ -->
        <fieldset class="wizard__step" data-step="2" hidden>
          <legend class="h3" style="font-size:1.5rem">What would you like to focus on?</legend>
          <div class="chip-row" data-pick="interests" data-multi role="group" aria-label="Areas of focus">
            ${DEMO_INTERESTS.map(
              (interest) =>
                `<button type="button" class="chip chip--lg" data-value="${esc(interest)}" aria-pressed="false">${esc(interest)}</button>`,
            ).join("\n            ")}
          </div>
        </fieldset>

        <!-- 4 ------------------------------------------------------------ -->
        <fieldset class="wizard__step" data-step="3" hidden>
          <legend class="h3" style="font-size:1.5rem">Pick a session time.</legend>
          <p class="small muted flex items-center gap-2">
            ${icon("globe", { size: 14 })} Times shown in your time zone (<span data-timezone>—</span>) · 30-minute session
          </p>
          <div class="day-scroller" data-days role="group" aria-label="Choose a day"></div>
          <div class="slot-grid" data-slots role="group" aria-label="Choose a time"></div>
          <p class="pill accent-primary" data-slot-summary hidden style="padding:0.75rem 1rem;font-size:0.875rem"></p>
        </fieldset>

        <!-- 5 ------------------------------------------------------------ -->
        <fieldset class="wizard__step" data-step="4" hidden>
          <legend class="h3" style="font-size:1.5rem">Where can we reach you?</legend>
          <div class="form-grid">
            <div class="form-field">
              <label for="parentName">Your name</label>
              <input class="field field--boxy" id="parentName" name="parentName" maxlength="80" autocomplete="name" required>
            </div>
            <div class="form-field">
              <label for="phone">Phone</label>
              <input class="field field--boxy" id="phone" name="phone" type="tel" maxlength="24" autocomplete="tel" required>
            </div>
            <div class="form-field col-span-2">
              <label for="email">Email</label>
              <input class="field field--boxy" id="email" name="email" type="email" maxlength="160" autocomplete="email" required>
            </div>
            <div class="form-field col-span-2">
              <label for="notes">Anything we should know? (optional)</label>
              <textarea class="field" id="notes" name="notes" maxlength="500"></textarea>
            </div>
          </div>
        </fieldset>

        <!-- 6 ------------------------------------------------------------ -->
        <fieldset class="wizard__step" data-step="5" hidden>
          <legend class="h3" style="font-size:1.5rem">Does this look right?</legend>
          <dl class="summary-list" data-summary></dl>
        </fieldset>

        <p class="form-error" data-wizard-error role="alert" hidden></p>

        <div class="wizard__nav">
          <button type="button" class="btn btn--ghost" data-wizard-back disabled>${icon("arrow-left")} Back</button>
          <button type="button" class="btn btn--primary btn--lg" data-wizard-next>Continue ${icon("arrow-right")}</button>
          <button type="submit" class="btn btn--primary btn--lg" data-wizard-submit hidden>Request my free demo</button>
        </div>
      </div>

      <p class="small muted text-center mt-6">
        Rather just talk? Call <a href="${BRAND.phoneHref}">${BRAND.phone}</a> or email
        <a href="mailto:${BRAND.email}">${BRAND.email}</a>.
      </p>
    </form>

    <!-- confirmation --------------------------------------------------- -->
    <div class="wizard" data-wizard-done hidden>
      <div class="card text-center" style="border-radius:2.5rem;padding:2.5rem;box-shadow:var(--shadow-lift)">
        <span class="tile accent-primary" style="width:4rem;height:4rem;border-radius:999px;margin-inline:auto">${icon("party-popper")}</span>
        <h2 class="display-2 mt-6" style="font-size:clamp(1.75rem,1.2rem+1.6vw,2.25rem)">Your request is ready to send.</h2>
        <p class="leading-relaxed muted mt-4" data-done-summary></p>
        <div class="flex flex-wrap justify-center gap-3 mt-8">
          <a class="btn btn--primary" data-send-whatsapp href="${BRAND.whatsapp}" target="_blank" rel="noreferrer noopener">Send on WhatsApp</a>
          <a class="btn btn--outline" data-send-email href="mailto:${BRAND.email}">Send by email</a>
        </div>
        <div class="flex flex-wrap justify-center gap-3 mt-4">
          <a class="btn btn--ghost" data-google-calendar href="#" target="_blank" rel="noreferrer noopener">${icon("calendar-plus")} Add to Google Calendar</a>
          <button type="button" class="btn btn--ghost" data-download-ics>${icon("download")} Download .ics</button>
        </div>
        <p class="small muted mt-6">Prefer to talk now? Call <a href="${BRAND.phoneHref}">${BRAND.phone}</a>.</p>
        <div class="flex flex-wrap justify-center gap-3 mt-4">
          <a class="btn btn--ghost" href="activities.html">Try an activity meanwhile</a>
          <a class="btn btn--ghost" href="programs.html">Browse programs</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--surface" id="contact">
  <div class="shell">
    <div class="split split--wide-right split--start">
      <div class="stack stack-5">
        <span class="eyebrow">Talk to us</span>
        <h2 class="display-2" style="font-size:clamp(1.875rem,1.2rem+2vw,2.5rem)">Prefer a conversation?</h2>
        <p class="lead">
          Call or message the Etern team directly — we will answer questions about stages, screen
          time and what a session actually looks like.
        </p>
        <ul class="contact-list">
          <li>${icon("phone")}<a href="${BRAND.phoneHref}">${BRAND.phone}</a></li>
          <li>${icon("mail")}<a href="mailto:${BRAND.email}">${BRAND.email}</a></li>
          <li>${icon("map-pin")}<span class="leading-relaxed">${esc(BRAND.address)}</span></li>
        </ul>
        <a class="btn btn--primary w-fit" href="${BRAND.whatsapp}" target="_blank" rel="noreferrer noopener">Chat on WhatsApp</a>
      </div>

      <div>
        <h2 class="label">Before you book</h2>
        <div class="mt-4">${faqList(FAQS.slice(0, 4))}</div>
      </div>
    </div>
  </div>
</section>`;

  return {
    file: "book-demo.html",
    title: "Book a Free Demo — Etern Learning",
    description:
      "Book a free, no-obligation demo session for your 3–7 year old. Pick a slot in your own time zone and we will match the right Etern stage.",
    canonical: "/book-demo",
    active: "",
    scripts: ["assets/js/book-demo.js"],
    body,
  };
}
