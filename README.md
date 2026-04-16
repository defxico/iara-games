# Iara Games — Sprint 02

**Integrantes do Projeto**  
Francisco Caetano Bernardes  
Mariana Costa Cruz Maciel  
Giovana Camargo Budin  
Amanda Ayumi Guedes Ueno

## 1. Contexto e proposta

A Iara Games e uma plataforma curadora focada exclusivamente em jogos independentes brasileiros. A proposta do projeto e resolver um problema recorrente do mercado: a baixa visibilidade de estudios nacionais em ambientes globais saturados, onde a descoberta depende mais de volume e algoritmo do que de curadoria contextualizada.

Inspirada na Iara do folclore brasileiro, a plataforma assume um papel ativo de revelacao. Em vez de apenas listar jogos, ela apresenta, conecta e valoriza criadores, obras e referencias culturais do Brasil.

Frase-base do projeto:

> Iara Games: Jogue o Brasil. Descubra o nosso ecossistema.

## 2. Evolucao da Sprint 01 para a Sprint 02

Na Sprint 01, a equipe definiu a visao inicial da plataforma e construiu a home com a identidade visual do projeto. Na Sprint 02, a evolucao foi estrutural e centrada no usuario:

- ampliacao da plataforma com novas areas internas
- criacao de formulario de cadastro sem back-end
- criacao de pagina de perfil do usuario
- reforco de HTML semantico e organizacao com CSS Grid
- aprofundamento das decisoes de UX, UI e Design Thinking
- consolidacao de README com persona, ESG e justificativas da sprint

## 3. Persona principal

### Rafael Melo

Rafael Melo tem 29 anos, mora em Sao Paulo e trabalha como analista de marketing. Ele joga com frequencia no PS5, notebook e mobile, acompanha a cena indie, mas sente falta de um ponto de entrada confiavel para descobrir jogos brasileiros com criterio.

#### Objetivos

- encontrar jogos brasileiros sem precisar garimpar sozinho
- confiar em uma curadoria visivel e consistente
- sentir pertencimento em uma comunidade que valoriza cultura e criatividade nacional
- apoiar desenvolvedores brasileiros como consequencia de uma boa experiencia

#### Dores e frustracoes

- a cena existe, mas e pouco visivel nas plataformas em que ele ja joga
- falta um ambiente dedicado a jogos brasileiros com organizacao clara
- a descoberta depende de recomendacoes dispersas e pouco confiaveis
- ha pouco espaco para trocar experiencias sobre producao nacional

#### Como a Sprint 02 responde a essa persona

- a pagina de perfil organiza preferencias, biblioteca e historico de descoberta
- o formulario de cadastro cria um primeiro passo de personalizacao
- a home passa a apontar para areas de conta e relacionamento com a plataforma
- a curadoria continua sendo o centro da experiencia, com foco em pertencimento e confianca

## 4. Estrutura e layout

O projeto foi desenvolvido em HTML5 e CSS3, preservando a proposta estatica exigida pela sprint. A estrutura da interface foi refinada com elementos semanticos e organizacao em grids.

### Estrutura semantica aplicada

- uso de `header`, `nav`, `main`, `section`, `aside`, `article`, `form` e `footer`
- agrupamento de campos com `fieldset` e `legend` no cadastro
- uso de listas e secoes para conteudos repetitivos e blocos de interface
- hierarquia clara de titulos para facilitar leitura e navegacao

### Organizacao com grids

- hero da home em duas colunas
- grids para jogos, generos, criadores e nova area de conta
- pagina de perfil com grade principal entre conteudo e contexto lateral
- formulario de cadastro em layout de duas colunas com agrupamento por contexto
- adaptacao responsiva para tablet e mobile com empilhamento progressivo

## 5. Paginas desenvolvidas

### Home

A home segue como principal entrada da plataforma e agora reforca a evolucao da Sprint 02 ao apresentar caminhos para cadastro e perfil.

### Cadastro

Foi criado um formulario de cadastro sem back-end, com foco em:

- labels visiveis
- campos essenciais para conta e contexto do usuario
- preferencias iniciais de genero e plataforma
- consentimentos claros
- preparacao para futuras integracoes tecnicas

### Perfil do usuario

Foi criada uma pagina de perfil demonstrativa que apresenta:

- resumo do usuario
- estatisticas da conta
- biblioteca e jogos favoritos
- atividade recente
- recomendacoes de jogos nacionais
- contexto de preferencia e valor da curadoria

## 6. Decisoes de UX e UI

As decisoes de UX e UI foram tomadas para reduzir friccao, organizar a descoberta e reforcar a identidade da plataforma.

### UX

- reconhecimento imediato do usuario no topo da pagina de perfil
- separacao entre identidade, preferencias, biblioteca e atividade para reduzir carga cognitiva
- formulario dividido por contexto para facilitar preenchimento
- uso de microcopy curta e objetiva
- foco em confianca e clareza, evitando excesso visual e ambiguidades

### UI

- manutencao da identidade fluvial e synthwave definida no design system
- uso de superficies translucidas como referencia a agua
- tipografia Sora para titulos e Inter para corpo de texto
- destaque visual em dourado e ciano para acoes importantes
- continuidade visual entre home e paginas internas

### Acessibilidade

- contraste adequado entre texto e fundo
- um `h1` principal por pagina
- foco visivel em links, botoes e campos
- `alt` informativo apenas quando necessario
- labels permanentes nos campos de formulario
- estrutura semantica favoravel a tecnologias assistivas

## 7. ESG e relacao com o projeto

Os valores ESG fazem parte do posicionamento conceitual da Iara Games e orientam o projeto desde a origem.

### Ambiental

A identidade da Iara nasce das aguas brasileiras e, por isso, o projeto assume como horizonte apoiar iniciativas ligadas a biomas, bacias hidrograficas e fauna nativa que tambem inspiram o universo dos jogos publicados.

### Social

A plataforma busca fortalecer a economia criativa nacional e, em fases futuras, pretende apoiar a formacao de novos criadores por meio de oficinas e aproximacao com estudios parceiros.

### Governanca

A curadoria da Iara Games nao e neutra: ela favorece explicitamente a producao nacional. Por isso, transparencia de criterios, comunicacao clara e compromisso com a comunidade fazem parte da governanca esperada da plataforma.

## 8. Tecnologias utilizadas

- HTML5
- CSS3
- Google Fonts para tipografia da interface

## 9. Estrutura de arquivos relevantes

- `index.html`
- `pages/cadastro.html`
- `pages/perfil.html`
- `css/style.css`
- `docs/design.md`

## 10. Repositorio

Repositorio publico do projeto:

https://github.com/defxico/iara-games/

## 11. Resultado esperado da Sprint 02

Ao final desta sprint, a Iara Games passa a se apresentar como uma plataforma mais madura, com foco mais claro no usuario, formularios melhor organizados, areas internas coerentes com a proposta do produto e uma evolucao visual e estrutural perceptivel em relacao a Sprint 01.
