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

  /* ------------------------------------------------------------ footer year */

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
