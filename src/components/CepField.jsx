import React, { useEffect, useState } from 'react';
import { useCep } from '../hooks/useCep.js';
import { formatarCep } from '../services/viacep.js';

const MENSAGENS = {
  CEP_INVALIDO: 'Digite um CEP com 8 números.',
  NAO_ENCONTRADO: 'CEP não encontrado. Confira os números.',
  REDE: 'Não foi possível consultar agora. Preencha manualmente ou tente de novo.',
};

export default function CepField({ id = 'cep', name = 'cep', label = 'CEP', className = '', onResolved, onStatusChange }) {
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

  return <div className={`field-group ${className}`.trim()}>
    <label htmlFor={id}>{label}</label>
    <input id={id} name={name} type="text" inputMode="numeric" autoComplete="postal-code" maxLength={9} className="form-control" placeholder="00000-000" value={value} onChange={handleChange} aria-describedby={helpId} aria-invalid={status === 'error'} />
    <span id={helpId} className={`field-help ${status === 'error' ? 'field-help-error' : status === 'success' ? 'field-help-success' : ''}`} aria-live="polite">{message}</span>
    {status === 'error' && error === 'REDE' && <button type="button" className="btn btn-outline-light btn-sm cep-retry" onClick={() => search(value)}>Tentar novamente</button>}
  </div>;
}
