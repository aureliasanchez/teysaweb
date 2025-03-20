function toggleMenu(event) {
    event.stopPropagation();
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

let lastScrollTop = 0;
window.addEventListener("scroll", function() {
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