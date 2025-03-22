// Primer carrucel
function initCarousel() {
  const infoTrack = document.getElementById("infoCarouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!infoTrack || !prevBtn || !nextBtn) return;

  const newPrev = prevBtn.cloneNode(true);
  const newNext = nextBtn.cloneNode(true);
  prevBtn.replaceWith(newPrev);
  nextBtn.replaceWith(newNext);

  let autoMoving = false;

  function move(direction) {
    if (autoMoving) return;
    autoMoving = true;

    const cardWidth = infoTrack.firstElementChild.offsetWidth + 20;
    const shift = direction === 1 ? -cardWidth : cardWidth;

    infoTrack.style.transition = "transform 0.4s ease-in-out";
    infoTrack.style.transform = `translateX(${shift}px)`;

    function onEnd() {
      infoTrack.removeEventListener("transitionend", onEnd);

      if (direction === 1) {
        infoTrack.appendChild(infoTrack.firstElementChild);
      } else {
        infoTrack.prepend(infoTrack.lastElementChild);
      }

      infoTrack.style.transition = "none";
      infoTrack.style.transform = "translateX(0)";
      setTimeout(() => (autoMoving = false), 50);
    }

    infoTrack.addEventListener("transitionend", onEnd);
  }

  newPrev.addEventListener("click", () => move(-1));
  newNext.addEventListener("click", () => move(1));
}

// Ejecutar inicial
document.addEventListener("DOMContentLoaded", initCarousel);

// 🧠 Detectar si el carrusel aparece en el DOM dinámicamente
const observer = new MutationObserver(() => {
  const carousel = document.getElementById("carouselSection");
  if (carousel && !carousel.dataset.initialized) {
    carousel.dataset.initialized = "true";
    initCarousel();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Segundo carrucel
  function initCarousel2() {
    const cards = document.querySelectorAll(".interactive-card");
    const track = document.getElementById("infoCarouselTrack2");
    const prevBtn = document.getElementById("prevBtn2");
    const nextBtn = document.getElementById("nextBtn2");

    if (!track || !prevBtn || !nextBtn) return;
    if (track.dataset.initialized === "true") return;
    track.dataset.initialized = "true";

    cards.forEach(card => {
      card.addEventListener("click", () => {
        const isActive = card.classList.contains("selected");
        cards.forEach(c => c.classList.remove("selected"));
        if (!isActive) card.classList.add("selected");
      });
    });

    let autoMoving = false;

    function moveCarousel(direction) {
      if (autoMoving) return;
      autoMoving = true;

      const cardWidth = track.firstElementChild.offsetWidth + 20;
      const shift = direction === 1 ? -cardWidth : cardWidth;

      track.style.transition = "transform 0.4s ease-in-out";
      track.style.transform = `translateX(${shift}px)`;

      function onEnd() {
        track.removeEventListener("transitionend", onEnd);

        if (direction === 1) {
          track.appendChild(track.firstElementChild);
        } else {
          track.prepend(track.lastElementChild);
        }

        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        setTimeout(() => autoMoving = false, 50);
      }

      track.addEventListener("transitionend", onEnd);
    }

    prevBtn.addEventListener("click", () => moveCarousel(-1));
    nextBtn.addEventListener("click", () => moveCarousel(1));
  }

  // Ejecutar en primera carga
  document.addEventListener("DOMContentLoaded", () => {
    initCarousel2();
  });

  // Re-ejecutar en SPA cuando el carrusel reaparece en el DOM
  const observer2 = new MutationObserver(() => {
    const section = document.getElementById("carouselSection2");
    if (section && !section.dataset.initialized) {
      section.dataset.initialized = "true";
      initCarousel2();
    }
  });
  observer2.observe(document.body, { childList: true, subtree: true });

