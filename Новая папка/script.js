
const header = document.getElementById("header");
const scrollTop = document.getElementById("scrollTop");
const themeBtn = document.getElementById("themeBtn");
const burger = document.getElementById("burger");
const menu = document.querySelector(".menu");


// ==============================
// HEADER + SCROLL
// ==============================

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
        scrollTop.classList.add("show");
    } else {
        header.classList.remove("scrolled");
        scrollTop.classList.remove("show");
    }

});

scrollTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ==============================
// MOBILE MENU
// ==============================

burger.addEventListener("click", () => {

    menu.classList.toggle("active");

    const icon = burger.querySelector("i");

    if (menu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});

document.querySelectorAll(".menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

        const icon = burger.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


// ==============================
// DARK MODE
// ==============================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("dark")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "dark");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "light");

    }

});


if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    const icon = themeBtn.querySelector("i");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

}


// ==============================
// FAVORITES
// ==============================

function toggleFavorite(button) {

    button.classList.toggle("active");

    const icon = button.querySelector("i");

    if (button.classList.contains("active")) {

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

        showToast("Добавлено в избранное ❤️");

    } else {

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");

        showToast("Удалено из избранного");

    }

}


// ==============================
// SEARCH FILTER
// ==============================

function filterProperties() {

    const type = document.getElementById("typeFilter").value;
    const district = document.getElementById("districtFilter").value;
    const price = document.getElementById("priceFilter").value;

    const cards = document.querySelectorAll(".property-card");

    let visibleCount = 0;

    cards.forEach(card => {

        const cardType = card.dataset.type;
        const cardDistrict = card.dataset.district;
        const cardPrice = card.dataset.price;

        const typeMatch =
            type === "all" ||
            cardType === type;

        const districtMatch =
            district === "all" ||
            cardDistrict === district;

        const priceMatch =
            price === "all" ||
            cardPrice === price;

        if (typeMatch && districtMatch && priceMatch) {

            card.style.display = "block";

            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 20);

            visibleCount++;

        } else {

            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";

            setTimeout(() => {
                card.style.display = "none";
            }, 250);

        }

    });

    const noResults = document.getElementById("noResults");

    if (visibleCount === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }

}


// ==============================
// SHOW ALL
// ==============================

function showAllProperties() {

    document.getElementById("typeFilter").value = "all";
    document.getElementById("districtFilter").value = "all";
    document.getElementById("priceFilter").value = "all";

    filterProperties();

}


// ==============================
// MODAL
// ==============================

const modal = document.getElementById("modal");

function openModal() {

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


// ==============================
// PROPERTY DETAILS
// ==============================

function openProperty(title, price) {

    const message =
        `${title}\n\nЦена: ${price}\n\nНаш менеджер может предоставить полную информацию об объекте.`;

    alert(message);

}


// ==============================
// CONTACT FORM
// ==============================

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    closeModal();

    contactForm.reset();

    showToast(
        "Заявка успешно отправлена! Мы скоро свяжемся с вами."
    );

});


// ==============================
// TOAST
// ==============================

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.querySelector("span").textContent = message;

    toast.classList.add("active");

    setTimeout(() => {

        toast.classList.remove("active");

    }, 3500);

}


// ==============================
// SCROLL REVEAL
// ==============================

const revealElements =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

revealElements.forEach(element => {

    observer.observe(element);

});


// ==============================
// NUMBER COUNTER
// ==============================

const counters =
    document.querySelectorAll("[data-number]");

let countersStarted = false;

function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.number);

        let current = 0;

        const increment =
            target / 60;

        function update() {

            current += increment;

            if (current < target) {

                counter.textContent =
                    Math.floor(current).toLocaleString();

                requestAnimationFrame(update);

            } else {

                counter.textContent =
                    target.toLocaleString() + "+";

            }

        }

        update();

    });

}


const statistics =
    document.querySelector(".statistics");

const statsObserver =
    new IntersectionObserver(
        entries => {

            if (entries[0].isIntersecting) {

                startCounters();

                statsObserver.disconnect();

            }

        },
        {
            threshold: .5
        }
    );

statsObserver.observe(statistics);


// ==============================
// PARALLAX HERO
// ==============================

window.addEventListener("scroll", () => {

    const heroBg =
        document.querySelector(".hero-bg");

    if (!heroBg) return;

    const scroll =
        window.scrollY;

    if (scroll < 900) {

        heroBg.style.transform =
            `scale(1.08) translateY(${scroll * 0.15}px)`;

    }

});


// ==============================
// PHONE MASK
// ==============================

const phoneInput =
    document.querySelector('input[type="tel"]');

phoneInput.addEventListener("input", event => {

    let value =
        event.target.value.replace(/\D/g, "");

    if (value.startsWith("998")) {
        value = value.substring(3);
    }

    value = value.substring(0, 9);

    let result = "+998";

    if (value.length > 0) {
        result += " " + value.substring(0, 2);
    }

    if (value.length > 2) {
        result += " " + value.substring(2, 5);
    }

    if (value.length > 5) {
        result += " " + value.substring(5, 7);
    }

    if (value.length > 7) {
        result += " " + value.substring(7, 9);
    }

    event.target.value = result;

});
