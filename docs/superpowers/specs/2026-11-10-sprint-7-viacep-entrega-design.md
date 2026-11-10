# Sprint 7 — Área "Endereço" com API ViaCEP

**Data:** 2026-11-10
**Repositório:** https://github.com/defxico/iara-games
**Publicação:** https://defxico.github.io/iara-games/

## Contexto

A Fase 07 encerra a jornada da Plataforma Iara Games. O enunciado pede uma área do portal construída em React que consuma uma API real, publicada online. Critérios: 70% desenvolvimento da área em React com a API funcionando, 30% deploy e funcionamento online. Entrega: PDF com a descrição da área, o funcionamento da API e o link do deploy.

Estado atual do repositório (Sprint 6): React 19 + Vite, cinco páginas HTML de múltiplas entradas (`Home`, `Shop`, `Signup`, `Profile`, `Library`), sem roteador, publicadas no GitHub Pages por `.github/workflows/deploy.yml` com `base: '/iara-games/'`. `Signup.jsx` já tem os campos Cidade e Estado.

## Decisões

- **API:** ViaCEP (`https://viacep.com.br/ws/{cep}/json/`). Pública, sem chave, com CORS liberado.
- **Área:** nova página "Endereço" (`pages/endereco.html`), mais reaproveitamento do campo de CEP no Cadastro.
- **Consumo:** `fetch` nativo, sem bibliotecas de dados.
- **Deploy:** GitHub Pages, que já está configurado. O enunciado aceita "qualquer plataforma de sua escolha", então Vercel não é obrigatória.

## Fora de escopo

Pagamento, cálculo de frete, login, mapa e backend próprio.

## Arquitetura

| Unidade | Responsabilidade | Depende de |
|---|---|---|
| `src/services/viacep.js` | `buscarCep(cep, { signal })`: normaliza o CEP, valida 8 dígitos, chama a ViaCEP e devolve `{ logradouro, bairro, localidade, uf }` ou lança erro tipado (`CEP_INVALIDO`, `NAO_ENCONTRADO`, `REDE`) | `fetch` |
| `src/hooks/useCep.js` | Estado `idle \| loading \| success \| error` e dados. Busca ao completar 8 dígitos e cancela a requisição anterior com `AbortController` | `viacep.js` |
| `src/components/CepField.jsx` | Campo com máscara `00000-000`, mensagens com `aria-live`, callback `onResolved(endereco)` | `useCep` |
| `src/pages/Address.jsx` | Página Entrega: `CepField` mais rua, bairro, cidade, UF, número e complemento; salva em `localStorage` (chave `iara-endereco`) | `CepField` |
| `src/pages/Signup.jsx` | Recebe `CepField` e preenche Cidade e Estado (campos continuam editáveis) | `CepField` |

Integração: `src/main.jsx` e `vite.config.js` registram a página `entrega`. `SiteHeader` e `SiteFooter` ganham o link "Endereço". As páginas existentes não mudam de visual, exceto o campo de CEP no Cadastro.

## Fluxo de dados

1. O usuário digita o CEP; a máscara formata e o estado fica `idle` até completar 8 dígitos.
2. Com 8 dígitos, o hook entra em `loading` e chama `buscarCep`. Mensagem "Buscando endereço…"; campos dependentes desabilitados.
3. Em `success`, `onResolved` preenche rua, bairro, cidade e UF, e o foco vai para **Número**.
4. Ao salvar, o endereço vai para o `localStorage` e aparece um resumo de confirmação.

### Erros

| Situação | Origem | Mensagem | Comportamento |
|---|---|---|---|
| Menos de 8 dígitos | validação local | nenhuma | sem chamada |
| CEP inexistente | resposta `{ erro: true }` | "CEP não encontrado. Confira os números." | campos liberados para preenchimento manual |
| Sem rede ou timeout (8 s) | `fetch` falha | "Não foi possível consultar agora. Preencha manualmente ou tente de novo." | botão "Tentar novamente" |
| Resposta atrasada | CEP trocado durante a busca | nenhuma | `AbortController` descarta a resposta antiga |

Regra: o erro nunca bloqueia o formulário, porque a API é um atalho e não um requisito. No Cadastro, se o CEP falhar, Cidade e Estado continuam como hoje.

Persistência: leitura e escrita do `localStorage` em `try/catch`, como em `Library.jsx`, para o site funcionar com o armazenamento bloqueado.

## Testes

**Automatizados (Vitest como `devDependency`, `fetch` simulado):**

- `viacep.js`: CEP com máscara é normalizado; menos de 8 dígitos ou letras geram `CEP_INVALIDO` sem chamar a rede; `{ erro: true }` gera `NAO_ENCONTRADO`; falha de rede ou timeout gera `REDE`; resposta válida devolve os quatro campos.
- `useCep`: busca só com 8 dígitos; resposta atrasada é descartada quando o CEP muda no meio da busca.

Sem Testing Library: o ganho não compensa a dependência neste tamanho de projeto.

**Checklist manual no navegador (repetido na URL pública):**

1. CEP real (`01310-100`): endereço aparece e o foco vai para Número.
2. CEP inexistente (`00000-000`): mensagem de erro e campos liberados.
3. Rede desligada: mensagem de falha e botão "Tentar novamente".
4. Cadastro: Cidade e Estado preenchidos pelo CEP.
5. Recarregar a página: endereço salvo continua lá.
6. Largura de 375 px e navegação só por teclado.

**Antes de declarar pronto:** `npm run build` sem erros, chamada real à ViaCEP conferida e site publicado aberto com o checklist repetido na URL pública.

## Entrega

- `docs/sprint-7-documentacao.html`, no padrão visual de `docs/sprint-5-documentacao.html`, exportado para `pdf/iara-games-sprint-07.pdf`.
- Conteúdo do PDF: capa com equipe e link do deploy; descrição da área e fluxo do usuário; funcionamento da API (endpoint, exemplo de requisição e resposta, tabela de erros); diagrama `viacep.js` → `useCep` → `CepField`; capturas de tela (CEP preenchido, CEP inexistente, erro de rede, Cadastro preenchido); como testar na URL pública; link do deploy repetido no fim.
- README: seção "Sprint 7" no topo, no formato das anteriores, com links do PDF e da área publicada.
- `package.json`: versão `7.0.0`. Capturas em `docs/screenshots/sprint-7/`.

**Ordem de execução:** serviço e testes → hook → componente → página Endereço → integração no Cadastro e no header → build e deploy → capturas e PDF. O PDF só é gerado depois de o deploy estar verificado, para o link e as imagens refletirem o site real.

## Atualização (2026-11-10): Entrega → Endereço, ligada à conta

Revisão após a primeira implementação: a página passou de "Entrega" para **Endereço** (`pages/endereco.html`, `src/pages/Address.jsx`, chave `iara-endereco`), porque frete e compra estão fora de escopo e o nome anterior sugeria o contrário. Ela agora faz parte do fluxo de conta:

- Cadastro: depois do sucesso, o botão "Cadastrar meu endereço" leva à página. O campo de CEP continua como atalho para Cidade e Estado, em linha própria.
- Perfil: mostra o endereço salvo (ou "Adicionar endereço") com link para editar.
- Armazenamento compartilhado em `src/services/enderecoStorage.js` (`readEndereco`, `saveEndereco`, `removeEndereco`).
- Navegação: link no rodapé, no Perfil e no Cadastro; fora do header, para manter o menu enxuto.
