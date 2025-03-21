document.addEventListener("DOMContentLoaded", () => {
  const infoTrack = document.getElementById("infoCarouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let autoMoving = false;

  function moveInfoCarousel(direction) {
    if (autoMoving) return;
    autoMoving = true;

    const cardWidth = infoTrack.firstElementChild.offsetWidth + 20;
    const shift = direction === 1 ? -cardWidth : cardWidth;

    infoTrack.style.transition = "transform 0.4s ease-in-out";
    infoTrack.style.transform = `translateX(${shift}px)`;

    // Usar transitionend en lugar de setTimeout para detectar el fin de la animación
    function onTransitionEnd() {
      infoTrack.removeEventListener("transitionend", onTransitionEnd);

      if (direction === 1) {
        infoTrack.appendChild(infoTrack.firstElementChild);
      } else {
        infoTrack.prepend(infoTrack.lastElementChild);
      }

      infoTrack.style.transition = "none";
      infoTrack.style.transform = "translateX(0)";
      autoMoving = false;
    }

    infoTrack.addEventListener("transitionend", onTransitionEnd);
  }

  prevBtn.addEventListener("click", () => moveInfoCarousel(-1));
  nextBtn.addEventListener("click", () => moveInfoCarousel(1));
});