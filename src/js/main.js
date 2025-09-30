document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     INICIALIZAÇÃO GERAL
  ========================== */
  console.log("Inicializando Aureny IV...");

  /* =========================
     1) MODAL DO FOLHETO (SEMPRE VISÍVEL, EXCETO QUANDO O CARD DE AGRADECIMENTO ESTIVER ATIVO)
  ========================== */
  const folhetoModal = document.getElementById("folheto-modal");
  const closeFolhetoBtn = document.getElementById("close-folheto");

  function abrirModalFolheto() {
    // Verifica se o card de agradecimento está visível
    const thankyouCard = document.getElementById("thankyou-card");
    if (thankyouCard && !thankyouCard.classList.contains("hidden")) {
      console.log("Card de agradecimento ativo, não abrindo folheto");
      return;
    }
    
    console.log("Abrindo modal do folheto...");
    
    folhetoModal.classList.remove("hidden");
    
    // Pequeno delay para a animação
    setTimeout(() => {
      folhetoModal.classList.add("show");
    }, 50);
  }

  function fecharModalFolheto() {
    console.log("Fechando modal do folheto...");
    
    folhetoModal.classList.remove("show");
    
    setTimeout(() => {
      folhetoModal.classList.add("hidden");
    }, 400);
  }

  // Inicializar modal do folheto
  if (folhetoModal) {
    // Mostra o modal imediatamente ao carregar
    setTimeout(abrirModalFolheto, 300);
    
    // Event listeners
    if (closeFolhetoBtn) {
      closeFolhetoBtn.addEventListener("click", fecharModalFolheto);
    }
    
    folhetoModal.addEventListener("click", function(e) {
      if (e.target === folhetoModal) {
        fecharModalFolheto();
      }
    });
    
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && !folhetoModal.classList.contains("hidden")) {
        fecharModalFolheto();
      }
    });
  }

  /* =========================
     2) Animação nas imagens do herói
  ========================== */
  const images = document.querySelectorAll(".hero-image");
  if (images.length > 0) {
    images.forEach((image, index) => {
      image.classList.add("animate-float");
      if (index === 1) image.classList.add("animate-float-delay-1");
      if (index === 2) image.classList.add("animate-float-delay-2");
    });
  }

  /* =========================
     3) Highlight da navegação ao rolar
  ========================== */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const activeClasses = ["text-blue-600", "bg-blue-50"];

  const removeActiveClasses = () => {
    navLinks.forEach((link) => {
      activeClasses.forEach((c) => link.classList.remove(c));
    });
  };

  if (sections.length > 0 && navLinks.length > 0) {
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
  }

  /* =========================
     4) Menu mobile (hamburger)
  ========================== */
  const hamburgerButton = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".nav-link-mobile");

  if (hamburgerButton && mobileMenu) {
    hamburgerButton.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden");
      hamburgerButton.innerHTML = isHidden 
        ? '<i class="fas fa-bars text-xl"></i>'
        : '<i class="fas fa-times text-xl"></i>';
    });
  }
  
  if (mobileLinks.length > 0) {
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        if (hamburgerButton) {
          hamburgerButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        }
      });
    });
  }

  /* =========================
     5) Reveal on scroll
  ========================== */
  const revealables = document.querySelectorAll("[data-reveal]");
  if (revealables.length > 0) {
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
  }

  /* =========================
     6) Smooth scrolling para âncoras
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* =========================
     7) Formulário de Eixos
  ========================== */
  const form = document.getElementById("form-eixos");
  const feedbackMessage = document.getElementById("feedback-message");
  const prioridadesInput = document.getElementById("prioridades");
  const sugestaoHiddenInput = document.getElementById("sugestao");
  const outroEixoTextarea = document.getElementById("outro-eixo");
  let selectionOrder = [];

  const encode = (obj) => {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(
          encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
        );
      }
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

  // Inicializar seleção de eixos
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
        if (feedbackMessage) {
          feedbackMessage.textContent = "Por favor, selecione pelo menos um eixo em ordem de prioridade.";
        }
        return;
      }

      if (prioridadesInput) prioridadesInput.value = JSON.stringify(selectionOrder);
      if (sugestaoHiddenInput && outroEixoTextarea) {
        sugestaoHiddenInput.value = outroEixoTextarea.value || "";
      }

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

        abrirCardAgradecimento();
      } catch (e) {
        if (feedbackMessage) {
          feedbackMessage.textContent = "Erro ao enviar. Tente novamente.";
        }
      }
    });
  }

  /* =========================
     8) CARD DE AGRADECIMENTO
  ========================= */
  const thankyouCard = document.getElementById("thankyou-card");
  const closeCardBtn = document.getElementById("thankyou-close-btn");

  function abrirCardAgradecimento() {
    console.log("Abrindo card de agradecimento");
    if (!thankyouCard) {
      console.error("Card de agradecimento não encontrado!");
      return;
    }
    
    // Fecha o modal do folheto se estiver aberto
    if (folhetoModal && !folhetoModal.classList.contains("hidden")) {
      fecharModalFolheto();
    }
    
    thankyouCard.classList.remove("hidden");
    
    setTimeout(() => {
      thankyouCard.style.opacity = "1";
      const cardContent = thankyouCard.querySelector(".bg-white");
      if (cardContent) {
        cardContent.style.transform = "scale(1)";
      }
    }, 50);
  }

  function fecharCardAgradecimento() {
    if (!thankyouCard) return;
    
    thankyouCard.style.opacity = "0";
    const cardContent = thankyouCard.querySelector(".bg-white");
    if (cardContent) {
      cardContent.style.transform = "scale(0.95)";
    }
    
    setTimeout(() => {
      thankyouCard.classList.add("hidden");
      
      if (window.location.pathname.includes("formulario.html")) {
        window.location.href = "index.html";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 300);
  }

  // Configurar event listeners do card de agradecimento
  if (closeCardBtn) {
    closeCardBtn.addEventListener("click", fecharCardAgradecimento);
  }

  if (thankyouCard) {
    thankyouCard.addEventListener("click", (e) => {
      if (e.target === thankyouCard) fecharCardAgradecimento();
    });
  }

  // Auto-abrir card se veio de ?thanks=1
  const params = new URLSearchParams(window.location.search);
  if (params.get("thanks") === "1") {
    console.log("Parâmetro thanks=1 detectado, abrindo card");
    abrirCardAgradecimento();
    const newUrl = window.location.pathname + (window.location.hash || "");
    window.history.replaceState({}, "", newUrl);
  }

  // Observador para prevenir que o folheto abra quando o card de agradecimento estiver ativo
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const thankyouCard = document.getElementById("thankyou-card");
        const folhetoModal = document.getElementById("folheto-modal");
        
        // Se o card de agradecimento estiver visível e o folheto também, fecha o folheto
        if (thankyouCard && folhetoModal && 
            !thankyouCard.classList.contains("hidden") && 
            !folhetoModal.classList.contains("hidden")) {
          fecharModalFolheto();
        }
      }
    });
  });

  if (thankyouCard) {
    observer.observe(thankyouCard, { attributes: true, attributeFilter: ['class'] });
  }

  console.log("Aureny IV inicializado com sucesso!");
});