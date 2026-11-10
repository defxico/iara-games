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
