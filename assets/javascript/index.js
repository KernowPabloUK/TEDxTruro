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

    // Disable parallax on iPad/iPhone
    const isIOS = /ipad|iphone/i.test(navigator.platform);
    if (isIOS) {
        document.querySelectorAll('.parallax').forEach(el => {
            el.classList.remove('parallax');
            el.style.backgroundAttachment = 'scroll';
        });
    }
});
