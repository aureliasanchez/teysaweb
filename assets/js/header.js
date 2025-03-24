function toggleMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById("mobileMenu");
    const button = document.getElementById("menuButton");
    menu.classList.toggle("show");
    button.classList.toggle("active");
  }
  
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
  
  // Función para activar el enlace correcto según la URL
  function updateActiveLink() {
    const path = window.location.pathname;
    const desktopLinks = document.querySelectorAll(".nav-links a");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");
  
    [...desktopLinks, ...mobileLinks].forEach(link => {
      const href = link.getAttribute("href");
      const url = new URL(href, window.location.origin);
  
      if (url.pathname === path) {
        link.classList.add("nav-active");
      } else {
        link.classList.remove("nav-active");
      }
    });
  }
  
  // Inicializar en carga inicial
  document.addEventListener("DOMContentLoaded", updateActiveLink);
  
  // Detectar navegación SPA (usando MutationObserver como respaldo)
  const navObserver = new MutationObserver(updateActiveLink);
  navObserver.observe(document.body, { childList: true, subtree: true });
  
  // Escuchar cambios del historial (SPA)
  ["pushState", "replaceState"].forEach(type => {
    const original = history[type];
    history[type] = function (...args) {
      const result = original.apply(this, args);
      window.dispatchEvent(new Event(type.toLowerCase()));
      return result;
    };
  });
  
  window.addEventListener("popstate", updateActiveLink);
  window.addEventListener("pushstate", updateActiveLink);
  window.addEventListener("replacestate", updateActiveLink);
  