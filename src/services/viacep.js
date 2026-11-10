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
