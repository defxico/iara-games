import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import Library from './pages/Library.jsx';
import Delivery from './pages/Delivery.jsx';
import { SiteHeader, SiteFooter } from './shared/SiteLayout.jsx';
import '../css/style.css';
import './library.css';
import './delivery.css';

const path = window.location.pathname;
const page = path.endsWith('/loja.html') ? 'loja'
  : path.endsWith('/cadastro.html') ? 'cadastro'
  : path.endsWith('/perfil.html') ? 'perfil'
  : path.endsWith('/biblioteca.html') ? 'biblioteca'
  : path.endsWith('/entrega.html') ? 'entrega' : 'home';
const pages = { home: Home, loja: Shop, cadastro: Signup, perfil: Profile, biblioteca: Library, entrega: Delivery };
const Page = pages[page];
const bodyClass = { loja: 'shop-page', cadastro: 'signup-page', perfil: 'profile-page', biblioteca: 'library-page', entrega: 'signup-page delivery-page' };
document.body.className = page === 'home' ? '' : `internal-page ${bodyClass[page]}`;

createRoot(document.getElementById('root')).render(
  <>
    <SiteHeader page={page} />
    <Page />
    <SiteFooter page={page} />
  </>,
);
