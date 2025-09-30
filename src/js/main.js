document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     1) Animação nas imagens do herói
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
  const activeClasses = ["text-blue-600", "bg-blue-50"];

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
      hamburgerButton.innerHTML = mobileMenu.classList.contains("hidden") 
        ? '<i class="fas fa-bars text-xl"></i>'
        : '<i class="fas fa-times text-xl"></i>';
    });
  }
  
  if (mobileLinks.length) {
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        hamburgerButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
      });
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
        } else {
          el.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.15 }
  );
  revealables.forEach((el) => revealIO.observe(el));

  /* =========================
     5) Smooth scrolling para âncoras
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* =========================
     6) Formulário de Eixos
  ========================== */
  const form = document.getElementById("form-eixos");
  const feedbackMessage = document.getElementById("feedback-message");
  const prioridadesInput = document.getElementById("prioridades");
  const sugestaoHiddenInput = document.getElementById("sugestao");
  const outroEixoTextarea = document.getElementById("outro-eixo");
  let selectionOrder = [];

  const encode = (obj) => {
    const str = [];
    for (const p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(
          encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
        );
      }
    return str.join("&");
  };

  const updateDisplay = () => {
    const display = document.getElementById("selection-display");
    if (display) {
      display.innerHTML = selectionOrder
        .map((id) => {
          const el = document.getElementById(id);
          return el ? el.querySelector(".eixo-nome").innerText : "";
        })
        .join(" > ");
    }
  };

  document.querySelectorAll(".eixo-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.id;
      const index = selectionOrder.indexOf(id);
      if (index === -1) {
        selectionOrder.push(id);
        card.classList.add("selected");
      } else {
        selectionOrder.splice(index, 1);
        card.classList.remove("selected");
      }
      updateDisplay();
    });
  });

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (selectionOrder.length === 0) {
        feedbackMessage.textContent =
          "Por favor, selecione pelo menos um eixo em ordem de prioridade.";
        return;
      }

      if (prioridadesInput)
        prioridadesInput.value = JSON.stringify(selectionOrder);
      if (sugestaoHiddenInput && outroEixoTextarea)
        sugestaoHiddenInput.value = outroEixoTextarea.value || "";

      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": "eixos",
            prioridades: prioridadesInput ? prioridadesInput.value : "",
            sugestao: sugestaoHiddenInput ? sugestaoHiddenInput.value : "",
          }),
        });

        // Limpa seleção visual
        selectionOrder = [];
        updateDisplay();
        if (outroEixoTextarea) outroEixoTextarea.value = "";
        if (prioridadesInput) prioridadesInput.value = "";
        if (sugestaoHiddenInput) sugestaoHiddenInput.value = "";

        abrirModalAgradecimento();
      } catch (e) {
        feedbackMessage.textContent = "Erro ao enviar. Tente novamente.";
      }
    });

  // =========================
  // B) Auto-abrir modal se veio de ?thanks=1
  // =========================
  const params = new URLSearchParams(window.location.search);
  if (params.get("thanks") === "1") {
    abrirModalAgradecimento();
    // limpa a query da URL para não reabrir ao recarregar
    const newUrl = window.location.pathname + (window.location.hash || "");
    window.history.replaceState({}, "", newUrl);
  }

    if (closeBtn) closeBtn.addEventListener("click", fecharModalAgradecimento);
    if (okBtn) okBtn.addEventListener("click", fecharModalAgradecimento);
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) fecharModalAgradecimento();
    });
  }

  // =========================
  // A) Modal de Agradecimento (independente de existir form)
  // =========================
  const modal = document.getElementById("thankyou-modal");
  const closeBtn = document.getElementById("thankyou-close");
  const okBtn = document.getElementById("thankyou-ok");
  let lastFocused = null;

  function trapFocus(e) {
    if (!modal || modal.classList.contains("hidden")) return;
    if (e.key === "Tab") {
      const focusables = modal.querySelectorAll(
        'button, [href], textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    } else if (e.key === "Escape") {
      fecharModalAgradecimento();
    }
  }

  function abrirModalAgradecimento() {
    if (!modal) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    lastFocused = document.activeElement;
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    setTimeout(() => { okBtn && okBtn.focus(); }, 50);
    document.addEventListener("keydown", trapFocus);
  }

  function fecharModalAgradecimento() {
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    document.removeEventListener("keydown", trapFocus);
    if (lastFocused) lastFocused.focus();
  }

  if (closeBtn) closeBtn.addEventListener("click", fecharModalAgradecimento);
  if (okBtn) okBtn.addEventListener("click", () => {
    fecharModalAgradecimento();
    // se quiser garantir voltar ao topo da Home
    // location.hash = "#home";
  });
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) fecharModalAgradecimento();
  });
});