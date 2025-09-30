document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("multi-step-form");
    const stepsContainer = document.getElementById("steps-container");
    const reviewStepEl = document.getElementById("review-step");
    const progressText = document.getElementById("progress-text");
    const progressBar = document.getElementById("progress-bar");

    let currentStep = 0; // índice
    const selections = {}; // { eixoId: [opcaoId,...] }

    const config = [
      {
        id: "educacao",
        titulo: "Educação",
        cor: "blue",
        descricao:
          "Qualidade do ensino, acesso à educação infantil, capacitação e infraestrutura escolar.",
        opcoes: [
          { id: "melhoria-escolas", label: "Melhoria das escolas públicas" },
          { id: "educacao-infantil", label: "Ampliação de creches e educação infantil" },
          { id: "formacao-prof", label: "Cursos de formação profissional" },
          { id: "acesso-tecnologia", label: "Acesso à tecnologia nas escolas" },
        ],
      },
      {
        id: "saude",
        titulo: "Saúde",
        cor: "green",
        descricao:
          "Acesso, qualidade de atendimento, prevenção de doenças e bem-estar.",
        opcoes: [
          { id: "upas", label: "Ampliação de UPAs e postos de saúde" },
          { id: "medicos", label: "Mais médicos e especialistas" },
          { id: "medicamentos", label: "Disponibilidade de medicamentos" },
          { id: "prevencao", label: "Programas de prevenção" },
        ],
      },
      {
        id: "infraestrutura",
        titulo: "Mobilidade, Infraestrutura e Segurança",
        cor: "orange",
        descricao:
          "Vias, transporte, iluminação, segurança pública e urbanização.",
        opcoes: [
          { id: "pavimentacao", label: "Pavimentação de ruas e calçadas" },
          { id: "transporte", label: "Melhoria do transporte público" },
          { id: "iluminacao", label: "Iluminação pública adequada" },
          { id: "seguranca", label: "Aumento da segurança pública" },
          { id: "saneamento", label: "Saneamento e drenagem" },
          { id: "sinalizacao", label: "Sinalização de trânsito" },
        ],
      },
      {
        id: "habitacao",
        titulo: "Habitação e Regularização Fundiária",
        cor: "purple",
        descricao:
          "Moradia digna, regularização, programas habitacionais e melhorias.",
        opcoes: [
          { id: "regularizacao", label: "Regularização fundiária" },
          { id: "programas-habitacionais", label: "Programas habitacionais" },
          { id: "melhorias-moradia", label: "Melhorias nas moradias" },
          { id: "urbanizacao", label: "Urbanização de áreas" },
        ],
      },
      {
        id: "ambiente",
        titulo: "Ambiente Físico e Sustentabilidade",
        cor: "teal",
        descricao:
          "Preservação, áreas verdes, coleta seletiva e sustentabilidade.",
        opcoes: [
          { id: "areas-verdes", label: "Criação de áreas verdes e praças" },
          { id: "coleta-seletiva", label: "Coleta seletiva de lixo" },
          { id: "preservacao", label: "Preservação de nascentes e córregos" },
        ],
      },
      {
        id: "cultura",
        titulo: "Cultura, Lazer e Esporte",
        cor: "pink",
        descricao:
          "Atividades culturais, lazer, esporte e entretenimento comunitário.",
        opcoes: [
          { id: "centro-cultural", label: "Centro cultural comunitário" },
          { id: "areas-lazer", label: "Áreas de lazer e parques" },
          { id: "quadras-esportivas", label: "Quadras esportivas" },
        ],
      },
    ];

    const MAX_OPCOES = 4;

    // Build steps dynamically based on config
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
              Quais desses itens são prioritários para você? (Selecione até ${MAX_OPCOES})
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
                : `<button type="button" class="btn-prev bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center">
                    <i class="fas fa-arrow-left mr-2"></i>Voltar
                  </button>`
            }
            <button type="button" class="btn-next bg-${eixo.cor}-600 hover:bg-${eixo.cor}-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center">
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
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Resumo das suas prioridades:</h3>
          <div id="review-content" class="space-y-4"></div>
        </div>
        <div class="flex justify-between pt-6 border-t border-gray-200">
          <button type="button" class="btn-prev bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center">
            <i class="fas fa-arrow-left mr-2"></i>Voltar
          </button>
          <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center">
            <i class="fas fa-paper-plane mr-2"></i>Enviar Respostas
          </button>
        </div>
      `;
    }

    function updateProgress() {
      const totalSteps = config.length + 1; // inclui review
      const stepDisplay = Math.min(currentStep + 1, totalSteps);
      progressText.textContent = `Etapa ${stepDisplay} de ${totalSteps}`;
      const percent = ((currentStep) / (totalSteps - 1)) * 100;
      progressBar.style.width = `${percent}%`;
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
            </div>`;
        })
        .join("");
    }

    function handleOptionChange(e) {
      const cb = e.target.closest("label")?.querySelector("input.eixo-checkbox");
      if (!cb) return;
      const eixoId = cb.dataset.eixo;
      selections[eixoId] = selections[eixoId] || [];

      if (cb.checked) {
        // toggle remove
        cb.checked = false;
        selections[eixoId] = selections[eixoId].filter((x) => x !== cb.value);
      } else {
        if (selections[eixoId].length >= MAX_OPCOES) {
          const msg = document.getElementById(`limit-msg-${eixoId}`);
          if (msg) {
            msg.textContent = `Máximo de ${MAX_OPCOES} selecionados neste eixo.`;
            setTimeout(() => (msg.textContent = ""), 3000);
          }
          return;
        }
        cb.checked = true;
        selections[eixoId].push(cb.value);
      }
      syncVisual(eixoId);
    }

    function syncVisual(eixoId) {
      document
        .querySelectorAll(`input.eixo-checkbox[data-eixo="${eixoId}"]`)
        .forEach((input) => {
          const card = input.closest("label");
          const box = card.querySelector(".check-visual");
          const active = selections[eixoId]?.includes(input.value);
          card.classList.toggle("border-blue-500", active);
          card.classList.toggle("bg-blue-50", active);
          box.classList.toggle("bg-blue-600", active);
          box.classList.toggle("border-blue-600", active);
        });
    }

    function validateStep(idx) {
      // Exigir ao menos 1 selecionado? Opcional. Aqui apenas permite seguir.
      return true;
    }

    function encode(data) {
      return Object.keys(data)
        .map(
          (k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k] ?? "")
        )
        .join("&");
    }

    function submitForm(e){
      // Se quiser usar envio padrão Netlify (sem fetch), apenas preencher e deixar continuar
      const campos = ["educacao","saude","infraestrutura","habitacao","ambiente","cultura"];
      campos.forEach(id=>{
        const inp = form.querySelector(`input[name="${id}"]`);
        if (inp) inp.value = (selections[id] || []).join(",");
      });

      // Caso esteja usando fetch, descomente abaixo e mantenha e.preventDefault()
      // e.preventDefault();
      // const payload = {
      //   "form-name":"prioridades-aureny",
      //   ...campos.reduce((acc,id)=>{
      //     acc[id] = form.querySelector(`input[name="${id}"]`).value;
      //     return acc;
      //   },{})
      // };
      // fetch("/",{
      //   method:"POST",
      //   headers:{"Content-Type":"application/x-www-form-urlencoded"},
      //   body: encode(payload)
      // }).then(()=> location.href="/?thanks=1")
      //   .catch(()=> alert("Erro ao enviar. Tente novamente."));
    }

    function attachEvents() {
      // Delegação de opções
      stepsContainer.addEventListener("click", handleOptionChange);
      reviewStepEl.addEventListener("click", handleOptionChange);

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

      form.addEventListener("submit", submitForm);
    }

    // Init
    buildSteps();
    attachEvents();
    updateProgress();
});