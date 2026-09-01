/** Journal article: reading-progress bar and the share button. */

(() => {
  const bar = document.querySelector("[data-read-progress]");
  if (bar) {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const progress = max > 0 ? Math.min(1, scrollY / max) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
  }

  const share = document.querySelector("[data-share]");
  if (share) {
    share.addEventListener("click", async () => {
      const url = location.href;
      const title = share.dataset.shareTitle || document.title;
      const say = (message) => {
        const original = share.innerHTML;
        share.textContent = message;
        setTimeout(() => {
          share.innerHTML = original;
        }, 1800);
      };

      try {
        if (navigator.share) {
          await navigator.share({ title, url });
          return;
        }
        await navigator.clipboard.writeText(url);
        say("Link copied");
      } catch (error) {
        if (error?.name !== "AbortError") say("Couldn't share");
      }
    });
  }
})();
