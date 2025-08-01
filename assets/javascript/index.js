document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("nav-menu-icon");
    const navLinks = document.querySelector(".nav-links");

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

    // Slideshow modal logic for img elements
    const images = Array.from(
        document.querySelectorAll("#home-memorable-moments-photos img")
    );
    const modal = document.getElementById("slideshow-modal");
    const modalImg = document.getElementById("slideshow-img");
    const closeBtn = document.querySelector(".slideshow-close");
    const prevBtn = document.querySelector(".slideshow-prev");
    const nextBtn = document.querySelector(".slideshow-next");
    let currentIndex = 0;

    const counter = document.createElement("div");
    counter.className = "slideshow-counter";
    modal.appendChild(counter);

    function updateCounter() {
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    function openModal(index) {
        currentIndex = index;
        modalImg.src = images[currentIndex].src;
        modal.classList.add("active");
        modal.style.display = "flex";
        updateCounter();
    }
    function closeModal() {
        modal.classList.remove("active");
        modal.style.display = "none";
    }
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
        updateCounter();
    }
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
        updateCounter();
    }

    images.forEach((img, idx) => {
        img.addEventListener("click", () => openModal(idx));
    });
    closeBtn.addEventListener("click", closeModal);
    prevBtn.addEventListener("click", showPrev);
    nextBtn.addEventListener("click", showNext);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("active")) return;
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
    });

    // Touch events for slideshow navigation
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener("touchstart", function (e) {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
        }
    });

    modal.addEventListener("touchend", function (e) {
        touchEndX = e.changedTouches[0].clientX;
        if (touchEndX < touchStartX - 40) {
            showNext();
        } else if (touchEndX > touchStartX + 40) {
            showPrev();
        }
    });

    // Disable parallax effect if iOS device
    var platform = navigator.platform.toLowerCase();
    if (platform.includes("ipad") || platform.includes("iphone")) {
        document.querySelectorAll(".parallax").forEach((el) => {
            el.style.backgroundAttachment = "scroll";
        });
    }

    // Dropdown collapsible logic
    document.querySelectorAll('.dropdown > .dropbtn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = btn.parentElement;
            parent.classList.toggle('open');
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== parent) d.classList.remove('open');
            });
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
        }
    });
});
