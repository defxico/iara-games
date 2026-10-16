import React, { useState } from 'react';

function validate(form) {
  const data = new FormData(form);
  const password = String(data.get('senha') || '');
  return {
    'nome-completo': String(data.get('nome-completo') || '').trim() ? '' : 'Digite seu nome completo.',
    nome: String(data.get('nome') || '').trim() ? '' : 'Escolha um nome de usuário.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('email') || '').trim()) ? '' : 'Digite um e-mail válido.',
    senha: password.length >= 8 ? '' : 'Use pelo menos 8 caracteres.',
    'confirmar-senha': password && data.get('confirmar-senha') === password ? '' : 'As senhas não coincidem.',
    estado: data.get('estado') ? '' : 'Selecione seu estado.',
    'aceite-termos': data.get('aceite-termos') ? '' : 'Aceite os termos para continuar.',
  };
}

export default function Signup() {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();
    const next = validate(event.currentTarget);
    setErrors(next);
    const first = Object.keys(next).find(key => next[key]);
    if (first) event.currentTarget.elements.namedItem(first)?.focus();
    else setSuccess(true);
  }
  function handleChange(event) {
    const name = event.target.name;
    if (!Object.hasOwn(errors, name)) return;
    const next = validate(event.currentTarget);
    setErrors(current => ({ ...current, [name]: next[name], ...(name === 'senha' ? { 'confirmar-senha': next['confirmar-senha'] } : {}) }));
  }
  return (
<main>
    <section className="signup-hero" aria-labelledby="cadastro-titulo">
      <div className="container signup-hero-content">
        <h1 id="cadastro-titulo">Crie sua conta</h1>
        <p>Conecte-se com jogadores e desenvolvedores de todo o Brasil!</p>
      </div>
    </section>
    <section className="signup-form-section" aria-label="Formulário de cadastro">
      <div className="container">
        <div className="signup-card">
          <form className="signup-form" onSubmit={handleSubmit} onChange={handleChange} noValidate hidden={success}>
            <fieldset className="signup-fieldset">
              <legend className="signup-legend">Dados de acesso</legend>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="nome-completo">Seu nome completo</label>
                  <input id="nome-completo" name="nome-completo" type="text" className="form-control" autoComplete="name" placeholder="Como você se chama?" required aria-describedby="nome-completo-help" aria-invalid={Boolean(errors['nome-completo'])} />
                  <span id="nome-completo-help" className={`field-help ${errors['nome-completo'] ? 'field-help-error' : ''}`} aria-live="polite">{errors['nome-completo']}</span>
                </div>
                <div className="field-group">
                  <label htmlFor="nome">Seu nome de usuário na plataforma</label>
                  <input id="nome" name="nome" type="text" className="form-control" autoComplete="username" placeholder="Como vai aparecer para outros usuários" required aria-describedby="nome-help" aria-invalid={Boolean(errors.nome)} />
                  <span id="nome-help" className={`field-help ${errors.nome ? 'field-help-error' : ''}`} aria-live="polite">{errors.nome}</span>
                </div>
                <div className="field-group field-group-col1">
                  <label htmlFor="email">Seu melhor e-mail</label>
                  <input id="email" name="email" type="email" className="form-control" autoComplete="email" placeholder="seuemail@exemplo.com" required aria-describedby="email-help" aria-invalid={Boolean(errors.email)} />
                  <span id="email-help" className={`field-help ${errors.email ? 'field-help-error' : ''}`} aria-live="polite">{errors.email}</span>
                </div>
                <div className="field-group">
                  <label htmlFor="senha">Crie uma senha segura</label>
                  <input id="senha" name="senha" type="password" className="form-control" autoComplete="new-password" placeholder="Mínimo 8 caracteres" required aria-describedby="senha-hint" aria-invalid={Boolean(errors.senha)} />
                  <span id="senha-hint" className={`field-help ${errors.senha ? 'field-help-error' : ''}`} aria-live="polite">{errors.senha || 'Use pelo menos 8 caracteres nesta demonstração.'}</span>
                </div>
                <div className="field-group">
                  <label htmlFor="confirmar-senha">Repita sua senha</label>
                  <input id="confirmar-senha" name="confirmar-senha" type="password" className="form-control" autoComplete="new-password" placeholder="Confirme a senha" required aria-describedby="confirmar-senha-help" aria-invalid={Boolean(errors['confirmar-senha'])} />
                  <span id="confirmar-senha-help" className={`field-help ${errors['confirmar-senha'] ? 'field-help-error' : ''}`} aria-live="polite">{errors['confirmar-senha']}</span>
                </div>
              </div>
            </fieldset>
            <fieldset className="signup-fieldset signup-fieldset-sep">
              <legend className="signup-legend">Seu contexto de jogo</legend>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="cidade">Cidade</label>
                  <input id="cidade" name="cidade" type="text" className="form-control" autoComplete="address-level2" placeholder="Sua cidade" />
                </div>
                <div className="field-group">
                  <label htmlFor="estado">Estado</label>
                  <select id="estado" name="estado" className="form-select" autoComplete="address-level1" defaultValue="" required aria-describedby="estado-help" aria-invalid={Boolean(errors.estado)}>
                    <option value="" disabled>Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                  <span id="estado-help" className={`field-help ${errors.estado ? 'field-help-error' : ''}`} aria-live="polite">{errors.estado}</span>
                </div>
                <div className="field-group field-group-full">
                  <label htmlFor="bio">O que você busca na Iara Games?</label>
                  <textarea id="bio" name="bio" className="form-control" placeholder="Ex.: descobrir jogos brasileiros com curadoria e acompanhar estúdios independentes." defaultValue={""} />
                </div>
              </div>
            </fieldset>
            <fieldset className="signup-fieldset signup-fieldset-sep">
              <legend className="signup-legend">Preferências iniciais</legend>
              <div className="choice-grid signup-choice-grid">
                <label className="choice-card signup-choice-card card" htmlFor="genero-aventura">
                  <input id="genero-aventura" name="generos" type="checkbox" className="form-check-input" defaultValue="aventura" />
                  <span>
                    <strong>Aventura</strong>
                    Narrativas de exploração, atmosfera e descoberta.
                  </span>
                </label>
                <label className="choice-card signup-choice-card card" htmlFor="genero-puzzle">
                  <input id="genero-puzzle" name="generos" type="checkbox" className="form-check-input" defaultValue="puzzle" />
                  <span>
                    <strong>Puzzle</strong>
                    Jogos de leitura sistêmica, ritmo e experimentação.
                  </span>
                </label>
                <label className="choice-card signup-choice-card card" htmlFor="plataforma-pc">
                  <input id="plataforma-pc" name="plataformas" type="checkbox" className="form-check-input" defaultValue="pc" />
                  <span>
                    <strong>PC e notebook</strong>
                    Para quem pesquisa, compara e joga com mais frequência em casa.
                  </span>
                </label>
                <label className="choice-card signup-choice-card card" htmlFor="plataforma-mobile">
                  <input id="plataforma-mobile" name="plataformas" type="checkbox" className="form-check-input" defaultValue="mobile" />
                  <span>
                    <strong>Mobile</strong>
                    Para acessos rápidos, descoberta e acompanhamento diário.
                  </span>
                </label>
              </div>
            </fieldset>
            <fieldset className="signup-fieldset signup-fieldset-sep">
              <legend className="signup-legend">Consentimentos</legend>
              <label className="checkbox-row" htmlFor="aceite-termos">
                <input id="aceite-termos" name="aceite-termos" type="checkbox" className="form-check-input" required aria-describedby="aceite-termos-help" aria-invalid={Boolean(errors['aceite-termos'])} />
                <span className="consent-copy">Li e aceito os termos desta demonstração acadêmica e a política de privacidade da plataforma.</span>
              </label>
              <span id="aceite-termos-help" className={`field-help ${errors['aceite-termos'] ? 'field-help-error' : ''}`} aria-live="polite">{errors['aceite-termos']}</span>
              <label className="checkbox-row" htmlFor="aceite-novidades">
                <input id="aceite-novidades" name="aceite-novidades" type="checkbox" className="form-check-input" />
                <span className="consent-copy">Quero receber novidades sobre jogos brasileiros, estúdios e curadorias semanais.</span>
              </label>
            </fieldset>
            <div className="signup-actions" role="group" aria-label="Ações do formulário">
              <a href="../index.html" className="btn btn-outline-light signup-btn-cancel">Cancelar</a>
              <button type="submit" className="btn btn-primary signup-btn-submit">Criar conta</button>
            </div>
            <p className="signup-login-cta">Já tem uma conta? <a href="./perfil.html">Fazer login</a></p>
          </form>
          <div className="signup-success" data-signup-success role="status" aria-live="polite" hidden={!success}>
            <strong>Conta criada com sucesso!</strong>
            <p>Isso é uma demonstração acadêmica — nenhum dado foi salvo de verdade.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  );
}
