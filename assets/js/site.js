/**
 * Shared behaviour for every page: sticky header, mobile menu, scroll reveals
 * and the "How Etern works" step switcher.
 *
 * Everything here is progressive enhancement — the pages are complete and
 * readable with JavaScript switched off.
 */

(() => {
  /* ------------------------------------------------------------ the header */

  const header = document.querySelector("[data-site-header]");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------- the mobile menu */

  const menu = document.querySelector("[data-menu]");
  const openButton = document.querySelector("[data-menu-open]");
  const closeButton = document.querySelector("[data-menu-close]");

  if (menu && openButton && closeButton) {
    const setOpen = (open) => {
      if (open) {
        menu.hidden = false;
        void menu.offsetWidth; // flush layout so the fade-in actually animates
      }
      menu.classList.toggle("is-open", open);
      openButton.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("is-locked", open);

      if (open) {
        menu.querySelector("a")?.focus();
      } else {
        openButton.focus();
        setTimeout(() => {
          if (!menu.classList.contains("is-open")) menu.hidden = true;
        }, 260);
      }
    };

    openButton.addEventListener("click", () => setOpen(true));
    closeButton.addEventListener("click", () => setOpen(false));
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) setOpen(false);
    });
  }

  /* ---------------------------------------------------------- reveal on scroll */

  const revealables = document.querySelectorAll(".reveal, .dash");
  if (revealables.length) {
    if (!("IntersectionObserver" in window)) {
      revealables.forEach((el) => el.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -60px 0px", threshold: 0.12 },
      );
      revealables.forEach((el) => observer.observe(el));
    }
  }

  /* ------------------------------------------------------- how Etern works */

  const stepGroup = document.querySelector("[data-steps]");
  const stepDetail = document.getElementById("step-detail");
  if (stepGroup && stepDetail) {
    stepGroup.addEventListener("click", (event) => {
      const button = event.target.closest("[data-step]");
      if (!button) return;
      const id = button.dataset.step;
      stepGroup.querySelectorAll("[data-step]").forEach((el) => {
        el.setAttribute("aria-pressed", String(el === button));
      });
      stepDetail.querySelectorAll("[data-step-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.stepPanel !== id;
      });
    });
  }

  /* --------------------------------------------------------- age stages */

  const stageRoot = document.querySelector("[data-stages]");
  if (stageRoot) {
    stageRoot.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-stage-tab]");
      if (!tab) return;
      const id = tab.dataset.stageTab;
      stageRoot.querySelectorAll("[data-stage-tab]").forEach((el) => {
        el.setAttribute("aria-pressed", String(el === tab));
      });
      stageRoot.querySelectorAll("[data-stage-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.stagePanel !== id;
      });
    });
  }

  /* -------------------------------------------------------- method wheel */

  const wheel = document.querySelector("[data-wheel]");
  if (wheel) {
    const nodes = [...wheel.querySelectorAll("[data-move]")];
    const panels = [...wheel.querySelectorAll("[data-move-panel]")];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const DWELL = 5000;
    let index = Math.max(0, nodes.findIndex((el) => el.getAttribute("aria-pressed") === "true"));
    let timer = null;

    function show(next) {
      index = (next + nodes.length) % nodes.length;
      const id = nodes[index].dataset.move;
      nodes.forEach((el, i) => el.setAttribute("aria-pressed", String(i === index)));
      for (const panel of panels) {
        const on = panel.dataset.movePanel === id;
        panel.hidden = !on;
        if (!on) continue;
        /* restart the entrance: the panel was display:none a moment ago, so a
           transition has nothing to run from */
        panel.classList.remove("is-in");
        void panel.offsetWidth;
        panel.classList.add("is-in");
      }
    }

    const stop = () => {
      clearInterval(timer);
      timer = null;
    };

    const play = () => {
      if (timer || reduced.matches) return;
      timer = setInterval(() => show(index + 1), DWELL);
    };

    /* Reading beats rotating: any pointer or keyboard focus inside the wheel
       holds the current move until it leaves. */
    wheel.addEventListener("pointerenter", stop);
    wheel.addEventListener("focusin", stop);
    wheel.addEventListener("pointerleave", play);
    wheel.addEventListener("focusout", (event) => {
      if (!wheel.contains(event.relatedTarget)) play();
    });

    wheel.addEventListener("click", (event) => {
      const node = event.target.closest("[data-move]");
      if (!node) return;
      show(nodes.indexOf(node));
      stop();
    });

    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : play()));

    /* Only turn while it is on screen, and only while the tab is in front. */
    const inView = () => {
      const box = wheel.getBoundingClientRect();
      return box.top < innerHeight && box.bottom > 0;
    };

    if ("IntersectionObserver" in window) {
      const watcher = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) play();
            else stop();
          }
        },
        { threshold: 0.3 },
      );
      watcher.observe(wheel);
    }
    if (inView()) play();

    reduced.addEventListener?.("change", () => (reduced.matches ? stop() : play()));
  }

  /* ---------------------------------------------------------- carousels */

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const dotHost = carousel.querySelector("[data-carousel-dots]");
    if (!track || !dotHost) return;

    /* Dots are scroll pages, not cards: how many cards fit at once depends on
       the viewport, and the last cards can never be scrolled to the start. Each
       dot maps onto an even step along the range the track can actually scroll. */
    const pageCount = () => Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth));
    const scrollRange = () => Math.max(0, track.scrollWidth - track.clientWidth);
    let dots = [];

    function buildDots() {
      const count = pageCount();
      if (count === dots.length) return;
      dotHost.hidden = count < 2;
      dotHost.innerHTML = Array.from(
        { length: count },
        (_, i) => `<button type="button" aria-label="Page ${i + 1} of ${count}" aria-current="false"></button>`,
      ).join("");
      dots = [...dotHost.children];
      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          track.scrollTo({ left: (i / (dots.length - 1)) * scrollRange() });
        });
      });
      sync();
    }

    function sync() {
      if (dots.length < 2) return;
      const range = scrollRange();
      const page = range === 0 ? 0 : Math.round((track.scrollLeft / range) * (dots.length - 1));
      dots.forEach((dot, i) => dot.setAttribute("aria-current", String(i === page)));
    }

    track.addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", buildDots);
    buildDots();
  });

  /* ------------------------------------------------------- stat counters */

  const counters = document.querySelectorAll("[data-count-to]");
  if (counters.length && "IntersectionObserver" in window) {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = (el) => {
      const target = Number(el.dataset.countTo);
      // only whole numbers animate; anything else (like "4h 30m") stands as written
      if (!Number.isFinite(target) || reduced) return;
      const started = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - started) / 900);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      el.textContent = "0";
      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          run(entry.target);
          counterObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* ---------------------------------------------------------- newsletter */

  const newsletter = document.querySelector("[data-newsletter]");
  if (newsletter) {
    const note = newsletter.querySelector("[data-newsletter-note]");
    newsletter.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = newsletter.querySelector("input").value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      note.className = `newsletter__note ${valid ? "is-ok" : "is-bad"}`;
      note.textContent = valid
        ? "Thanks — we'll be in touch."
        : "That email doesn't look right.";
      if (valid) newsletter.reset();
    });
  }

  /* --------------------------------------------------------- back to top */

  const toTop = document.querySelector("[data-to-top]");
  if (toTop) {
    const onScroll = () => toTop.classList.toggle("is-on", window.scrollY > 700);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ------------------------------------------------------------ footer year */

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
