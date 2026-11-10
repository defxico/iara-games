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

beforeEach(() => { buscarCep.mockReset(); });

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
    buscarCep.mockImplementation(async () => { throw new CepError('NAO_ENCONTRADO'); });
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
