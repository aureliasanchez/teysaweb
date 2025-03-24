// Utilidad para evitar múltiples ejecuciones
function debounce(fn, delay = 100) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

// -------------------------
// Primer Carrusel
// -------------------------
function initCarousel() {
  const infoTrack = document.getElementById("infoCarouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!infoTrack || !prevBtn || !nextBtn || infoTrack.dataset.initialized === "true") return;
  infoTrack.dataset.initialized = "true";

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

document.addEventListener("DOMContentLoaded", initCarousel);

const observerCarousel1 = new MutationObserver(debounce(() => {
  const infoTrack = document.getElementById("infoCarouselTrack");
  if (infoTrack && infoTrack.dataset.initialized !== "true") {
    initCarousel();
  }
}));

observerCarousel1.observe(document.body, { childList: true, subtree: true });


// -------------------------
// Segundo Carrusel
// -------------------------
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

  if (!track || !prevBtn || !nextBtn || track.dataset.initialized === "true") return;
  track.dataset.initialized = "true";

  const newPrev = prevBtn.cloneNode(true);
  const newNext = nextBtn.cloneNode(true);
  prevBtn.replaceWith(newPrev);
  nextBtn.replaceWith(newNext);

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

  newPrev.addEventListener("click", () => moveCarousel(-1));
  newNext.addEventListener("click", () => moveCarousel(1));

  document.querySelectorAll(".interactive-card").forEach(card => {
    const newCard = card.cloneNode(true);
    card.replaceWith(newCard);
    newCard.addEventListener("click", () => updateSelectedCard(newCard));
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

  if (window._carousel2Interval) clearInterval(window._carousel2Interval);

  let currentGroup = document.querySelector(".carousel-images[data-group][style*='flex']");
  if (!currentGroup) return;

  function cycleCarousel() {
    if (!currentGroup || currentGroup.children.length < 2) return;

    const firstImage = currentGroup.children[0];
    const imageWidth = firstImage.offsetWidth + 10;

    currentGroup.style.transition = "transform 0.6s ease-in-out";
    currentGroup.style.transform = `translateX(-${imageWidth}px)`;

    currentGroup.addEventListener("transitionend", function onEnd() {
      currentGroup.removeEventListener("transitionend", onEnd);
      currentGroup.appendChild(firstImage);
      currentGroup.style.transition = "none";
      currentGroup.style.transform = "translateX(0)";
    });
  }

  window._carousel2Interval = setInterval(() => {
    currentGroup = document.querySelector(".carousel-images[data-group][style*='flex']");
    cycleCarousel();
  }, 3000);
}

document.addEventListener("DOMContentLoaded", initCarousel2);

const observerCarousel2 = new MutationObserver(debounce(() => {
  const track = document.getElementById("infoCarouselTrack2");
  if (track && track.dataset.initialized !== "true") {
    initCarousel2();
  }
}));

observerCarousel2.observe(document.body, { childList: true, subtree: true });
