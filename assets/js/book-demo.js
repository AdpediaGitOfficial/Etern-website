/**
 * Six-step demo booking wizard.
 *
 * Slots are published in India Standard Time (fixed UTC+5:30, no DST) because
 * that is where the Etern team sits, then rendered in the visitor's own zone.
 *
 * There is no backend: on submit the form hands the completed request to
 * WhatsApp or email. Point `data-endpoint` at a form service (Formspree,
 * Basin, a serverless function…) and it will POST there as JSON instead.
 */

(() => {
  const form = document.querySelector("[data-wizard]");
  if (form) {
    /* ------------------------------------------------------------ schedule */

    const IST_OFFSET_MINUTES = 330;
    const WEEKDAY_HOURS = [10, 12, 16, 18];
    const WEEKEND_HOURS = [10, 11.5, 17];
    const SESSION_MINUTES = 30;

    const timeZone = (() => {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      } catch {
        return "UTC";
      }
    })();

    function istParts(date) {
      const shifted = new Date(date.getTime() + IST_OFFSET_MINUTES * 60000);
      return {
        year: shifted.getUTCFullYear(),
        month: shifted.getUTCMonth(),
        day: shifted.getUTCDate(),
      };
    }

    function generateSlots(days = 14, now = new Date()) {
      const slots = [];
      const today = istParts(now);
      for (let offset = 1; offset <= days; offset += 1) {
        const cursor = new Date(Date.UTC(today.year, today.month, today.day + offset));
        const year = cursor.getUTCFullYear();
        const month = cursor.getUTCMonth();
        const day = cursor.getUTCDate();
        const weekday = cursor.getUTCDay();
        const hours = weekday === 0 || weekday === 6 ? WEEKEND_HOURS : WEEKDAY_HOURS;
        const dayKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        for (const hour of hours) {
          const minutes = Math.round(hour * 60) - IST_OFFSET_MINUTES;
          const instant = new Date(Date.UTC(year, month, day, 0, minutes));
          if (instant.getTime() <= now.getTime()) continue;
          slots.push({ iso: instant.toISOString(), dayKey });
        }
      }
      return slots;
    }

    function groupByDay(slots) {
      const map = new Map();
      for (const slot of slots) {
        if (!map.has(slot.dayKey)) map.set(slot.dayKey, []);
        map.get(slot.dayKey).push(slot);
      }
      return [...map.entries()].map(([dayKey, list]) => ({ dayKey, slots: list }));
    }

    const formatDay = (dayKey) => {
      const [y, m, d] = dayKey.split("-").map(Number);
      return new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        timeZone,
      }).format(new Date(Date.UTC(y, m - 1, d, 12)));
    };

    const formatTime = (iso) =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(
        new Date(iso),
      );

    const formatFull = (iso) =>
      new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
        timeZoneName: "short",
      }).format(new Date(iso));

    const stamp = (date) => `${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
    const slotEnd = (iso) => new Date(new Date(iso).getTime() + SESSION_MINUTES * 60000);

    function googleCalendarUrl(iso, childName) {
      const params = new URLSearchParams({
        action: "TEMPLATE",
        text: `Etern Learning demo session — ${childName}`,
        dates: `${stamp(new Date(iso))}/${stamp(slotEnd(iso))}`,
        details:
          "Your free Etern Learning demo session. A member of the team will join you and walk through the right stage for your child.",
        location: "Online",
      });
      return `https://calendar.google.com/calendar/render?${params}`;
    }

    function buildIcs(iso, childName, parentEmail) {
      const start = stamp(new Date(iso));
      return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Etern Learning//Demo Booking//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${start}-${Math.random().toString(36).slice(2)}@eternlearning.com`,
        `DTSTAMP:${stamp(new Date())}`,
        `DTSTART:${start}`,
        `DTEND:${stamp(slotEnd(iso))}`,
        `SUMMARY:Etern Learning demo session — ${childName}`,
        "DESCRIPTION:Your free Etern Learning demo session.",
        "LOCATION:Online",
        `ATTENDEE;CN=${parentEmail}:mailto:${parentEmail}`,
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");
    }

    /* --------------------------------------------------------------- state */

    const STAGES = [
      { ages: ["3", "4"], stage: "Discover" },
      { ages: ["4", "5"], stage: "Explore" },
      { ages: ["5", "6"], stage: "Build" },
      { ages: ["6", "7"], stage: "Grow" },
    ];

    const state = {
      childName: "",
      childAge: "",
      interests: [],
      slot: "",
      parentName: "",
      email: "",
      phone: "",
      notes: "",
    };

    const steps = [...form.querySelectorAll("[data-step]")];
    const ticks = [...form.querySelectorAll("[data-wizard-tick]")];
    const errorLine = form.querySelector("[data-wizard-error]");
    const backButton = form.querySelector("[data-wizard-back]");
    const nextButton = form.querySelector("[data-wizard-next]");
    const submitButton = form.querySelector("[data-wizard-submit]");
    let step = 0;

    /* ----------------------------------------------------------- step 4/6 */

    const days = groupByDay(generateSlots(14));
    let dayKey = days[0]?.dayKey ?? "";

    form.querySelector("[data-timezone]").textContent = timeZone;

    const dayHost = form.querySelector("[data-days]");
    const slotHost = form.querySelector("[data-slots]");
    const slotSummary = form.querySelector("[data-slot-summary]");

    function renderDays() {
      dayHost.innerHTML = days
        .map(
          (day) =>
            `<button type="button" data-day="${day.dayKey}" aria-pressed="${day.dayKey === dayKey}">${formatDay(day.dayKey)}</button>`,
        )
        .join("");
    }

    function renderSlots() {
      const list = days.find((day) => day.dayKey === dayKey)?.slots ?? [];
      slotHost.innerHTML = list
        .map(
          (slot) =>
            `<button type="button" data-slot="${slot.iso}" aria-pressed="${slot.iso === state.slot}">${formatTime(slot.iso)}</button>`,
        )
        .join("");
    }

    dayHost.addEventListener("click", (event) => {
      const button = event.target.closest("[data-day]");
      if (!button) return;
      dayKey = button.dataset.day;
      renderDays();
      renderSlots();
    });

    slotHost.addEventListener("click", (event) => {
      const button = event.target.closest("[data-slot]");
      if (!button) return;
      state.slot = button.dataset.slot;
      renderSlots();
      slotSummary.hidden = false;
      slotSummary.textContent = `Selected: ${formatFull(state.slot)}`;
      clearError();
    });

    renderDays();
    renderSlots();

    /* ------------------------------------------------------- pick controls */

    form.querySelectorAll("[data-pick]").forEach((group) => {
      const key = group.dataset.pick;
      const multi = group.hasAttribute("data-multi");

      group.addEventListener("click", (event) => {
        const button = event.target.closest("[data-value]");
        if (!button) return;
        const value = button.dataset.value;

        if (multi) {
          const set = new Set(state[key]);
          if (set.has(value)) set.delete(value);
          else set.add(value);
          state[key] = [...set];
          button.setAttribute("aria-pressed", String(set.has(value)));
        } else {
          state[key] = value;
          group.querySelectorAll("[data-value]").forEach((el) => {
            el.setAttribute("aria-pressed", String(el === button));
          });
          if (key === "childAge") showStageHint();
        }
        clearError();
      });
    });

    const stageHint = form.querySelector("[data-stage-hint]");
    function showStageHint() {
      const match = STAGES.find((s) => s.ages.includes(state.childAge));
      stageHint.hidden = false;
      stageHint.textContent = `Likely stage: ${match ? match.stage : "we'll confirm in the demo"}.`;
    }

    /* ------------------------------------------------------------- inputs */

    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => {
        state[input.name] = input.value;
        clearError();
        if (input.name === "childName") {
          form.querySelector("[data-child-name]").textContent =
            input.value.trim() || "your child";
        }
      });
    });

    /* ------------------------------------------------------------ stepping */

    function clearError() {
      errorLine.hidden = true;
      errorLine.textContent = "";
    }

    function fail(message) {
      errorLine.hidden = false;
      errorLine.textContent = message;
      return false;
    }

    function validate() {
      switch (step) {
        case 0:
          return state.childName.trim() ? true : fail("Please add your child's name");
        case 1:
          return state.childAge ? true : fail("Please choose an age");
        case 2:
          return state.interests.length ? true : fail("Pick at least one interest");
        case 3:
          return state.slot ? true : fail("Choose a time that suits you");
        case 4:
          if (!state.parentName.trim()) return fail("Please add your name");
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim()))
            return fail("Enter a valid email");
          if (state.phone.trim().length < 6) return fail("Enter a valid phone number");
          return true;
        default:
          return true;
      }
    }

    function renderSummary() {
      const rows = [
        ["Child", `${state.childName}, age ${state.childAge}`],
        ["Focus", state.interests.join(", ")],
        ["Session", formatFull(state.slot)],
        ["Parent", state.parentName],
        ["Contact", `${state.email} · ${state.phone}`],
      ];
      form.querySelector("[data-summary]").innerHTML = rows
        .map(([label, value]) => `<div><dt class="label">${label}</dt><dd>${value}</dd></div>`)
        .join("");
    }

    function show(next) {
      step = next;
      steps.forEach((fieldset) => {
        fieldset.hidden = Number(fieldset.dataset.step) !== step;
      });
      ticks.forEach((tick, i) => {
        tick.classList.toggle("is-done", i <= step);
        tick.classList.toggle("is-current", i === step);
      });
      backButton.disabled = step === 0;
      const last = step === steps.length - 1;
      nextButton.hidden = last;
      submitButton.hidden = !last;
      if (last) renderSummary();
      clearError();
      form.querySelector(".wizard__card").scrollIntoView({ block: "nearest" });
    }

    nextButton.addEventListener("click", () => {
      if (validate()) show(Math.min(step + 1, steps.length - 1));
    });
    backButton.addEventListener("click", () => show(Math.max(0, step - 1)));

    /* ------------------------------------------------------------- submit */

    function message() {
      return [
        "Free demo request — Etern Learning",
        `Child: ${state.childName} (age ${state.childAge})`,
        `Focus: ${state.interests.join(", ")}`,
        `Session: ${formatFull(state.slot)} (${timeZone})`,
        `Parent: ${state.parentName}`,
        `Email: ${state.email}`,
        `Phone: ${state.phone}`,
        state.notes.trim() ? `Notes: ${state.notes.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    }

    const done = document.querySelector("[data-wizard-done]");

    function finish() {
      const text = message();
      done.querySelector("[data-done-summary]").textContent =
        `${state.childName}'s ${SESSION_MINUTES}-minute session is pencilled in for ${formatFull(state.slot)}. Send the request below and we will confirm on ${state.phone}.`;

      const whatsapp = new URL(form.dataset.whatsapp);
      whatsapp.searchParams.set("text", text);
      done.querySelector("[data-send-whatsapp]").href = whatsapp.toString();

      const subject = encodeURIComponent(`Free demo request — ${state.childName}`);
      done.querySelector("[data-send-email]").href =
        `mailto:${form.dataset.email}?subject=${subject}&body=${encodeURIComponent(text)}`;

      done.querySelector("[data-google-calendar]").href = googleCalendarUrl(
        state.slot,
        state.childName,
      );

      done.querySelector("[data-download-ics]").addEventListener("click", () => {
        const blob = new Blob([buildIcs(state.slot, state.childName, state.email)], {
          type: "text/calendar;charset=utf-8",
        });
        const href = URL.createObjectURL(blob);
        const link = Object.assign(document.createElement("a"), {
          href,
          download: "etern-demo-session.ics",
        });
        document.body.append(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(href);
      });

      form.hidden = true;
      done.hidden = false;
      done.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!validate()) return;

      const endpoint = form.dataset.endpoint;
      if (endpoint) {
        submitButton.disabled = true;
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ ...state, timeZone, sessionMinutes: SESSION_MINUTES }),
          });
          if (!response.ok) throw new Error(String(response.status));
        } catch {
          submitButton.disabled = false;
          fail("We couldn't send your request. Please try WhatsApp or email below.");
          finish();
          return;
        }
        submitButton.disabled = false;
      }

      finish();
    });

    show(0);
  }
})();
