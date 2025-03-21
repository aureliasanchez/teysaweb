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
