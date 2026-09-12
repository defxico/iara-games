# Iara Games

Plataforma de marketplace de jogos brasileiros independentes.
Projeto acadêmico desenvolvido na FIAP.

**Equipe**
Amanda Ayumi Guedes Ueno · Ana Rubia de Oliveira Freire · Francisco Caetano Bernardes · Giovana Camargo Budin · Mariana Costa Cruz Maciel

**Página publicada:** https://defxico.github.io/iara-games/

---

## Sprint 5 — Interatividade em Ação (JavaScript)

A Sprint 5 evoluiu o protótipo HTML/CSS da Sprint 4 adicionando comportamentos dinâmicos com
JavaScript puro, em um arquivo externo único: [`js/main.js`](./js/main.js). A documentação
completa (problema resolvido, implementação e capturas de antes/depois de cada funcionalidade)
está em [`docs/sprint-5-documentacao.html`](./docs/sprint-5-documentacao.html).

### Funcionalidades implementadas

1. **Filtro de jogos por gênero** ([`pages/loja.html`](./pages/loja.html)) — os chips de gênero
   agora filtram de verdade os cards exibidos, atualizam o contador de resultados e mostram uma
   mensagem quando nenhum jogo corresponde ao filtro.
2. **Validação de formulário em tempo real** ([`pages/cadastro.html`](./pages/cadastro.html)) —
   nome, e-mail, senha, confirmação de senha e estado são validados enquanto o usuário preenche,
   com mensagens de erro/confirmação inline; o envio mostra uma confirmação visual de sucesso.
3. **Feedback ao adicionar ao carrinho** ([`pages/loja.html`](./pages/loja.html)) — clicar no
   botão de carrinho (antes um link morto) agora mostra um toast explicando que é preciso criar
   conta para comprar, com link direto para o cadastro.

### Como testar

Abra a [página publicada](https://defxico.github.io/iara-games/) e:

- Na **Loja**, clique nos chips de gênero (Aventura, Ação, Cozy, Puzzle, RPG, Esporte) para ver a
  lista de jogos filtrar, e clique no ícone de carrinho de qualquer jogo para ver o toast de
  feedback.
- No **Cadastro**, preencha os campos com dados inválidos (e-mail sem `@`, senha curta, senhas
  diferentes) para ver a validação em tempo real, depois com dados válidos para ver a confirmação.

Localmente, basta servir a raiz do projeto com qualquer servidor estático (ex.: `python -m http.server`) e abrir `index.html` — não há build nem dependências além do CDN do Bootstrap.

---

## Conteúdo do Projeto

* Análise crítica de design de interação
* Aplicação das categorias de Alan Cooper
* Levantamento de problemas de usabilidade na Home
* Referências de mercado
* Redução de redundâncias no CSS e maior aproveitamento do Bootstrap
* Implementação de melhorias no HTML e CSS
* Protótipo funcional atualizado
* Repositório GitHub

---

## Proposta da Sprint 4

A Sprint 4 teve como objetivo analisar e melhorar a experiência de interação da página inicial da Iara Games, respondendo ao feedback recebido na Sprint 3:

> "Bom trabalho! O projeto apresenta excelente qualidade visual. O uso do Bootstrap foi bem aplicado em grids, componentes e navegação responsiva. Mas, como melhoria, o projeto poderia reduzir redundâncias no CSS e aproveitar mais os estilos nativos do framework para simplificar manutenção e escalabilidade do código."

A análise foi conduzida a partir das categorias de design de interação propostas por Alan Cooper, observando como o usuário navega pela interface, identifica ações, recebe feedback visual e compreende a proposta da plataforma. Em paralelo, a base de HTML e CSS foi simplificada para reduzir redundâncias, mantendo a identidade visual da Iara Games.

Em vez de avaliar apenas aspectos técnicos ou visuais, a sprint focou no comportamento real da interface sob a perspectiva de quem utiliza a página pela primeira vez.

---

## Página Analisada

### Home — `index.html`

Página principal da plataforma Iara Games.

Aspectos avaliados:

* Jornada do usuário por seção
* Carga cognitiva e excesso de elementos
* Inventário de botões, links e ícones
* Legibilidade, contraste e hierarquia visual
* Feedback de interação
* Clareza da proposta de valor
* Uso semântico de elementos visuais
* Acessibilidade básica

---

## Categorias de Análise — Alan Cooper

A análise foi organizada em cinco categorias principais:

### 01 · Rudeza

Foram identificados comportamentos da interface que interrompiam ou confundiam o usuário.

Problemas encontrados:

* Carrinho bloqueado sem explicação para usuários não logados
* CTA de criação de conta genérico e fora de contexto
* Seção de novidades redundante e pouco conectada ao fluxo principal

Melhorias implementadas:

* Tooltip no carrinho informando a necessidade de criar conta para comprar
* CTA contextual inline no fluxo de compra
* Remoção da seção "Novidades" para reduzir ruído visual e funcional

---

### 02 · Raciocínio Computacional

Foram avaliados pontos em que a interface exigia que o usuário entendesse o funcionamento interno do sistema para conseguir navegar.

Problemas encontrados:

* Navegação sem indicação clara da posição atual na página
* Menu com excesso de itens
* Estado ativo do menu definido manualmente no HTML

Melhorias implementadas:

* Scrollspy do Bootstrap 5 para destacar automaticamente o item ativo
* Remoção de classes `active` hardcoded
* Redução do menu para 4 itens principais
* Header mais limpo, mantendo apenas ações relevantes para o usuário anônimo

Menu final:

* Início
* Loja
* Criadores
* Sobre

---

### 03 · Hábitos Desleixados

Foram analisados padrões que pareciam herdados de outros sistemas, mas que não ofereciam feedback suficiente ao usuário.

Problemas encontrados:

* Cards de jogo sem feedback visual de interação
* Cards clicáveis sem indicação clara
* Avaliações idênticas em todos os jogos, reduzindo credibilidade

Melhorias implementadas:

* Hover e focus visível em todos os tipos de cards
* Feedback visual para elementos clicáveis
* Notas variadas nos jogos
* Contagem realista de avaliações
* Uso de badges Bootstrap para exibir avaliações

---

### 04 · Trabalho Manual

Foram identificadas interações que exigiam esforço desnecessário do usuário.

Problemas encontrados:

* Área clicável dos cards restrita apenas ao texto
* Campo de busca sem botão explícito de submissão
* Usuário precisava adivinhar que deveria pressionar Enter para buscar

Melhorias implementadas:

* Uso de `stretched-link` nos cards de jogo
* Toda a área do card passou a funcionar como alvo de clique
* Campo de busca com botão de submit visível
* Header sticky em mobile para facilitar navegação

---

### 05 · Estética Desatualizada

Foram revisados elementos visuais que prejudicavam a percepção de modernidade, clareza ou acessibilidade da interface.

Problemas encontrados:

* Tags de jogos exibidas como texto simples
* Mascote aplicado como `background-image`, sem valor semântico
* Ausência de texto alternativo no mascote
* H1 genérico sem proposta de valor clara

Melhorias implementadas:

* Tags convertidas em badges Bootstrap
* Mascote implementado como tag `<img>` semântica
* Inclusão de `alt text` completo no mascote
* H1 atualizado com proposta de valor clara
* Scroll indicator convertido em link funcional com `aria-label`

---

## Referências de Mercado

A análise utilizou três plataformas como referência comparativa:

### itch.io

Referência principal para marketplace indie.

Pontos observados:

* Proposta de valor clara desde o primeiro acesso
* Cards de jogos inteiramente clicáveis
* Login e cadastro solicitados apenas quando necessários
* Interface limpa, com hierarquia visual objetiva

### Steam

Referência de padrões consolidados de interação.

Pontos observados:

* Header sticky em toda a navegação
* Busca com botão clicável e autocomplete
* Estados de login e não-login bem separados
* Avaliações com escala explícita
* Carrinho sem redirecionamento antes do checkout

### GOG.com

Referência de identidade visual e curadoria.

Pontos observados:

* Proposta de valor direta
* Identidade visual consistente
* Comunidade posicionada após o catálogo principal
* Dados do catálogo consistentes
* Ausência de placeholders visíveis

---

## Redução de Redundâncias no CSS

Além da análise de interação, a entrega desta sprint também respondeu diretamente ao ponto de melhoria apontado na Sprint 3, simplificando a estrutura de HTML e CSS:

- Reescrita do arquivo [`css/style.css`](./css/style.css) com foco apenas nos componentes realmente usados nas páginas atuais.
- Remoção de reimplementações desnecessárias de estruturas que o Bootstrap já fornece, como base de botões, formulários, cards, progress bars e grupos de input.
- Consolidação de estilos compartilhados de header, footer, cards, painéis e formulários.
- Redução do tamanho do stylesheet principal de aproximadamente **3390 linhas para cerca de 2000 linhas**.

Componentes nativos do Bootstrap priorizados, com overrides leves de marca:

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

### Refino das páginas

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

## Entregas Técnicas — Sprint 4

**Análise de interação documentada**
A Home foi analisada com base nas categorias de Alan Cooper, identificando problemas concretos de usabilidade, clareza e feedback.

**Melhorias implementadas no HTML e CSS**
As correções foram aplicadas diretamente no código da página inicial.

**Uso ampliado do Bootstrap 5.3.3**
Foram utilizados recursos nativos do framework para reduzir soluções manuais e melhorar manutenção.

Componentes e recursos aplicados:

* Scrollspy
* Tooltip
* Badge
* Stretched-link
* Header sticky
* Botão de submit em busca
* Estados de hover e focus

**Melhoria de acessibilidade**
Elementos visuais importantes foram convertidos para estruturas semânticas, com uso de `alt text`, `aria-label` e navegação mais clara.

**Redução de carga cognitiva**
O menu foi simplificado, elementos redundantes foram removidos e ações principais ficaram mais claras.

**Protótipo atualizado**
As implementações da Sprint 4 estão disponíveis no repositório público do projeto.

---

## Resumo das Implementações

| Categoria                | Implementações                                                                   |
| ------------------------ | -------------------------------------------------------------------------------- |
| Rudeza                   | Tooltip no carrinho, CTA contextual inline e remoção da seção Novidades          |
| Raciocínio Computacional | Scrollspy ativo, menu reduzido para 4 itens e remoção de `active` hardcoded      |
| Hábitos Desleixados      | Hover/focus em todos os cards, ratings variados e badge Bootstrap                |
| Trabalho Manual          | `stretched-link` nos cards, busca com botão submit e header sticky mobile        |
| Estética Desatualizada   | Tags como badges, mascote como `<img>` com `alt text` e H1 com proposta de valor |

---

## Páginas do Projeto

- Home: [`index.html`](./index.html)
- Loja: [`pages/loja.html`](./pages/loja.html)
- Cadastro: [`pages/cadastro.html`](./pages/cadastro.html)
- Perfil: [`pages/perfil.html`](./pages/perfil.html)

---

## Tecnologias Utilizadas

* HTML5
* CSS3
* Bootstrap 5.3.3
* JavaScript
* Google Fonts: Sora e Inter

---

## Repositório

```text
https://github.com/defxico/iara-games
```

---

## Sprint 4 - Redesign de Interação

### Fonte da implementação

Esta etapa executa o caminho HTML/CSS definido em `auxiliary-documents/sprint-4-documents/sprint 4.md`, usando como referência principal o PDF `IARA_Games_Analise_DI_v3.pdf`. O caminho de Figma não foi usado nesta entrega.

### Patches aplicados

1. **Estados de conta no header**
   - Páginas públicas em estado deslogado: Home, Loja e Cadastro.
   - Navegação pública sem acesso direto à Biblioteca.
   - Header deslogado com ações `Entrar` e `Criar conta`.
   - Perfil como experiência logada, exibindo `Rafael Costa` no botão de conta.

2. **Refinos da Home apontados no PDF**
   - Hero com título orientado a valor, em vez de apenas nome da marca.
   - Remoção dos cards de feature que pareciam clicáveis sem ação.
   - Mascote renderizada como imagem com texto alternativo.
   - Indicador de scroll convertido em link funcional para os destaques.
   - Header com busca submetível e comportamento sticky.

3. **Cards, CTAs e conteúdo**
   - Cards de jogos com título clicável.
   - Botão de carrinho explica a necessidade de conta antes de levar ao cadastro.
   - Avaliações ajustadas com contagem para reduzir aparência de placeholder.
   - Seção interna de "Novas implementações" removida da Home.
   - CTA de criação de conta movido para contexto de descoberta de jogos.
   - Seção de apoio revisada para não sugerir métricas definitivas sem lastro.

4. **Ajustes visuais de suporte**
   - Tags com contraste reforçado.
   - Hover/focus nos cards de jogos.
   - Container do CTA de conta responsivo.
   - Busca do header com botão visualmente interativo.

### Correções finais

- Remoção do estado hardcoded `active` e `aria-current="page"` do link `Início` na Home, deixando o Scrollspy controlar o estado ativo.
- Manutenção do header como `sticky` também no mobile.
- Adição de hover/focus para `.genre-card` e `.dev-card`.
- Variação das contagens exibidas nos cards de gênero para reduzir aparência de placeholder.
- Remoção de CSS morto das classes `.panel-account`, `.account-card`, `.account-card-list` e `.account-btn-outline`, que não são usadas no código ativo.
- Atualização da documentação para refletir a redução do CSS para `cerca de 2000 linhas`.

### Decisões de escopo

- A Home continua exibindo a seção de gêneros, mas ela não aparece como item de navegação para conta deslogada.
- A página `pages/perfil.html` foi mantida como simulação estática de usuário logado.
- As referências das pastas `conta logada` e `conta não logada` foram usadas apenas para orientar estado de conta, sem substituir a base atual do projeto.
