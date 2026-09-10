# Sprint 5 — Interatividade em Ação: Evoluindo a Plataforma com JavaScript

**Data:** 2026-09-10
**Repositório:** https://github.com/defxico/iara-games

## Contexto

Na Sprint 4 o grupo entregou uma análise de interação (categorias de Alan Cooper) e implementou melhorias em HTML/CSS na Home. Esta sprint pede para ir além do protótipo: adicionar JavaScript externo que resolva problemas reais de interação, com pelo menos 3 comportamentos dinâmicos via manipulação de DOM.

Levantamento no código existente encontrou três gaps reais e coerentes com o estilo do projeto (que já usa componentes Bootstrap + pequenos scripts inline):

1. Os chips de filtro por gênero em `pages/loja.html` (`Aventura`, `Ação`, `Cozy`, `Puzzle`, `RPG`, `Esporte`) só alternam a própria classe `.active` — não filtram os cards de jogos exibidos.
2. O formulário de `pages/cadastro.html` já tem o atributo `novalidate` (sinal de que espera validação customizada via JS) mas não valida nada — todos os campos `required` dependem só da validação nativa do navegador, sem feedback inline.
3. Os botões "Adicionar ao carrinho" em `pages/loja.html` são links mortos (`href="#"`), sem nenhum feedback. Isso é inconsistente com `index.html`, onde o mesmo botão (para usuário deslogado) já redireciona para o cadastro com tooltip "Crie uma conta para comprar".

## Objetivo

Implementar as 3 funcionalidades acima em um arquivo JavaScript externo, atualizar o README com instruções de como testá-las, publicar via GitHub Pages, e produzir uma página de documentação (para exportar como PDF) com antes/depois de cada funcionalidade.

## Fora de escopo

- Qualquer persistência real (carrinho, cadastro, login) — não há backend; tudo é simulado no cliente.
- Refatoração do CSS ou da estrutura visual existente.
- Novas páginas ou fluxos além dos 3 pontos acima.
- Framework de build/bundler — o projeto é HTML/CSS/JS puro servido estaticamente.

## Arquitetura

Um único arquivo novo: **`js/main.js`**, carregado com `<script src="./js/main.js" defer></script>` logo antes de `</body>`, em `index.html`, `pages/loja.html` e `pages/cadastro.html` (ajustando o caminho relativo: `./js/main.js` na home, `../js/main.js` nas páginas internas). `pages/perfil.html` não precisa do arquivo — nenhuma das 3 funcionalidades toca nela.

Dentro de `main.js`, cada funcionalidade é uma função isolada, chamada a partir de um listener `DOMContentLoaded`, e cada uma faz *early return* se os elementos que precisa não existirem na página atual (mesmo padrão já usado no script inline de `loja.html` hoje). Isso permite um único arquivo compartilhado entre páginas diferentes sem erros de seletor nulo.

```
main.js
├── initTooltips()        // migrado do inline de index.html
├── initShopView()        // migrado do inline de loja.html (grid/list toggle)
├── initGenreFilter()     // NOVO — funcionalidade 1
├── initSignupValidation()// NOVO — funcionalidade 2
└── initCartFeedback()    // NOVO — funcionalidade 3
```

Migrar os 2 blocos inline existentes (tooltip init em `index.html`, toggle de view em `loja.html`) para dentro do mesmo arquivo é um ajuste pequeno e direto: remove as duas tags `<script>` inline restantes e mantém 100% do JS do projeto em arquivo externo, que é literalmente o que o enunciado pede ("o JavaScript deve estar em um arquivo externo... não inserido diretamente nas tags do documento").

## Funcionalidade 1 — Filtro de jogos por gênero (`pages/loja.html`)

**Problema de interação:** usuário clica em "Aventura" esperando ver só jogos de aventura, mas a lista não muda — o filtro é decorativo.

**Mudança de HTML:** cada `<article>` de card na grade (`.shop-grid > article`, hoje 9 cards) recebe um atributo `data-genre` com o valor normalizado (minúsculo, sem acento) do primeiro badge do card, que já é o gênero primário:

| Jogo | Primeiro badge (genre) | `data-genre` |
|---|---|---|
| Véu de Chuva | Aventura | `aventura` |
| O Chamado do Boto | Ação | `acao` |
| Encantado | RPG | `rpg` |
| Linha de Varal | Cozy | `cozy` |
| Maré | Puzzle | `puzzle` |
| Quarta Feira | Esporte | `esporte` |
| Sertão Noir | Narrativa | `narrativa` |
| Várzea | Aventura | `aventura` |
| Baldeação | Puzzle | `puzzle` |

Os chips (`.shop-filter-chip`) recebem `data-genre-filter` com o mesmo valor normalizado (`todos` para o chip "Todos"). "Sertão Noir" (`narrativa`) não corresponde a nenhum chip específico — isso é esperado: ele só aparece em "Todos", e o filtro deve tratar isso normalmente (não é um bug a corrigir, é um jogo sem categoria própria nos chips atuais).

**Comportamento JS (`initGenreFilter`):**
- Ao clicar num chip: aplica `.active`/`aria-pressed` nele (lógica que já existe), e roda o filtro:
  - Para cada `article`, mostra se `data-genre-filter === "todos"` ou `article.dataset.genre === chip selecionado`; senão esconde (`classList.toggle('is-hidden', !match)`, com `.is-hidden { display: none }` no CSS — uma única regra nova).
- Atualiza um contador de resultados (elemento novo, `<p data-shop-count>`, inserido logo acima da grade, texto tipo "9 jogos encontrados" / "2 jogos encontrados").
- Se 0 resultados: mostra uma mensagem vazia (`<p data-shop-empty>`, `hidden` por padrão, texto "Nenhum jogo encontrado para este filtro.") e esconde a grade; ao voltar para um filtro com resultado, reverte.
- Contador e mensagem vazia usam `aria-live="polite"` para leitores de tela serem avisados da mudança.

**Como o usuário percebe:** clica num chip, a grade recalcula na hora (sem reload), o contador acima muda, e se não houver nenhum jogo daquele gênero aparece uma mensagem clara em vez de uma grade vazia sem explicação.

## Funcionalidade 2 — Validação de formulário em tempo real (`pages/cadastro.html`)

**Problema de interação:** o formulário pede dados críticos (e-mail, senha) sem avisar o usuário se algo está errado antes de tentar enviar — só a validação nativa do navegador (que é inconsistente entre navegadores e não combina com o visual do site) entraria em ação, e olhando o HTML atual (`novalidate`) isso nem está ativo.

**Campos validados e regra:**
- `#nome-completo`: não vazio (`trim().length > 0`).
- `#email`: regex simples de formato (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
- `#senha`: mínimo 8 caracteres (o texto de ajuda já promete isso — hoje não é verificado).
- `#confirmar-senha`: igual ao valor de `#senha`.
- `#estado`: selecionado (não pode ficar em `""`, já é `required` no HTML).
- `#aceite-termos`: precisa estar marcado.

**Comportamento JS (`initSignupValidation`):**
- Listener de `input`/`blur` em cada campo acima: valida aquele campo isoladamente e alterna classes Bootstrap `is-valid`/`is-invalid` no `<input>`, além de mostrar/atualizar uma mensagem de erro específica logo abaixo do campo (reaproveitando os elementos `.field-help` que já existem no HTML — troca o texto e uma classe de cor quando há erro).
- `#confirmar-senha` também revalida sempre que `#senha` mudar (a confirmação pode ficar inválida por causa da outra).
- Um listener central de `submit` no formulário: `preventDefault()` sempre (não há backend); roda a validação de todos os campos de uma vez; se algum for inválido, foca o primeiro campo inválido e não segue adiante; se todos forem válidos, esconde o formulário e mostra uma mensagem de sucesso (`<div data-signup-success>`, `hidden` por padrão) confirmando a "criação da conta" — deixa claro que é uma demonstração acadêmica sem persistência real.
- O botão "Criar conta" não precisa ficar desabilitado preventivamente (isso pioraria a descobribilidade do formulário); a validação acontece nos campos e no submit, que é o padrão mais comum e acessível.

**Como o usuário percebe:** ao sair de um campo preenchido incorretamente (ex: e-mail sem `@`, senha com 5 caracteres, confirmação diferente da senha), o campo fica com borda/texto de erro e a mensagem de ajuda explica o motivo; ao corrigir, o campo fica com indicação de sucesso. Ao tentar enviar com algo pendente, o navegador leva o foco direto ao primeiro problema. Com tudo certo, aparece uma confirmação visual clara de que a conta "foi criada".

## Funcionalidade 3 — Feedback ao "Adicionar ao carrinho" (`pages/loja.html`)

**Problema de interação:** os 9 botões de carrinho são `href="#"` — clicar não faz nada, não há explicação de por que a compra não avança (usuário está deslogado nesta página). Isso já foi resolvido na Home (tooltip "Crie uma conta para comprar" + redireciona para cadastro) mas a Loja ficou pra trás.

**Comportamento JS (`initCartFeedback`):**
- Listener de `click` em cada `.shop-buy-row a.btn-primary`: `preventDefault()`; extrai o nome do jogo a partir do `aria-label` do botão (já contém "Adicionar {nome} ao carrinho") ou do `card-title` irmão.
- Cria dinamicamente (ou reaproveita, se já existir) um elemento de toast fixo (`<div class="cart-toast" role="status" aria-live="polite">`) inserido no `<body>`, com o texto "Crie uma conta gratuita para comprar **{nome do jogo}**" e um link para `cadastro.html`.
- Aplica uma classe que dispara a transição CSS de entrada (nova regra pequena em `style.css`: `.cart-toast` posicionado fixo, `.cart-toast.is-visible` com opacity/translate); some sozinho depois de ~4s (`setTimeout` + remoção da classe), ou antes se o usuário clicar no link do toast.
- Cliques consecutivos em botões diferentes reiniciam o timer e atualizam o texto, em vez de empilhar vários toasts.

**Como o usuário percebe:** clica no carrinho de qualquer jogo na Loja e imediatamente vê uma confirmação visual explicando por que a compra não avança e como resolver (criar conta), em vez de um clique que não faz nada.

## Documentação e deploy

- **GitHub Pages:** ativar servindo a branch `main` a partir da raiz (`/`). URL final vai para o README e para o PDF.
- **README:** nova seção "Sprint 5 — Interatividade" descrevendo as 3 funcionalidades, arquivo `js/main.js`, e um link "Como testar" apontando pro GitHub Pages.
- **Página de documentação para PDF:** `docs/sprint-5-documentacao.html`, standalone (sem dependência do site), com identificação do grupo (Amanda Ayumi Guedes Ueno, Francisco Caetano Bernardes, Giovana Camargo Budin, Mariana Costa Cruz Maciel — nomes já confirmados no README da Sprint 4), link do repositório, e uma seção por funcionalidade com: problema resolvido, como o JS foi usado (evento, seletor, método), como o usuário percebe, e dois espaços de imagem (antes/depois) — preenchidos com capturas reais tiradas via browser automation depois que o código estiver funcionando. O usuário abre a página no navegador e usa "Imprimir → Salvar como PDF".

## Testes / verificação

Sem framework de teste no projeto (é HTML/CSS/JS estático). Verificação via:
- Servidor estático local (`python -m http.server`) + Chrome automatizado, repetindo o mesmo processo de verificação visual já usado na sprint anterior: abrir cada página afetada, testar cada funcionalidade manualmente (clicar chips, preencher formulário com casos válidos/inválidos, clicar carrinho), checar console sem erros.
- Confirmar que `pages/perfil.html` e `index.html` (fora do filtro/carrinho/validação) continuam renderizando sem quebra depois da migração dos scripts inline.
