import React, { useEffect, useRef, useState } from 'react';
import CepField from '../components/CepField.jsx';

const storageKey = 'iara-entrega';
const campos = ['cep', 'logradouro', 'bairro', 'localidade', 'uf', 'numero', 'complemento'];
const vazio = { logradouro: '', bairro: '', localidade: '', uf: '', numero: '', complemento: '' };

function readSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved && typeof saved === 'object' && campos.every(campo => typeof saved[campo] === 'string') ? saved : null;
  } catch { return null; }
}

function validate(form) {
  return {
    logradouro: form.logradouro.trim() ? '' : 'Informe a rua ou avenida.',
    localidade: form.localidade.trim() ? '' : 'Informe a cidade.',
    uf: /^[A-Za-z]{2}$/.test(form.uf.trim()) ? '' : 'Use a sigla do estado, como SP.',
    numero: form.numero.trim() ? '' : 'Informe o número (ou S/N).',
  };
}

export default function Delivery() {
  const [saved, setSaved] = useState(readSaved);
  const [form, setForm] = useState(() => {
    const initial = readSaved();
    return initial ? Object.fromEntries(Object.keys(vazio).map(campo => [campo, initial[campo]])) : vazio;
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const numeroRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => { if (status === 'success') numeroRef.current?.focus(); }, [status]);

  const loading = status === 'loading';
  const set = (campo) => (event) => setForm(current => ({ ...current, [campo]: event.target.value }));
  const onResolved = (endereco) => setForm(current => ({ ...current, ...endereco }));

  function handleSubmit(event) {
    event.preventDefault();
    const next = validate(form);
    setErrors(next);
    const first = Object.keys(next).find(campo => next[campo]);
    if (first) { formRef.current.elements.namedItem(first)?.focus(); return; }
    const address = { cep: String(new FormData(formRef.current).get('cep') || ''), ...form, uf: form.uf.trim().toUpperCase() };
    try { localStorage.setItem(storageKey, JSON.stringify(address)); } catch { /* O resumo continua visível sem armazenamento local. */ }
    setSaved(address);
  }

  function remove() {
    try { localStorage.removeItem(storageKey); } catch { /* Sem armazenamento local, só limpamos a tela. */ }
    setSaved(null);
    setForm(vazio);
    setErrors({});
  }

  const field = (id, label, extra = {}) => <div className="field-group">
    <label htmlFor={id}>{label}</label>
    <input id={id} name={id} type="text" className="form-control" value={form[id]} onChange={set(id)} disabled={loading} aria-describedby={`${id}-help`} aria-invalid={Boolean(errors[id])} {...extra} />
    <span id={`${id}-help`} className={`field-help ${errors[id] ? 'field-help-error' : ''}`} aria-live="polite">{errors[id]}</span>
  </div>;

  return <main>
    <section className="signup-hero" aria-labelledby="entrega-titulo">
      <div className="container signup-hero-content">
        <h1 id="entrega-titulo">Endereço de entrega</h1>
        <p>Digite o CEP e a gente completa o resto. Dados consultados na API ViaCEP.</p>
      </div>
    </section>
    <section className="signup-form-section" aria-label="Formulário de entrega">
      <div className="container">
        <div className="signup-card">
          <form className="signup-form" ref={formRef} onSubmit={handleSubmit} noValidate>
            <fieldset className="signup-fieldset">
              <legend className="signup-legend">Onde você quer receber?</legend>
              <div className="form-grid">
                <CepField onResolved={onResolved} onStatusChange={setStatus} />
                <div className="field-group" aria-hidden="true" />
                {field('logradouro', 'Rua / Avenida', { autoComplete: 'address-line1', placeholder: 'Preenchido pelo CEP' })}
                {field('bairro', 'Bairro', { placeholder: 'Preenchido pelo CEP' })}
                {field('localidade', 'Cidade', { autoComplete: 'address-level2', placeholder: 'Preenchido pelo CEP' })}
                {field('uf', 'UF', { autoComplete: 'address-level1', maxLength: 2, placeholder: 'SP' })}
                {field('numero', 'Número', { ref: numeroRef, autoComplete: 'off', placeholder: 'Ex.: 1578' })}
                {field('complemento', 'Complemento', { autoComplete: 'address-line2', placeholder: 'Apto, bloco… (opcional)' })}
              </div>
            </fieldset>
            <div className="signup-actions" role="group" aria-label="Ações do formulário">
              <button type="submit" className="btn btn-primary signup-btn-submit" disabled={loading}>Salvar endereço</button>
            </div>
          </form>
          {saved && <div className="signup-success delivery-summary" role="status" aria-live="polite">
            <strong>Endereço salvo neste navegador</strong>
            <p>{saved.logradouro}, {saved.numero}{saved.complemento ? ` — ${saved.complemento}` : ''}<br />{saved.bairro ? `${saved.bairro} · ` : ''}{saved.localidade}/{saved.uf} · CEP {saved.cep}</p>
            <button type="button" className="btn btn-outline-light btn-sm" onClick={remove}>Remover endereço</button>
          </div>}
        </div>
      </div>
    </section>
  </main>;
}
