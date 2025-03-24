/* JS en bloque para pruebas SPA */
function toggleMenu(event) {
  event.stopPropagation();
  const menu = document.getElementById("mobileMenu");
  const button = document.getElementById("menuButton");
  menu.classList.toggle("show");
  button.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", function (event) {
    const menu = document.getElementById("mobileMenu");
    const button = document.getElementById("menuButton");
    if (!menu.contains(event.target) && !button.contains(event.target)) {
      menu.classList.remove("show");
      button.classList.remove("active");
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      document.getElementById("mobileMenu").classList.remove("show");
      document.getElementById("menuButton").classList.remove("active");
    }
  });

  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    const menu = document.getElementById("mobileMenu");
    const button = document.getElementById("menuButton");
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop === 0) {
      header.classList.remove("hidden");
    } else if (scrollTop > lastScrollTop) {
      header.classList.add("hidden");
      menu.classList.remove("show");
      button.classList.remove("active");
    } else {
      header.classList.remove("hidden");
    }
    lastScrollTop = scrollTop;
  });

  function updateActiveLink() {
    const path = window.location.pathname;
    const desktopLinks = document.querySelectorAll(".nav-links a");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    [...desktopLinks, ...mobileLinks].forEach((link) => {
      const href = link.getAttribute("href");
      const url = new URL(href, window.location.origin);
      if (url.pathname === path) {
        link.classList.add("nav-active");
      } else {
        link.classList.remove("nav-active");
      }
    });
  }

  updateActiveLink();

  // Detectar navegación SPA con pushState o replaceState
  const originalPush = history.pushState;
  history.pushState = function () {
    originalPush.apply(this, arguments);
    updateActiveLink();
  };

  const originalReplace = history.replaceState;
  history.replaceState = function () {
    originalReplace.apply(this, arguments);
    updateActiveLink();
  };

  window.addEventListener("popstate", updateActiveLink);

  // Cerrar menú móvil al hacer clic en un enlace
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const menu = document.getElementById("mobileMenu");
  const button = document.getElementById("menuButton");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
      button.classList.remove("active");
    });
  });
});
