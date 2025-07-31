document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("nav-menu-icon");
    const navLinks = document.querySelector(".nav-links");
    menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
        if (
            window.innerWidth <= 900 &&
            !navLinks.contains(e.target) &&
            !menuIcon.contains(e.target)
        ) {
            navLinks.classList.remove("open");
        }
    });
});
