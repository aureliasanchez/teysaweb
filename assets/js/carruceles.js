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
function updateSelectedCard(card) {
  document.querySelectorAll(".interactive-card").forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");

  const group = card.dataset.imageGroup;
  document.querySelectorAll(".carousel-images").forEach(imgGroup => {
    imgGroup.style.display = imgGroup.dataset.group === group ? "flex" : "none";
  });
}

function detectVisibleCard() {
  const cards = document.querySelectorAll(".interactive-card");
  const center = window.innerWidth / 2;
  let closestCard = null;
  let closestDistance = Infinity;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distance = Math.abs(cardCenter - center);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = card;
    }
  });

  if (closestCard) updateSelectedCard(closestCard);
}

function initCarousel2() {
  const track = document.getElementById("infoCarouselTrack2");
  const prevBtn = document.getElementById("prevBtn2");
  const nextBtn = document.getElementById("nextBtn2");

  if (!track || !prevBtn || !nextBtn) return;
  if (track.dataset.initialized === "true") return;
  track.dataset.initialized = "true";

  const newPrevBtn = prevBtn.cloneNode(true);
  const newNextBtn = nextBtn.cloneNode(true);
  prevBtn.replaceWith(newPrevBtn);
  nextBtn.replaceWith(newNextBtn);

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
      setTimeout(() => {
        autoMoving = false;
        if (window.innerWidth <= 768) detectVisibleCard();
      }, 50);
    });
  }

  newPrevBtn.addEventListener("click", () => moveCarousel(-1));
  newNextBtn.addEventListener("click", () => moveCarousel(1));

  document.querySelectorAll(".interactive-card").forEach(card => {
    const newCard = card.cloneNode(true);
    card.replaceWith(newCard);

    newCard.addEventListener("click", () => {
      updateSelectedCard(newCard); // 🔄 Siempre selecciona, nunca deselecciona
    });
  });

  if (window.innerWidth <= 768) {
    track.addEventListener("scroll", () => {
      setTimeout(detectVisibleCard, 100);
    });
  }

  const allCards = document.querySelectorAll(".interactive-card");
  if (window.innerWidth > 768) {
    updateSelectedCard(allCards[0]);
  } else {
    detectVisibleCard();
  }

  // Auto movimiento del carrusel inferior
  const autoTrack = document.getElementById("auto-carousel-track");
  let scrollAmount = 1;

  function loopCarousel() {
    autoTrack.scrollLeft += scrollAmount;
    const activeGroup = autoTrack.querySelector(".carousel-images[style*='flex']");
    if (activeGroup && autoTrack.scrollLeft >= activeGroup.scrollWidth - autoTrack.clientWidth) {
      autoTrack.scrollLeft = 0;
    }
  }

  setInterval(loopCarousel, 30);
}

// Inicializar cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
  initCarousel2();
});

// Re-inicializar si el carrusel aparece dinámicamente (SPA)
const observerCarousel2 = new MutationObserver(() => {
  const track = document.getElementById("infoCarouselTrack2");
  if (track && !track.dataset.initialized) {
    initCarousel2();
  }
});

observerCarousel2.observe(document.body, { childList: true, subtree: true });
