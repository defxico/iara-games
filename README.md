# Iara Games - Sprint 4

Plataforma de marketplace de jogos brasileiros independentes.  
Projeto acadêmico desenvolvido na FIAP — Sprint 4 · Junho de 2026.

**Equipe**  
Francisco Caetano Bernardes · Mariana Costa Cruz Maciel · Giovana Camargo Budin · Amanda Ayumi Guedes Ueno

---

## Resumo da Sprint

Nesta Sprint 4 o foco foi refinar a base front-end a partir do feedback da Sprint 3:

> "Bom trabalho! O projeto apresenta excelente qualidade visual. O uso do Bootstrap foi bem aplicado em grids, componentes e navegação responsiva. Mas, como melhoria, o projeto poderia reduzir redundâncias no CSS e aproveitar mais os estilos nativos do framework para simplificar manutenção e escalabilidade do código."

A entrega desta sprint foi direcionada para responder exatamente esse ponto, mantendo a identidade visual da Iara Games e simplificando a estrutura de HTML e CSS.

---

## O Que Foi Feito

### 1. Redução de redundâncias no CSS

- Reescrita do arquivo [`css/style.css`](./css/style.css) com foco apenas nos componentes realmente usados nas páginas atuais.
- Remoção de reimplementações desnecessárias de estruturas que o Bootstrap já fornece, como base de botões, formulários, cards, progress bars e grupos de input.
- Consolidação de estilos compartilhados de header, footer, cards, painéis e formulários.
- Redução do tamanho do stylesheet principal de aproximadamente **3390 linhas para cerca de 2000 linhas**.

### 2. Maior aproveitamento do Bootstrap

Foram priorizados componentes nativos do framework com overrides leves de marca:

- `btn`, `btn-primary`, `btn-outline-light`
- `card`
- `form-control`
- `form-select`
- `input-group`
- `badge`
- `progress`
- `breadcrumb`
- `pagination`
- `offcanvas`

### 3. Refino das páginas

#### Home — `index.html`

- Cards de jogos, gêneros, comunidade e conta aproximados da estrutura nativa de `card`.
- Tags e avaliações ajustadas para usar `badge`.
- Busca do header migrada para `input-group`.
- CTA de suporte padronizado como botão Bootstrap.

#### Loja — `pages/loja.html`

- Barra principal de busca migrada para `input-group`.
- Filtros por gênero padronizados com botões Bootstrap.
- Estrutura de cards mantida com menor dependência de CSS customizado.
- Offcanvas, breadcrumb e paginação preservados com tema visual da marca.

#### Cadastro — `pages/cadastro.html`

- Campos continuam com `form-control`, `form-select` e `form-check`, agora tratados como base do formulário em vez de inputs redesenhados do zero.
- Ações principais padronizadas com variantes Bootstrap.
- Cards de preferência mantidos com identidade visual, mas em estrutura mais simples.

#### Perfil — `pages/perfil.html`

- KPIs e painéis migrados para uma base consistente com `card`.
- Barras de progresso ajustadas para o componente nativo `progress`.
- Botões e ações internas alinhados ao padrão compartilhado do projeto.

---

## Páginas do Projeto

- Home: [`index.html`](./index.html)
- Loja: [`pages/loja.html`](./pages/loja.html)
- Cadastro: [`pages/cadastro.html`](./pages/cadastro.html)
- Perfil: [`pages/perfil.html`](./pages/perfil.html)

---

## Tecnologias Utilizadas

- HTML5
- CSS3
- Bootstrap 5.3.3
- Google Fonts: Sora e Inter

---

## Resultado da Sprint 4

O projeto manteve a qualidade visual destacada pela avaliação anterior, mas agora com uma base mais limpa, mais padronizada e mais próxima do fluxo nativo do Bootstrap. Isso melhora:

- manutenção do código
- consistência entre páginas
- escalabilidade para próximas sprints
- clareza entre estilo de marca e estrutura de framework

---

## Repositório

```text
https://github.com/defxico/iara-games
```

---

## Sprint 4 - Redesign de Interacao

### Fonte da implementacao

Esta etapa executa o caminho HTML/CSS definido em `auxiliary-documents/sprint-4-documents/sprint 4.md`, usando como referencia principal o PDF `IARA_Games_Analise_DI_v3.pdf`. O caminho de Figma nao foi usado nesta entrega.

### Patches aplicados

1. **Estados de conta no header**
   - Paginas publicas em estado deslogado: Home, Loja e Cadastro.
   - Navegacao publica sem acesso direto a Biblioteca.
   - Header deslogado com acoes `Entrar` e `Criar conta`.
   - Perfil como experiencia logada, exibindo `Rafael Costa` no botao de conta.

2. **Refinos da Home apontados no PDF**
   - Hero com titulo orientado a valor, em vez de apenas nome da marca.
   - Remocao dos cards de feature que pareciam clicaveis sem acao.
   - Mascote renderizada como imagem com texto alternativo.
   - Indicador de scroll convertido em link funcional para os destaques.
   - Header com busca submetivel e comportamento sticky.

3. **Cards, CTAs e conteudo**
   - Cards de jogos com titulo clicavel.
   - Botao de carrinho explica a necessidade de conta antes de levar ao cadastro.
   - Avaliacoes ajustadas com contagem para reduzir aparencia de placeholder.
   - Secao interna de "Novas implementacoes" removida da Home.
   - CTA de criacao de conta movido para contexto de descoberta de jogos.
   - Secao de apoio revisada para nao sugerir metricas definitivas sem lastro.

4. **Ajustes visuais de suporte**
   - Tags com contraste reforcado.
   - Hover/focus nos cards de jogos.
   - Container do CTA de conta responsivo.
   - Busca do header com botao visualmente interativo.

### Correcoes finais

- Remocao do estado hardcoded `active` e `aria-current="page"` do link `Início` na Home, deixando o Scrollspy controlar o estado ativo.
- Manutencao do header como `sticky` tambem no mobile.
- Adicao de hover/focus para `.genre-card` e `.dev-card`.
- Variacao das contagens exibidas nos cards de genero para reduzir aparencia de placeholder.
- Remocao de CSS morto das classes `.panel-account`, `.account-card`, `.account-card-list` e `.account-btn-outline`, que nao sao usadas no codigo ativo.
- Atualizacao da documentacao para refletir a reducao do CSS para `cerca de 2000 linhas`.

### Decisoes de escopo

- A Home continua exibindo a secao de generos, mas ela nao aparece como item de navegacao para conta deslogada.
- A pagina `pages/perfil.html` foi mantida como simulacao estatica de usuario logado.
- As referencias das pastas `conta logada` e `conta nao logada` foram usadas apenas para orientar estado de conta, sem substituir a base atual do projeto.
