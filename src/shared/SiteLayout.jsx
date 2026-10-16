import React from 'react';

export function SiteHeader({ page }) {
  const home = page === 'home';
  const root = home ? './' : '../';
  const pageHref = (name) => `${root}pages/${name}.html`;
  const nav = [
    { name: 'Início', href: `${root}index.html#inicio`, icon: 'home', key: 'home' },
    { name: 'Loja', href: pageHref('loja'), icon: 'loja', key: 'loja' },
    { name: 'Biblioteca', href: pageHref('biblioteca'), icon: 'biblioteca', key: 'biblioteca' },
    { name: 'Criadores', href: `${root}index.html#forum`, icon: 'forum' },
    { name: 'Sobre', href: `${root}index.html#sobre`, icon: 'sobre' },
  ];
  function search(event) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get('q')?.toString().trim();
    window.location.href = `${pageHref('loja')}${query ? `?q=${encodeURIComponent(query)}` : ''}`;
  }
  return <header className="site-header navbar navbar-expand-lg navbar-dark">
    <div className="container">
      <a href={`${root}index.html#inicio`} className="navbar-brand brand" aria-label="Iara Games - Página inicial">
        <img src={`${root}assets/img/accessibility-update/logotipo/logowordmark-areia.svg`} alt="Iara Games" className="brand-logo" />
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Abrir navegação"><span className="navbar-toggler-icon" /></button>
      <div className="collapse navbar-collapse" id="mainNavbar">
        <div className="main-nav me-lg-auto"><ul className="navbar-nav align-items-lg-center gap-lg-1">
          {nav.map(item => <li className="nav-item" key={item.name}><a className={`nav-link ${item.key === page ? 'active' : ''}`} aria-current={item.key === page ? 'page' : undefined} href={item.href}>
            <img src={`${root}assets/img/accessibility-update/nav/${item.icon}-default.svg`} alt="" aria-hidden="true" className="icon-default" />
            <img src={`${root}assets/img/accessibility-update/nav/${item.icon}-hover.svg`} alt="" aria-hidden="true" className="icon-hover" />
            <span>{item.name}</span>
          </a></li>)}
        </ul></div>
        <div className="header-actions ms-lg-auto">
          <form className="site-search input-group" role="search" onSubmit={search}>
            <label htmlFor="global-search" className="sr-only">Buscar jogos</label>
            <button className="input-group-text search-submit-btn" type="submit" aria-label="Buscar"><img src={`${root}assets/img/search.svg`} alt="" aria-hidden="true" /></button>
            <input type="search" name="q" id="global-search" className="form-control" placeholder="Buscar jogos..." />
          </form>
          {page === 'perfil' ? <a href={pageHref('perfil')} className="btn btn-primary account-button" aria-current="page"><img src={`${root}assets/img/avatar-placeholder-escuro.svg`} alt="" aria-hidden="true" /><span>Rafael Costa</span></a> : <>
            <a href={pageHref('perfil')} className="btn btn-outline-light header-login-link">Entrar</a>
            <a href={pageHref('cadastro')} className="btn btn-outline-light header-signup-link">Criar conta</a>
          </>}
        </div>
      </div>
    </div>
  </header>;
}

export function SiteFooter({ page }) {
  const root = page === 'home' ? './' : '../';
  return <footer className="site-footer" id="sobre"><div className="container footer-top">
    <div className="footer-brand"><a href={`${root}index.html#inicio`} className="brand footer-brand-logo"><img src={`${root}assets/img/accessibility-update/logotipo/logowordmark-areia.svg`} alt="Iara Games" className="brand-logo" /></a><p>Jogos brasileiros independentes</p></div>
    <nav className="footer-nav" aria-label="Navegação do rodapé">
      <a href={`${root}pages/loja.html`}>Descobrir</a><a href={`${root}pages/biblioteca.html`}>Biblioteca</a><a href={`${root}pages/cadastro.html`}>Cadastro</a><a href={`${root}pages/perfil.html`}>Perfil</a><a href={`${root}index.html#suporte`}>Suporte</a>
    </nav>
  </div><div className="container footer-bottom"><p>© 2026 Iara Games. Orgulhosamente brasileira.</p><p>Os jogos e marcas pertencem aos seus respectivos criadores.</p></div></footer>;
}
