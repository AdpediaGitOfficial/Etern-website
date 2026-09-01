/**
 * Client-side filtering for the activity, journal and video listings.
 *
 * Every card is already in the HTML — this only hides the ones that do not
 * match, so the pages stay complete for search engines and for readers
 * without JavaScript.
 */

(() => {
  document.querySelectorAll("[data-filter-root]").forEach((root) => {
    const cards = [...root.querySelectorAll(root.dataset.filterTarget)];
    if (!cards.length) return;

    const search = root.querySelector("[data-filter-search]");
    const groups = [...root.querySelectorAll("[data-filter-group]")];
    const count = root.querySelector("[data-filter-count]");
    const empty = root.querySelector("[data-filter-empty]");
    const results = root.querySelector("[data-filter-results]");
    const [one, many] = (root.dataset.filterNoun || "result|results").split("|");

    const state = { query: "" };
    for (const group of groups) {
      state[group.dataset.filterGroup] =
        group.querySelector('[aria-pressed="true"]')?.dataset.value ?? "All";
    }

    function matches(card) {
      const haystack = `${card.dataset.title ?? ""} ${card.dataset.keywords ?? ""}`;
      if (state.query && !haystack.includes(state.query)) return false;

      if (state.category && state.category !== "All" && card.dataset.category !== state.category) {
        return false;
      }
      if (
        state.difficulty &&
        state.difficulty !== "All" &&
        card.dataset.difficulty !== state.difficulty
      ) {
        return false;
      }
      if (state.age && state.age !== "All") {
        const [min, max] = state.age.split("-").map(Number);
        if (Number(card.dataset.ageMin) > max || Number(card.dataset.ageMax) < min) return false;
      }
      return true;
    }

    function apply() {
      let shown = 0;
      for (const card of cards) {
        const ok = matches(card);
        card.hidden = !ok;
        if (ok) shown += 1;
      }
      if (count) count.textContent = `Showing ${shown} ${shown === 1 ? one : many}`;
      if (empty) empty.hidden = shown !== 0;
      if (results) results.hidden = shown === 0;
    }

    search?.addEventListener("input", () => {
      state.query = search.value.trim().toLowerCase();
      apply();
    });

    for (const group of groups) {
      group.addEventListener("click", (event) => {
        const button = event.target.closest("[data-value]");
        if (!button) return;
        state[group.dataset.filterGroup] = button.dataset.value;
        group.querySelectorAll("[data-value]").forEach((el) => {
          el.setAttribute("aria-pressed", String(el === button));
        });
        apply();
      });
    }

    root.querySelector("[data-filter-clear]")?.addEventListener("click", () => {
      state.query = "";
      if (search) search.value = "";
      for (const group of groups) {
        const buttons = [...group.querySelectorAll("[data-value]")];
        buttons.forEach((el, i) => el.setAttribute("aria-pressed", String(i === 0)));
        state[group.dataset.filterGroup] = buttons[0]?.dataset.value ?? "All";
      }
      apply();
    });

    apply();
  });
})();
