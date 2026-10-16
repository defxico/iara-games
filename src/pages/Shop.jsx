import React, { useMemo, useState } from 'react';

const games = [
  ['Véu de Chuva', 'Mangue Studio', 'aventura', 'card-jogo-véu de chuva.png', '18,90', '4,8'],
  ['O Chamado do Boto', 'Igarapé Games', 'acao', 'card-jogo-boto.png', '24,90', '4,8'],
  ['Encantado', 'Terra Firme Dev', 'rpg', 'card-jogo-encantado.png', '31,90', '4,7'],
  ['Linha de Varal', 'Caatinga Interactive', 'cozy', 'card-jogo-linha de varal.png', '19,90', '4,6'],
  ['Maré', 'Mangue Studio', 'puzzle', 'card-jogo-maré.png', '22,90', '4,5'],
  ['Quarta Feira', 'Jardim Digital', 'esporte', 'card-jogo-quarta feira.png', '17,90', '4,4'],
  ['Sertão Noir', 'Caatinga Interactive', 'narrativa', 'card-jogo-sertão noir.png', '21,90', '4,5'],
  ['Várzea', 'Pé na Terra', 'aventura', 'card-jogo-várzea.png', '25,90', '4,6'],
  ['Baldeação', 'Linha Norte Studio', 'puzzle', 'card-jogo-baldeação.png', '16,90', '4,3'],
];
const genres = [['todos', 'Todos'], ['aventura', 'Aventura'], ['acao', 'Ação'], ['cozy', 'Cozy'], ['puzzle', 'Puzzle'], ['rpg', 'RPG'], ['esporte', 'Esporte'], ['narrativa', 'Narrativa']];

export default function Shop() {
  const params = new URLSearchParams(window.location.search);
  const [genre, setGenre] = useState(genres.some(([key]) => key === params.get('genero')) ? params.get('genero') : 'todos');
  const [query, setQuery] = useState(params.get('q') || '');
  const [view, setView] = useState('grid');
  const [toast, setToast] = useState('');
  const visible = useMemo(() => games.filter(([title, studio, category]) => (genre === 'todos' || category === genre) && `${title} ${studio} ${category} ${genres.find(([key]) => key === category)?.[1] || ''}`.toLocaleLowerCase('pt-BR').includes(query.trim().toLocaleLowerCase('pt-BR'))), [genre, query]);
  return <main>
    <section className="shop-hero"><div className="container"><div className="shop-hero-card">
      <nav aria-label="breadcrumb"><ol className="breadcrumb shop-breadcrumb mb-3"><li className="breadcrumb-item"><a href="../index.html">Início</a></li><li className="breadcrumb-item active" aria-current="page">Loja</li></ol></nav>
      <span className="eyebrow eyebrow-highlight"><img src="../assets/img/flame.svg" alt="" aria-hidden="true" /> Catálogo em destaque</span>
      <h1>Loja de Jogos</h1><p>Descubra jogos independentes brasileiros e encontre sua próxima aventura.</p>
      <div className="shop-toolbar"><div className="shop-primary-controls"><label htmlFor="shop-primary-search-input" className="sr-only">Buscar no catálogo</label><input id="shop-primary-search-input" type="search" className="form-control" placeholder="Buscar jogos, estúdios ou gêneros..." value={query} onChange={event => setQuery(event.target.value)} /></div>
        <div className="shop-summary"><strong>Filtrar por gênero</strong><span>Escolha a categoria que melhor combina com sua jornada</span></div>
        <div className="shop-filters" role="group" aria-label="Filtros da loja">{genres.map(([key, label]) => <button key={key} type="button" className={`btn btn-sm btn-outline-light rounded-pill shop-filter-chip ${genre === key ? 'active' : ''}`} aria-pressed={genre === key} onClick={() => setGenre(key)}>{label}</button>)}</div>
        <strong className="shop-results-count" aria-live="polite">{visible.length} {visible.length === 1 ? 'jogo encontrado' : 'jogos encontrados'}</strong>
        <div className="shop-view-actions"><div className="shop-view-toggle" role="group" aria-label="Visualização">{[['grid', 'Grade'], ['list', 'Lista']].map(([key, label]) => <button key={key} type="button" className={`shop-view-btn ${view === key ? 'is-active' : ''}`} aria-pressed={view === key} onClick={() => setView(key)}>{label}</button>)}</div></div>
      </div>
    </div></div></section>
    <section className="section pb-5"><div className="container"><div className={`shop-results is-${view}`}>
      {visible.length ? <div className="row g-4 shop-grid">{visible.map(([title, studio, category, cover, price, rating]) => <article key={title} className="col-12 col-md-6 col-xl-4"><div className="card shop-card h-100"><img src={`../assets/img/${cover}`} className="card-img-top shop-card-image" alt={`Capa do jogo ${title}`} /><div className="card-body"><div className="shop-card-tags"><span className="badge rounded-pill">{genres.find(([key]) => key === category)?.[1]}</span></div><h2 className="card-title h3">{title}</h2><p className="shop-studio mb-0">{studio}</p><p className="shop-meta mb-0">{rating} ★</p><div className="shop-buy-row"><strong className="shop-price">R$ {price}</strong><button type="button" className="btn btn-primary" aria-label={`Adicionar ${title} ao carrinho`} onClick={() => setToast(title)}><img src="../assets/img/shopping-cart.svg" alt="" aria-hidden="true" /></button></div></div></div></article>)}</div> : <div className="shop-empty-state"><p>Nenhum jogo encontrado. Tente outra busca ou categoria.</p><button type="button" className="btn btn-primary" onClick={() => { setGenre('todos'); setQuery(''); }}>Limpar filtros</button></div>}
    </div></div></section>
    {toast && <div className="cart-toast is-visible" role="status" aria-live="polite">Crie uma conta gratuita para comprar <strong>{toast}</strong>. <a href="./cadastro.html">Criar conta</a><button type="button" className="cart-toast-close" aria-label="Fechar aviso" onClick={() => setToast('')}>×</button></div>}
  </main>;
}
