document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("nav-menu-icon");
    const navLinks = document.querySelector(".nav-links");
    const navAnchors = document.querySelectorAll(".nav-links a");

    if (menuIcon && navLinks) {
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
    }

    function highlightCurrentNav() {
        let found = false;
        navAnchors.forEach((a) => {
            a.classList.remove("active");
            if (window.location.hash && a.getAttribute("href") === window.location.hash) {
                a.classList.add("active");
                found = true;
            }
        });
        // // If no hash or no match, highlight the first link
        // if (!found && navAnchors.length) {
        //     navAnchors[0].classList.add("active");
        // }
    }

    highlightCurrentNav();
});
