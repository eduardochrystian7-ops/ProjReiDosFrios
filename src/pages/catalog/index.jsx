import { useState } from 'react';
import { ProductCard } from '../productDetails';
import './Catalog.css';

export default function Catalog() {
  // Importando apenas o que essa tela precisa ler e usar
  const { produtos, excluirProduto } = useProdutos();
// comentário
  return (
    <main className="catalog-container">
      {/* 1. HEADER SIMPLIFICADO (O ideal é extrair para um componente <Header />) */}
      <header className="catalog-header">
        <h1 className="logo-text">Rei dos Frios</h1>
        <nav>
          <a href="#produtos" className="active">PRODUTOS</a>
          <a href="#promocoes">PROMOÇÕES</a>
          <a href="#entregas">ENTREGAS</a>
          <a href="#contato">CONTATO</a>
        </nav>
        <button className="btn-conta">MINHA CONTA</button>
      </header>

      {/* 2. MENU DE CATEGORIAS */}
      <section className="category-menu">
        {['QUEIJOS', 'PRESUNTOS', 'SALAMES', 'KITS & TÁBUAS'].map((cat) => (
          <button 
            key={cat} 
            className={`btn-category ${categoriaAtiva === cat ? 'active' : ''}`}
            onClick={() => setCategoriaAtiva(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* 3. BANNER PROMOCIONAL */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>OFERTA RELÂMPAGO</h2>
          <h3>Seleção Imperial de Parmesão</h3>
          <p>Maturado por 24 meses, textura granulosa e sabor persistente. Apenas hoje com 30% de desconto.</p>
        </div>
        <div className="promo-timer">
          {/* Implementação visual estática do timer */}
          <div className="timer-box"><span>04</span><small>HORAS</small></div>
          <div className="timer-box"><span>22</span><small>MINUTOS</small></div>
          <div className="timer-box"><span>15</span><small>SEGUNDOS</small></div>
        </div>
      </section>

      {/* 4. GRID DE PRODUTOS */}
      <section className="product-grid">
        {produtos.map(produto => (
          <ProductCard 
            key={produto.id}
            id={produto.id}
            nome={produto.nome}
            origem={produto.origem}
            preco={produto.preco}
            imagem={produto.imagem}
            tag={produto.tag}
          />
        ))}
      </section>

      {/* 5. SEÇÃO DE KITS (Base do design) */}
      <section className="kits-section">
        <div className="kits-text">
          <h2 className="kits-title">Kits Gastronômicos</h2>
          <p>Nossas tábuas são montadas por especialistas, combinando sabores que se complementam e criam uma experiência sensorial completa para seus convidados.</p>
          
          <div className="kits-buttons">
            <div className="kit-option">
              <h4>Tábua Degustação</h4>
              <p>4 tipos de queijos + 2 frios</p>
            </div>
            <div className="kit-option">
              <h4>Kit Noite de Vinhos</h4>
              <p>Seleção curada para tintos</p>
            </div>
          </div>
        </div>
        <div className="kits-image">
          {/* Imagem representativa da tábua de frios */}
          <div className="image-placeholder">Imagem da Tábua</div> 
        </div>
      </section>
    </main>
  );
}