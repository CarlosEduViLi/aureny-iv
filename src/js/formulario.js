document.addEventListener("DOMContentLoaded", () => {
    // Config de eixos ATUALIZADA com todos os requisitos
    const config = [
      {
        id: "saude",
        titulo: "Saúde",
        cor: "green",
        descricao:
          "Acesso, qualidade de atendimento, prevenção de doenças e bem-estar.",
        opcoes: [
          { id: "postinhos-bairros", label: "Construção de postinhos de saúde nos bairros adjacentes" },
          { id: "volta-caps", label: "Volta do CAPS" },
          { id: "farmacias-populares", label: "Construção de mais farmácias populares" },
          { id: "profissionalizacao-saude", label: "Profissionalização dos profissionais de saúde existentes" },
          { id: "melhoria-estrutura-postinhos", label: "Melhoria da estrutura física dos postinhos" }
        ],
      },
      {
        id: "mobilidade",
        titulo: "Mobilidade, Infraestrutura e Segurança Pública",
        cor: "orange",
        descricao: "Vias, transporte, iluminação, segurança pública e urbanização.",
        opcoes: [
          { id: "calcadas-acessibilidade", label: "Adequação das calçadas para que atendam as normas de micro acessibilidade" },
          { id: "sinalizacao-viaria", label: "Melhora na sinalização viária, realizando a revitalização das faixas de pedestre, quebra molas e placas de sinalização" },
          { id: "infraestrutura-cicloviaria", label: "Implementação de infraestrutura cicloviária no bairro" },
          { id: "melhorias-pontos-onibus", label: "Melhorias na infraestrutura dos pontos de ônibus, principalmente dos que não possuem abrigo" },
          { id: "melhoria-pavimentacao", label: "Melhorias na pavimentação do bairro" },
          { id: "iluminacao-publica", label: "Melhorias na iluminação pública a fim de torná-la mais eficiente" },
          { id: "coleta-seletiva", label: "Implementação da coleta seletiva e melhora na gestão de resíduos sólidos (lixo)" },
          { id: "infraestrutura-basica", label: "Melhorias na infraestrutura básica do bairro" },
          { id: "seguranca-quadras", label: "Melhoria na segurança pública das quadras" }
        ],
      },
      {
        id: "habitacao",
        titulo: "Habitação e Regularização Fundiária",
        cor: "purple",
        descricao:
          "Moradia digna, regularização, programas habitacionais e melhorias.",
        opcoes: [
          { id: "infraestrutura-moradias", label: "Melhoria da infraestrutura das moradias do setor" },
          { id: "regularizacao-orcamento", label: "Estruturação e Financiamento do Processo de Regularização: Orçamento específico e suficiente para as secretarias municipais responsáveis pelo REURB, visando à contratação de técnicos, à modernização de equipamentos e à celeridade na análise e aprovação dos processos de regularização fundiária" }
        ],
      },
      {
        id: "educacao",
        titulo: "Educação",
        cor: "blue",
        descricao:
          "Qualidade do ensino, acesso à educação infantil, capacitação e infraestrutura escolar.",
        opcoes: [
          { id: "reforco-escolar", label: "Implantação de programa de reforço escolar" },
          { id: "novas-salas", label: "Construção de novas salas para reduzir a superlotação" },
          { id: "quadra-escola", label: "Construção da quadra coberta da Escola Municipal Maria Verônica" },
          { id: "materiais-didaticos", label: "Aquisição de mais materiais didáticos e recursos pedagógicos" },
          { id: "seguranca-escolas", label: "Ampliação da segurança entorno das escolas" }
        ],
      },
      {
        id: "meio-ambiente",
        titulo: "Meio Ambiente",
        cor: "teal",
        descricao:
          "Preservação, áreas verdes, coleta seletiva e sustentabilidade.",
        opcoes: [
          { id: "parque-linear", label: "Consolidação do Parque Linear Urbano Machado, promovendo lazer, preservação ambiental e valorização do espaço urbano" },
          { id: "recuperacao-ambiental", label: "Recuperação ambiental da AVU Machado e do córrego homônimo" },
          { id: "drenagem-pluvial", label: "Ampliação da rede de drenagem de águas pluviais do bairro" },
          { id: "gestao-lixo", label: "Implantação de um sistema eficiente de gestão do lixo, com coleta seletiva, pontos de entrega voluntária e ações educativas de conscientização comunitária" },
          { id: "horta-comunitaria", label: "Reestruturação e fortalecimento da horta comunitária do bairro e agricultura urbana" }
        ],
      },
      {
        id: "governanca",
        titulo: "Governança e Empresas",
        cor: "indigo",
        descricao: "Gestão pública, transporte, comércio local e associações comunitárias.",
        opcoes: [
          { id: "transporte-comercio", label: "Adequação do transporte público à demanda dos comércios locais e a criação de feiras para vendas comunitárias" },
          { id: "associacao-comerciantes", label: "Criação de uma associação de Comerciantes/Empresários da Aureny IV para a criação de propostas de políticas públicas que auxiliem as empresas locais e as demandas da comunidade" },
          { id: "associacao-moradores", label: "Criar também uma associação de moradores para intermediar as relações entre comunidade e gestão municipal" }
        ],
      },
      {
        id: "cultura",
        titulo: "Cultura, Esporte e Lazer",
        cor: "pink",
        descricao:
          "Atividades culturais, lazer, esporte e entretenimento comunitário.",
        opcoes: [
          { id: "revitalizacao-pracas", label: "Revitalização das praças" },
          { id: "quadras-poliesportivas", label: "Construção de quadras poliesportivas" },
          { id: "incentivo-esporte-escolas", label: "Implementação de programas de incentivo a esporte nas escolas" },
          { id: "revitalizacao-lazer", label: "Revitalização das áreas de lazer" }
        ],
      },
    ];
    
    // ==== CONFIGURAÇÕES ====
    const MAX_OPCOES = 2;
    
    function showStepError(eixoId, msg) {
      const p = document.getElementById(`limit-msg-${eixoId}`);
      if (!p) return;
      p.textContent = msg;
      p.classList.remove("text-gray-500");
      p.classList.add("text-red-600");
      setTimeout(() => {
        p.textContent = "";
        p.classList.add("text-gray-500");
        p.classList.remove("text-red-600");
      }, 3000);
    }
    
    const form = document.getElementById("multi-step-form");
    const stepsContainer = document.getElementById("steps-container");
    const reviewStepEl = document.getElementById("review-step");
    const progressText = document.getElementById("progress-text");
    const progressBar = document.getElementById("progress-bar");
    
    let currentStep = 0;
    const selections = {}; // { eixoId: [opcaoId,...] }
    
    function buildSteps() {
      config.forEach((eixo, idx) => {
        const stepDiv = document.createElement("div");
        stepDiv.className = `step ${idx === 0 ? "block" : "hidden"}`;
        stepDiv.dataset.stepIndex = idx;
    
        stepDiv.innerHTML = `
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-${eixo.cor}-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
              ${idx + 1}
            </div>
            <h2 class="text-2xl font-bold text-gray-800">${eixo.titulo}</h2>
          </div>
          <div class="bg-${eixo.cor}-50 border-l-4 border-${eixo.cor}-500 p-6 rounded-lg mb-8">
            <h3 class="text-lg font-semibold text-${eixo.cor}-800 mb-2">
              <i class="fas fa-info-circle mr-2"></i>Sobre este eixo
            </h3>
            <p class="text-${eixo.cor}-700">${eixo.descricao}</p>
          </div>
          <div class="space-y-4 mb-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Selecione até ${MAX_OPCOES} itens (mínimo 1 para avançar)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${eixo.opcoes
                .map(
                  (op) => `
                <label class="option-card bg-gray-50 border-2 border-gray-200 rounded-xl p-4 cursor-pointer transition-all hover:border-${eixo.cor}-400 hover:bg-${eixo.cor}-50">
                  <input type="checkbox" data-eixo="${eixo.id}" value="${op.id}" class="hidden eixo-checkbox">
                  <div class="flex items-center">
                    <div class="check-visual w-6 h-6 border-2 border-gray-300 rounded mr-3 flex items-center justify-center transition-colors">
                      <i class="fas fa-check text-white text-xs"></i>
                    </div>
                    <span class="font-medium">${op.label}</span>
                  </div>
                </label>`
                )
                .join("")}
            </div>
            <p class="text-sm text-gray-500 mt-2" id="limit-msg-${eixo.id}"></p>
          </div>
          <div class="flex justify-between pt-6 border-t border-gray-200">
            ${
              idx === 0
                ? '<div></div>'
                : `<button type="button" class="btn-prev bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center cursor-pointer">
                    <i class="fas fa-arrow-left mr-2"></i>Voltar
                  </button>`
            }
            <button type="button" class="btn-next bg-${eixo.cor}-600 hover:bg-${eixo.cor}-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center cursor-pointer">
              ${idx === config.length - 1 ? "Finalizar" : "Próximo Eixo"}
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        `;
        stepsContainer.appendChild(stepDiv);
      });
    
      // Review step (índice final)
      reviewStepEl.dataset.stepIndex = config.length; // último
      reviewStepEl.className = "step hidden";
      reviewStepEl.innerHTML = `
        <div class="text-center mb-8">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-check text-green-600 text-3xl"></i>
          </div>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Confirmação Final</h2>
          <p class="text-xl text-gray-600">Revise suas respostas antes de enviar</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Resumo:</h3>
          <div id="review-content" class="space-y-4"></div>
        </div>
        <div class="flex justify-between pt-6 border-t border-gray-200">
          <button type="button" class="btn-prev bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center cursor-pointer">
            <i class="fas fa-arrow-left mr-2"></i>Voltar
          </button>
          <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center cursor-pointer">
            <i class="fas fa-paper-plane mr-2"></i>Enviar
          </button>
        </div>
      `;
    }
    
    function updateProgress() {
      const totalSteps = config.length + 1;
      const display = Math.min(currentStep + 1, totalSteps);
      if (progressText)
        progressText.textContent = `Etapa ${display} de ${totalSteps}`;
      if (progressBar) {
        const percent = (currentStep / (totalSteps - 1)) * 100;
        progressBar.style.width = `${percent}%`;
      }
    }
    
    function showStep(index) {
      document.querySelectorAll(".step").forEach((s) => s.classList.add("hidden"));
      const target = document.querySelector(`.step[data-step-index="${index}"]`);
      if (target) target.classList.remove("hidden");
      currentStep = index;
      if (index === config.length) buildReview();
      updateProgress();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    
    function buildReview() {
      const review = document.getElementById("review-content");
      review.innerHTML = config
        .map((eixo) => {
          const sel = selections[eixo.id] || [];
          if (!sel.length) return "";
          const labels = sel
            .map((id) => eixo.opcoes.find((o) => o.id === id)?.label || id)
            .join(", ");
          return `
            <div class="p-4 bg-white rounded-lg border border-gray-200">
              <h4 class="font-semibold text-gray-800">${eixo.titulo}</h4>
                <p class="text-gray-600 text-sm">${labels}</p>
            </div>
          `;
        })
        .join("");
    }
    
    // ==== FUNÇÕES DE VALIDAÇÃO E SELEÇÃO ====
    
    function validateStep(idx) {
      if (idx >= config.length) return true;
      const eixo = config[idx];
      const temAlgo = (selections[eixo.id] || []).length > 0;
      if (!temAlgo)
        showStepError(eixo.id, "Selecione pelo menos uma opção para prosseguir.");
      return temAlgo;
    }
    
    function onCheckboxChange(e) {
        const cb = e.target;
        if (!cb.matches("input.eixo-checkbox")) return;

        const eixoId = cb.dataset.eixo;
        selections[eixoId] = selections[eixoId] || [];

        if (cb.checked) {
            if (selections[eixoId].includes(cb.value)) {
                syncVisual(eixoId);
                return;
            }
            if (selections[eixoId].length >= MAX_OPCOES) {
                cb.checked = false;
                showStepError(eixoId, `Máximo de ${MAX_OPCOES} selecionados neste eixo.`);
                return;
            }
            selections[eixoId].push(cb.value);
        } else {
            selections[eixoId] = selections[eixoId].filter(v => v !== cb.value);
        }

        syncVisual(eixoId);
    }

    function syncVisual(eixoId) {
        const corMap = {
            'educacao': 'blue',
            'saude': 'green', 
            'mobilidade': 'orange',
            'habitacao': 'purple',
            'meio-ambiente': 'teal',
            'governanca': 'indigo',
            'cultura': 'pink'
        };
        
        const cor = corMap[eixoId] || 'blue';
        
        document.querySelectorAll(`input.eixo-checkbox[data-eixo="${eixoId}"]`).forEach((input) => {
            const card = input.closest("label");
            const box = card.querySelector(".check-visual");
            const active = selections[eixoId]?.includes(input.value);

            // Remove todas as classes de cor possíveis
            card.classList.remove(
                'border-blue-500', 'bg-blue-50',
                'border-green-500', 'bg-green-50', 
                'border-orange-500', 'bg-orange-50',
                'border-purple-500', 'bg-purple-50',
                'border-teal-500', 'bg-teal-50',
                'border-indigo-500', 'bg-indigo-50',
                'border-pink-500', 'bg-pink-50'
            );
            
            box.classList.remove(
                'bg-blue-600', 'border-blue-600',
                'bg-green-600', 'border-green-600',
                'bg-orange-600', 'border-orange-600', 
                'bg-purple-600', 'border-purple-600',
                'bg-teal-600', 'border-teal-600',
                'bg-indigo-600', 'border-indigo-600',
                'bg-pink-600', 'border-pink-600'
            );

            // Aplica classes específicas baseadas na cor mapeada
            if (active) {
                card.classList.add(`border-${cor}-500`, `bg-${cor}-50`);
                box.classList.add(`bg-${cor}-600`, `border-${cor}-600`);
            }
        });
    }
    
    function submitForm(e) {
      const campos = [
        "saude",
        "mobilidade", 
        "habitacao",
        "educacao",
        "meio-ambiente",
        "governanca",
        "cultura"
      ];
      campos.forEach((id) => {
        const inp = form.querySelector(`input[name="${id}"]`);
        if (inp) inp.value = (selections[id] || []).join(",");
      });
    
      // Monta JSON legível (labels)
      const payloadObj = {};
        config.forEach((eixo) => {
            const ids = selections[eixo.id] || [];
            payloadObj[eixo.id] = ids.map((id) => {
                const label = eixo.opcoes.find((o) => o.id === id)?.label || id;
                return stripAccents(label);
            });
        });
        const payloadInput = document.getElementById("payload");
        if (payloadInput) payloadInput.value = JSON.stringify(payloadObj);
    }
    
    // ==== EVENTOS ====
    stepsContainer.addEventListener("change", onCheckboxChange);

    
    form.addEventListener("click", (e) => {
      const nextBtn = e.target.closest(".btn-next");
      const prevBtn = e.target.closest(".btn-prev");
      if (nextBtn) {
        if (!validateStep(currentStep)) return;
        showStep(Math.min(currentStep + 1, config.length));
      } else if (prevBtn) {
        showStep(Math.max(currentStep - 1, 0));
      }
    });

    function stripAccents(str) {
        return (str ?? "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    const titleInput = form.querySelector('input[name="title"]');
    if (titleInput) {
    titleInput.value = "Prioridades do Morador";
    }
    
    form.addEventListener("submit", submitForm);
    
    // Init
    buildSteps();
    updateProgress();
});