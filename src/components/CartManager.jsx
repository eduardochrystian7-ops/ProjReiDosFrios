import { useState } from 'react';
import { useProdutos } from '../hooks/useProdutos';

export default function CartManager() {
  const { produtos, adicionarProduto, editarProduto, excluirProduto } = useProdutos();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [produtoForm, setProdutoForm] = useState({ nome: '', origem: '', preco: '', descricao: '', imagem: '', tag: '' });

  const resetProductForm = () => {
    setSelectedProductId(null);
    setProdutoForm({ nome: '', origem: '', preco: '', descricao: '', imagem: '', tag: '' });
  };

  const startEditProduct = (produto) => {
    setShowNewProductForm(true);
    setSelectedProductId(produto.id);
    setProdutoForm({
      nome: produto.nome || '',
      origem: produto.origem || '',
      preco: produto.preco ?? '',
      descricao: produto.descricao || produto.description || '',
      imagem: produto.imagem || '',
      tag: produto.tag || ''
    });
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProdutoForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductFormSubmit = (e) => {
    e.preventDefault();
    const produtoDados = {
      nome: produtoForm.nome,
      origem: produtoForm.origem,
      preco: Number(produtoForm.preco) || 0,
      imagem: produtoForm.imagem,
      tag: produtoForm.tag,
      description: produtoForm.descricao
    };

    if (selectedProductId) {
      editarProduto(selectedProductId, produtoDados);
    } else {
      adicionarProduto(produtoDados);
    }

    resetProductForm();
    setShowNewProductForm(false);
  };

  const handleProductDelete = (id) => {
    excluirProduto(id);
    if (selectedProductId === id) {
      resetProductForm();
      setShowNewProductForm(false);
    }
  };

  return (
    <section className="product-manager-section">
      <div className="product-manager-header">
        <div>
          <h3 className="section-title">Gerenciador de Itens</h3>
          <p className="section-description">Edite, exclua ou adicione itens do carrinho diretamente na sua conta.</p>
        </div>
        <button
          className="btn-secondary btn-toggle-form"
          type="button"
          onClick={() => { setShowNewProductForm((prev) => !prev); resetProductForm(); }}
        >
          {showNewProductForm ? 'Fechar formulário' : 'Adicionar novo item'}
        </button>
      </div>

      {(showNewProductForm || selectedProductId) && (
        <form className="product-form" onSubmit={handleProductFormSubmit}>
          <div className="product-form-grid">
            <div className="form-field">
              <label htmlFor="nome">Nome</label>
              <input id="nome" name="nome" value={produtoForm.nome} onChange={handleProductFormChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="origem">Origem</label>
              <input id="origem" name="origem" value={produtoForm.origem} onChange={handleProductFormChange} />
            </div>
            <div className="form-field">
              <label htmlFor="preco">Preço</label>
              <input id="preco" name="preco" type="number" step="0.01" value={produtoForm.preco} onChange={handleProductFormChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="tag">Tag</label>
              <input id="tag" name="tag" value={produtoForm.tag} onChange={handleProductFormChange} />
            </div>
            <div className="form-field form-field-full">
              <label htmlFor="imagem">URL da Imagem</label>
              <input id="imagem" name="imagem" value={produtoForm.imagem} onChange={handleProductFormChange} />
            </div>
            <div className="form-field form-field-full">
              <label htmlFor="descricao">Descrição</label>
              <textarea id="descricao" name="descricao" rows="3" value={produtoForm.descricao} onChange={handleProductFormChange} />
            </div>
          </div>

          <div className="product-form-actions">
            <button type="submit" className="btn-primary">{selectedProductId ? 'Salvar alterações' : 'Adicionar item'}</button>
            <button type="button" className="btn-secondary" onClick={() => { resetProductForm(); setShowNewProductForm(false); }}>Cancelar</button>
          </div>
        </form>
      )}

      <div className="product-list">
        {produtos.length === 0 ? (
          <div className="empty-state">Nenhum item salvo no carrinho ainda. Adicione produtos no catálogo, em kits ou manualmente.</div>
        ) : (
          produtos.map((produto) => (
            <div key={produto.id} className="product-card-manage">
              <div className="product-card-main">
                {produto.imagem ? (
                  <img src={produto.imagem} alt={produto.nome} className="product-card-image" />
                ) : (
                  <div className="product-card-image placeholder">Sem imagem</div>
                )}
                <div className="product-card-details">
                  <h4>{produto.nome}</h4>
                  <p>{produto.origem}</p>
                  <span className="product-card-price">R$ {Number(produto.preco).toFixed(2).replace('.', ',')}</span>
                  <p>{produto.description || produto.descricao}</p>
                </div>
              </div>
              <div className="product-actions">
                <button className="btn-primary" type="button" onClick={() => startEditProduct(produto)}>Editar</button>
                <button className="btn-secondary" type="button" onClick={() => handleProductDelete(produto.id)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
