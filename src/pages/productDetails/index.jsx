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
    { id: 1, nome: 'Gorgonzola Dolce', origem: 'ORIGEM: ITÁLIA', preco: 145.90, imagem: gorgonzolaImg, tag: 'Premium', description: 'Se você acha que todo queijo azul é agressivo e picante, o Gorgonzola Dolce vai mudar o seu conceito. Originário do norte da Itália, esta versão é o equilíbrio perfeito entre a tradição dos queijos de mofo azul e uma delicadeza surpreendente.' },
    { id: 2, nome: 'Prosciutto di Parma', origem: 'MATURADO 18 MESES', preco: 289.00, imagem: prosciuttoImg, tag: null, description: 'O Prosciutto di Parma é sinônimo de tradição, tempo e pureza. Produzido exclusivamente na região de Parma, na Itália, sob rigorosas regras de denominação de origem (DOP), este presunto cru leva apenas dois ingredientes: carne suína selecionada e sal marinho. O resto é pura magia do tempo e do ar das colinas italianas.' },
    { id: 3, nome: 'Salame Milano', origem: 'TEMPEROS NOBRES', preco: 98.50, imagem: salameImg, tag: null, description: 'O Salame Milano é um clássico da culinária italiana, conhecido por sua textura macia e sabor intenso. Feito com carne de porco selecionada e temperos nobres, é perfeito para acompanhar vinhos tintos e queijos.' },
    { id: 4, nome: 'Queijo Brie Double Cream', origem: 'TEXTURA AVELUDADA', preco: 112.00, imagem: brieImg, tag: null, description: 'O Queijo Brie Double Cream é uma versão rica e cremosa do famoso queijo Brie. Com uma textura suave e sabor delicado, é ideal para servir com pães artesanais e frutas frescas.' }
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
        <div className="details-image-wrapper">
          <div className="details-image">
            <img src={produto.imagem} alt={produto.nome} />
          </div>
          <p className="details-description">{produto.description}</p>
        </div>
        <div className="details-info">
          <h2>{produto.nome}</h2>
          <p>{produto.origem}</p>
          <p className="details-price">R$ {produto.preco.toFixed(2).replace('.', ',')} / kg</p>
        </div>
      </div>
    </main>
  );
}