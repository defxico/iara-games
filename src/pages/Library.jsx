import React, { useEffect, useMemo, useState } from 'react';

const games = [
  { id: 'veu', title: 'Véu de Chuva', studio: 'Mangue Studio', genre: 'Aventura', cover: 'card-jogo-véu de chuva.png', initial: { status: 'jogando', progress: 45, favorite: true } },
  { id: 'boto', title: 'O Chamado do Boto', studio: 'Igarapé Games', genre: 'Ação', cover: 'card-jogo-boto.png', initial: { status: 'concluido', progress: 100, favorite: false } },
  { id: 'encantado', title: 'Encantado', studio: 'Terra Firme Dev', genre: 'RPG', cover: 'card-jogo-encantado.png', initial: { status: 'jogando', progress: 20, favorite: false } },
  { id: 'mare', title: 'Maré', studio: 'Mangue Studio', genre: 'Puzzle', cover: 'card-jogo-maré.png', initial: { status: 'lista', progress: 0, favorite: true } },
  { id: 'sertao', title: 'Sertão Noir', studio: 'Caatinga Interactive', genre: 'Narrativa', cover: 'card-jogo-sertão noir.png', initial: { status: 'lista', progress: 0, favorite: false } },
  { id: 'varzea', title: 'Várzea', studio: 'Pé na Terra', genre: 'Aventura', cover: 'card-jogo-várzea.png', initial: { status: 'lista', progress: 0, favorite: false } },
];
const storageKey = 'iara-library-v1';
const labels = { todos: 'Todos', jogando: 'Jogando', concluido: 'Concluídos', lista: 'Quero jogar' };
const initialState = Object.fromEntries(games.map(game => [game.id, game.initial]));

function readLibrary() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || typeof saved !== 'object') return initialState;
    return Object.fromEntries(games.map(game => {
      const value = saved[game.id];
      return [game.id, value && labels[value.status] && Number.isInteger(value.progress) && value.progress >= 0 && value.progress <= 100
        ? { status: value.status, progress: value.progress, favorite: Boolean(value.favorite) }
        : game.initial];
    }));
  } catch { return initialState; }
}

export default function Library() {
  const [library, setLibrary] = useState(readLibrary);
  const [filter, setFilter] = useState('todos');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('titulo');
  const [view, setView] = useState('grid');

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(library)); } catch { /* Navegação continua sem armazenamento local. */ }
  }, [library]);

  const update = (id, changes) => setLibrary(current => ({ ...current, [id]: { ...current[id], ...changes } }));
  const counts = Object.fromEntries(Object.keys(labels).map(status => [status, status === 'todos' ? games.length : games.filter(game => library[game.id].status === status).length]));
  const visible = useMemo(() => games.filter(game => {
    const matchesStatus = filter === 'todos' || library[game.id].status === filter;
    const text = `${game.title} ${game.studio} ${game.genre}`.toLocaleLowerCase('pt-BR');
    return matchesStatus && text.includes(query.trim().toLocaleLowerCase('pt-BR'));
  }).sort((a, b) => sort === 'progresso'
    ? library[b.id].progress - library[a.id].progress || a.title.localeCompare(b.title, 'pt-BR')
    : a.title.localeCompare(b.title, 'pt-BR')), [filter, query, sort, library]);

  return <main className="library-main">
    <section className="library-hero"><div className="container library-hero-inner">
      <nav aria-label="breadcrumb"><ol className="breadcrumb shop-breadcrumb"><li className="breadcrumb-item"><a href="../index.html">Início</a></li><li className="breadcrumb-item active" aria-current="page">Biblioteca</li></ol></nav>
      <div className="library-hero-copy"><span className="eyebrow eyebrow-highlight">SUA JORNADA</span><h1>Minha Biblioteca</h1><p>Organize suas descobertas da cena indie brasileira. Acompanhe seu progresso e guarde o que quer jogar depois.</p><span className="library-demo-note">Demonstração local: dados salvos neste navegador. Não representa compras ou conta real.</span></div>
    </div></section>
    <section className="container library-content" aria-label="Jogos da biblioteca">
      <div className="library-overview" aria-label="Resumo da biblioteca"><strong>{games.length}<span>jogos na coleção</span></strong><strong>{counts.jogando}<span>em andamento</span></strong><strong>{counts.concluido}<span>concluído{counts.concluido === 1 ? '' : 's'}</span></strong></div>
      <div className="library-toolbar"><div className="library-tabs" role="group" aria-label="Filtrar por situação">{Object.entries(labels).map(([status, label]) => <button key={status} type="button" className={filter === status ? 'active' : ''} aria-pressed={filter === status} onClick={() => setFilter(status)}>{label} <span>{counts[status]}</span></button>)}</div>
        <div className="library-controls"><label className="sr-only" htmlFor="library-search">Buscar na biblioteca</label><input id="library-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar jogos, estúdios..." /><label className="sr-only" htmlFor="library-sort">Ordenar jogos</label><select id="library-sort" value={sort} onChange={event => setSort(event.target.value)}><option value="titulo">Nome A-Z</option><option value="progresso">Maior progresso</option></select></div>
        <div className="library-view-toggle" role="group" aria-label="Visualização dos jogos">{[['grid', 'Grade'], ['list', 'Lista']].map(([key, label]) => <button key={key} type="button" className={view === key ? 'active' : ''} aria-pressed={view === key} onClick={() => setView(key)}>{label}</button>)}</div>
      </div>
      <p className="library-result-count" aria-live="polite">{visible.length} {visible.length === 1 ? 'jogo encontrado' : 'jogos encontrados'}</p>
      {visible.length ? <div className={`library-grid ${view === 'list' ? 'is-list' : ''}`}>{visible.map(game => {
        const state = library[game.id];
        return <article className="library-card" key={game.id}>
          <img className="library-cover" src={`../assets/img/${game.cover}`} alt={`Capa de ${game.title}`} />
          <div className="library-card-body"><div className="library-card-top"><span className="library-genre">{game.genre}</span><button type="button" className={`library-favorite ${state.favorite ? 'active' : ''}`} aria-label={`${state.favorite ? 'Remover' : 'Adicionar'} ${game.title} ${state.favorite ? 'dos' : 'aos'} favoritos`} aria-pressed={state.favorite} onClick={() => update(game.id, { favorite: !state.favorite })}>{state.favorite ? '♥' : '♡'}</button></div>
            <h2>{game.title}</h2><p className="library-studio">{game.studio}</p>
            <label className="library-status-label" htmlFor={`status-${game.id}`}>Situação</label>
            <select id={`status-${game.id}`} value={state.status} onChange={event => {
              const status = event.target.value;
              let progress = state.progress;
              if (status === 'concluido') progress = 100;
              else if (status === 'lista' || state.status === 'concluido') progress = 0;
              update(game.id, { status, progress });
            }}>
              <option value="jogando">Jogando</option>
              <option value="concluido">Concluído</option>
              <option value="lista">Quero jogar</option>
            </select>
            <div className="library-progress-heading"><label htmlFor={`progress-${game.id}`}>Progresso</label><span>{state.progress}%</span></div><input id={`progress-${game.id}`} type="range" min="0" max="100" step="5" value={state.progress} onChange={event => update(game.id, { progress: Number(event.target.value), status: Number(event.target.value) === 100 ? 'concluido' : Number(event.target.value) > 0 ? 'jogando' : 'lista' })} aria-valuetext={`${state.progress} por cento concluído`} />
          </div>
        </article>;
      })}</div> : <div className="library-empty"><h2>Nenhum jogo encontrado</h2><p>Tente outra busca ou filtro.</p><button type="button" className="btn btn-primary" onClick={() => { setFilter('todos'); setQuery(''); }}>Limpar filtros</button></div>}
      <div className="library-discover"><div><h2>Pronto para descobrir mais?</h2><p>Explore a loja e conheça novos jogos brasileiros independentes.</p></div><a className="btn btn-primary" href="./loja.html">Explorar jogos</a></div>
    </section>
  </main>;
}
