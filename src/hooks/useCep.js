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
