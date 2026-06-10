import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProdutos } from '../../hooks/useProdutos';
import './style.css';

export default function Charcutaria() {
  const { adicionarProduto } = useProdutos();

  const [filtroOrigem, setFiltroOrigem] = useState({});

  // Mock de dados baseado na imagem
  const [produtos] = useState([
    {
      id: 1,
      nome: 'Presunto Ibérico 100% Bellota',
      origem: 'ESPANHA',
      cura: '36 MESES CURA',
      descricao: 'A máxima expressão da charcutaria espanhola. Notas intensas de...',
      preco: '189,90',
      unidade: '/100g',
      imagem: '/assets/presunto-iberico.png',
      premium: true,
      cardBg: '#A31C1C'
    },
    {
      id: 2,
      nome: 'Prosciutto di Parma D.O.P',
      origem: 'ITÁLIA',
      cura: '24 MESES CURA',
      descricao: 'Original da região de Emilia-Romagna. Sabor suave e...',
      preco: '84,00',
      unidade: '/100g',
      imagem: '/assets/prosciutto.png',
      premium: false,
      cardBg: '#FFFFFF'
    },
    {
      id: 3,
      nome: 'Salame de Javali e Especiarias',
      origem: 'BRASIL',
      cura: '6 MESES CURA',
      descricao: 'Charcutaria artesanal serrana. Intensidade rústica com toque de...',
      preco: '42,90',
      unidade: '/100g',
      imagem: '/assets/salame-javali.png',
      premium: false,
      cardBg: '#1A2F2C'
    },
    {
      id: 4,
      nome: 'Pancetta Arrotolata Imperial',
      origem: 'ITÁLIA',
      cura: '12 MESES CURA',
      descricao: 'Barriga de porco curada com ervas finas e especiarias. Essencial para...',
      preco: '38,50',
      unidade: '/100g',
      imagem: '/assets/pancetta.png',
      premium: false,
      cardBg: '#222222'
    },
    {
      id: 5,
      nome: 'Chorizo Ibérico Extra Pimentón',
      origem: 'ESPANHA',
      cura: '18 MESES CURA',
      descricao: 'Temperado com o lendário Pimentón de la Vera...',
      preco: '56,00',
      unidade: '/100g',
      imagem: '/assets/chorizo.png',
      premium: false,
      cardBg: '#8A5A44'
    }
  ]);

  const handleFiltroOrigem = (origem) => {
    setFiltroOrigem((prev) => ({
      ...prev,
      [origem]: !prev[origem]
    }));
  };

  const produtosFiltrados = Object.keys(filtroOrigem).some((key) => filtroOrigem[key])
    ? produtos.filter((p) => filtroOrigem[p.origem])
    : produtos;

  return (
    <div className="charcutaria-page">
      {/* HEADER COPIADO DO PADRÃO DO PROJETO */}
      <header className="site-header">
        <h1 className="logo-text">REI DOS FRIOS</h1>
        <nav className="main-nav">
          <Link to="/charcutaria" className="active">CHARCUTARIA</Link>
          
          <Link to="/kits">KITS</Link>
          
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="charcutaria-hero">
        <div className="hero-content">
          <span className="hero-subtitle">SELEÇÃO IMPERIAL</span>
          <h1 className="hero-title">Charcutaria de Herança</h1>
          <p className="hero-description">
            Dos campos de Jabugo às colinas de Parma, trazemos as peças mais exclusivas do mundo para sua mesa.
          </p>
          
        </div>
      </section>

      {/* MAIN CONTENT (Sidebar + Grid) */}
      <main className="charcutaria-main-container">
        
        {/* SIDEBAR DE FILTROS */}
        <aside className="charcutaria-sidebar">
          <div className="filter-group">
            <h3 className="filter-title">País de Origem</h3>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filtroOrigem['ESPANHA'] || false}
                onChange={() => handleFiltroOrigem('ESPANHA')}
              />
              Espanha
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filtroOrigem['ITÁLIA'] || false}
                onChange={() => handleFiltroOrigem('ITÁLIA')}
              />
              Itália
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filtroOrigem['BRASIL'] || false}
                onChange={() => handleFiltroOrigem('BRASIL')}
              />
              Brasil Artesanal
            </label>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Tempo de Cura</h3>
            <label className="radio-label">
              <input type="radio" name="cura" /> Acima de 36 meses
            </label>
            <label className="radio-label">
              <input type="radio" name="cura" /> 12 a 24 meses
            </label>
            <label className="radio-label">
              <input type="radio" name="cura" /> Reserva Familiar
            </label>
          </div>

          <button className="btn-outline-gold" onClick={() => setFiltroOrigem({})}>Limpar Filtros</button>
        </aside>

        {/* GRID DE PRODUTOS */}
        <section className="charcutaria-grid">
          {produtosFiltrados.map((produto) => (
            <div key={produto.id} className="product-card">
              <div className="product-image-container" style={{ backgroundColor: produto.cardBg }}>
                {produto.premium && <span className="premium-badge">★ PREMIUM</span>}
                {/* Fallback caso não tenha a imagem local */}
                <div className="img-placeholder" style={{ backgroundImage: `url(${produto.imagem})` }}></div>
              </div>
              <div className="product-details">
                <span className="product-meta">{produto.origem} • {produto.cura}</span>
                <h3 className="product-name">{produto.nome}</h3>
                <p className="product-desc">{produto.descricao}</p>
                <div className="product-footer">
                  <div className="product-price">
                    <span className="currency">R$</span> {produto.preco} <span className="unit">{produto.unidade}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-primary btn-add"
                    onClick={() => {
                      adicionarProduto({
                        nome: produto.nome,
                        origem: produto.origem,
                        preco: produto.preco,
                        imagem: produto.imagem,
                        tag: produto.premium ? 'Premium' : null,
                        description: produto.descricao,
                        unidade: produto.unidade
                      });
                      alert('produto adicionado!');
                    }}
                  >
                    ADICIONAR
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* CARD ESPECIAL: MONTE SUA TÁBUA */}
         
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <h2 className="footer-logo">REI DOS FRIOS</h2>
        <div className="footer-links">
          <Link to="/privacidade">PRIVACIDADE</Link>
          <Link to="/termos">TERMOS DE USO</Link>
          <Link to="/envios">ENVIO E PRAZOS</Link>
          <Link to="/contato">CONTATO</Link>
        </div>
        <p className="copyright">© 2026 REI DOS FRIOS - IMPERIAL GASTRONOMY. TODOS OS DIREITOS RESERVADOS.</p>
      </footer>
    </div>
  );
}