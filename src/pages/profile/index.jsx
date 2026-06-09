import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    // Aqui podemos limpar tokens/estado de autenticação se houver
    navigate('/', { replace: true });
  }

  return (
    <button onClick={handleLogout} className="nav-item sair-btn">Sair</button>
  );
}

export default function Profile() {
  // Simulando dados do usuário logado (posteriormente virão de um Context ou API)
  const [usuario] = useState({
    nome: 'Adriano',
    nivel: 'Cliente Ouro',
    pontos: '12.450',
    proximoNivel: 'Imperial Diamond'
  });

  const navigate = useNavigate();


  // Simulando o histórico de pedidos visível no design
  const [historicoPedidos] = useState([
    {
      id: 1,
      titulo: 'Seleção Especial de Presuntos Ibéricos & Vinhos Nobres',
      data: '15 de Março de 2026',
      status: 'Entregue',
      imagem: '/assets/pedido-ibericos.png' // Substituir pelo caminho real
    },
    {
      id: 2,
      titulo: 'Tábua Imperial Grande & Queijos Maturados',
      data: '28 de Fevereiro de 2026',
      status: 'Entregue',
      imagem: '/assets/tabua-grande.png'
    }
  ]);

  return (
    <div className="profile-layout">
      
      {/* BARRA LATERAL (REUTILIZADA DA ARQUITETURA DE KITS) */}
      <aside className="sidebar-profile">
        <div className="profile-header">
          <div className="avatar-placeholder"></div>
          <div>
            <h3>Imperial Member</h3>
            <p>{usuario.nivel}</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">Minha Conta</button>
          <button className="nav-item">Pedidos</button>
          <button className="nav-item">Favoritos</button>
          <button className="nav-item">Endereços</button>
          <LogoutButton />
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL DO PERFIL */}
      <main className="profile-main-content">
        
        {/* HEADER INTERNO / BOAS-VINDAS */}
        <section className="profile-welcome-section">
          <span className="profile-subtitle">SEU SANTUÁRIO GASTRONÔMICO</span>
          <h1 className="profile-title">Olá, Sr. {usuario.nome}</h1>
          <p className="profile-description">
            Aqui você acompanha o seu status nominal, consome suas opções exclusivas, 
            acompanha seus pedidos e expande seus benefícios no Club Imperial.
          </p>
        </section>

        {/* PAINEL CARD CLUB IMPERIAL */}
        <section className="club-imperial-card">
          <div className="club-info">
            <span className="club-tag">CLUB IMPERIAL</span>
            <div className="points-display">
              <h2>{usuario.pontos}</h2>
              <span className="points-label">PONTOS</span>
            </div>
            <p className="next-tier-info">Próximo nível: <strong>{usuario.proximoNivel}</strong></p>
          </div>
          
          <div className="club-actions">
            <div className="star-badge-icon">
              {/* Ícone de medalha/estrela estilizado por CSS */}
              <div className="badge-star">★</div>
            </div>
            <button className="btn-primary btn-resgatar">RESGATAR BENEFÍCIOS</button>
          </div>
        </section>

        {/* HISTÓRICO DE TRANSAÇÕES */}
        <section className="transactions-section">
          <h3 className="section-title">Histórico de Transações</h3>
          
          <div className="transactions-list">
            {historicoPedidos.map((pedido) => (
              <div key={pedido.id} className="transaction-item">
                <div className="transaction-image-container">
                  <img src={pedido.imagem} alt={pedido.titulo} className="transaction-image" />
                </div>
                
                <div className="transaction-details">
                  <h4>{pedido.titulo}</h4>
                  <p>Status: <span className="status-badge">{pedido.status}</span> em {pedido.data}</p>
                </div>
                
                <button className="btn-secondary btn-ver-detalhes">Ver Detalhes</button>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}