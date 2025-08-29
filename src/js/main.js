// src/js/main.js
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     1) Animação leve nas imagens do herói
  ========================== */
  const images = document.querySelectorAll(".hero-image");
  images.forEach((image, index) => {
    image.classList.add("animate-float");
    if (index === 1) image.classList.add("animate-float-delay-1");
    if (index === 2) image.classList.add("animate-float-delay-2");
  });

  /* =========================
     2) Highlight da navegação ao rolar
  ========================== */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const activeClasses = ["text-blue-400", "underline", "underline-offset-4"];

  const removeActiveClasses = () => {
    navLinks.forEach((link) => {
      activeClasses.forEach((c) => link.classList.remove(c));
    });
  };

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        removeActiveClasses();
        const currentLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
        );
        if (currentLink) activeClasses.forEach((c) => currentLink.classList.add(c));
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.6 }
  );

  sections.forEach((section) => navObserver.observe(section));

  /* =========================
     3) Menu mobile (hamburger)
  ========================== */
  const hamburgerButton = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".nav-link-mobile");

  if (hamburgerButton && mobileMenu) {
    hamburgerButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
  if (mobileLinks.length) {
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
    });
  }

  /* =========================
     4) Reveal on scroll
  ========================== */
  const revealables = document.querySelectorAll("[data-reveal]");
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          // revealIO.unobserve(el) // use se quiser animar só uma vez
        } else {
          el.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.2 }
  );
  revealables.forEach((el) => revealIO.observe(el));

  /* =========================
     5) Formulário (ordenação + envio Netlify)
  ========================== */
  const form = document.getElementById("eixos-form");
  if (form) {
    const cards = form.querySelectorAll(".eixo-card");
    const feedbackMessage = document.getElementById("form-feedback");
    const formContent = document.getElementById("form-content");
    const successMessage = document.getElementById("success-message");
    const MAX_SELECTIONS = 6;

    // hidden fields Netlify
    const prioridadesInput = document.getElementById("prioridades");
    const sugestaoHiddenInput = document.getElementById("sugestao-hidden");
    const outroEixoTextarea = document.getElementById("outro-eixo");

    let selectionOrder = [];

    const updateDisplay = () => {
      cards.forEach((card) => {
        const cardId = card.id;
        const rank = selectionOrder.indexOf(cardId) + 1;
        const rankIndicator = card.querySelector(".rank-indicator");

        if (rank > 0) {
          card.classList.add("border-blue-500", "bg-gray-700");
          rankIndicator.classList.remove("hidden");
          rankIndicator.textContent = rank;
        } else {
          card.classList.remove("border-blue-500", "bg-gray-700");
          rankIndicator.classList.add("hidden");
        }
      });
    };

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const cardId = card.id;

        if (selectionOrder.includes(cardId)) {
          selectionOrder = selectionOrder.filter((id) => id !== cardId);
        } else {
          if (selectionOrder.length < MAX_SELECTIONS) {
            selectionOrder.push(cardId);
          } else {
            feedbackMessage.textContent = `Você pode selecionar no máximo ${MAX_SELECTIONS} eixos.`;
            setTimeout(() => (feedbackMessage.textContent = ""), 3000);
          }
        }
        updateDisplay();
      });
    });

    // helper para form-url-encoded
    const encode = (data) =>
      Object.keys(data)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
        .join("&");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (selectionOrder.length === 0) {
        feedbackMessage.textContent =
          "Por favor, selecione pelo menos um eixo em ordem de prioridade.";
        return;
      }

      // Preenche hidden fields (Netlify Forms)
      if (prioridadesInput)
        prioridadesInput.value = JSON.stringify(selectionOrder);
      if (sugestaoHiddenInput && outroEixoTextarea)
        sugestaoHiddenInput.value = outroEixoTextarea.value || "";

      // Envia para Netlify
      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": "eixos", // precisa casar com name="eixos" no <form>
            prioridades: prioridadesInput ? prioridadesInput.value : "",
            sugestao: sugestaoHiddenInput ? sugestaoHiddenInput.value : "",
          }),
        });

        formContent.classList.add("hidden");
        successMessage.classList.remove("hidden");
      } catch (e) {
        feedbackMessage.textContent = "Erro ao enviar. Tente novamente.";
      }
    });
  }
});
