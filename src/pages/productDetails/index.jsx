import { Link, useParams } from 'react-router-dom';
import './ProductCard.css'; // Arquivo de estilos que criaremos

export function ProductCard({ id, nome, origem, preco, imagem, tag }) {
  const handleAdicionar = () => {
    // Futura integração com o carrinho
    console.log(`Produto ${nome} adicionado ao carrinho!`);
  };

  return (
    <Link to={`/produto/${id}`} className="product-card-link">
      <div className="product-card">
        {tag && <span className="product-tag">{tag}</span>}
        
        <div className="product-image-container">
          <img src={imagem} alt={nome} className="product-image" />
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{nome}</h3>
          <p className="product-origin">{origem}</p>
          <p className="product-price">
            R$ {preco.toFixed(2).replace('.', ',')} <span className="unit">/ kg</span>
          </p>
        </div>

        <button className="btn-add" onClick={(e) => { e.preventDefault(); handleAdicionar(); }}>
          ADICIONAR
        </button>
      </div>
    </Link>
  );
}

export default function ProductDetailsPage() {
  const { id } = useParams();

  const produtos = [
    { id: 1, nome: 'Gorgonzola Dolce', origem: 'ORIGEM: ITÁLIA', preco: 145.90, imagem: '/assets/gorgonzola.png', tag: 'Premium' },
    { id: 2, nome: 'Prosciutto di Parma', origem: 'MATURADO 18 MESES', preco: 289.00, imagem: '/assets/prosciutto.png', tag: null },
    { id: 3, nome: 'Salame Milano', origem: 'TEMPEROS NOBRES', preco: 98.50, imagem: '/assets/salame.png', tag: null },
    { id: 4, nome: 'Queijo Brie Double Cream', origem: 'TEXTURA AVELUDADA', preco: 112.00, imagem: '/assets/brie.png', tag: null }
  ];

  const produto = produtos.find(p => String(p.id) === String(id));

  if (!produto) return <div className="product-details">Produto não encontrado</div>;

  return (
    <main className="product-details-page">
      <div className="details-card">
        <div className="details-image">
          <img src={produto.imagem} alt={produto.nome} />
        </div>
        <div className="details-info">
          <h2>{produto.nome}</h2>
          <p>{produto.origem}</p>
          <p className="details-price">R$ {produto.preco.toFixed(2).replace('.', ',')} / kg</p>
          <p className="details-description">Descrição detalhada do produto será adicionada aqui.</p>
        </div>
      </div>
    </main>
  );
}