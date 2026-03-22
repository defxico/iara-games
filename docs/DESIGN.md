# Iara Games — Design System
## Sprint 1 · Março 2026

---

## Conceito Visual

A identidade visual da Iara Games é ancorada na **topografia fluvial** — os padrões, formas e fenômenos visuais das águas doces brasileiras. A escolha é conceitualmente precisa: a Iara do folclore brasileiro é uma entidade das águas doces, habitante de rios, lagos e igarapés. Sendo assim, as decisões gráficas dizem respeito ao comportamento das águas: seus movimentos, sua profundidade, a forma como a luz toca sua superfície.

A isso se soma a estética **synthwave** — não como ornamento, mas como posicionamento. O synth é a linguagem do futuro imaginado pelo passado: nos anos 80, era a visão tecnológica do que viria. Revisitá-la hoje é um gesto de trazer o clássico para o contemporâneo. Para a Iara, isso se traduz com precisão: o folclore é antigo, oral, profundo — e o synth é a linguagem que o projeta para frente, para o digital, para o tecnológico. É a Iara entrando no século XXI sem perder a raiz. O clássico e o tecnológico coexistindo numa mesma identidade.

### Decisões gráficas e suas origens

| Elemento | Origem | Manifestação visual |
|---|---|---|
| Linhas concêntricas do logo | Ripples — anéis de impacto na superfície da água | Paths progressivos, intensos nas bordas, claros ao centro |
| Ícones com contornos internos | Ripples em escala reduzida | Stroke principal + detalhe interno em opacidade menor |
| Overlays fluviais | Meandros, leito e ripples — padrões cartográficos de rios | Linhas sobrepostas dourado→ciano sobre fundos e fotografias |
| Seta circular | Vórtice — redemoinho de água | 4 círculos concêntricos com seta direcional |
| Formas do logo | Meandros — a sinuosidade do rio | Border-radius generoso, letras que fluem |
| Cor petróleo `#3C5D66` | Azul profundo das águas fundas | Fundos, ícones, identidade principal |
| Cor dourado `#BA9130` | Sol refletindo na superfície do rio | CTAs, elementos gráficos, wordmark |
| Neons `#DCB24C` e `#4DAFC2` | Estética synthwave | Estados de interação — hover e active |

---

## Logo System

O sistema de logo da Iara Games é composto pelo símbolo — as letras I·A·R·A construídas com contornos concêntricos — e pelo wordmark tipográfico. Juntos, formam a assinatura principal da marca.

### Logotipo
Combinação do símbolo com o wordmark. "IARA" em Sora Bold 700 com letter-spacing `.14em`, e "GAMES" em Sora Light 300 com letter-spacing `.40em`, separados por uma linha divisória vertical.

### Símbolo
As letras I·A·R·A sem o wordmark. Cada letra é construída com múltiplos paths concêntricos em stroke fino, com transição dourado→ciano. A luminosidade ao centro e a intensidade nas bordas remetem ao olhar de dentro da água para a superfície — a perspectiva da própria Iara.

### Ícone
Derivado da parte superior do I — a forma mais singular e reconhecível do sistema. Usado como favicon, app icon e em espaços reduzidos.

### Versões

| Versão | Fundo | Cores |
|---|---|---|
| Escura principal | `#192728` | Dourado → ciano |
| Clara | `#F2EFE8` | Petróleo → dourado |
| Dourada | `#BA9130` | Escuro → ciano |

### Restrições de uso
- Não distorcer ou redimensionar de forma não proporcional
- Não aplicar sobre fundos de tom intermediário que reduzam contraste
- Área de proteção mínima: espaço equivalente à altura da letra I em todos os lados
- Tamanho mínimo: 120px de altura para o logotipo completo · 32px para o ícone isolado

---

## Color System

A paleta foi construída com hierarquia do mais fundamental ao mais específico. Petróleo e dourado como primárias posicionam a Iara num território sofisticado e referenciado — o petróleo remete às águas fundas e escuras dos rios amazônicos, o dourado ao sol encostando na superfície. Os neons dourado e ciano conectam essa raiz à estética synthwave, ancorando a identidade no contemporâneo.

### Primárias
| Cor | Hex | Uso |
|---|---|---|
| Petróleo | `#3C5D66` | Logo, ícones, fundos, texto sobre claro |
| Dourado | `#BA9130` | Logo, ícones default, CTAs, elementos gráficos |

### Fundos
| Cor | Hex | Uso |
|---|---|---|
| Petróleo | `#3C5D66` | Fundo principal das páginas internas |
| Escuro profundo | `#192728` | Nav, elementos escuros, fundo alternativo |

### Texto e superfícies claras
| Cor | Hex |
|---|---|
| Areia claro | `#F2EFE8` |

### Texto e superfícies escuras
| Cor | Hex |
|---|---|
| Petróleo | `#3C5D66` |
| Escuro | `#192728` |

### Cores de feedback
| Cor | Hex | Uso |
|---|---|---|
| Verde | `#4E9E7A` | Sucesso, confirmação |
| Vermelho | `#C95B52` | Erro, alerta |

### Cores de destaque
| Cor | Hex |
|---|---|
| Dourado claro | `#C9A043` |
| Ciano suave | `#9FCFDC` |

### Cores de iluminação (neon)
Tons aplicados com efeito glow (iluminação difusa). Referência direta à estética synthwave — a luminosidade artificial que caracteriza o movimento e que, na Iara, também remete à luminescência das águas.

| Cor | Hex | Uso |
|---|---|---|
| Dourado neon | `#DCB24C` | Hover/active de elementos dourados |
| Ciano neon | `#4DAFC2` | Hover/active de ícones interativos |

---

## Tipografia

Sora para títulos e Inter para corpo de texto. Ambas disponíveis via Google Fonts.

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;600;700;800&family=Inter:wght@400&display=swap" rel="stylesheet">
```

| Estilo | Fonte | Tamanho | Line Height | Letter Spacing |
|---|---|---|---|---|
| H1 — títulos principais | Sora Extrabold 800 | 48px | 64px | 0% |
| H2 — subtítulos e nomes de jogos | Sora Bold 700 | 32px | 40px | -1% |
| H3 — título de cards e seções | Sora Semibold 600 | 24px | 32px | -1% |
| Body — texto de interface e botões | Inter Regular 400 | 16px | 24px | 0% |
| Texto pequeno — labels e informações secundárias | Inter Regular 400 | 14px | 20px | 0% |
| Botões CTA | Sora Semibold 600 | 16px | — | 0% |

---

## Sistema de Espaçamento

Escala baseada em múltiplos de 8px para garantir consistência entre elementos e layout.

`8px — 16px — 24px — 32px — 48px — 64px`

---

## Border Radius

Escala baseada em curvas suaves para reforçar a estética orgânica da interface. Em superfícies maiores, cantos assimétricos simulam a forma de uma gota — referência direta ao elemento água.

**Base:** 16px — raio padrão do sistema.

| Valor | Uso |
|---|---|
| `8px` | Tags, badges, chips |
| `12px` | Campos de formulário |
| `16px` | Cards — padrão base |
| `32px` | Containers, botões pill |
| `32px + 16px` assimétrico | Forma de gota |

---

## Background System

O background da plataforma é composto por camadas sobrepostas — fotografia, filtro de cor e elementos gráficos sintéticos — criando profundidade visual e reforçando a identidade da Iara Games. A composição varia entre a home e as páginas internas.

### Home

Utiliza fotografia de rio como base, com filtro em gradiente linear sobreposto e elementos gráficos em estilo synthwave que remetem às representações topográficas fluviais.

Composição em camadas, de baixo para cima:

1. Fotografia de rio — objeto fit cover
2. Filtro em gradiente linear — `#192728` no topo → `#3C5D66` na base
3. Overlays gráficos fluviais — meandros e ripples em dourado `#BA9130` e ciano `#9FCFDC`, opacidade baixa
4. Mascote Iara — posicionada à direita, emergindo das camadas anteriores

### Páginas internas

No header, a mesma fotografia de rio da home, com sobreposição de cor `#3C5D66` em baixa opacidade. Restante da página: fundo sólido `#3C5D66`.

---

## Superfícies

### Superfície d'água

Efeito aplicado em containers que precisam se destacar do fundo sem romper com ele. A translucidez cria a sensação de uma camada de água sobre o background — você enxerga através, mas com profundidade. Referência direta ao comportamento visual das águas fluviais: a superfície que separa dois mundos sem esconder nenhum dos dois.

```css
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.12);
border-radius: 16px;
```

---

## Elementos Diagramáticos

Derivados dos fenômenos da topografia fluvial. Todos os overlays são SVGs transparentes aplicados em camadas sobre fundos e fotografias.

### Formas base
Derivadas diretamente das letras do logo — os shapes do I, A, R e A. Usadas como máscaras de imagem e elementos de composição.

### Composições
Combinações das formas base em arranjos que criam ritmo visual e profundidade.

### Máscaras de imagens
As formas base aplicadas como máscaras sobre fotografias, criando coesão entre identidade e conteúdo visual.

### Overlays gráficos fluviais

| Overlay | Fenômeno | Uso |
|---|---|---|
| Meandros | Sinuosidade do rio vista de cima | Background home, seções principais |
| Leito do rio | Topografia do fundo — profundidade | Overlay sobre fotografias |
| Ripples | Dois focos de impacto simultâneos | Elemento decorativo em seções |
| Ondas | Superfície da água | Backgrounds e transições |

---

## Iconografia

### Ícones de navegação

Stroke fino (~1.3px contorno principal, ~0.7px detalhes internos). Sistema de 3 estados consistente em todos os ícones.

**Tamanhos:** 16px para nav bar principal · 32px para cards e seções de destaque.

**Sistema de estados:**

| Estado | Stroke principal | Detalhe interno | Efeito |
|---|---|---|---|
| Default | `#BA9130` | `#3C5D66` opacity 0.55 | — |
| Hover | `#BA9130` + glow | `#4DAFC2` | drop-shadow ciano sutil |
| Active | `#4DAFC2` | `#4DAFC2` | drop-shadow ciano total |

**Versão off-white** — para uso sobre fundo escuro:

| Estado | Stroke principal | Detalhe interno |
|---|---|---|
| Default | `#F2EFE8` | `#3C5D66` opacity 0.55 |
| Hover | `#F2EFE8` + glow | `#4DAFC2` |
| Active | `#4DAFC2` | `#4DAFC2` |

**Ícones disponíveis:** home · loja · biblioteca · fórum · suporte · sobre

### Ícones de sistema

**Avatar — usuário** (circular)

Dois estilos de placeholder:
- Ripple escuro — fundo `#192728`, linhas dourado→ciano
- Ripple claro — fundo `#F2EFE8`, linhas petróleo→dourado

**Avatar — desenvolvedor** (quadrado rx14px · 56px)

Letra inicial do estúdio em Sora Bold, com ripples concêntricos saindo da letra — como se ela tocasse a superfície da água.

| Variação | Fundo | Letra |
|---|---|---|
| Petróleo | `#3C5D66` | `#F2EFE8` |
| Dourado | `#BA9130` | `#192728` |
| Escuro | `#192728` | `#9FCFDC` |
| Ciano | `#4DAFC2` | `#192728` |

**Regra de forma:** círculo = usuário/pessoa · quadrado = estúdio/marca. A forma comunica o tipo de entidade sem necessidade de label adicional.

### Ícones de categoria de jogos

Ícones preenchidos para identificação visual de categorias em cards, filtros e seções da loja. Fundo petróleo `#3C5D66`, forma principal em `#F2EFE8`, detalhe em dourado `#BA9130`.

**Disponíveis:** aventura · cozy · ação · puzzle · RPG · esporte

---

## Botões

Regra geral: hover e active sempre usam cores neon com glow, independentemente do tipo de botão.

### Botões de CTA

Botões principais da interface. Usados em chamadas de ação como explorar, cadastrar e acessar. Border-radius 32px (pill). Fonte: Sora Semibold 16px.

Podem ser usados em ambas as cores primárias, `#3C5D66` ou `#BA9130`. No estado hover, a borda e/ou texto acende para o neon correspondente, `#DCB24C` ou `#4DAFC2`, respectivamente. No estado active, neon com glow.

| Tipo | Default | Hover | Active |
|---|---|---|---|
| Primário | Fundo `#BA9130` · texto `#F2EFE8` | Fundo `#DCB24C` · glow | Fundo `#DCB24C` · glow intenso |
| Secundário | Outline `#BA9130` · texto `#BA9130` | Borda `#DCB24C` · texto `#DCB24C` · glow | Glow intenso |

### Botões de ação

Ações rápidas associadas a cards e itens. Usadas para navegar entre seções e adicionar ao carrinho.

**Seta circular** — 4 círculos concêntricos com seta direcional. Deriva do conceito de vórtice fluvial — o redemoinho que a Iara usa para atrair. Disponível em ciano e dourado, com 3 estados cada.

**Carrinho de compras** — ação de compra nos cards de jogo.

### Indicador de scroll

Elemento visual que indica continuidade de conteúdo. Usado na home para guiar o usuário à próxima seção. As chevrons transitam de dourado `#BA9130` para ciano `#9FCFDC` com opacidade decrescente de cima para baixo. No hover, é acrescentado glow. Permite variação no número de chevrons e no tamanho geral do componente.

---

## Mascote — Iara

Sereia construída com linhas topográficas concêntricas que seguem o volume do corpo — técnica que conecta diretamente a identidade visual à topografia fluvial do conceito. Trabalhada em branco e escala de cinza, a figura ganha profundidade pela variação tonal das linhas sem depender de cor.

O sistema prevê múltiplas poses para diferentes contextos da interface — hero, onboarding, estados de espera, estados vazios e loading screen.

---

*Iara Games Design System · Sprint 1 · Março 2026*
