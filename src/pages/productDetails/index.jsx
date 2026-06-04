import './ProductCard.css'; // Arquivo de estilos que criaremos

export default function ProductCard({ nome, origem, preco, imagem, tag }) {
  const handleAdicionar = () => {
    // Futura integração com o carrinho
    console.log(`Produto ${nome} adicionado ao carrinho!`);
  };

  return (
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

      <button className="btn-add" onClick={handleAdicionar}>
        ADICIONAR
      </button>
    </div>
  );
}