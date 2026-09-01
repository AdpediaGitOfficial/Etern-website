/**
 * Home hero: the floating-island world tilts towards the pointer, can be
 * dragged to spin, and its hotspots drift by depth for a parallax feel.
 *
 * Without JavaScript (or with reduced motion) the illustration is a plain
 * image with static hover labels, which is fine.
 */

(() => {
  const scene = document.querySelector("[data-scene]");
  const stage = document.querySelector("[data-scene-stage]");
  if (scene && stage) {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const hotspots = [...stage.querySelectorAll(".hotspot")];
    const image = stage.querySelector(".scene__img");
    const controls = scene.querySelector("[data-scene-controls]");

    let pointerX = 0; // -0.5 … 0.5
    let pointerY = 0;
    let spin = 0; // extra rotation from dragging, degrees
    let velocity = 0;
    let dragging = false;
    let last = { x: 0, t: 0 };
    let frame = null;
    let paused = false;

    const clampSpin = (value) => Math.max(-26, Math.min(26, value));

    function render() {
      const rotateY = pointerX * 12 + spin;
      const rotateX = pointerY * -10;
      stage.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      for (const spot of hotspots) {
        const depth = Number(spot.dataset.depth || 10);
        const dx = pointerX * depth * -0.6 + spin * depth * 0.08;
        const dy = pointerY * depth * -0.4;
        spot.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
      }
    }

    function inertia() {
      velocity *= 0.94;
      if (Math.abs(velocity) < 0.02) {
        frame = null;
        return;
      }
      spin = clampSpin(spin + velocity);
      render();
      frame = requestAnimationFrame(inertia);
    }

    function stopInertia() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    }

    function track(clientX, clientY) {
      if (reduced.matches) return;
      const box = stage.getBoundingClientRect();
      pointerX = (clientX - box.left) / box.width - 0.5;
      pointerY = (clientY - box.top) / box.height - 0.5;
      render();
    }

    /* pointer tilt ------------------------------------------------------- */

    scene.addEventListener("pointermove", (event) => {
      if (dragging) return;
      track(event.clientX, event.clientY);
    });

    scene.addEventListener("pointerleave", () => {
      if (reduced.matches) return;
      pointerX = 0;
      pointerY = 0;
      render();
    });

    /* drag to spin ------------------------------------------------------- */

    stage.addEventListener("pointerdown", (event) => {
      if (reduced.matches || event.target.closest(".hotspot")) return;
      dragging = true;
      velocity = 0;
      stopInertia();
      last = { x: event.clientX, t: performance.now() };
      stage.setPointerCapture(event.pointerId);
      stage.style.transition = "none";
    });

    stage.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = event.clientX - last.x;
      const dt = Math.max(1, now - last.t);
      velocity = (dx / dt) * 6;
      spin = clampSpin(spin + dx * 0.12);
      last = { x: event.clientX, t: now };
      render();
    });

    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      stage.style.transition = "";
      if (Math.abs(velocity) > 0.2) {
        stopInertia();
        frame = requestAnimationFrame(inertia);
      }
    };

    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("dragstart", (event) => event.preventDefault());

    /* controls ----------------------------------------------------------- */

    if (controls && !reduced.matches) {
      controls.hidden = false;

      controls.querySelectorAll("[data-scene-nudge]").forEach((button) => {
        button.addEventListener("click", () => {
          stopInertia();
          spin = clampSpin(spin + Number(button.dataset.sceneNudge) * 8);
          render();
        });
      });

      const toggle = controls.querySelector("[data-scene-toggle]");
      toggle?.addEventListener("click", () => {
        paused = !paused;
        if (image) image.style.animationPlayState = paused ? "paused" : "running";
        toggle.innerHTML = paused ? toggle.dataset.iconPlay : toggle.dataset.iconPause;
        toggle.setAttribute("aria-label", paused ? "Resume animation" : "Pause animation");
      });

      controls.querySelector("[data-scene-reset]")?.addEventListener("click", () => {
        stopInertia();
        spin = 0;
        pointerX = 0;
        pointerY = 0;
        velocity = 0;
        render();
      });
    }

    render();
  }
})();
