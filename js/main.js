/**
 * Iara Games — Sprint 5: interatividade com JavaScript.
 * Arquivo único carregado por index.html, pages/loja.html e pages/cadastro.html.
 * Cada init* roda um early return se os elementos da página atual não existirem,
 * então é seguro incluir o mesmo arquivo em páginas diferentes.
 */

document.addEventListener("DOMContentLoaded", () => {
  initTooltips();
  initShopView();
  initGenreFilter();
  initSignupValidation();
  initCartFeedback();
});

/** Inicializa os tooltips do Bootstrap (usado nos botões de carrinho deslogados da Home). */
function initTooltips() {
  const triggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  if (!triggers.length || typeof bootstrap === "undefined") return;

  triggers.forEach((trigger) => new bootstrap.Tooltip(trigger));
}

/** Alterna a visualização em grade/lista da Loja. */
function initShopView() {
  const results = document.querySelector("[data-shop-results]");
  const viewButtons = document.querySelectorAll("[data-shop-view]");
  if (!results || !viewButtons.length) return;

  const setView = (view) => {
    const isList = view === "list";
    results.classList.toggle("is-list", isList);
    results.classList.toggle("is-grid", !isList);

    viewButtons.forEach((button) => {
      const active = button.dataset.shopView === view;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.shopView));
  });
}

/**
 * Filtra os cards de jogos da Loja por gênero.
 * Resolve um problema real: os chips de filtro só mudavam o próprio estado visual,
 * sem esconder ou mostrar nenhum card.
 */
function initGenreFilter() {
  const chips = document.querySelectorAll("[data-genre-filter]");
  const cards = document.querySelectorAll(".shop-grid > article[data-genre]");
  const countLabel = document.querySelector("[data-shop-count]");
  const emptyState = document.querySelector("[data-shop-empty]");

  if (!chips.length || !cards.length) return;

  const applyFilter = (genre) => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const matches = genre === "todos" || card.dataset.genre === genre;
      card.classList.toggle("is-hidden", !matches);
      if (matches) visibleCount += 1;
    });

    if (countLabel) {
      countLabel.textContent =
        visibleCount === 1 ? "1 jogo encontrado" : `${visibleCount} jogos encontrados`;
    }

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((other) => {
        const active = other === chip;
        other.classList.toggle("active", active);
        other.setAttribute("aria-pressed", String(active));
      });
      applyFilter(chip.dataset.genreFilter);
    });
  });
}

/**
 * Valida em tempo real o formulário de cadastro.
 * Resolve um problema real: o form já tem `novalidate` (esperando validação customizada)
 * mas nenhum campo era validado — usuário só descobria erros ao tentar enviar, sem feedback.
 */
function initSignupValidation() {
  const form = document.querySelector(".signup-form");
  if (!form) return;

  const nome = form.querySelector("#nome-completo");
  const email = form.querySelector("#email");
  const senha = form.querySelector("#senha");
  const confirmarSenha = form.querySelector("#confirmar-senha");
  const estado = form.querySelector("#estado");
  const aceiteTermos = form.querySelector("#aceite-termos");
  const successBox = document.querySelector("[data-signup-success]");

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MIN_SENHA_LENGTH = 8;

  const setFieldState = (input, helpEl, valid, message) => {
    input.classList.toggle("is-invalid", !valid);
    input.classList.toggle("is-valid", valid);
    if (helpEl) {
      helpEl.textContent = message;
      helpEl.classList.toggle("field-help-error", !valid);
      helpEl.classList.toggle("field-help-success", valid);
    }
    return valid;
  };

  const validateNome = () => {
    const help = document.querySelector("#nome-completo-help");
    const valid = nome.value.trim().length > 0;
    return setFieldState(nome, help, valid, valid ? "" : "Digite seu nome completo.");
  };

  const validateEmail = () => {
    const help = document.querySelector("#email-help");
    const valid = EMAIL_PATTERN.test(email.value.trim());
    return setFieldState(email, help, valid, valid ? "" : "Digite um e-mail válido, ex.: nome@exemplo.com.");
  };

  const validateSenha = () => {
    const help = document.querySelector("#senha-hint");
    const valid = senha.value.length >= MIN_SENHA_LENGTH;
    setFieldState(
      senha,
      help,
      valid,
      valid ? "Senha com tamanho suficiente." : `Use pelo menos ${MIN_SENHA_LENGTH} caracteres nesta demonstração.`
    );
    return valid;
  };

  const validateConfirmarSenha = () => {
    const help = document.querySelector("#confirmar-senha-help");
    const valid = confirmarSenha.value.length > 0 && confirmarSenha.value === senha.value;
    return setFieldState(confirmarSenha, help, valid, valid ? "As senhas coincidem." : "As senhas não coincidem.");
  };

  const validateEstado = () => {
    const valid = estado.value !== "";
    estado.classList.toggle("is-invalid", !valid);
    estado.classList.toggle("is-valid", valid);
    return valid;
  };

  const validateAceiteTermos = () => {
    const valid = aceiteTermos.checked;
    aceiteTermos.classList.toggle("is-invalid", !valid);
    return valid;
  };

  nome.addEventListener("input", validateNome);
  email.addEventListener("input", validateEmail);
  senha.addEventListener("input", () => {
    validateSenha();
    if (confirmarSenha.value.length > 0) validateConfirmarSenha();
  });
  confirmarSenha.addEventListener("input", validateConfirmarSenha);
  estado.addEventListener("change", validateEstado);
  aceiteTermos.addEventListener("change", validateAceiteTermos);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const validations = [
      validateNome(),
      validateEmail(),
      validateSenha(),
      validateConfirmarSenha(),
      validateEstado(),
      validateAceiteTermos(),
    ];

    const allValid = validations.every(Boolean);

    if (!allValid) {
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      if (successBox) successBox.hidden = true;
      return;
    }

    form.hidden = true;
    if (successBox) successBox.hidden = false;
  });
}

/**
 * Dá feedback visual ao clicar em "Adicionar ao carrinho" na Loja.
 * Resolve um problema real: os botões eram links mortos (href="#"), sem nenhuma
 * explicação — diferente da Home, que já avisa via tooltip que é preciso criar conta.
 */
function initCartFeedback() {
  const cartButtons = document.querySelectorAll(".shop-buy-row a.btn-primary");
  if (!cartButtons.length) return;

  let toast = null;
  let hideTimeout = null;

  const getToast = () => {
    if (toast) return toast;

    toast = document.createElement("div");
    toast.className = "cart-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
    return toast;
  };

  const showToast = (gameName) => {
    const el = getToast();
    el.innerHTML = `Crie uma conta gratuita para comprar <strong>${gameName}</strong>. <a href="./cadastro.html">Criar conta</a>`;

    requestAnimationFrame(() => el.classList.add("is-visible"));

    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => el.classList.remove("is-visible"), 4000);
  };

  cartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const label = button.getAttribute("aria-label") || "";
      const gameName = label.replace(/^Adicionar\s+/, "").replace(/\s+ao carrinho$/, "");
      showToast(gameName || "este jogo");
    });
  });
}
