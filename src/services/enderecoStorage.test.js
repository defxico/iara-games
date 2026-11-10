import { afterEach, describe, expect, it, vi } from 'vitest';
import { ENDERECO_KEY, readEndereco, removeEndereco, saveEndereco } from './enderecoStorage.js';

const endereco = { cep: '01310-100', logradouro: 'Avenida Paulista', bairro: 'Bela Vista', localidade: 'São Paulo', uf: 'SP', numero: '1578', complemento: '' };

function stubStorage(initial = {}) {
  const data = { ...initial };
  vi.stubGlobal('localStorage', {
    getItem: key => (key in data ? data[key] : null),
    setItem: (key, value) => { data[key] = value; },
    removeItem: key => { delete data[key]; },
  });
  return data;
}

afterEach(() => vi.unstubAllGlobals());

describe('enderecoStorage', () => {
  it('salva, lê e remove o endereço', () => {
    stubStorage();
    saveEndereco(endereco);
    expect(readEndereco()).toEqual(endereco);
    removeEndereco();
    expect(readEndereco()).toBeNull();
  });

  it('ignora JSON inválido ou incompleto', () => {
    stubStorage({ [ENDERECO_KEY]: '{quebrado' });
    expect(readEndereco()).toBeNull();
    stubStorage({ [ENDERECO_KEY]: JSON.stringify({ cep: '01310-100' }) });
    expect(readEndereco()).toBeNull();
  });

  it('não quebra quando o armazenamento está bloqueado', () => {
    vi.stubGlobal('localStorage', { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() { throw new Error('blocked'); } });
    expect(readEndereco()).toBeNull();
    expect(() => saveEndereco(endereco)).not.toThrow();
    expect(() => removeEndereco()).not.toThrow();
  });
});
