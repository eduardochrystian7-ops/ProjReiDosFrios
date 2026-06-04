import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Kits.css';

export default function Kits() {
  const navigate = useNavigate();

  // Dados simulados para o layout (prontos para o hook do CRUD depois)
  const [kitsEmDestaque] = useState([
    {
      id: 1,
      tipo: 'destaque',
      nome: 'Tábua Imperial Grande',
      descricao: 'A seleção definitiva para recepções. Serve até 10 pessoas com o melhor da charcutaria mundial e antepastos premium.',
      preco: 549.00,
      imagem: '/assets/tabua-grande.png', // Ajuste para o caminho real da sua imagem
      tag: 'Mais Vendido'
    },
    {
      id: 2,
      tipo: 'normal',
      nome: 'Kit Degustação de Frios',
      preco: 389.00,
      imagem: '/assets/kit-caixa.png'
    },
    {
      id: 3,
      tipo: 'normal',
      nome: 'Kit Pizza Gourmet',
      preco: 195.00,
      imagem: '/assets/kit-pizza.png'
    }
  ]);

  return (
    <div className="kits-layout">
      
      {/* BARRA LATERAL (SIDEBAR) */}
      <aside className="sidebar-profile">
        <div className="profile-header">
          <div className="avatar-placeholder"></div>
          <div>
            <h3>Imperial Member</h3>
            <p>Cliente Ouro</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item">Minha Conta</button>
          <button className="nav-item">Pedidos</button>
          <button className="nav-item">Favoritos</button>
          <button className="nav-item">Endereços</button>
          <button className="nav-item sair-btn" onClick={() => navigate('/')}>Sair</button>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="kits-main-content">
        
        {/* HERO BANNER */}
        <section className="kits-hero">
          <div className="hero-content">
            <span className="hero-subtitle">IMPERIAL GASTRONOMY</span>
            <h1 className="hero-title">Kits Gastronômicos</h1>
            <p>Curadoria exclusiva de charcutaria, queijos premium e acompanhamentos artesanais, montados para proporcionar uma experiência sensorial única.</p>
            <div className="hero-buttons">
              <button className="btn-primary">EXPLORAR SELEÇÃO</button>
              <button className="btn-secondary">PERSONALIZAR KIT</button>
            </div>
          </div>
        </section>

        {/* GRID DE KITS ASSIMÉTRICO */}
        <section className="kits-grid-section">
          <div className="custom-grid">
            {/* Renderiza o item grande à esquerda */}
            {kitsEmDestaque.filter(k => k.tipo === 'destaque').map(kit => (
              <div key={kit.id} className="kit-card card-large" style={{ backgroundImage: `url(${kit.imagem})` }}>
                <div className="card-overlay">
                  {kit.tag && <span className="badge-tag">⭐ {kit.tag}</span>}
                  <h2>{kit.nome}</h2>
                  <p>{kit.descricao}</p>
                  <span className="price">R$ {kit.preco.toFixed(2).replace('.', ',')}</span>
                  <button className="btn-primary btn-add">Adicionar ao Carrinho</button>
                </div>
              </div>
            ))}

            {/* Renderiza os itens menores à direita */}
            <div className="small-cards-column">
              {kitsEmDestaque.filter(k => k.tipo === 'normal').map(kit => (
                <div key={kit.id} className="kit-card card-small" style={{ backgroundImage: `url(${kit.imagem})` }}>
                  <div className="card-overlay">
                    <h3>{kit.nome}</h3>
                    <span className="price-small">R$ {kit.preco.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO INFERIOR: EXCLUSIVIDADE */}
        <section className="exclusivity-section">
          <div className="exclusivity-text">
            <span className="section-divider">--- Exclusividade</span>
            <h2>Crie sua Própria <br/><em>Assinatura de Sabor</em></h2>
            <p>Nosso ateliê permite que você selecione cada item do seu kit. Escolha entre mais de 150 variedades de frios nobres, molhos artesanais e massas congeladas premium sob medida para o seu paladar.</p>
            
            <ul className="benefits-list">
              <li>Cortes de charcutaria fatiados na hora</li>
              <li>Consultoria em harmonização de condimentos</li>
              <li>Entrega climatizada em embalagens premium</li>
            </ul>
            
            <button className="btn-primary">INICIAR PERSONALIZAÇÃO</button>
          </div>
          
          <div className="exclusivity-image">
            {/* Imagem do Chef */}
            <div className="badge-options">
              <strong>150+</strong>
              <span>Opções de Seleção</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}