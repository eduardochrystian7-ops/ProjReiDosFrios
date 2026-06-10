import { useState } from 'react';
import { useProdutos } from '../../hooks/useProdutos';
import tabuaImperialImg from '../../assets/tabuaImperial.jpg';
import tabuafriosImg from '../../assets/tabuafrios.jpg';
import kitPizzaGourmetImg from '../../assets/KitPizzaGourmet.jpg';
import './Kits.css';

export default function Kits() {
  
  const { adicionarProduto } = useProdutos();

  // Dados simulados para o layout (prontos para o hook do CRUD depois)
  const [kitsEmDestaque] = useState([
    {
      id: 1,
      tipo: 'destaque',
      nome: 'Tábua Imperial Grande',
      descricao: 'A seleção definitiva para recepções. Serve até 10 pessoas com o melhor da charcutaria mundial e antepastos premium.',
      preco: 549.00,
      imagem: tabuaImperialImg,
      tag: 'Mais Vendido'
    },
    {
      id: 2,
      tipo: 'normal',
      nome: 'Kit Degustação de Frios',
      preco: 389.00,
      imagem: tabuafriosImg
    },
    {
      id: 3,
      tipo: 'normal',
      nome: 'Kit Pizza Gourmet',
      preco: 195.00,
      imagem: kitPizzaGourmetImg
    }
  ]);

  return (
    <div className="kits-layout">
      <main className="kits-main-content">
        {/* HERO BANNER */}
        <section className="kits-hero">
          <div className="hero-content">
            <span className="hero-subtitle">IMPERIAL GASTRONOMY</span>
            <h1 className="hero-title">Kits Gastronômicos</h1>
            <p>Curadoria exclusiva de charcutaria, queijos premium e acompanhamentos artesanais, montados para proporcionar uma experiência sensorial única.</p>
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
                  <button
                    className="btn-primary btn-add"
                    onClick={() => {
                      adicionarProduto({
                        nome: kit.nome,
                        descricao: kit.descricao,
                        preco: kit.preco,
                        imagem: kit.imagem,
                        tag: kit.tag,
                        tipo: kit.tipo
                      });
                      alert('produto adicionado!');
                    }}
                  >
                    Adicionar ao Carrinho
                  </button>
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
                    <button
                      className="btn-primary btn-add"
                      onClick={(e) => {
                        e.stopPropagation();
                        adicionarProduto({
                          nome: kit.nome,
                          descricao: kit.descricao || kit.nome,
                          preco: kit.preco,
                          imagem: kit.imagem,
                          tipo: kit.tipo
                        });
                        alert('produto adicionado!');
                      }}
                    >
                      Adicionar ao Carrinho
                    </button>
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
          </div>
        </section>

      </main>
    </div>
  );
}