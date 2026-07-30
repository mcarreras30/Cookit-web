(() => {
  "use strict";

  // --- Reveal al scroll (progressive enhancement) ---
  // Si no hay soporte de IntersectionObserver, el contenido queda visible
  // por defecto (ver css/styles.css: [data-reveal] solo se oculta si
  // body tiene la clase "reveal-ready").
  if ("IntersectionObserver" in window) {
    document.body.classList.add("reveal-ready");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // --- Carrusel de testimonios ---
  const track = document.getElementById("testimonios-track");
  const prevBtn = document.querySelector(".testimonios__nav--prev");
  const nextBtn = document.querySelector(".testimonios__nav--next");

  if (track && prevBtn && nextBtn) {
    const scrollByCard = (direction) => {
      const card = track.querySelector(".card-testimonio");
      const distance = card ? card.getBoundingClientRect().width + 20 : 320;
      track.scrollBy({ left: direction * distance, behavior: "smooth" });
    };

    prevBtn.addEventListener("click", () => scrollByCard(-1));
    nextBtn.addEventListener("click", () => scrollByCard(1));
  }

  // --- Botón flotante de WhatsApp: aparece luego de scrollear más allá del hero ---
  const waSticky = document.getElementById("wa-sticky");
  const hero = document.querySelector(".hero");

  if (waSticky && hero) {
    const toggleSticky = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      waSticky.classList.toggle("is-shown", heroBottom < 0);
    };

    window.addEventListener("scroll", toggleSticky, { passive: true });
    toggleSticky();
  }
})();
