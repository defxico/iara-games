import React from 'react';

export default function Home() {
  return (
<main>
    <section className="hero" id="inicio" aria-labelledby="hero-titulo">
      <div className="hero-content">
        <div className="hero-copy">
          <h1 id="hero-titulo">Jogos brasileiros independentes</h1>
          <p>
            Descubra, acompanhe e apoie estúdios nacionais em uma vitrine feita
            para a cena brasileira.
          </p>
          <div className="hero-actions">
            <a href="./pages/loja.html" className="btn btn-primary">Mergulhar na loja</a>
            <a href="#forum" className="btn btn-outline-light">Conhecer criadores</a>
          </div>
        </div>
        <div className="hero-visual">
          <img src="./assets/img/iara-avatar-header-gold.png" alt="Iara, mascote da plataforma inspirada no folclore brasileiro das águas" className="hero-avatar-img" />
        </div>
      </div>
      <div className="hero-scroll">
        <p>Mergulhe nos destaques</p>
        <a href="#loja" className="scroll-indicator" aria-label="Ver jogos em destaque">
          <img src="./assets/img/accessibility-update/indicador scroll.svg" alt="" aria-hidden="true" />
        </a>
      </div>
    </section>
    <section className="section" id="loja" aria-labelledby="loja-titulo">
      <div className="container panel panel-games">
        <div className="section-heading">
          <div>
            <span className="eyebrow eyebrow-highlight">
              <img src="./assets/img/flame.svg" alt="" aria-hidden="true" />
              <span>Em destaque</span>
            </span>
            <h2 id="loja-titulo">Jogos da Semana</h2>
            <p>
              Uma seleção curada de títulos brasileiros independentes para começar sua
              jornada pela Iara Games.
            </p>
          </div>
          <a href="./pages/loja.html" className="section-link">Ver todos</a>
        </div>
        <div className="games-grid row g-4">
          <div className="col-12 col-md-6 col-xl-3">
            <article className="card game-card h-100">
              <div className="game-image game-veu">
                <span className="badge rating" aria-label="Avaliação: 4,8 de 5 - 127 avaliações">★ 4,8 <small>(127)</small></span>
              </div>
              <div className="card-body game-info">
                <div className="tags">
                  <span className="badge rounded-pill">Aventura</span>
                  <span className="badge rounded-pill">Puzzle</span>
                </div>
                <h3><a href="./pages/loja.html" className="stretched-link">Véu de Chuva</a></h3>
                <p>Mangue Studio</p>
                <div className="game-bottom">
                  <strong>R$ 18,90</strong>
                  <a href="./pages/cadastro.html" className="btn btn-primary game-action" aria-label="Criar conta para adicionar Véu de Chuva" data-bs-toggle="tooltip" data-bs-placement="top" title="Crie uma conta para comprar">
                    <img src="./assets/img/shopping-cart.svg" alt="" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <article className="card game-card h-100">
              <div className="game-image game-boto">
                <span className="badge rating" aria-label="Avaliação: 4,3 de 5 - 84 avaliações">★ 4,3 <small>(84)</small></span>
              </div>
              <div className="card-body game-info">
                <div className="tags">
                  <span className="badge rounded-pill">Ação</span>
                  <span className="badge rounded-pill">Folclore</span>
                </div>
                <h3><a href="./pages/loja.html" className="stretched-link">O Chamado do Boto</a></h3>
                <p>Igarapé Games</p>
                <div className="game-bottom">
                  <strong>R$ 24,90</strong>
                  <a href="./pages/cadastro.html" className="btn btn-primary game-action" aria-label="Criar conta para adicionar O Chamado do Boto" data-bs-toggle="tooltip" data-bs-placement="top" title="Crie uma conta para comprar">
                    <img src="./assets/img/shopping-cart.svg" alt="" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <article className="card game-card h-100">
              <div className="game-image game-quilombo">
                <span className="badge rating" aria-label="Avaliação: 4,6 de 5 - 96 avaliações">★ 4,6 <small>(96)</small></span>
              </div>
              <div className="card-body game-info">
                <div className="tags">
                  <span className="badge rounded-pill">Estratégia</span>
                  <span className="badge rounded-pill">Histórico</span>
                </div>
                <h3><a href="./pages/loja.html" className="stretched-link">Quilombo Quest</a></h3>
                <p>Terra Firme Dev</p>
                <div className="game-bottom">
                  <strong>R$ 31,90</strong>
                  <a href="./pages/cadastro.html" className="btn btn-primary game-action" aria-label="Criar conta para adicionar Quilombo Quest" data-bs-toggle="tooltip" data-bs-placement="top" title="Crie uma conta para comprar">
                    <img src="./assets/img/shopping-cart.svg" alt="" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <article className="card game-card h-100">
              <div className="game-image game-sertao">
                <span className="badge rating" aria-label="Avaliação: 3,9 de 5 - 41 avaliações">★ 3,9 <small>(41)</small></span>
              </div>
              <div className="card-body game-info">
                <div className="tags">
                  <span className="badge rounded-pill">Narrativa</span>
                  <span className="badge rounded-pill">Mistério</span>
                </div>
                <h3><a href="./pages/loja.html" className="stretched-link">Sertão Noir</a></h3>
                <p>Caatinga Interactive</p>
                <div className="game-bottom">
                  <strong>R$ 21,90</strong>
                  <a href="./pages/cadastro.html" className="btn btn-primary game-action" aria-label="Criar conta para adicionar Sertão Noir" data-bs-toggle="tooltip" data-bs-placement="top" title="Crie uma conta para comprar">
                    <img src="./assets/img/shopping-cart.svg" alt="" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div className="account-inline-cta">
          <p>Crie sua conta para salvar favoritos e acompanhar lançamentos nacionais.</p>
          <a href="./pages/cadastro.html" className="btn btn-outline-light">Criar conta</a>
        </div>
      </div>
    </section>
    <section className="section" id="biblioteca" aria-labelledby="biblioteca-titulo">
      <div className="container panel-genres">
        <svg className="panel-genres-wave" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path className="wave-fill" d="M0 120 L0 72 C40 56 72 30 120 30 C170 30 210 88 260 106 C310 124 350 58 400 34 C450 10 500 86 550 112 C600 138 650 60 700 34 C750 8 800 84 850 110 C900 136 950 66 1000 38 C1052 10 1096 34 1140 52 C1166 62 1186 68 1200 72 L1200 120 Z" />
          <path className="wave-line" d="M0 72 C40 56 72 30 120 30 C170 30 210 88 260 106 C310 124 350 58 400 34 C450 10 500 86 550 112 C600 138 650 60 700 34 C750 8 800 84 850 110 C900 136 950 66 1000 38 C1052 10 1096 34 1140 52 C1166 62 1186 68 1200 72" />
        </svg>
        <div className="panel-genres-body">
          <div className="section-heading section-heading-simple">
            <div>
              <span className="eyebrow eyebrow-explore">
                <img src="./assets/img/trending-up.svg" alt="" aria-hidden="true" />
                <span>Descoberta</span>
              </span>
              <h2 id="biblioteca-titulo">Navegar por Gênero</h2>
              <p>Explore gêneros e caminhos de descoberta dentro do catálogo inicial.</p>
            </div>
          </div>
          <div className="genres-grid row g-4">
            <div className="col-12 col-md-6 col-xl-3">
              <a href="./pages/loja.html?genero=aventura" className="card genre-card">
                <img src="./assets/img/categoria-aventura.svg" alt="" aria-hidden="true" className="genre-icon-img" />
                <strong>Aventura</strong>
                <small>31 jogos</small>
              </a>
            </div>
            <div className="col-12 col-md-6 col-xl-3">
              <a href="./pages/loja.html?genero=acao" className="card genre-card">
                <img src="./assets/img/categoria-acao.svg" alt="" aria-hidden="true" className="genre-icon-img" />
                <strong>Ação</strong>
                <small>24 jogos</small>
              </a>
            </div>
            <div className="col-12 col-md-6 col-xl-3">
              <a href="./pages/loja.html?genero=cozy" className="card genre-card">
                <img src="./assets/img/categoria-cozy.svg" alt="" aria-hidden="true" className="genre-icon-img" />
                <strong>Cozy</strong>
                <small>18 jogos</small>
              </a>
            </div>
            <div className="col-12 col-md-6 col-xl-3">
              <a href="./pages/loja.html?genero=puzzle" className="card genre-card">
                <img src="./assets/img/categoria-puzzle.svg" alt="" aria-hidden="true" className="genre-icon-img" />
                <strong>Puzzle</strong>
                <small>27 jogos</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section" id="forum" aria-labelledby="forum-titulo">
      <div className="container panel panel-devs">
        <div className="section-heading section-heading-simple">
          <div>
            <span className="eyebrow eyebrow-community"><img src="./assets/img/users.svg" alt="" aria-hidden="true" />
              <span>Comunidade</span></span>
            <h2 id="forum-titulo">Criadores em Destaque</h2>
            <p>Estúdios e desenvolvedores que ajudam a revelar a força do cenário brasileiro.</p>
          </div>
        </div>
        <div className="devs-grid row g-4">
          <div className="col-12 col-md-6 col-xl-3">
            <article className="card dev-card h-100">
              <div className="dev-avatar-image">
                <img src="./assets/img/avatar-dev 1.svg" alt="" aria-hidden="true" />
              </div>
              <h3>Tupiniquim Studios</h3>
              <p><span aria-hidden="true">📍</span> Recife, PE</p>
              <div className="dev-stats">
                <div><strong>3</strong><span>Jogos</span></div>
                <div><strong>1.2k</strong><span>Seguidores</span></div>
              </div>
              <span className="btn btn-outline-light w-100" aria-label="Perfil de Tupiniquim Studios em breve">Perfil em breve</span>
            </article>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <article className="card dev-card h-100">
              <div className="dev-avatar-image">
                <img src="./assets/img/avatar-dev 2.svg" alt="" aria-hidden="true" />
              </div>
              <h3>Folclore Digital</h3>
              <p><span aria-hidden="true">📍</span> Salvador, BA</p>
              <div className="dev-stats">
                <div><strong>2</strong><span>Jogos</span></div>
                <div><strong>890</strong><span>Seguidores</span></div>
              </div>
              <span className="btn btn-outline-light w-100" aria-label="Perfil de Folclore Digital em breve">Perfil em breve</span>
            </article>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <article className="card dev-card h-100">
              <div className="dev-avatar-image">
                <img src="./assets/img/avatar-dev 3.svg" alt="" aria-hidden="true" />
              </div>
              <h3>Sertão Games</h3>
              <p><span aria-hidden="true">📍</span> Fortaleza, CE</p>
              <div className="dev-stats">
                <div><strong>4</strong><span>Jogos</span></div>
                <div><strong>2.1k</strong><span>Seguidores</span></div>
              </div>
              <span className="btn btn-outline-light w-100" aria-label="Perfil de Sertão Games em breve">Perfil em breve</span>
            </article>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <article className="card dev-card h-100">
              <div className="dev-avatar-image">
                <img src="./assets/img/avatar-dev 4.svg" alt="" aria-hidden="true" />
              </div>
              <h3>EcoPlay</h3>
              <p><span aria-hidden="true">📍</span> Cuiabá, MT</p>
              <div className="dev-stats">
                <div><strong>1</strong><span>Jogos</span></div>
                <div><strong>450</strong><span>Seguidores</span></div>
              </div>
              <span className="btn btn-outline-light w-100" aria-label="Perfil de EcoPlay em breve">Perfil em breve</span>
            </article>
          </div>
        </div>
      </div>
    </section>
    <section className="section support-section" id="suporte" aria-labelledby="suporte-titulo">
      <div className="container support-box">
        <div className="support-content">
          <span className="support-eyebrow">APOIE A IARA</span>
          <h2 id="suporte-titulo">A Iara cresce junto com a cena que representa.</h2>
          <p>A gente existe para que jogos brasileiros independentes cheguem a mais gente — e para que mais devs tenham onde publicar.</p>
          <p>Se você acredita nisso também, pode nos ajudar a crescer.</p>
          <a href="#forum" className="btn btn-primary btn-support">Conhecer criadores</a>
        </div>
        <div className="support-metrics" aria-label="Indicadores da Iara Games">
          <article className="card support-metric-card">
            <strong className="support-metric-value support-metric-value-gold">Curadoria</strong>
            <span className="support-metric-label">jogos brasileiros selecionados</span>
          </article>
          <article className="card support-metric-card">
            <strong className="support-metric-value support-metric-value-gold">Cena indie</strong>
            <span className="support-metric-label">estúdios independentes</span>
          </article>
          <article className="card support-metric-card">
            <strong className="support-metric-value support-metric-value-cyan">100%</strong>
            <span className="support-metric-label">produção nacional</span>
          </article>
          <article className="card support-metric-card">
            <strong className="support-metric-value support-metric-value-cyan">Comunidade</strong>
            <span className="support-metric-label">jogadores e criadores conectados</span>
          </article>
        </div>
      </div>
    </section>
  </main>
  );
}
