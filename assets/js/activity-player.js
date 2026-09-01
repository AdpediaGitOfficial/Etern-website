/**
 * Playable Etern activities.
 *
 * Two engines:
 *   choice — a prompt with four tiles, three rounds, stars for first-try hits
 *   memory — a shuffled grid of emoji pairs
 *
 * Activity data is embedded in the page as <script type="application/json">,
 * so the player fetches nothing.
 */

(() => {
  const ICON = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.3l6.5-.9z"/></svg>',
    again:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/></svg>',
    spark:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.9 5.6L19.5 9l-4.4 3.4 1.4 5.6L12 15l-4.5 3 1.4-5.6L4.5 9l5.6-1.4z"/></svg>',
  };

  const CONFETTI = ["⭐", "🎉", "✨", "🌟"];

  function confetti(host) {
    const layer = document.createElement("div");
    layer.className = "confetti";
    layer.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 14; i += 1) {
      const bit = document.createElement("span");
      bit.textContent = CONFETTI[i % CONFETTI.length];
      bit.style.setProperty("--dx", `${(i - 7) * 22 + (i % 3) * 7}px`);
      bit.style.setProperty("--rot", `${(i - 7) * 18}deg`);
      bit.style.animationDelay = `${i * 0.03}s`;
      layer.append(bit);
    }
    host.append(layer);
    setTimeout(() => layer.remove(), 1600);
  }

  const shuffle = (items) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  /* ------------------------------------------------------------ choice game */

  function choiceGame(host, activity) {
    const rounds = activity.rounds ?? [];
    if (!rounds.length) {
      host.innerHTML = '<p class="small muted">This activity has no rounds yet.</p>';
      return;
    }

    let index = 0;
    let stars = 0;
    let locked = false;

    function done() {
      host.innerHTML = `
        <div class="player__done">
          <div class="big" aria-hidden="true">🎉</div>
          <h3 class="h3">Great Job!</h3>
          <p class="small muted" style="max-width:24rem">
            You finished ${activity.title} with ${stars} of ${rounds.length} stars on the first try.
          </p>
          <div class="stars" aria-label="${stars} of ${rounds.length} stars">
            ${Array.from({ length: rounds.length }, (_, i) => `<span class="${i < stars ? "" : "off"}">${ICON.star}</span>`).join("")}
          </div>
          <button type="button" class="btn btn--outline" data-restart>${ICON.again} Play again</button>
        </div>`;
      host.querySelector("[data-restart]").addEventListener("click", () => {
        index = 0;
        stars = 0;
        locked = false;
        draw();
      });
      confetti(host);
    }

    function draw() {
      const round = rounds[index];
      host.innerHTML = `
        <div class="player__bar">
          <p class="label">Round ${index + 1} of ${rounds.length}</p>
          <span class="player__score" aria-label="${stars} stars so far">${ICON.star}<b>${stars}</b></span>
          <span class="player__dots" aria-hidden="true"><i></i><i></i><i></i></span>
        </div>
        <h3 class="player__prompt">${round.prompt}</h3>
        <div class="player__options" role="group" aria-label="Answer options">
          ${round.options
            .map(
              (option, i) => `<button type="button" class="option option--t${(i % 4) + 1}" data-id="${option.id}" aria-label="${option.label}">
                <span class="option__face${option.swatch ? ` sw-${option.swatch}` : ""}">${option.display}</span>
              </button>`,
            )
            .join("")}
        </div>
        <div class="player__status" aria-live="polite">
          <p class="hint">${ICON.spark} Tap the answer you think is right.</p>
        </div>`;

      const status = host.querySelector(".player__status");
      let firstTry = true;

      host.querySelectorAll(".option").forEach((button) => {
        button.addEventListener("click", () => {
          if (locked) return;
          const option = round.options.find((o) => o.id === button.dataset.id);
          const mark = document.createElement("span");
          mark.className = "option__mark";

          if (option.correct) {
            locked = true;
            button.classList.add("is-correct");
            mark.innerHTML = ICON.check;
            button.append(mark);
            status.innerHTML = '<p class="ok">Great Job! ⭐</p>';
            if (firstTry) stars += 1;
            confetti(host);
            setTimeout(() => {
              locked = false;
              if (index + 1 >= rounds.length) done();
              else {
                index += 1;
                draw();
              }
            }, 1300);
          } else {
            firstTry = false;
            button.classList.add("is-wrong");
            mark.innerHTML = ICON.x;
            button.append(mark);
            status.innerHTML = '<p class="no">Almost! Try again.</p>';
            setTimeout(() => {
              button.classList.remove("is-wrong");
              mark.remove();
              status.innerHTML = '<p class="hint">Tap the answer you think is right.</p>';
            }, 900);
          }
        });
      });
    }

    draw();
  }

  /* ------------------------------------------------------------ memory game */

  function memoryGame(host, activity) {
    const pairs = activity.pairs ?? [];
    let cards = [];
    let selection = [];
    let moves = 0;
    let locked = false;

    function build() {
      cards = shuffle([...pairs, ...pairs]).map((emoji, id) => ({
        id,
        emoji,
        flipped: false,
        matched: false,
      }));
      selection = [];
      moves = 0;
      locked = false;
      draw();
    }

    function draw() {
      const found = cards.filter((c) => c.matched).length / 2;
      const complete = cards.length > 0 && found === pairs.length;

      host.innerHTML = `
        <div class="player__meta label">
          <span>Moves: ${moves}</span>
          <span>Pairs found: ${found} / ${pairs.length}</span>
        </div>
        <div class="memory-grid" role="group" aria-label="Memory cards">
          ${cards
            .map((card) => {
              const shown = card.flipped || card.matched;
              const cls = card.matched ? "is-matched" : card.flipped ? "is-flipped" : "";
              return `<button type="button" class="memory-card ${cls}" data-id="${card.id}"
                aria-label="${shown ? card.emoji : "Hidden card"}">
                ${shown ? `<span>${card.emoji}</span>` : '<span class="back" aria-hidden="true">?</span>'}
              </button>`;
            })
            .join("")}
        </div>
        <div class="flex items-center justify-between gap-4 mt-6" aria-live="polite">
          <p class="small font-semibold" style="color:var(--green-ink)">
            ${complete ? `All pairs found in ${moves} moves. Great Job! ⭐` : ""}
          </p>
          <button type="button" class="btn btn--outline" data-shuffle>${ICON.again} Shuffle</button>
        </div>`;

      host.querySelector("[data-shuffle]").addEventListener("click", build);
      host.querySelectorAll(".memory-card").forEach((button) => {
        button.addEventListener("click", () => flip(Number(button.dataset.id)));
      });

      if (complete) confetti(host);
    }

    function flip(id) {
      if (locked) return;
      const card = cards.find((c) => c.id === id);
      if (!card || card.flipped || card.matched) return;

      card.flipped = true;
      selection.push(id);

      if (selection.length < 2) {
        draw();
        return;
      }

      moves += 1;
      locked = true;
      const [a, b] = selection.map((cardId) => cards.find((c) => c.id === cardId));
      const isMatch = a.emoji === b.emoji;
      draw();

      setTimeout(
        () => {
          for (const c of [a, b]) {
            c.matched = isMatch;
            c.flipped = isMatch;
          }
          selection = [];
          locked = false;
          draw();
        },
        isMatch ? 480 : 850,
      );
    }

    build();
  }

  /* ------------------------------------------------------------------ boot */

  function mount(host, activity) {
    host.classList.add("player");
    host.innerHTML = "";
    if (activity.engine === "memory") memoryGame(host, activity);
    else choiceGame(host, activity);
  }

  document.querySelectorAll("[data-player]").forEach((host) => {
    const source = document.getElementById(host.dataset.playerSource);
    if (!source) return;

    let activities;
    try {
      activities = JSON.parse(source.textContent);
    } catch {
      return;
    }
    if (!activities.length) return;

    mount(host, activities[0]);

    /* the home page lets you switch between featured lessons */
    const tabs = document.querySelector("[data-lesson-tabs]");
    if (!tabs) return;

    tabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-lesson-tab]");
      if (!button) return;
      const slug = button.dataset.lessonTab;
      const activity = activities.find((a) => a.slug === slug);
      if (!activity) return;

      tabs.querySelectorAll("[data-lesson-tab]").forEach((el) => {
        el.setAttribute("aria-pressed", String(el === button));
      });
      document.querySelectorAll("[data-lesson-brief]").forEach((brief) => {
        brief.hidden = brief.dataset.lessonBrief !== slug;
      });
      mount(host, activity);
    });
  });
})();
