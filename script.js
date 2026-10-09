
/* =========================================================
   YATISH SHARMA PORTFOLIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
       ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");
    const header = document.querySelector(".header");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const yearElement = document.getElementById("year");


    /* =========================
       MOBILE NAVIGATION
       ========================= */

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (navbar.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

                menuBtn.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });


        /* Close menu after clicking a navigation link */

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =========================
       HEADER SCROLL EFFECT
       ========================= */

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =========================
       ACTIVE NAVIGATION
       ========================= */

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const linkTarget = link.getAttribute("href");

            if (linkTarget === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* =========================
       BACK TO TOP
       ========================= */

    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener("scroll", handleBackToTop);

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", (event) => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================
       CURRENT YEAR
       ========================= */

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    /* =========================
       SMOOTH INTERNAL LINKS
       ========================= */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length <= 1
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       SCROLL REVEAL ANIMATION
       ========================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-text, " +
        ".about-highlight, " +
        ".timeline-item, " +
        ".skill-card, " +
        ".tech-item, " +
        ".soft-skill, " +
        ".experience-card, " +
        ".language-card, " +
        ".contact-card"
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =========================
       SKILL CARD STAGGER
       ========================= */

    const skillCards =
        document.querySelectorAll(".skill-card");

    skillCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 100}ms`;

    });


    const techItems =
        document.querySelectorAll(".tech-item");

    techItems.forEach((item, index) => {

        item.style.transitionDelay =
            `${index * 50}ms`;

    });


    /* =========================
       EXPERIENCE CARD HOVER
       ========================= */

    const experienceCard =
        document.querySelector(".experience-card");

    if (experienceCard) {

        experienceCard.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 768) return;

                const rect =
                    experienceCard.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -1.5;

                const rotateY =
                    ((x - centerX) / centerX) * 1.5;

                experienceCard.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-3px)`;

            }
        );


        experienceCard.addEventListener(
            "mouseleave",
            () => {

                experienceCard.style.transform = "";

            }
        );

    }


    /* =========================
       TYPING EFFECT
       ========================= */

    const heroTitle =
        document.querySelector(".hero h2");

    if (heroTitle) {

        const originalText =
            heroTitle.textContent.trim();

        heroTitle.textContent = "";

        let characterIndex = 0;

        function typeText() {

            if (characterIndex < originalText.length) {

                heroTitle.textContent +=
                    originalText.charAt(characterIndex);

                characterIndex++;

                setTimeout(typeText, 55);

            }

        }

        setTimeout(typeText, 500);

    }


    /* =========================
       DOWNLOAD CV TRACKING
       ========================= */

    const cvButtons =
        document.querySelectorAll(
            'a[href="Yatish-Sharma-CV.pdf"]'
        );

    cvButtons.forEach((button) => {

        button.addEventListener("click", () => {

            console.log(
                "Yatish Sharma CV download initiated."
            );

        });

    });


    /* =========================
       CONTACT LINK FEEDBACK
       ========================= */

    const contactLinks =
        document.querySelectorAll(
            'a[href^="mailto:"], a[href^="tel:"]'
        );

    contactLinks.forEach((link) => {

        link.addEventListener("click", () => {

            link.classList.add("clicked");

            setTimeout(() => {

                link.classList.remove("clicked");

            }, 600);

        });

    });


    /* =========================
       ESC KEY CLOSE MENU
       ========================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (
                navbar &&
                navbar.classList.contains("active")
            ) {

                navbar.classList.remove("active");

                if (menuBtn) {

                    const icon =
                        menuBtn.querySelector("i");

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                    menuBtn.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }

            }

        }

    });


    /* =========================
       PREVENT ANIMATION FOR
       REDUCED MOTION USERS
       ========================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {

        document.documentElement.style.scrollBehavior =
            "auto";

        revealElements.forEach((element) => {

            element.classList.add("revealed");

        });

    }


    /* =========================
       PAGE READY
       ========================= */

    document.body.classList.add("page-loaded");

});
```