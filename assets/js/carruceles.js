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
  const track = document.getElementById("infoCarouselTrack2");
  const prevBtn = document.getElementById("prevBtn2");
  const nextBtn = document.getElementById("nextBtn2");
  const cards = document.querySelectorAll(".interactive-card");

  if (!track || !prevBtn || !nextBtn || cards.length === 0) return;

  // Reiniciar listeners para evitar duplicados
  prevBtn.replaceWith(prevBtn.cloneNode(true));
  nextBtn.replaceWith(nextBtn.cloneNode(true));

  const newPrevBtn = document.getElementById("prevBtn2");
  const newNextBtn = document.getElementById("nextBtn2");

  let autoMoving = false;

  function moveCarousel(direction) {
    if (autoMoving) return;
    autoMoving = true;

    const cardWidth = track.firstElementChild.offsetWidth + 20;
    const shift = direction === 1 ? -cardWidth : cardWidth;

    track.style.transition = "transform 0.4s ease-in-out";
    track.style.transform = `translateX(${shift}px)`;

    track.addEventListener("transitionend", function onTransitionEnd() {
      track.removeEventListener("transitionend", onTransitionEnd);
      if (direction === 1) {
        track.appendChild(track.firstElementChild);
      } else {
        track.prepend(track.lastElementChild);
      }
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      setTimeout(() => autoMoving = false, 50);
    });
  }

  newPrevBtn.addEventListener("click", () => moveCarousel(-1));
  newNextBtn.addEventListener("click", () => moveCarousel(1));

  // Reiniciar listeners de tarjetas para evitar duplicados
  cards.forEach(card => {
    const newCard = card.cloneNode(true);
    card.replaceWith(newCard);
    newCard.addEventListener("click", () => {
      const alreadySelected = newCard.classList.contains("selected");
      document.querySelectorAll(".interactive-card").forEach(c => c.classList.remove("selected"));
      if (!alreadySelected) {
        newCard.classList.add("selected");
      }
    });
  });
}

// Inicialización inmediata
document.addEventListener("DOMContentLoaded", initCarousel2);

// Observador específico para navegación SPA
const observerCarousel2 = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      const track = document.getElementById("infoCarouselTrack2");
      if (track && !track.dataset.initialized) {
        track.dataset.initialized = "true";
        initCarousel2();
      }
    }
  });
});

observerCarousel2.observe(document.body, { childList: true, subtree: true });
