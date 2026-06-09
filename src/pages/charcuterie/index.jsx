import { useProdutos } from '../../hooks/useProdutos';
import './style.css';

export default function Charcuterie() {
  const { produtos } = useProdutos();
  
  // Filtra produtos que tenham relação com charcutaria (ajuste a string conforme suas tags)
  const produtosCharcutaria = produtos.filter(
    (produto) => 
      produto.tag?.toLowerCase().includes('charcutaria') || 
      produto.tag?.toLowerCase().includes('embutido') ||
      produto.nome.toLowerCase().includes('salame') ||
      produto.nome.toLowerCase().includes('copa')
  );

  return (
    <div className="charcuterie-container">
      {/* HEADER REUTILIZADO */}
      <header className="charcuterie-header">
        <h1 className="logo-text">Rei dos Frios</h1>
        <nav>
          <a href="/catalogo">PRODUTOS</a>
          <a href="/charcutaria" className="active">CHARCUTARIA</a>
          <a href="/promocoes">PROMOÇÕES</a>
          <a href="/contato">CONTATO</a>
        </nav>
      </header>

      <main className="charcuterie-main">
        {/* HERO SECTION */}
        <div className="charcuterie-hero">
          <span className="subtitle">ARTE MILENAR DA CURA</span>
          <h2 className="title">Nossa Charcutaria</h2>
          <p>Cortes nobres, curados com paciência e excelência. Descubra a verdadeira tradição em cada fatia do nosso reino.</p>
        </div>

        {/* LISTA DE PRODUTOS */}
        <section className="charcuterie-list-section">
          <div className="section-header">
            <h3 className="section-title">Embutidos e Curados Premium</h3>
            <p className="section-description">Selecione as melhores peças para a sua tábua.</p>
          </div>

          <div className="charcuterie-grid">
            {produtosCharcutaria.length === 0 ? (
              <div className="empty-state">
                O mestre curador ainda está preparando nossas peças. Volte em breve!
              </div>
            ) : (
              produtosCharcutaria.map((produto) => (
                <div key={produto.id} className="charcuterie-card">
                  <div className="card-image-wrapper">
                    {produto.imagem ? (
                      <img src={produto.imagem} alt={produto.nome} className="card-image" />
                    ) : (
                      <div className="card-image placeholder">Arte em preparo</div>
                    )}
                    {produto.tag && <span className="card-badge">{produto.tag}</span>}
                  </div>
                  
                  <div className="card-content">
                    <h4>{produto.nome}</h4>
                    <span className="origem-text">🥩 Origem: {produto.origem || 'Desconhecida'}</span>
                    <p className="descricao-text">{produto.description || produto.descricao}</p>
                    
                    <div className="card-footer">
                      <span className="price">R$ {Number(produto.preco).toFixed(2).replace('.', ',')}</span>
                      <button className="btn-primary" type="button">
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* SEÇÃO INFORMATIVA (ESTILO BOUTIQUE) */}
        <section className="curation-info-section">
          <div className="info-content">
            <h3>O Tempo é o Nosso Principal Ingrediente</h3>
            <p>
              Na corte do Rei dos Frios, acreditamos que a pressa é inimiga da perfeição. 
              Nossos produtos passam por um rigoroso processo de maturação em câmaras com umidade e 
              temperatura controladas, garantindo notas de sabor inconfundíveis e uma textura que derrete na boca.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}