# Projeto - Iara Games - Sprint 2

**Integrantes do Projeto**
Francisco Caetano Bernardes
Mariana Costa Cruz Maciel
Giovana Camargo Budin
Amanda Ayumi Guedes Ueno

## 1. Contexto da Sprint

Na Sprint 02, o projeto Iara Games evoluiu da etapa inicial de identidade e home para uma versão mais estruturada, com foco em legibilidade, tangibilidade e direcionamento claro ao usuário real.

O trabalho foi dividido entre frentes paralelas de pesquisa, estratégia e interface, resultando em um conjunto integrado de entregas acadêmicas e de produto:

- persona validada com dados reais de pesquisa
- documento ESG alinhado ao posicionamento da marca
- revisão visual de UI (logo, ícones e mascote)
- nova página de perfil do usuário
- formulário de cadastro funcional sem back-end
- estruturação com HTML semântico e CSS Grid responsivo

**Tema central da sprint**
Melhorar o que já existia visualmente e começar a definir, com base em dados, para quem a plataforma existe e por quê.

## 2. Design Thinking

O processo foi conduzido com base em Design Thinking, conectando pesquisa, definição de problema, ideação, prototipação e reflexão.

### Etapas mapeadas

- **Empatia:** questionário com 38 respondentes em 5 blocos temáticos.
- **Definição:** descarte da proto-persona da Sprint 01 e formulação de problema focado em visibilidade e descoberta.
- **Ideação:** documentação das decisões de produto para persona, ESG e UI.
- **Prototipação:** criação/atualização dos artefatos visuais e páginas da plataforma.
- **Reflexão:** registro de aprendizados e ajuste de direção com base em evidência.

## 3. ESG — Responsabilidade e Propósito

A Iara Games se posiciona como plataforma cultural brasileira e estrutura seus compromissos ESG como parte da identidade, não como apêndice institucional.

### Ambiental

Compromisso com preservação de biomas, bacias hidrográficas e fauna nativa ligada ao imaginário dos jogos publicados.

### Social

Compromisso com formação de novos criadores via iniciativas de educação e oficinas em fases futuras, com apoio de estúdios parceiros.

### Governança

Curadoria não neutra, transparência de critérios e prestação de contas progressiva à comunidade.

## 4. Persona — Rafael Melo

### 4.1 Base da pesquisa

A Sprint 02 substituiu a proto-persona hipotética por uma persona compradora validada com dados reais.

- formulário aplicado: https://iara-pesquisa.netlify.app
- respostas válidas: 38
- foco da pesquisa: perfil, hábitos, relação com jogos brasileiros e receptividade à plataforma

### 4.2 Perfil consolidado

Rafael Melo, 29 anos, São Paulo, analista de marketing.

- frequência: joga quase todos os dias
- gasto mensal: faixa de R$50-R$100
- plataformas: PC/notebook, console e mobile

### 4.3 Dores e objetivos

**Dores**

- cena brasileira pouco visível nas vitrines que ele já usa
- falta de curadoria confiável
- ausência de comunidade dedicada
- não sabe por onde começar no indie nacional

**Objetivos com a Iara**

- ter um ponto de entrada confiável
- confiar em curadoria com critério
- pertencer a uma comunidade com identidade cultural
- apoiar devs nacionais como consequência da boa experiência

### 4.4 Jornada e oportunidades

Foi mapeada jornada em 5 fases: descoberta, consideração, decisão, uso e retenção.

As hipóteses priorizadas na sprint focam:

- vitrine editorial curada
- avaliações verificadas pela comunidade
- entrada personalizada (onboarding)
- perfil público e comunidade por jogo/estúdio
- página de estúdio com bastidores e aproximação entre jogador e dev

## 5. Atualizações de UI

### 5.1 Logo

Revisão de contraste e peso de stroke com base em acessibilidade (WCAG 2.1), incluindo variações para fundos escuros, claros e versão areia.

### 5.2 Ícones e componentes

- setas de navegação com preenchimento (mais contraste)
- indicador de scroll com maior visibilidade no hero
- revisão de estados de ícones (default, hover, active)

### 5.3 Mascote Iara

Refinamento da avatar/mascote para maior coesão com o sistema visual:

- paleta alinhada às cores oficiais
- traço compatível com a linguagem dos ícones
- integração com overlays de topografia fluvial

### 5.4 Tela de perfil

Criação da segunda página da plataforma (além da home), conectada ao fluxo de cadastro e orientada por personalização:

- identificação do usuário
- biblioteca e histórico
- preferências e descoberta
- participação em comunidade

## 6. Formulários

Formulário de cadastro sem back-end, organizado em 4 blocos:

1. **Dados de acesso:** nome completo, nome de usuário, e-mail, senha e confirmação.
2. **Contexto de jogo:** cidade, estado e objetivo de uso da plataforma.
3. **Preferências iniciais:** gêneros e plataformas.
4. **Consentimentos:** aceite obrigatório de termos e opção de novidades.

Ações previstas no fluxo:

- cancelar
- criar conta
- link para quem já possui conta

## 7. HTML Semântico e Grid

As três páginas da Sprint 02 estão estruturadas com base em HTML5 semântico e organização visual em CSS Grid:

- [index.html](index.html)
- [pages/cadastro.html](pages/cadastro.html)
- [pages/perfil.html](pages/perfil.html)

### Estrutura semântica aplicada

Uso consistente de:

- `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`
- `form`, `fieldset`, `legend`
- hierarquia de headings sem saltos
- atributos de acessibilidade (`aria-labelledby`, `aria-label`, `aria-current`, `role="search"` etc.)

### Grid e responsividade

Layouts principais organizados por Grid em home, cadastro e perfil, com colapso responsivo via breakpoints de 900px e 640px.

## 8. Repositório GitHub e Vídeo-pitch

**Repositório público**

https://github.com/defxico/iara-games.git

**Vídeo-pitch Sprint 02**

https://videopitch-iara.netlify.app

## 9. Tecnologias utilizadas

- HTML5
- CSS3
- Google Fonts (Sora e Inter)

## 10. Resultado da Sprint 02

A Sprint 02 consolidou a Iara Games como uma versão mais madura da plataforma, com evolução clara de interface, foco em usuário validado por pesquisa, critérios de ESG conectados ao produto e estrutura técnica alinhada ao escopo acadêmico da entrega.
