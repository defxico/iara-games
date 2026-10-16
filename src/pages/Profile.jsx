import React from 'react';

export default function Profile() {
  return (
<main className="internal-main profile-dashboard-main">
    <div className="container profile-dashboard-shell">
      <section className="profile-summary" aria-labelledby="perfil-titulo">
        <div className="profile-summary-avatar" aria-hidden="true">
          <span>R</span>
        </div>
        <div className="profile-summary-card">
          <div className="profile-summary-head">
            <div>
              <h1 id="perfil-titulo">Rafael 'Tupi' Costa</h1>
              <p className="profile-handle">@JogadorBR2099</p>
            </div>
            <div className="profile-summary-actions" aria-label="Ações do perfil">
              <button type="button" className="profile-icon-button" aria-label="Editar perfil, indisponível nesta demonstração" title="Edição de perfil indisponível nesta demonstração" disabled>
                <img src="../assets/img/perfil-page-icons/edit icon.svg" alt="" aria-hidden="true" />
              </button>
              <a href="../index.html#forum" className="profile-icon-button" aria-label="Compartilhar perfil">
                <img src="../assets/img/perfil-page-icons/share icon.svg" alt="" aria-hidden="true" />
              </a>
            </div>
          </div>
          <p className="profile-bio">
            Apaixonado por jogos indie brasileiros e sempre em busca de novas aventuras e apoiando devs nacionais.
          </p>
          <div className="profile-meta-row">
            <span className="profile-meta-item">
              <img src="../assets/img/perfil-page-icons/localizacao-icon.svg" alt="" aria-hidden="true" className="profile-meta-icon" />
              São Paulo, SP
            </span>
            <span className="profile-meta-item">
              <img src="../assets/img/perfil-page-icons/calendario-icon.svg" alt="" aria-hidden="true" className="profile-meta-icon" />
              Membro desde Janeiro 2024
            </span>
          </div>
        </div>
      </section>
      <section className="profile-kpis" aria-label="Indicadores do perfil">
        <article className="card profile-kpi-card profile-kpi-green">
          <strong>4</strong>
          <div className="profile-kpi-text">
            <img src="../assets/img/perfil-page-icons/controler game icon.svg" alt="" aria-hidden="true" className="profile-kpi-icon" />
            <span>Jogos</span>
          </div>
        </article>
        <article className="card profile-kpi-card profile-kpi-blue">
          <strong>352h</strong>
          <div className="profile-kpi-text">
            <img src="../assets/img/perfil-page-icons/clock icon.svg" alt="" aria-hidden="true" className="profile-kpi-icon" />
            <span>Tempo de Jogo</span>
          </div>
        </article>
        <article className="card profile-kpi-card profile-kpi-gold">
          <strong>124</strong>
          <div className="profile-kpi-text">
            <img src="../assets/img/perfil-page-icons/trophy icon.svg" alt="" aria-hidden="true" className="profile-kpi-icon" />
            <span>Conquistas</span>
          </div>
        </article>
        <article className="card profile-kpi-card profile-kpi-purple">
          <strong>4</strong>
          <div className="profile-kpi-text">
            <img src="../assets/img/perfil-page-icons/users white.svg" alt="" aria-hidden="true" className="profile-kpi-icon" />
            <span>Amigos</span>
          </div>
        </article>
      </section>
      <div className="profile-dashboard-grid">
        <div className="profile-dashboard-main-column">
          <section className="card profile-panel" aria-labelledby="jogos-destaque-titulo">
            <div className="profile-panel-title-row">
              <div className="profile-panel-title-left">
                <img src="../assets/img/perfil-page-icons/star icon.svg" alt="" aria-hidden="true" className="profile-panel-title-icon" />
                <h2 id="jogos-destaque-titulo">Jogos em Destaque</h2>
              </div>
            </div>
            <div className="profile-featured-grid">
              <article className="profile-featured-card">
                <div className="profile-featured-thumb profile-game-amazonia" />
                <div className="profile-featured-copy">
                  <strong>Amazonia: O Despertar</strong>
                  <span className="profile-featured-stat"><img src="../assets/img/perfil-page-icons/clock icon.svg" alt="" aria-hidden="true" />142h</span>
                  <span className="profile-featured-stat"><img src="../assets/img/perfil-page-icons/trophy icon.svg" alt="" aria-hidden="true" />45/50</span>
                </div>
              </article>
              <article className="profile-featured-card">
                <div className="profile-featured-thumb profile-game-cyber" />
                <div className="profile-featured-copy">
                  <strong>Cyber Favela 2099</strong>
                  <span className="profile-featured-stat"><img src="../assets/img/perfil-page-icons/clock icon.svg" alt="" aria-hidden="true" />89h</span>
                  <span className="profile-featured-stat"><img src="../assets/img/perfil-page-icons/trophy icon.svg" alt="" aria-hidden="true" />32/48</span>
                </div>
              </article>
              <article className="profile-featured-card">
                <div className="profile-featured-thumb profile-game-saci" />
                <div className="profile-featured-copy">
                  <strong>Saci: O Protetor</strong>
                  <span className="profile-featured-stat"><img src="../assets/img/perfil-page-icons/clock icon.svg" alt="" aria-hidden="true" />67h</span>
                  <span className="profile-featured-stat"><img src="../assets/img/perfil-page-icons/trophy icon.svg" alt="" aria-hidden="true" />28/35</span>
                </div>
              </article>
              <article className="profile-featured-card">
                <div className="profile-featured-thumb profile-game-cangaco" />
                <div className="profile-featured-copy">
                  <strong>Cangaceiro Lendário</strong>
                  <span className="profile-featured-stat"><img src="../assets/img/perfil-page-icons/clock icon.svg" alt="" aria-hidden="true" />54h</span>
                  <span className="profile-featured-stat"><img src="../assets/img/perfil-page-icons/trophy icon.svg" alt="" aria-hidden="true" />19/30</span>
                </div>
              </article>
            </div>
          </section>
          <section className="card profile-panel" aria-labelledby="badges-titulo">
            <div className="profile-panel-title-row">
              <div className="profile-panel-title-left">
                <img src="../assets/img/perfil-page-icons/bagde icon green.svg" alt="" aria-hidden="true" className="profile-panel-title-icon" />
                <h2 id="badges-titulo">Badges Conquistadas</h2>
              </div>
            </div>
            <div className="profile-badges-grid">
              <article className="profile-badge-card">
                <img src="../assets/img/perfil-page-icons/pioneiro icon.svg" alt="" aria-hidden="true" className="profile-badge-icon" />
                <strong>Pioneiro</strong>
                <span>Membro desde o lançamento</span>
              </article>
              <article className="profile-badge-card">
                <img src="../assets/img/perfil-page-icons/colecionador icon.svg" alt="" aria-hidden="true" className="profile-badge-icon" />
                <strong>Colecionador</strong>
                <span>10+ jogos na biblioteca</span>
              </article>
              <article className="profile-badge-card">
                <img src="../assets/img/perfil-page-icons/maratonista icon.svg" alt="" aria-hidden="true" className="profile-badge-icon" />
                <strong>Maratonista</strong>
                <span>100+ horas jogadas</span>
              </article>
              <article className="profile-badge-card">
                <img src="../assets/img/perfil-page-icons/caçador icon.svg" alt="" aria-hidden="true" className="profile-badge-icon" />
                <strong>Caçador</strong>
                <span>50+ conquistas desbloqueadas</span>
              </article>
              <article className="profile-badge-card">
                <img src="../assets/img/perfil-page-icons/apoiador icon.svg" alt="" aria-hidden="true" className="profile-badge-icon" />
                <strong>Apoiador</strong>
                <span>Comprou de 5+ devs diferentes</span>
              </article>
              <article className="profile-badge-card">
                <img src="../assets/img/perfil-page-icons/guardiao icon.svg" alt="" aria-hidden="true" className="profile-badge-icon" />
                <strong>Guardião</strong>
                <span>Membro verificado</span>
              </article>
            </div>
          </section>
          <section className="card profile-panel" aria-labelledby="atividade-titulo">
            <div className="profile-panel-title-row">
              <div className="profile-panel-title-left">
                <img src="../assets/img/perfil-page-icons/trend icon blue.svg" alt="" aria-hidden="true" className="profile-panel-title-icon" />
                <h2 id="atividade-titulo">Atividade Recente</h2>
              </div>
            </div>
            <div className="profile-activity-list">
              <article className="profile-activity-item">
                <img src="../assets/img/perfil-page-icons/trophy-bg-icon.svg" alt="" aria-hidden="true" className="profile-activity-icon" />
                <div>
                  <strong>Desbloqueou 'Guardião da Floresta'</strong>
                  <p>Amazonia: O Despertar</p>
                  <span>2h atrás</span>
                </div>
              </article>
              <article className="profile-activity-item">
                <img src="../assets/img/perfil-page-icons/controler-bg-icon.svg" alt="" aria-hidden="true" className="profile-activity-icon" />
                <div>
                  <strong>Jogou por 3 horas</strong>
                  <p>Cyber Favela 2099</p>
                  <span>5h atrás</span>
                </div>
              </article>
              <article className="profile-activity-item">
                <img src="../assets/img/perfil-page-icons/textbox-bg-icon.svg" alt="" aria-hidden="true" className="profile-activity-icon" />
                <div>
                  <strong>Deixou uma avaliação positiva</strong>
                  <p>Saci: O Protetor</p>
                  <span>1d atrás</span>
                </div>
              </article>
              <article className="profile-activity-item">
                <img src="../assets/img/perfil-page-icons/users-bg-icon.svg" alt="" aria-hidden="true" className="profile-activity-icon" />
                <div>
                  <strong>Adicionou Maria Santos como amiga</strong>
                  <p>Nova conexão na comunidade</p>
                  <span>2d atrás</span>
                </div>
              </article>
            </div>
          </section>
        </div>
        <aside className="profile-dashboard-side-column">
          <section className="card profile-panel profile-friends-panel" aria-labelledby="amigos-titulo">
            <div className="profile-panel-title-row profile-panel-title-split">
              <div className="profile-panel-title-left">
                <img src="../assets/img/perfil-page-icons/users green.svg" alt="" aria-hidden="true" className="profile-panel-title-icon" />
                <h2 id="amigos-titulo">Amigos</h2>
              </div>
              <span>4</span>
            </div>
            <ul className="profile-friends-list">
              <li className="profile-friend-item">
                <span className="profile-friend-avatar avatar-blue">J</span>
                <div>
                  <strong>João Silva</strong>
                  <span className="friend-status friend-online">Online</span>
                </div>
              </li>
              <li className="profile-friend-item">
                <span className="profile-friend-avatar avatar-pink">M</span>
                <div>
                  <strong>Maria Santos</strong>
                  <span className="friend-status friend-online">Online</span>
                </div>
              </li>
              <li className="profile-friend-item">
                <span className="profile-friend-avatar avatar-purple">P</span>
                <div>
                  <strong>Pedro Costa</strong>
                  <span className="friend-status friend-away">Away</span>
                </div>
              </li>
              <li className="profile-friend-item">
                <span className="profile-friend-avatar avatar-orange">A</span>
                <div>
                  <strong>Ana Lima</strong>
                  <span className="friend-status friend-offline">Offline</span>
                </div>
              </li>
            </ul>
            <a href="../index.html#forum" className="btn btn-primary profile-panel-button">Ver todos os amigos</a>
          </section>
          <section className="card profile-panel profile-stats-panel" aria-labelledby="estatisticas-laterais-titulo">
            <div className="profile-panel-title-row">
              <div className="profile-panel-title-left">
                <img src="../assets/img/perfil-page-icons/trend icon white.svg" alt="" aria-hidden="true" className="profile-panel-title-icon" />
                <h2 id="estatisticas-laterais-titulo">Estatísticas</h2>
              </div>
            </div>
            <div className="profile-progress-group">
              <div className="profile-progress-copy">
                <span>Taxa de Conclusão</span>
                <strong>78%</strong>
              </div>
              <div className="progress profile-progress-bar" role="progressbar" aria-label="Taxa de Conclusão" aria-valuenow={78} aria-valuemin={0} aria-valuemax={100}><div className="progress-bar" style={{width: '78%'}} /></div>
            </div>
            <div className="profile-progress-group">
              <div className="profile-progress-copy">
                <span>Conquistas Raras</span>
                <strong>12</strong>
              </div>
              <div className="progress profile-progress-bar profile-progress-bar-gold" role="progressbar" aria-label="Conquistas Raras" aria-valuenow={46} aria-valuemin={0} aria-valuemax={100}><div className="progress-bar" style={{width: '46%'}} /></div>
            </div>
            <div className="profile-favorite-game">
              <span>Jogo Favorito</span>
              <strong>Amazonia: O Despertar</strong>
              <small>142 horas jogadas</small>
            </div>
          </section>
          <section className="card profile-panel profile-level-panel" aria-labelledby="nivel-titulo">
            <div className="profile-level-badge">42</div>
            <h2 id="nivel-titulo">Nível 42</h2>
            <p>850 / 1000 XP para o próximo nível</p>
            <div className="progress profile-progress-bar profile-progress-bar-xp" role="progressbar" aria-label="Progresso de XP" aria-valuenow={85} aria-valuemin={0} aria-valuemax={100}><div className="progress-bar" style={{width: '85%'}} /></div>
            <small>Continue jogando para ganhar mais XP!</small>
          </section>
        </aside>
      </div>
    </div>
  </main>
  );
}
