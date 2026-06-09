import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';
import CartManager from '../../components/CartManager';

function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate('/', { replace: true });
  }

  return (
    <button onClick={handleLogout} className="nav-item sair-btn">Sair</button>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Controle de abas: 'conta', 'pedidos', 'favoritos', 'enderecos'
  const [abaAtiva, setAbaAtiva] = useState('conta');
  
  // Controle do formulário de novo endereço
  const [mostrarFormEndereco, setMostrarFormEndereco] = useState(false);

  // --- MOCK DE DADOS ---
  const [usuario] = useState({
    nome: 'Adriano',
    nivel: 'Cliente Ouro',
    pontos: '12.450',
    proximoNivel: 'Imperial Diamond'
  });

  const [historicoPedidos] = useState([
    {
      id: 1,
      titulo: 'Seleção Especial de Presuntos Ibéricos & Vinhos Nobres',
      data: '15 de Março de 2026',
      status: 'Entregue',
      imagem: '/assets/pedido-ibericos.png'
    },
    {
      id: 2,
      titulo: 'Tábua Imperial Grande & Queijos Maturados',
      data: '28 de Fevereiro de 2026',
      status: 'Entregue',
      imagem: '/assets/tabua-grande.png'
    }
  ]);

  const [detalhesPedidos] = useState([
    {
      id: 1,
      codigo: '#IMP-2026-001',
      titulo: 'Seleção Especial de Presuntos Ibéricos & Vinhos Nobres',
      data: '15 de Março de 2026',
      preco: 'R$ 1.450,00',
      status: 'Entregue',
      descricao: 'Inclui 500g de Jamón Ibérico de Bellota, 1 Garrafa Vega Sicilia Valbuena 5º ano e acompanhamentos.',
      imagem: '/assets/pedido-ibericos.png'
    }
  ]);

  const [favoritos] = useState([
    {
      id: 1,
      titulo: 'Caviar Beluga Iraniano 50g',
      preco: 'R$ 2.800,00',
      descricao: 'Ovas selecionadas com textura amanteigada inconfundível. Uma verdadeira joia gastronômica.',
      imagem: '/assets/caviar.png'
    },
    {
      id: 2,
      titulo: 'Vinho Tinto Château Margaux 2015',
      preco: 'R$ 8.950,00',
      descricao: 'Encorpado, com notas de trufas negras e tabaco. Safra excepcional para guarda.',
      imagem: '/assets/vinho.png'
    }
  ]);

  const [enderecos] = useState([
    {
      id: 1,
      titulo: 'Residência Principal',
      rua: 'Av. Boa Viagem, 4500, Apt 1502',
      bairro: 'Boa Viagem',
      cidade: 'Recife - PE',
      cep: '51021-000',
      principal: true
    },
    {
      id: 2,
      titulo: 'Casa de Campo',
      rua: 'Rodovia BR-232, Km 82, Condomínio Alpino',
      bairro: 'Zona Rural',
      cidade: 'Gravatá - PE',
      cep: '55640-000',
      principal: false
    }
  ]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) setAbaAtiva(tab);
  }, [location.search]);

  return (
    <div className="profile-layout">
      
      {/* BARRA LATERAL */}
      <aside className="sidebar-profile">
        <div className="profile-header">
          <div className="avatar-placeholder"></div>
          <div>
            <h3>Imperial Member</h3>
            <p>{usuario.nivel}</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${abaAtiva === 'conta' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('conta')}
          >
            Minha Conta
          </button>
          <button 
            className={`nav-item ${abaAtiva === 'pedidos' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('pedidos')}
          >
            Pedidos
          </button>
          <button 
            className={`nav-item ${abaAtiva === 'favoritos' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('favoritos')}
          >
            Favoritos
          </button>
          <button 
            className={`nav-item ${abaAtiva === 'enderecos' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('enderecos')}
          >
            Endereços
          </button>
          <LogoutButton />
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="profile-main-content">
        
        {/* ================= ABA: MINHA CONTA ================= */}
        {abaAtiva === 'conta' && (
          <>
            <section className="profile-welcome-section">
              <span className="profile-subtitle">SEU SANTUÁRIO GASTRONÔMICO</span>
              <h1 className="profile-title">Olá, Sr. {usuario.nome}</h1>
              <p className="profile-description">
                Aqui você acompanha o seu status nominal, consome suas opções exclusivas, 
                acompanha seus pedidos e expande seus benefícios no Club Imperial.
              </p>
            </section>

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
                  <div className="badge-star">★</div>
                </div>
                <button className="btn-primary btn-resgatar">RESGATAR BENEFÍCIOS</button>
              </div>
            </section>

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
                    <button className="btn-secondary btn-ver-detalhes" onClick={() => setAbaAtiva('pedidos')}>
                      Ver Detalhes
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ================= ABA: PEDIDOS ================= */}
        {abaAtiva === 'pedidos' && (
          <>
            {/* Cart manager moved here */}
            <CartManager />

            <section className="product-manager-section">
              <div className="product-manager-header">
                <div>
                  <h3 className="section-title" style={{ marginBottom: '5px' }}>Meus Pedidos</h3>
                  <p className="section-description">Acompanhe o envio e confira os detalhes das suas aquisições.</p>
                </div>
              </div>

              <div className="product-list">
                {detalhesPedidos.map((pedido) => (
                  <div key={pedido.id} className="product-card-manage">
                    <div className="product-card-main">
                      <div className="product-card-image placeholder">Sem Imagem</div>
                      <div className="product-card-details">
                        <span className="profile-subtitle" style={{ fontSize: '0.7rem', marginBottom: '4px' }}>
                          {pedido.codigo} — {pedido.data}
                        </span>
                        <h4>{pedido.titulo}</h4>
                        <p>{pedido.descricao}</p>
                        <span className="product-card-price">{pedido.preco}</span>
                      </div>
                    </div>
                    <div className="product-actions">
                      <button className="btn-ver-detalhes" style={{ borderColor: '#C5A059', color: '#fff' }}>Rastrear Item</button>
                      <button className="btn-ver-detalhes">Nota Fiscal</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ================= ABA: FAVORITOS ================= */}
        {abaAtiva === 'favoritos' && (
          <section className="product-manager-section">
            <div className="product-manager-header">
              <div>
                <h3 className="section-title" style={{ marginBottom: '5px' }}>Minha Adega & Favoritos</h3>
                <p className="section-description">Sua curadoria pessoal de itens desejados no empório Imperial.</p>
              </div>
            </div>

            <div className="product-list">
              {favoritos.length === 0 ? (
                <div className="empty-state">Você ainda não possui itens favoritos.</div>
              ) : (
                favoritos.map((item) => (
                  <div key={item.id} className="product-card-manage">
                    <div className="product-card-main">
                      <div className="product-card-image placeholder">Img</div>
                      <div className="product-card-details">
                        <h4>{item.titulo}</h4>
                        <p>{item.descricao}</p>
                        <span className="product-card-price">{item.preco}</span>
                      </div>
                    </div>
                    <div className="product-actions">
                      <button className="btn-resgatar" style={{ padding: '10px 20px', width: '100%' }}>Adicionar ao Carrinho</button>
                      <button className="btn-ver-detalhes">Remover</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* ================= ABA: ENDEREÇOS ================= */}
        {abaAtiva === 'enderecos' && (
          <section className="product-manager-section">
            <div className="product-manager-header">
              <div>
                <h3 className="section-title" style={{ marginBottom: '5px' }}>Endereços de Entrega</h3>
                <p className="section-description">Gerencie os locais onde você recebe suas experiências gastronômicas.</p>
              </div>
              <button 
                className="btn-ver-detalhes btn-toggle-form" 
                onClick={() => setMostrarFormEndereco(!mostrarFormEndereco)}
              >
                {mostrarFormEndereco ? 'Cancelar' : '+ Adicionar Novo'}
              </button>
            </div>

            {/* Formulário de Novo Endereço */}
            {mostrarFormEndereco && (
              <div className="product-form">
                <div className="product-form-grid">
                  <div className="form-field form-field-full">
                    <label>Título do Endereço (ex: Trabalho, Casa de Praia)</label>
                    <input type="text" placeholder="Nomeie este endereço" />
                  </div>
                  <div className="form-field">
                    <label>CEP</label>
                    <input type="text" placeholder="00000-000" />
                  </div>
                  <div className="form-field">
                    <label>Cidade / Estado</label>
                    <input type="text" placeholder="Ex: Recife - PE" />
                  </div>
                  <div className="form-field form-field-full">
                    <label>Logradouro e Número</label>
                    <input type="text" placeholder="Rua, Avenida, Número..." />
                  </div>
                  <div className="form-field form-field-full">
                    <label>Complemento e Bairro</label>
                    <input type="text" placeholder="Apt, Bloco, Condomínio, Bairro" />
                  </div>
                </div>
                <div className="product-form-actions">
                  <button className="btn-resgatar" onClick={() => setMostrarFormEndereco(false)}>Salvar Endereço</button>
                </div>
              </div>
            )}

            {/* Lista de Endereços */}
            <div className="product-list">
              {enderecos.map((end) => (
                <div key={end.id} className="product-card-manage" style={{ border: end.principal ? '1px solid #C5A059' : '1px solid #222222' }}>
                  <div className="product-card-main">
                    <div className="product-card-details">
                      <h4>
                        {end.titulo} 
                        {end.principal && <span className="profile-subtitle" style={{ display: 'inline', marginLeft: '10px', fontSize: '0.65rem' }}>(PRINCIPAL)</span>}
                      </h4>
                      <p style={{ color: '#fff' }}>{end.rua}</p>
                      <p>{end.bairro} — {end.cidade} — CEP: {end.cep}</p>
                    </div>
                  </div>
                  <div className="product-actions">
                    <button className="btn-ver-detalhes" style={{ borderColor: '#333', color: '#fff' }}>Editar</button>
                    {!end.principal && <button className="btn-ver-detalhes">Tornar Principal</button>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}