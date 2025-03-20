function toggleMenu(event) {
    event.stopPropagation(); // Evita que el clic cierre inmediatamente el menú
    const menu = document.getElementById("mobileMenu");
    const button = document.getElementById("menuButton");
    menu.classList.toggle("show");
    button.classList.toggle("active");
}

document.addEventListener("click", function(event) {
    const menu = document.getElementById("mobileMenu");
    const button = document.getElementById("menuButton");
    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.remove("show");
        button.classList.remove("active");
    }
});

window.addEventListener("resize", function() {
    if (window.innerWidth > 768) {
        document.getElementById("mobileMenu").classList.remove("show");
        document.getElementById("menuButton").classList.remove("active");
    }
});