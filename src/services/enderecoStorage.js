export const ENDERECO_KEY = 'iara-endereco';
const CAMPOS = ['cep', 'logradouro', 'bairro', 'localidade', 'uf', 'numero', 'complemento'];

export function readEndereco() {
  try {
    const saved = JSON.parse(localStorage.getItem(ENDERECO_KEY));
    return saved && typeof saved === 'object' && CAMPOS.every(campo => typeof saved[campo] === 'string') ? saved : null;
  } catch { return null; }
}

export function saveEndereco(endereco) {
  try { localStorage.setItem(ENDERECO_KEY, JSON.stringify(endereco)); } catch { /* O endereço continua na tela sem armazenamento local. */ }
}

export function removeEndereco() {
  try { localStorage.removeItem(ENDERECO_KEY); } catch { /* Sem armazenamento local, só limpamos a tela. */ }
}
