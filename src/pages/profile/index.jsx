import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProdutos } from '../../hooks/useProdutos';
import './style.css';
import CartManager from '../../components/CartManager';
import ReiEntregadorImg from '../../assets/ReiEntregador.jpeg';

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
  const location = useLocation();
  const navigate = useNavigate();

  const abaAtiva = new URLSearchParams(location.search).get('tab') || 'conta';

  const handleChangeTab = (tab) => {
    navigate(`/perfil?tab=${tab}`);
  };

  // Controle do formulário de novo endereço
  const [mostrarFormEndereco, setMostrarFormEndereco] = useState(false);
  const [editingEnderecoId, setEditingEnderecoId] = useState(null);
  const [cepError, setCepError] = useState('');
  const [enderecoForm, setEnderecoForm] = useState({
    titulo: '',
    cep: '',
    cidade: '',
    rua: '',
    complemento: '',
    bairro: ''
  });

  const lookupCep = async (cepValue) => {
    const cleanCep = cepValue.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setCepError('CEP deve ter 8 dígitos.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError('CEP não encontrado.');
        return;
      }

      setEnderecoForm((prev) => ({
        ...prev,
        rua: data.logradouro || prev.rua,
        bairro: data.bairro || prev.bairro,
        cidade: data.localidade && data.uf ? `${data.localidade} - ${data.uf}` : prev.cidade,
        complemento: data.complemento || prev.complemento,
        cep: cleanCep
      }));
      setCepError('');
    } catch {
      setCepError('Falha ao buscar CEP. Tente novamente.');
    }
  };

  const handleCepChange = (event) => {
    const rawValue = event.target.value;
    const onlyDigits = rawValue.replace(/\D/g, '');
    if (onlyDigits.length <= 8) {
      setEnderecoForm((prev) => ({ ...prev, cep: onlyDigits }));
    }
    if (onlyDigits.length === 8) {
      lookupCep(onlyDigits);
    }
  };

  const handleCepBlur = () => {
    const cleanCep = enderecoForm.cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      lookupCep(cleanCep);
    }
  };

  // --- MOCK DE DADOS ---
  const [usuario] = useState({
    nome: 'Adriano',
    nivel: 'Cliente Ouro',
    pontos: '12.450',
    proximoNivel: 'Imperial Diamond'
  });

  const [historicoPedidos] = useState([]);

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

  const { favoritos, removerFavorito, adicionarProduto } = useProdutos();

  const [enderecos, setEnderecos] = useState([
    {
      id: 1,
      titulo: 'Residência Principal',
      rua: 'Av. Boa Viagem, 4500, Apt 1502',
      bairro: 'Boa Viagem',
      cidade: 'Recife - PE',
      cep: '51021-000',
      complemento: 'Apt 1502',
      principal: true
    },
    {
      id: 2,
      titulo: 'Casa de Campo',
      rua: 'Rodovia BR-232, Km 82, Condomínio Alpino',
      bairro: 'Zona Rural',
      cidade: 'Gravatá - PE',
      cep: '55640-000',
      complemento: '',
      principal: false
    }
  ]);

  const resetEnderecoForm = () => {
    setEditingEnderecoId(null);
    setEnderecoForm({
      titulo: '',
      cep: '',
      cidade: '',
      rua: '',
      complemento: '',
      bairro: ''
    });
  };

  const handleEditarEndereco = (endereco) => {
    setEditingEnderecoId(endereco.id);
    setEnderecoForm({
      titulo: endereco.titulo,
      cep: endereco.cep,
      cidade: endereco.cidade,
      rua: endereco.rua,
      complemento: endereco.complemento || '',
      bairro: endereco.bairro
    });
    setMostrarFormEndereco(true);
  };

  const handleSalvarEndereco = () => {
    const novoEndereco = {
      id: editingEnderecoId || Date.now(),
      titulo: enderecoForm.titulo,
      cep: enderecoForm.cep,
      cidade: enderecoForm.cidade,
      rua: enderecoForm.rua,
      complemento: enderecoForm.complemento,
      bairro: enderecoForm.bairro,
      principal: editingEnderecoId ? enderecos.find((end) => end.id === editingEnderecoId)?.principal : false
    };

    if (editingEnderecoId) {
      setEnderecos((prev) => prev.map((end) =>
        end.id === editingEnderecoId ? { ...end, ...novoEndereco } : end
      ));
    } else {
      setEnderecos((prev) => [...prev, novoEndereco]);
    }

    resetEnderecoForm();
    setMostrarFormEndereco(false);
  };

  const handleTogglePrincipal = (id) => {
    setEnderecos((prev) => prev.map((end) => ({
      ...end,
      principal: end.id === id
    })));
  };

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
            onClick={() => handleChangeTab('conta')}
          >
            Minha Conta
          </button>
          <button 
            className={`nav-item ${abaAtiva === 'pedidos' ? 'active' : ''}`}
            onClick={() => handleChangeTab('pedidos')}
          >
            Pedidos
          </button>
          <button 
            className={`nav-item ${abaAtiva === 'favoritos' ? 'active' : ''}`}
            onClick={() => handleChangeTab('favoritos')}
          >
            Favoritos
          </button>
          <button 
            className={`nav-item ${abaAtiva === 'enderecos' ? 'active' : ''}`}
            onClick={() => handleChangeTab('enderecos')}
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
                {historicoPedidos.length === 0 ? (
                  <div className="empty-state">Nenhum histórico de transações disponível no momento.</div>
                ) : (
                  historicoPedidos.map((pedido) => (
                    <div key={pedido.id} className="transaction-item">
                      <div className="transaction-image-container">
                        <img src={pedido.imagem} alt={pedido.titulo} className="transaction-image" />
                      </div>
                      <div className="transaction-details">
                        <h4>{pedido.titulo}</h4>
                        <p>Status: <span className="status-badge">{pedido.status}</span> em {pedido.data}</p>
                      </div>
                      <button className="btn-secondary btn-ver-detalhes" onClick={() => handleChangeTab('pedidos')}>
                        Ver Detalhes
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>
          </>
        )}

        {/* ================= ABA: PEDIDOS ================= */}
        {abaAtiva === 'pedidos' && (
          <>
            <CartManager />

            <section className="product-manager-section">
              

              <div className="product-list">
                {detalhesPedidos.map((pedido) => (
                  <div key={pedido.id} className="product-card-manage">
                    <div className="product-card-main">
                      <img src={ReiEntregadorImg} alt="Entregador" className="product-card-image" />
                      <div className="product-card-details">
                      </div>
                    </div>
                    <div className="product-actions">
                      
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
            </div> // funtion fav

            <div className="product-list">
              {favoritos.length === 0 ? (
                <div className="empty-state">Você ainda não possui itens favoritos.</div>
              ) : (
                favoritos.map((item) => (
                  <div key={item.id} className="product-card-manage">
                    <div className="product-card-main">
                      {item.imagem ? (
                        <img src={item.imagem} alt={item.nome} className="product-card-image" />
                      ) : (
                        <div className="product-card-image placeholder">Sem imagem</div>
                      )}
                      <div className="product-card-details">
                        <h4>{item.nome}</h4>
                        <p>{item.origem}</p>
                        <p>{item.description}</p>
                        <span className="product-card-price">R$ {Number(item.preco).toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                    <div className="product-actions">
                      <button
                        type="button"
                        className="btn-resgatar"
                        style={{ padding: '10px 20px', width: '100%' }}
                        onClick={() => adicionarProduto(item)}
                      >
                        Adicionar ao Carrinho
                      </button>
                      <button
                        type="button"
                        className="btn-ver-detalhes"
                        onClick={() => removerFavorito(item.id)}
                      >
                        Remover
                      </button>
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
                onClick={() => {
                  resetEnderecoForm();
                  setMostrarFormEndereco((prev) => !prev);
                }}
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
                    <input
                      type="text"
                      placeholder="Nomeie este endereço"
                      value={enderecoForm.titulo}
                      onChange={(e) => setEnderecoForm((prev) => ({ ...prev, titulo: e.target.value }))}
                    />
                  </div>
                  <div className="form-field">
                    <label>CEP</label>
                    <input
                      type="text"
                      placeholder="00000000"
                      value={enderecoForm.cep}
                      onChange={handleCepChange}
                      onBlur={handleCepBlur}
                    />
                    {cepError && <span className="input-error">{cepError}</span>}
                  </div>
                  <div className="form-field">
                    <label>Cidade / Estado</label>
                    <input
                      type="text"
                      placeholder="Ex: Recife - PE"
                      value={enderecoForm.cidade}
                      onChange={(e) => setEnderecoForm((prev) => ({ ...prev, cidade: e.target.value }))}
                    />
                  </div>
                  <div className="form-field form-field-full">
                    <label>Logradouro e Número</label>
                    <input
                      type="text"
                      placeholder="Rua, Avenida, Número..."
                      value={enderecoForm.rua}
                      onChange={(e) => setEnderecoForm((prev) => ({ ...prev, rua: e.target.value }))}
                    />
                  </div>
                  <div className="form-field form-field-full">
                    <label>Complemento e Bairro</label>
                    <input
                      type="text"
                      placeholder="Apt, Bloco, Condomínio, Bairro"
                      value={enderecoForm.complemento}
                      onChange={(e) => setEnderecoForm((prev) => ({ ...prev, complemento: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="product-form-actions">
                  <button className="btn-resgatar" onClick={handleSalvarEndereco}>
                    {editingEnderecoId ? 'Atualizar Endereço' : 'Salvar Endereço'}
                  </button>
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
                    <button className="btn-ver-detalhes" style={{ borderColor: '#333', color: '#fff' }} onClick={() => handleEditarEndereco(end)}>
                      Editar
                    </button>
                    {!end.principal && (
                      <button className="btn-ver-detalhes" onClick={() => handleTogglePrincipal(end.id)}>
                        Tornar Principal
                      </button>
                    )}
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