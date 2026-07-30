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

  // --- Navbar: sombra al scrollear ---
  const navbar = document.getElementById("navbar");

  if (navbar) {
    const toggleScrolled = () => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    window.addEventListener("scroll", toggleScrolled, { passive: true });
    toggleScrolled();
  }

  // --- Navbar: menú hamburguesa (mobile) ---
  const navToggle = document.getElementById("navbar-toggle");
  const navPanel = document.getElementById("navbar-panel");

  if (navToggle && navPanel) {
    const closeMenu = () => {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menú");
      navPanel.classList.remove("is-open");
    };

    const openMenu = () => {
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Cerrar menú");
      navPanel.classList.add("is-open");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    navPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen && !navPanel.contains(event.target) && !navToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        navToggle.focus();
      }
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

  // --- Carrito ---
  const CART_STORAGE_KEY = "cookit-cart";
  const WHATSAPP_NUMBER = "5491153340097";

  const formatMoney = (amount) => `$${Math.round(amount).toLocaleString("es-AR")}`;

  // Los 8 sabores son la única fuente de verdad: se leen de las cards sueltas
  // ya presentes en el DOM y se reutilizan tanto para las sueltas como para
  // poblar el armador de cajas.
  const flavorCatalog = Array.from(document.querySelectorAll(".card-sabor [data-add-to-cart]")).map(
    (btn) => ({
      id: btn.dataset.flavorId,
      name: btn.dataset.flavorName,
      price: Number(btn.dataset.price),
    })
  );

  const loadCart = () => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  let cart = loadCart();

  const saveCart = () => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* localStorage no disponible (ej. modo privado) — el carrito sigue andando en memoria */
    }
  };

  const cartItemCount = () =>
    cart.reduce((sum, line) => sum + (line.type === "box" ? 1 : line.qty), 0);

  const cartTotal = () =>
    cart.reduce(
      (sum, line) => sum + (line.type === "box" ? line.price : line.unitPrice * line.qty),
      0
    );

  const cartBadge = document.getElementById("cart-badge");

  const renderBadge = () => {
    if (!cartBadge) return;
    const count = cartItemCount();

    if (count > 0) {
      cartBadge.hidden = false;
      cartBadge.textContent = String(count);
      cartBadge.classList.remove("is-pulsing");
      void cartBadge.offsetWidth;
      cartBadge.classList.add("is-pulsing");
    } else {
      cartBadge.hidden = true;
    }
  };

  // --- Apertura/cierre compartido (modal de caja + drawer del carrito) ---
  const overlay = document.getElementById("overlay");
  let activePanel = null;
  let lastFocusedEl = null;

  const openPanel = (panel) => {
    activePanel = panel;
    lastFocusedEl = document.activeElement;
    panel.hidden = false;
    overlay.hidden = false;
    void panel.offsetWidth;
    panel.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.classList.add("no-scroll");
    panel.focus();
  };

  const closePanel = () => {
    if (!activePanel) return;
    const panel = activePanel;
    const trigger = lastFocusedEl;
    activePanel = null;

    panel.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.classList.remove("no-scroll");

    const hidePanel = () => {
      panel.hidden = true;
      overlay.hidden = true;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hidePanel();
    } else {
      panel.addEventListener("transitionend", hidePanel, { once: true });
      setTimeout(hidePanel, 320);
    }

    if (trigger) trigger.focus();
  };

  if (overlay) {
    overlay.addEventListener("click", closePanel);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activePanel) closePanel();
  });

  // --- Modal: armar caja ---
  const boxModal = document.getElementById("box-modal");
  const boxModalTitle = document.getElementById("box-modal-title");
  const boxModalCount = document.getElementById("box-modal-count");
  const boxModalTarget = document.getElementById("box-modal-target");
  const boxModalProgressBar = document.getElementById("box-modal-progress-bar");
  const boxModalFlavors = document.getElementById("box-modal-flavors");
  const boxModalConfirm = document.getElementById("box-modal-confirm");
  const boxModalClose = document.getElementById("box-modal-close");

  let boxSelection = {};
  let boxTarget = 0;
  let boxPrice = 0;
  let boxName = "";

  const boxSelectedTotal = () => Object.values(boxSelection).reduce((sum, qty) => sum + qty, 0);

  const renderBoxModal = () => {
    const total = boxSelectedTotal();
    boxModalCount.textContent = String(total);
    boxModalTarget.textContent = String(boxTarget);
    boxModalProgressBar.style.transform = `scaleX(${boxTarget ? total / boxTarget : 0})`;
    boxModalConfirm.disabled = total !== boxTarget;

    boxModalFlavors.querySelectorAll("[data-box-qty-value]").forEach((el) => {
      el.textContent = String(boxSelection[el.dataset.boxQtyValue] || 0);
    });
    boxModalFlavors.querySelectorAll("[data-box-decrease]").forEach((btn) => {
      btn.disabled = (boxSelection[btn.dataset.boxDecrease] || 0) <= 0;
    });
    boxModalFlavors.querySelectorAll("[data-box-increase]").forEach((btn) => {
      btn.disabled = total >= boxTarget;
    });
  };

  const buildBoxModalRows = () => {
    boxModalFlavors.innerHTML = "";
    flavorCatalog.forEach((flavor) => {
      const li = document.createElement("li");
      li.className = "box-modal__flavor";
      li.innerHTML = `
        <span class="box-modal__flavor-name">${flavor.name}</span>
        <div class="qty">
          <button type="button" class="qty__btn" data-box-decrease="${flavor.id}" aria-label="Restar ${flavor.name}">−</button>
          <span class="qty__value" data-box-qty-value="${flavor.id}">0</span>
          <button type="button" class="qty__btn" data-box-increase="${flavor.id}" aria-label="Sumar ${flavor.name}">+</button>
        </div>
      `;
      boxModalFlavors.appendChild(li);
    });
  };

  if (boxModal && boxModalFlavors) {
    document.querySelectorAll("[data-open-box-modal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        boxTarget = Number(btn.dataset.boxSize);
        boxPrice = Number(btn.dataset.boxPrice);
        boxName = btn.dataset.boxName;
        boxSelection = {};

        boxModalTitle.textContent = `Armá tu ${boxName}`;
        buildBoxModalRows();
        renderBoxModal();
        openPanel(boxModal);
      });
    });

    boxModalFlavors.addEventListener("click", (event) => {
      const decreaseId = event.target.closest("[data-box-decrease]")?.dataset.boxDecrease;
      const increaseId = event.target.closest("[data-box-increase]")?.dataset.boxIncrease;

      if (decreaseId && boxSelection[decreaseId] > 0) {
        boxSelection[decreaseId] -= 1;
        renderBoxModal();
      } else if (increaseId && boxSelectedTotal() < boxTarget) {
        boxSelection[increaseId] = (boxSelection[increaseId] || 0) + 1;
        renderBoxModal();
      }
    });

    boxModalConfirm.addEventListener("click", () => {
      const flavors = Object.entries(boxSelection)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => ({
          name: flavorCatalog.find((f) => f.id === id)?.name || id,
          qty,
        }));

      cart.push({
        type: "box",
        id: `box-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        size: boxTarget,
        name: boxName,
        price: boxPrice,
        flavors,
      });

      saveCart();
      renderBadge();
      renderDrawer();
      closePanel();
    });

    boxModalClose.addEventListener("click", closePanel);
  }

  // --- Drawer: carrito ---
  const cartToggle = document.getElementById("cart-toggle");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartDrawerClose = document.getElementById("cart-drawer-close");
  const cartDrawerBody = document.getElementById("cart-drawer-body");
  const cartDrawerTotal = document.getElementById("cart-drawer-total");
  const cartDrawerConfirm = document.getElementById("cart-drawer-confirm");

  const buildWhatsAppMessage = () => {
    const boxLines = cart.filter((line) => line.type === "box");
    const looseLines = cart.filter((line) => line.type === "loose");
    const parts = ["Hola! Quiero hacer este pedido:"];

    if (boxLines.length) {
      parts.push("", "CAJAS");
      boxLines.forEach((line) => {
        const breakdown = line.flavors.map((f) => `${f.qty} ${f.name}`).join(", ");
        parts.push(`• ${line.name} — ${formatMoney(line.price)}`, `  ${breakdown}`);
      });
    }

    if (looseLines.length) {
      parts.push("", "SUELTAS");
      looseLines.forEach((line) => {
        parts.push(`• ${line.name} x${line.qty} — ${formatMoney(line.unitPrice * line.qty)}`);
      });
    }

    parts.push("", `Total: ${formatMoney(cartTotal())}`);
    return parts.join("\n");
  };

  const renderBoxLine = (line) => {
    const wrap = document.createElement("div");
    wrap.className = "cart-line";
    wrap.innerHTML = `
      <div class="cart-line__row">
        <span class="cart-line__name">${line.name}</span>
        <span class="cart-line__price">${formatMoney(line.price)}</span>
      </div>
      <p class="cart-line__meta">${line.flavors.map((f) => `${f.qty} ${f.name}`).join(", ")}</p>
      <div class="cart-line__foot">
        <button type="button" class="cart-line__remove" data-remove-line="${line.id}">Quitar</button>
      </div>
    `;
    return wrap;
  };

  const renderLooseLine = (line) => {
    const wrap = document.createElement("div");
    wrap.className = "cart-line";
    wrap.innerHTML = `
      <div class="cart-line__row">
        <span class="cart-line__name">${line.name}</span>
        <span class="cart-line__price">${formatMoney(line.unitPrice * line.qty)}</span>
      </div>
      <div class="cart-line__foot">
        <div class="qty">
          <button type="button" class="qty__btn" data-line-decrease="${line.id}" aria-label="Restar unidad de ${line.name}">−</button>
          <span class="qty__value">${line.qty}</span>
          <button type="button" class="qty__btn" data-line-increase="${line.id}" aria-label="Sumar unidad de ${line.name}">+</button>
        </div>
        <button type="button" class="cart-line__remove" data-remove-line="${line.id}">Quitar</button>
      </div>
    `;
    return wrap;
  };

  const renderDrawer = () => {
    if (!cartDrawerBody) return;
    cartDrawerBody.innerHTML = "";

    if (cart.length === 0) {
      const empty = document.createElement("p");
      empty.className = "cart-drawer__empty";
      empty.textContent = "Todavía no agregaste nada.";
      cartDrawerBody.appendChild(empty);
    } else {
      const boxLines = cart.filter((line) => line.type === "box");
      const looseLines = cart.filter((line) => line.type === "loose");

      if (boxLines.length) {
        const title = document.createElement("p");
        title.className = "cart-drawer__group-title";
        title.textContent = "Cajas";
        cartDrawerBody.appendChild(title);
        boxLines.forEach((line) => cartDrawerBody.appendChild(renderBoxLine(line)));
      }

      if (looseLines.length) {
        const title = document.createElement("p");
        title.className = "cart-drawer__group-title";
        title.textContent = "Sueltas";
        cartDrawerBody.appendChild(title);
        looseLines.forEach((line) => cartDrawerBody.appendChild(renderLooseLine(line)));
      }
    }

    cartDrawerTotal.textContent = formatMoney(cartTotal());

    const isEmpty = cart.length === 0;
    cartDrawerConfirm.classList.toggle("is-disabled", isEmpty);
    cartDrawerConfirm.setAttribute("aria-disabled", String(isEmpty));
    cartDrawerConfirm.tabIndex = isEmpty ? -1 : 0;
    cartDrawerConfirm.href = isEmpty
      ? "#"
      : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
  };

  if (cartToggle && cartDrawer) {
    cartToggle.addEventListener("click", () => {
      renderDrawer();
      openPanel(cartDrawer);
    });

    cartDrawerClose.addEventListener("click", closePanel);

    cartDrawerConfirm.addEventListener("click", (event) => {
      if (cartDrawerConfirm.classList.contains("is-disabled")) event.preventDefault();
    });

    cartDrawerBody.addEventListener("click", (event) => {
      const removeId = event.target.closest("[data-remove-line]")?.dataset.removeLine;
      const decreaseId = event.target.closest("[data-line-decrease]")?.dataset.lineDecrease;
      const increaseId = event.target.closest("[data-line-increase]")?.dataset.lineIncrease;

      if (removeId) {
        cart = cart.filter((line) => line.id !== removeId);
      } else if (decreaseId) {
        const line = cart.find((l) => l.id === decreaseId);
        if (line) {
          line.qty -= 1;
          if (line.qty <= 0) cart = cart.filter((l) => l.id !== decreaseId);
        }
      } else if (increaseId) {
        const line = cart.find((l) => l.id === increaseId);
        if (line) line.qty += 1;
      } else {
        return;
      }

      saveCart();
      renderBadge();
      renderDrawer();
    });
  }

  // --- Sueltas: selector de cantidad + agregar al carrito (por card) ---
  document.querySelectorAll(".card-sabor").forEach((card) => {
    const decreaseBtn = card.querySelector("[data-qty-decrease]");
    const increaseBtn = card.querySelector("[data-qty-increase]");
    const valueEl = card.querySelector("[data-qty-value]");
    const addBtn = card.querySelector("[data-add-to-cart]");

    if (!decreaseBtn || !increaseBtn || !valueEl || !addBtn) return;

    let qty = 1;

    const renderQty = () => {
      valueEl.textContent = String(qty);
      decreaseBtn.disabled = qty <= 1;
    };

    decreaseBtn.addEventListener("click", () => {
      if (qty > 1) {
        qty -= 1;
        renderQty();
      }
    });

    increaseBtn.addEventListener("click", () => {
      qty += 1;
      renderQty();
    });

    addBtn.addEventListener("click", () => {
      const id = addBtn.dataset.flavorId;
      const name = addBtn.dataset.flavorName;
      const price = Number(addBtn.dataset.price);
      const existing = cart.find((line) => line.type === "loose" && line.id === id);

      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ type: "loose", id, name, unitPrice: price, qty });
      }

      saveCart();
      renderBadge();
      renderDrawer();

      qty = 1;
      renderQty();
    });

    renderQty();
  });

  renderBadge();
  renderDrawer();
})();
