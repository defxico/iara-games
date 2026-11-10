# Sprint 7 — Área "Entrega" com ViaCEP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar a área "Entrega" (React) que consulta a API ViaCEP, reaproveitar o campo de CEP no Cadastro, publicar no GitHub Pages e gerar o PDF da Sprint 7.

**Architecture:** `viacep.js` (serviço puro, `fetch`) → `useCep` (hook de estado com `AbortController`) → `CepField` (campo com máscara e mensagens) → páginas `Delivery` e `Signup`. Páginas multi-entrada do Vite, sem roteador, como as cinco existentes.

**Tech Stack:** React 19, Vite 8, Vitest + jsdom (só `devDependencies`), `fetch` nativo, GitHub Pages.

Spec: `docs/superpowers/specs/2026-11-10-sprint-7-viacep-entrega-design.md`

## Global Constraints

- API: `https://viacep.com.br/ws/{cep}/json/`, sem chave, via `fetch` nativo; sem React Query, axios ou proxy.
- Timeout da consulta: 8 s. Resposta atrasada é descartada com `AbortController`.
- O erro nunca bloqueia o formulário: campos sempre editáveis à mão (exceto durante `loading`).
- `localStorage` sempre em `try/catch`; chave `iara-entrega`.
- Deploy: GitHub Pages (`base: '/iara-games/'` permanece). Sem Vercel.
- Sem Testing Library; testes só de `viacep.js` e `useCep`.
- Fora de escopo: pagamento, frete, login, mapa, backend.
- Textos da interface em português do Brasil; arquivos novos seguem o estilo existente (aspas simples, `.jsx` com `export default`, estilos reaproveitando classes `signup-*`, `form-grid`, `field-group`, `field-help`).
- Commits terminam com `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.

## File Structure

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `package.json` | Modificar | `vitest`, `jsdom`, script `test`, versão `7.0.0` |
| `vite.config.js` | Modificar | bloco `test`, entrada `entrega` |
| `src/services/viacep.js` | Criar | `normalizarCep`, `formatarCep`, `CepError`, `buscarCep` |
| `src/services/viacep.test.js` | Criar | testes do serviço |
| `src/hooks/useCep.js` | Criar | estado da busca e cancelamento |
| `src/hooks/useCep.test.js` | Criar | testes do hook |
| `src/components/CepField.jsx` | Criar | campo de CEP com máscara e mensagens |
| `src/pages/Delivery.jsx` | Criar | página Entrega |
| `pages/entrega.html` | Criar | ponto de entrada do Vite |
| `src/main.jsx` | Modificar | rota `entrega` |
| `src/shared/SiteLayout.jsx` | Modificar | links "Entrega" no header e rodapé |
| `src/pages/Signup.jsx` | Modificar | `CepField` preenchendo Cidade e Estado |
| `src/delivery.css` | Criar | estilos do resumo e do botão de retry |
| `docs/sprint-7-documentacao.html`, `pdf/iara-games-sprint-07.pdf`, `docs/screenshots/sprint-7/*` | Criar | entrega em PDF |
| `README.md` | Modificar | seção "Sprint 7" |

---

### Task 1: Serviço `viacep.js` com testes

**Files:**

- Create: `src/services/viacep.js`, `src/services/viacep.test.js`
- Modify: `package.json`, `vite.config.js`

**Interfaces:**

- Produces:
  - `normalizarCep(value: unknown): string` — só dígitos, sem limite de tamanho.
  - `formatarCep(value: unknown): string` — até 8 dígitos, `00000-000`.
  - `class CepError extends Error { code: 'CEP_INVALIDO' | 'NAO_ENCONTRADO' | 'REDE' }`
  - `buscarCep(cep: string, opts?: { signal?: AbortSignal, timeoutMs?: number }): Promise<{ logradouro: string, bairro: string, localidade: string, uf: string }>`
  - Se `opts.signal` abortar, rejeita com o erro de aborto original (não `CepError`).

- [ ] **Step 1: Instalar Vitest e jsdom**

Run: `npm install -D vitest jsdom`
Expected: `package.json` ganha `vitest` e `jsdom` em `devDependencies`, sem erros.

- [ ] **Step 2: Configurar o Vitest e o script de teste**

Em `package.json`, dentro de `"scripts"`, acrescente `"test": "vitest run"`:

```json
"scripts": {
  "dev": "vite --host",
  "build": "vite build",
  "preview": "vite preview --host",
  "test": "vitest run"
},
```

Em `vite.config.js`, dentro de `defineConfig({ ... })`, acrescente depois de `build`:

```js
  test: {
    environment: 'node',
    include: ['src/**/*.test.{js,jsx}'],
  },
```

- [ ] **Step 3: Escrever os testes que falham**

Create `src/services/viacep.test.js`:

```js
import { afterEach, describe, expect, it, vi } from 'vitest';
import { buscarCep, CepError, formatarCep, normalizarCep } from './viacep.js';

const respostaOk = {
  cep: '01310-100', logradouro: 'Avenida Paulista', complemento: '', bairro: 'Bela Vista',
  localidade: 'São Paulo', uf: 'SP', ibge: '3550308',
};

function stubFetch(impl) {
  const fetchMock = vi.fn(impl);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

afterEach(() => vi.unstubAllGlobals());

describe('normalizarCep / formatarCep', () => {
  it('remove tudo que não é dígito', () => {
    expect(normalizarCep('01310-100')).toBe('01310100');
    expect(normalizarCep('abc12')).toBe('12');
  });
  it('aplica a máscara 00000-000 e limita a 8 dígitos', () => {
    expect(formatarCep('01310')).toBe('01310');
    expect(formatarCep('013101')).toBe('01310-1');
    expect(formatarCep('0131010099')).toBe('01310-100');
  });
});

describe('buscarCep', () => {
  it('normaliza o CEP com máscara e devolve os quatro campos', async () => {
    const fetchMock = stubFetch(async () => ({ ok: true, json: async () => respostaOk }));
    const resultado = await buscarCep('01310-100');
    expect(fetchMock.mock.calls[0][0]).toBe('https://viacep.com.br/ws/01310100/json/');
    expect(resultado).toEqual({ logradouro: 'Avenida Paulista', bairro: 'Bela Vista', localidade: 'São Paulo', uf: 'SP' });
  });

  it('rejeita CEP com menos de 8 dígitos ou com letras sem chamar a rede', async () => {
    const fetchMock = stubFetch(async () => ({ ok: true, json: async () => respostaOk }));
    await expect(buscarCep('0131010')).rejects.toMatchObject({ code: 'CEP_INVALIDO' });
    await expect(buscarCep('abc12345')).rejects.toMatchObject({ code: 'CEP_INVALIDO' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('converte { erro: true } em NAO_ENCONTRADO', async () => {
    stubFetch(async () => ({ ok: true, json: async () => ({ erro: true }) }));
    await expect(buscarCep('00000000')).rejects.toMatchObject({ code: 'NAO_ENCONTRADO' });
  });

  it('converte falha de rede e HTTP não-ok em REDE', async () => {
    stubFetch(async () => { throw new TypeError('Failed to fetch'); });
    await expect(buscarCep('01310100')).rejects.toMatchObject({ code: 'REDE' });
    stubFetch(async () => ({ ok: false, status: 500, json: async () => ({}) }));
    await expect(buscarCep('01310100')).rejects.toBeInstanceOf(CepError);
  });

  it('converte timeout em REDE', async () => {
    stubFetch((url, { signal }) => new Promise((_, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason ?? new DOMException('Aborted', 'AbortError')));
    }));
    await expect(buscarCep('01310100', { timeoutMs: 20 })).rejects.toMatchObject({ code: 'REDE' });
  });

  it('propaga o aborto quando o chamador cancela', async () => {
    stubFetch((url, { signal }) => new Promise((_, reject) => {
      signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    }));
    const controller = new AbortController();
    const promessa = buscarCep('01310100', { signal: controller.signal });
    controller.abort();
    await expect(promessa).rejects.toMatchObject({ name: 'AbortError' });
  });
});
```

- [ ] **Step 4: Rodar e ver falhar**

Run: `npx vitest run src/services/viacep.test.js`
Expected: FAIL (`Failed to resolve import "./viacep.js"`).

- [ ] **Step 5: Implementar o serviço**

Create `src/services/viacep.js`:

```js
export class CepError extends Error {
  constructor(code) {
    super(code);
    this.name = 'CepError';
    this.code = code;
  }
}

export const normalizarCep = (value) => String(value ?? '').replace(/\D/g, '');

export function formatarCep(value) {
  const digits = normalizarCep(value).slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

export async function buscarCep(cep, { signal, timeoutMs = 8000 } = {}) {
  const digits = normalizarCep(cep);
  if (digits.length !== 8) throw new CepError('CEP_INVALIDO');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const forward = () => controller.abort();
  signal?.addEventListener('abort', forward, { once: true });

  let data;
  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, { signal: controller.signal });
    if (!response.ok) throw new CepError('REDE');
    data = await response.json();
  } catch (error) {
    if (signal?.aborted) throw error;
    throw error instanceof CepError ? error : new CepError('REDE');
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', forward);
  }

  if (data?.erro) throw new CepError('NAO_ENCONTRADO');
  return {
    logradouro: data.logradouro ?? '',
    bairro: data.bairro ?? '',
    localidade: data.localidade ?? '',
    uf: data.uf ?? '',
  };
}
```

- [ ] **Step 6: Rodar e ver passar**

Run: `npx vitest run src/services/viacep.test.js`
Expected: PASS, 8 testes.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.js src/services
git commit -m "feat: add ViaCEP service with Vitest" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Hook `useCep` com testes

**Files:**

- Create: `src/hooks/useCep.js`, `src/hooks/useCep.test.js`

**Interfaces:**

- Consumes: `buscarCep`, `normalizarCep` de `../services/viacep.js` (Task 1).
- Produces: `useCep(): { status: 'idle' | 'loading' | 'success' | 'error', data: {logradouro,bairro,localidade,uf} | null, error: 'CEP_INVALIDO' | 'NAO_ENCONTRADO' | 'REDE' | null, search: (cep: string) => void }`. `search` com menos de 8 dígitos volta a `idle` e cancela a busca anterior.

- [ ] **Step 1: Escrever os testes que falham**

Create `src/hooks/useCep.test.js` (ambiente jsdom só neste arquivo):

```js
// @vitest-environment jsdom
import { createElement, act } from 'react';
import { createRoot } from 'react-dom/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CepError } from '../services/viacep.js';
import { useCep } from './useCep.js';

vi.mock('../services/viacep.js', async (importOriginal) => ({
  ...(await importOriginal()),
  buscarCep: vi.fn(),
}));
import { buscarCep } from '../services/viacep.js';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

function renderHook(hook) {
  const result = { current: null };
  function Probe() { result.current = hook(); return null; }
  const root = createRoot(document.createElement('div'));
  act(() => root.render(createElement(Probe)));
  return { result, unmount: () => act(() => root.unmount()) };
}

function deferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

const sp = { logradouro: 'Avenida Paulista', bairro: 'Bela Vista', localidade: 'São Paulo', uf: 'SP' };
const rj = { logradouro: 'Rua da Quitanda', bairro: 'Centro', localidade: 'Rio de Janeiro', uf: 'RJ' };

beforeEach(() => buscarCep.mockReset());

describe('useCep', () => {
  it('só busca com 8 dígitos', async () => {
    const { result } = renderHook(useCep);
    await act(async () => { result.current.search('01310-10'); });
    expect(buscarCep).not.toHaveBeenCalled();
    expect(result.current.status).toBe('idle');
  });

  it('vai de loading para success com os dados', async () => {
    const d = deferred();
    buscarCep.mockReturnValue(d.promise);
    const { result } = renderHook(useCep);
    await act(async () => { result.current.search('01310-100'); });
    expect(result.current.status).toBe('loading');
    await act(async () => { d.resolve(sp); });
    expect(result.current.status).toBe('success');
    expect(result.current.data).toEqual(sp);
  });

  it('expõe o código do erro', async () => {
    buscarCep.mockRejectedValue(new CepError('NAO_ENCONTRADO'));
    const { result } = renderHook(useCep);
    await act(async () => { result.current.search('00000000'); });
    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('NAO_ENCONTRADO');
  });

  it('descarta a resposta atrasada quando o CEP muda no meio da busca', async () => {
    const primeira = deferred();
    const segunda = deferred();
    buscarCep.mockReturnValueOnce(primeira.promise).mockReturnValueOnce(segunda.promise);
    const { result } = renderHook(useCep);
    await act(async () => { result.current.search('01310100'); });
    await act(async () => { result.current.search('20010000'); });
    await act(async () => { segunda.resolve(rj); });
    await act(async () => { primeira.resolve(sp); });
    expect(result.current.status).toBe('success');
    expect(result.current.data).toEqual(rj);
  });

  it('volta a idle e cancela quando o CEP fica incompleto', async () => {
    const d = deferred();
    buscarCep.mockReturnValue(d.promise);
    const { result } = renderHook(useCep);
    await act(async () => { result.current.search('01310100'); });
    await act(async () => { result.current.search('0131'); });
    await act(async () => { d.resolve(sp); });
    expect(result.current.status).toBe('idle');
    expect(result.current.data).toBeNull();
  });
});
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run src/hooks/useCep.test.js`
Expected: FAIL (`Failed to resolve import "./useCep.js"`).

- [ ] **Step 3: Implementar o hook**

Create `src/hooks/useCep.js`:

```js
import { useCallback, useEffect, useRef, useState } from 'react';
import { buscarCep, normalizarCep } from '../services/viacep.js';

const IDLE = { status: 'idle', data: null, error: null };

export function useCep() {
  const [state, setState] = useState(IDLE);
  const controllerRef = useRef(null);

  const search = useCallback(async (cep) => {
    controllerRef.current?.abort();
    const digits = normalizarCep(cep);
    if (digits.length < 8) {
      controllerRef.current = null;
      setState(IDLE);
      return;
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    setState({ status: 'loading', data: null, error: null });
    try {
      const data = await buscarCep(digits, { signal: controller.signal });
      if (controller.signal.aborted) return;
      setState({ status: 'success', data, error: null });
    } catch (error) {
      if (controller.signal.aborted) return;
      setState({ status: 'error', data: null, error: error?.code ?? 'REDE' });
    }
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  return { ...state, search };
}
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npm test`
Expected: PASS, 13 testes (8 do serviço + 5 do hook).

- [ ] **Step 5: Commit**

```bash
git add src/hooks
git commit -m "feat: add useCep hook with stale-response guard" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: `CepField` e página Entrega

**Files:**

- Create: `src/components/CepField.jsx`, `src/pages/Delivery.jsx`, `src/delivery.css`, `pages/entrega.html`
- Modify: `src/main.jsx`, `vite.config.js`, `src/shared/SiteLayout.jsx`

**Interfaces:**

- Consumes: `useCep` (Task 2), `formatarCep` (Task 1).
- Produces: `CepField` default export com props `{ id?: string = 'cep', name?: string = 'cep', label?: string = 'CEP', onResolved?: (endereco: {logradouro,bairro,localidade,uf}) => void, onStatusChange?: (status: string) => void }`. Renderiza `<input name={name}>` dentro do `<form>` do pai, então o valor também chega via `FormData`.

- [ ] **Step 1: Criar o componente `CepField`**

Create `src/components/CepField.jsx`:

```jsx
import React, { useEffect, useState } from 'react';
import { useCep } from '../hooks/useCep.js';
import { formatarCep } from '../services/viacep.js';

const MENSAGENS = {
  CEP_INVALIDO: 'Digite um CEP com 8 números.',
  NAO_ENCONTRADO: 'CEP não encontrado. Confira os números.',
  REDE: 'Não foi possível consultar agora. Preencha manualmente ou tente de novo.',
};

export default function CepField({ id = 'cep', name = 'cep', label = 'CEP', onResolved, onStatusChange }) {
  const [value, setValue] = useState('');
  const { status, data, error, search } = useCep();
  const helpId = `${id}-help`;

  useEffect(() => { onStatusChange?.(status); }, [status]);
  useEffect(() => { if (status === 'success') onResolved?.(data); }, [status, data]);

  function handleChange(event) {
    const formatted = formatarCep(event.target.value);
    setValue(formatted);
    search(formatted);
  }

  const message = status === 'loading' ? 'Buscando endereço…'
    : status === 'success' ? 'Endereço encontrado.'
    : status === 'error' ? MENSAGENS[error]
    : 'Digite os 8 números do CEP.';

  return <div className="field-group">
    <label htmlFor={id}>{label}</label>
    <input id={id} name={name} type="text" inputMode="numeric" autoComplete="postal-code" maxLength={9} className="form-control" placeholder="00000-000" value={value} onChange={handleChange} aria-describedby={helpId} aria-invalid={status === 'error'} />
    <span id={helpId} className={`field-help ${status === 'error' ? 'field-help-error' : status === 'success' ? 'field-help-success' : ''}`} aria-live="polite">{message}</span>
    {status === 'error' && error === 'REDE' && <button type="button" className="btn btn-outline-light btn-sm cep-retry" onClick={() => search(value)}>Tentar novamente</button>}
  </div>;
}
```

- [ ] **Step 2: Criar a página `Delivery`**

Create `src/pages/Delivery.jsx`:

```jsx
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
```

Nota: `numeroRef` é passado via `extra` para o `<input>` (em React 19 `ref` é prop comum).

- [ ] **Step 3: Estilos mínimos**

Create `src/delivery.css`:

```css
.cep-retry { justify-self: start; }
.delivery-summary { margin-top: 1.5rem; }
.delivery-summary p { margin: .5rem 0 1rem; line-height: 1.6; }
.signup-card input:disabled { opacity: .65; cursor: progress; }
```

- [ ] **Step 4: Ponto de entrada HTML**

Create `pages/entrega.html` copiando `pages/biblioteca.html` com um único ajuste (`<title>Iara Games | Entrega</title>`):

```bash
sed 's/Iara Games | Biblioteca/Iara Games | Entrega/' pages/biblioteca.html > pages/entrega.html
grep -c "Entrega" pages/entrega.html
```

Expected: `1`.

- [ ] **Step 5: Registrar a rota e a entrada do Vite**

Em `src/main.jsx`:

```jsx
import Delivery from './pages/Delivery.jsx';
```

```jsx
import './library.css';
import './delivery.css';
```

Substitua o bloco que escolhe a página por:

```jsx
const page = path.endsWith('/loja.html') ? 'loja'
  : path.endsWith('/cadastro.html') ? 'cadastro'
  : path.endsWith('/perfil.html') ? 'perfil'
  : path.endsWith('/biblioteca.html') ? 'biblioteca'
  : path.endsWith('/entrega.html') ? 'entrega' : 'home';
const pages = { home: Home, loja: Shop, cadastro: Signup, perfil: Profile, biblioteca: Library, entrega: Delivery };
const Page = pages[page];
const bodyClass = { loja: 'shop-page', cadastro: 'signup-page', perfil: 'profile-page', biblioteca: 'library-page', entrega: 'signup-page delivery-page' };
document.body.className = page === 'home' ? '' : `internal-page ${bodyClass[page]}`;
```

Em `vite.config.js`, na lista `input`, acrescente `entrega: resolve('pages/entrega.html'),` depois de `biblioteca`.

- [ ] **Step 6: Links no header e no rodapé**

Em `src/shared/SiteLayout.jsx`, no array `nav`, insira depois de `Biblioteca`:

```jsx
    { name: 'Entrega', href: pageHref('entrega'), icon: 'loja', key: 'entrega' },
```

(reaproveita o par de ícones `loja-default/hover.svg`, porque não há ícone dedicado). No `footer-nav`, depois do link `Biblioteca`, acrescente `<a href={`${root}pages/entrega.html`}>Entrega</a>`.

- [ ] **Step 7: Build e verificação no navegador**

Run: `npm run build`
Expected: build sem erros e `dist/pages/entrega.html` existe.

Run: `npm run dev` e abra `http://localhost:5173/iara-games/pages/entrega.html`.
Expected: página carrega; CEP `01310-100` preenche Avenida Paulista / Bela Vista / São Paulo / SP e o foco vai para Número; `00000-000` mostra "CEP não encontrado."; com a rede desligada (DevTools → Offline) aparece o botão "Tentar novamente"; salvar e recarregar mantém o resumo.

- [ ] **Step 8: Commit**

```bash
git add src pages vite.config.js
git commit -m "feat: add Entrega page with ViaCEP lookup" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: `CepField` no Cadastro

**Files:**

- Modify: `src/pages/Signup.jsx`

**Interfaces:**

- Consumes: `CepField` (Task 3), `onResolved(endereco)` com `localidade` e `uf`.

- [ ] **Step 1: Importar o componente e criar a referência do formulário**

No topo de `src/pages/Signup.jsx`:

```jsx
import React, { useRef, useState } from 'react';
import CepField from '../components/CepField.jsx';
```

Dentro de `Signup()`, depois de `const [success, setSuccess] = useState(false);`:

```jsx
  const formRef = useRef(null);
  function fillFromCep({ localidade, uf }) {
    const form = formRef.current;
    if (!form) return;
    form.elements.namedItem('cidade').value = localidade;
    const estado = form.elements.namedItem('estado');
    estado.value = uf;
    setErrors(current => (current.estado ? { ...current, estado: '' } : current));
  }
```

No `<form className="signup-form" ...>` acrescente `ref={formRef}`.

- [ ] **Step 2: Inserir o campo antes de Cidade**

Dentro do `<div className="form-grid">` do fieldset "Seu contexto de jogo", imediatamente antes do `<div className="field-group">` de `cidade`, acrescente:

```jsx
                <CepField id="cep" name="cep" label="CEP (opcional)" onResolved={fillFromCep} />
```

- [ ] **Step 3: Verificar**

Run: `npm run build`
Expected: sem erros.

No navegador (`/iara-games/pages/cadastro.html`): digite `01310-100`; Cidade vira "São Paulo" e Estado "São Paulo"; digite um CEP inexistente e confirme que Cidade e Estado continuam editáveis; envie o formulário válido e confirme que a mensagem de sucesso aparece e que o campo CEP vazio não gera erro.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Signup.jsx
git commit -m "feat: fill signup city and state from CEP" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Publicação e verificação na URL pública

**Files:**

- Modify: `package.json` (versão)

- [ ] **Step 1: Atualizar a versão**

Em `package.json`, troque `"version": "6.0.0"` por `"version": "7.0.0"` (e rode `npm install --package-lock-only` para alinhar o lock).

- [ ] **Step 2: Rodar tudo localmente**

Run: `npm test && npm run build`
Expected: 13 testes passam e o build termina sem erros.

- [ ] **Step 3: Commit e pedir autorização para publicar**

```bash
git add package.json package-lock.json
git commit -m "chore: bump version to 7.0.0" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Publicar é uma ação externa: **pergunte ao usuário antes** de rodar `git push origin main`. Depois do OK:

Run: `git push origin main` e acompanhe com `gh run watch` (ou na aba Actions).
Expected: workflow "Publicar no GitHub Pages" termina verde.

- [ ] **Step 4: Checklist manual na URL pública**

Abra `https://defxico.github.io/iara-games/pages/entrega.html` e confirme os 6 itens do spec:

1. `01310-100` preenche o endereço e o foco vai para Número.
2. `00000-000` mostra "CEP não encontrado." e os campos ficam livres.
3. Offline: mensagem de falha e botão "Tentar novamente".
4. Cadastro: Cidade e Estado preenchidos pelo CEP.
5. Recarregar mantém o endereço salvo.
6. Largura 375 px e navegação só por teclado (Tab percorre CEP → campos → Salvar; foco visível).

Se algo falhar, corrija em um novo commit e repita; não siga para a Task 6 antes de tudo passar.

---

### Task 6: Capturas, PDF e README

**Files:**

- Create: `docs/screenshots/sprint-7/{entrega-preenchida,entrega-nao-encontrado,entrega-erro-rede,cadastro-preenchido}.png`, `docs/sprint-7-documentacao.html`, `pdf/iara-games-sprint-07.pdf`
- Modify: `README.md`

- [ ] **Step 1: Capturar as telas na URL pública**

No navegador, largura 1280 px, salve em `docs/screenshots/sprint-7/`:

- `entrega-preenchida.png`: CEP `01310-100` resolvido, foco em Número.
- `entrega-nao-encontrado.png`: CEP `00000-000` com a mensagem de erro.
- `entrega-erro-rede.png`: DevTools Offline, CEP digitado, botão "Tentar novamente" visível.
- `cadastro-preenchido.png`: Cadastro com Cidade e Estado preenchidos.

- [ ] **Step 2: Criar a documentação HTML**

Copie `docs/sprint-5-documentacao.html` para `docs/sprint-7-documentacao.html` e mantenha intactos o bloco `<style>` (linhas 7–332), a estrutura de página (`.page`, `.bar`, `.content`, `.foot`) e a capa. Ajustes na cópia:

- Capa: `SPRINT 05` → `SPRINT 07`, data `Novembro de 2026`, `.cover-num` → `07`, rodapés `Iara Games — Sprint 07`, e o índice da capa com: `01 Abertura`, `02 A área Entrega`, `03 Como a API funciona`, `04 Arquitetura`, `05 Como testar e publicação`. Mantenha a lista de integrantes da capa e remova a de quem não estiver no grupo desta sprint.
- Substitua as páginas de funcionalidade por 5 páginas, usando os mesmos componentes (`eyebrow`, `h2`, `section-note`, `problem`, `impl-item`, `code`):
  1. **Abertura** — o que a Sprint 7 pede (área em React + API real + deploy) e a solução escolhida (ViaCEP em "Entrega" e no Cadastro).
  2. **A área Entrega** — problema (endereço digitado à mão gera erro e abandono), fluxo do usuário em 4 passos e as capturas `entrega-preenchida.png` e `cadastro-preenchido.png`.
  3. **Como a API funciona** — endpoint `GET https://viacep.com.br/ws/{cep}/json/`; exemplo de requisição (`/ws/01310100/json/`) e de resposta JSON (`logradouro`, `bairro`, `localidade`, `uf`); tabela de erros (CEP incompleto, `{ "erro": true }`, sem rede/timeout de 8 s, resposta atrasada descartada); capturas `entrega-nao-encontrado.png` e `entrega-erro-rede.png`.
  4. **Arquitetura** — diagrama em caixas `viacep.js → useCep → CepField → Delivery / Signup` e a decisão "o erro nunca bloqueia o formulário".
  5. **Como testar e publicação** — passos 1 a 6 do checklist, 13 testes automatizados (`npm test`) e, em destaque, o link do deploy: `https://defxico.github.io/iara-games/pages/entrega.html`.
- Imagens com `<img src="screenshots/sprint-7/arquivo.png" alt="…">` e texto alternativo descritivo.
- Atualize o sumário (`toc-row`) e a numeração `.foot` para refletir as páginas.

- [ ] **Step 3: Exportar o PDF**

Descubra o navegador instalado e gere o PDF sem cabeçalho e rodapé do navegador:

```powershell
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
& $edge --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="C:\dev\iara-main\pdf\iara-games-sprint-07.pdf" "file:///C:/dev/iara-main/docs/sprint-7-documentacao.html"
```

Expected: `pdf/iara-games-sprint-07.pdf` criado. Abra o PDF e confira: capa com equipe, link do deploy visível na capa e na última página, imagens carregadas, cores exatas (o CSS já força `print-color-adjust: exact`), sem página em branco.

- [ ] **Step 4: README**

No topo de `README.md`, atualize `**PDF da entrega:**` para `[`pdf/iara-games-sprint-07.pdf`](./pdf/iara-games-sprint-07.pdf)`, acrescente `**Área de Entrega publicada:** https://defxico.github.io/iara-games/pages/entrega.html` e insira antes de `## Sprint 6 (Fase 6)`:

```markdown
## Sprint 7 (Fase 7) — Área Entrega com API ViaCEP

A nova área **Entrega** (`pages/entrega.html`) consome a API pública [ViaCEP](https://viacep.com.br/): o usuário digita o CEP e rua, bairro, cidade e UF são preenchidos automaticamente. O mesmo campo de CEP preenche Cidade e Estado no Cadastro. O endereço é salvo no `localStorage` do navegador (demonstração acadêmica, sem backend).

- `src/services/viacep.js`: consulta a API, valida o CEP e trata erros (`CEP_INVALIDO`, `NAO_ENCONTRADO`, `REDE`, timeout de 8 s).
- `src/hooks/useCep.js`: estado da busca e descarte de respostas atrasadas.
- `src/components/CepField.jsx`: campo com máscara e mensagens acessíveis.
- `src/pages/Delivery.jsx`: página Entrega.

Testes automatizados: `npm test` (Vitest). Documentação completa e capturas de tela: [`pdf/iara-games-sprint-07.pdf`](./pdf/iara-games-sprint-07.pdf).

---

```

- [ ] **Step 5: Commit e publicar**

```bash
git add docs/sprint-7-documentacao.html docs/screenshots/sprint-7 pdf/iara-games-sprint-07.pdf README.md
git commit -m "docs: add Sprint 7 documentation and PDF" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Peça autorização antes do `git push origin main`; depois do push, confirme que a URL de Entrega continua no ar e que o link do PDF no README abre.

---

## Self-Review (spec × plano)

- Arquitetura (5 unidades) → Tasks 1–4. Integração em `main.jsx`/`vite.config.js`/header/rodapé → Task 3. Cadastro → Task 4.
- Fluxo e foco em Número → Task 3 (efeito em `Delivery` após o re-render, para o campo já estar habilitado).
- Erros (tabela de 4 linhas) → Task 1 (serviço) e Task 2 (descarte); mensagens → `CepField`; "nunca bloqueia" → campos só desabilitados em `loading`.
- Persistência `iara-entrega` com `try/catch` → Task 3.
- Testes automatizados do serviço e do hook → Tasks 1–2. Checklist manual com 6 itens e verificação na URL pública → Tasks 3, 4 e 5.
- PDF, README, versão `7.0.0`, capturas → Tasks 5–6.
- Desvio assumido: `jsdom` entra como `devDependency` junto do Vitest para testar o hook sem Testing Library.
- Nomes consistentes: `buscarCep`, `normalizarCep`, `formatarCep`, `CepError`, `useCep`, `CepField`, `onResolved`, `onStatusChange`, `iara-entrega`.
