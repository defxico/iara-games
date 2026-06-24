# Iara Games - Sprint 04

Redesign de interação da plataforma de marketplace de jogos brasileiros independentes.
Projeto acadêmico desenvolvido na FIAP — Sprint 04 · Junho de 2026.

**Equipe**
Amanda Ayumi Guedes Ueno · Francisco Caetano Bernardes · Giovana Camargo Budin · Mariana Costa Cruz Maciel

---

## Conteúdo do Projeto

* Análise crítica de design de interação
* Aplicação das categorias de Alan Cooper
* Levantamento de problemas de usabilidade na Home
* Referências de mercado
* Implementação de melhorias no HTML e CSS
* Protótipo funcional atualizado
* Repositório GitHub

---

## Proposta da Sprint 4

A Sprint 4 teve como objetivo analisar e melhorar a experiência de interação da página inicial da Iara Games.

A análise foi conduzida a partir das categorias de design de interação propostas por Alan Cooper, observando como o usuário navega pela interface, identifica ações, recebe feedback visual e compreende a proposta da plataforma.

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

## Tecnologias Utilizadas

* HTML5
* CSS3
* Bootstrap 5.3.3
* JavaScript
* Google Fonts
* Sora
* Inter

---

## Repositório

```text
https://github.com/defxico/iara-games
```

---
