import { Link, useParams } from 'react-router-dom';
import { useProdutos } from '../../hooks/useProdutos';
import gorgonzolaImg from '../../assets/gorgonzola.jpg';
import prosciuttoImg from '../../assets/prosciutto.jpg';
import salameImg from '../../assets/salame.jpg';
import brieImg from '../../assets/brie.png';
import './ProductCard.css'; // Arquivo de estilos que criaremos

export function ProductCard({ id, nome, origem, preco, imagem, tag, description }) {
  const { adicionarProduto } = useProdutos();

  const handleAdicionar = (e) => {
    e.preventDefault();
    adicionarProduto({ nome, origem, preco, imagem, tag, description });
    alert('produto adicionado!');
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
          <p className="product-desc">{description}</p>
          <p className="product-price">
            R$ {preco.toFixed(2).replace('.', ',')} <span className="unit">/ kg</span>
          </p>
        </div>

        <button className="btn-primary btn-add" onClick={handleAdicionar}>ADICIONAR</button>
      </div>
    </Link>
  );
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { produtos: produtosSalvos } = useProdutos();

  const produtos = [
    { id: 1, nome: 'Gorgonzola Dolce', origem: 'ORIGEM: ITÁLIA', preco: 145.90, imagem: gorgonzolaImg, tag: 'Premium', description: '' },
    { id: 2, nome: 'Prosciutto di Parma', origem: 'MATURADO 18 MESES', preco: 289.00, imagem: prosciuttoImg, tag: null, description: '' },
    { id: 3, nome: 'Salame Milano', origem: 'TEMPEROS NOBRES', preco: 98.50, imagem: salameImg, tag: null, description: '' },
    { id: 4, nome: 'Queijo Brie Double Cream', origem: 'TEXTURA AVELUDADA', preco: 112.00, imagem: brieImg, tag: null, description: '' }
  ];

  const todosProdutos = [
    ...produtos,
    ...produtosSalvos.filter((salvo) => !produtos.some((produto) => String(produto.id) === String(salvo.id)))
  ];

  const produto = todosProdutos.find((p) => String(p.id) === String(id));

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
          <p className="details-description">{produto.description}</p>
        </div>
      </div>
    </main>
  );
}