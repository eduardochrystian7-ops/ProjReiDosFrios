import { useProdutos } from '../../hooks/useProdutos';

export default function Catalog() {
  // Importando apenas o que essa tela precisa ler e usar
  const { produtos, excluirProduto } = useProdutos();

  return (
    <div>
      <h1>Catálogo de Produtos</h1>
      
      <div className="grid-de-produtos">
        {produtos.map(produto => (
          <div key={produto.id} className="card">
            <h3>{produto.nome}</h3>
            <p>R$ {produto.preco}</p>
            <button onClick={() => excluirProduto(produto.id)}>
              Remover
            </button>
          </div>
        ))}
        
        {produtos.length === 0 && <p>Nenhum produto cadastrado ainda.</p>}
      </div>
    </div>
  );
}