import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '../productDetails';
import gorgonzolaImg from '../../assets/gorgonzola.jpg';
import prosciuttoImg from '../../assets/prosciutto.jpg';
import salameImg from '../../assets/salame.jpg';
import brieImg from '../../assets/brie.png';
import './Catalog.css';

export default function Catalog() {
  // Simulando os dados iniciais baseados no design do Figma
  const [produtos] = useState([
    {
      id: 1,
      nome: 'Gorgonzola Dolce',
      origem: 'ORIGEM: ITÁLIA',
      preco: 145.90,
      imagem: gorgonzolaImg,
      tag: 'Premium',
      description: ''
    },
    {
      id: 2,
      nome: 'Prosciutto di Parma',
      origem: 'MATURADO 18 MESES',
      preco: 289.00,
      imagem: prosciuttoImg,
      tag: null,
      description: ''
    },
    {
      id: 3,
      nome: 'Salame Milano',
      origem: 'TEMPEROS NOBRES',
      preco: 98.50,
      imagem: salameImg,
      tag: null,
      description: ''
    },
    {
      id: 4,
      nome: 'Queijo Brie Double Cream',
      origem: 'TEXTURA AVELUDADA',
      preco: 112.00,
      imagem: brieImg,
      tag: null,
      description: ''
    }
  ]);

  const navigate = useNavigate();

  return (
    <main className="catalog-container">
      {/* 1. HEADER SIMPLIFICADO (O ideal é extrair para um componente <Header />) */}
      <header className="catalog-header">
        <h1 className="logo-text">Rei dos Frios</h1>
        <nav>
          <Link to="/catalogo" className="active">PRODUTOS</Link>
          <Link to="/kits">KITS</Link>
          <Link to="/promocoes">PROMOÇÕES</Link>
          <Link to="/charcutaria">CHARCUTARIA</Link>
          <Link to="/contato">CONTATO</Link>
        </nav>
        <button type="button" className="btn-conta" onClick={() => navigate('/perfil')}>MINHA CONTA</button>
      </header>

      {/* Menu de categorias removido conforme solicitado */}

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
            description={produto.description}
          />
        ))}
      </section>
    </main>
  );
}