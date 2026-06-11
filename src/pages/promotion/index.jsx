import { useState } from 'react';
import { useProdutos } from '../../hooks/useProdutos';
import './style.css';

export default function Promocoes() {
  const { produtos } = useProdutos();
  
  // Filtra apenas produtos que tenham "promo" na tag (ex: "Promoção", "promo")
  const produtosPromocionais = produtos.filter(
    (produto) => produto.tag && produto.tag.toLowerCase().includes('promo')
  );

  const [email, setEmail] = useState('');
  const [inscrito, setInscrito] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Integração com backend para newsletter entraria aqui
    console.log('Cliente VIP inscrito:', email);
    setInscrito(true);
    
    setTimeout(() => {
      setInscrito(false);
      setEmail('');
    }, 3000);
  };

  return (
    <div className="promocoes-container">
      {/* HEADER - Mantendo a mesma estrutura */}
      <header className="promocoes-header">
        <h1 className="logo-text">Rei dos Frios</h1>
        <nav>
          <a href="/catalogo">PRODUTOS</a>
          <a href="/promocoes" className="active">PROMOÇÕES</a>
          <a href="/contato">CONTATO</a>
        </nav>
      </header>

      <main className="promocoes-main">
        <div className="promocoes-hero">
          <span className="subtitle">OFERTAS DA COROA</span>
          <h2 className="title">Promoções Imperiais</h2>
          <p>Seleção exclusiva de charcutaria e queijos finos com condições especiais para nossos clientes mais nobres.</p>
        </div>

        <section className="promo-list-section">
          <h3 className="section-title">Destaques com Desconto</h3>
          
          <div className="promo-grid">
            {produtosPromocionais.length === 0 ? (
              <div className="empty-state">
                No momento, o Rei não decretou novas promoções. Volte em breve!
              </div>
            ) : (
              produtosPromocionais.map((produto) => (
                <div key={produto.id} className="promo-card">
                  <div className="promo-badge">OFERTA</div>
                  {produto.imagem ? (
                    <img src={produto.imagem} alt={produto.nome} className="promo-card-image" />
                  ) : (
                    <div className="promo-card-image placeholder">Sem imagem</div>
                  )}
                  <div className="promo-card-content">
                    <span className="promo-tag">{produto.tag}</span>
                    <h4>{produto.nome}</h4>
                    <p className="origem">{produto.origem}</p>
                    <p className="descricao">{produto.description || produto.descricao}</p>
                    <div className="price-container">
                      <span className="price-label">Por apenas:</span>
                      <span className="promo-price">
                        R$ {Number(produto.preco).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <button className="btn-primary btn-full">Adicionar ao Banquete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* SEÇÃO DE NEWSLETTER VIP (Inspirada no form de contato) */}
        <section className="vip-club-section">
          <div className="vip-club-content">
            <h3>Clube Real de Ofertas</h3>
            <p>Cadastre seu e-mail e seja o primeiro a saber quando o Rei liberar novos descontos.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="vip-form">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail real..."
                required
              />
              <button type="submit" className="btn-submit" disabled={inscrito}>
                {inscrito ? 'CADASTRADO ✓' : 'ENTRAR PARA O CLUBE'}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}