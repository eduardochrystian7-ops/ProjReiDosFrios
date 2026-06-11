import { useState } from 'react';
import { useProdutos } from '../../hooks/useProdutos';
import './style.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: 'Dúvida Geral',
    mensagem: ''
  });
  const [enviado, setEnviado] = useState(false);
  const { produtos, adicionarProduto, editarProduto, excluirProduto } = useProdutos();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [produtoForm, setProdutoForm] = useState({
    nome: '',
    origem: '',
    preco: '',
    descricao: '',
    imagem: '',
    tag: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui entraria a integração com o backend para enviar o e-mail
    console.log('Mensagem enviada:', formData);
    setEnviado(true);
    
    // Reseta o formulário após 3 segundos
    setTimeout(() => {
      setEnviado(false);
      setFormData({ nome: '', email: '', assunto: 'Dúvida Geral', mensagem: '' });
    }, 3000);
  };

  return (
    <div className="contact-container">
      {/* HEADER REUTILIZADO (Idealmente extraído para um componente global) */}
      <header className="contact-header">
        <h1 className="logo-text">Rei dos Frios</h1>
        <nav>
          <a href="/catalogo">PRODUTOS</a>
          <a href="#promocoes">PROMOÇÕES</a>
         
          <a href="/contato" className="active">CONTATO</a>
        </nav>
      </header>

      <main className="contact-main">
        <div className="contact-hero">
          <span className="subtitle">ATENDIMENTO IMPERIAL</span>
          <h2 className="title">Fale com o Rei</h2>
          <p>Nossos especialistas estão à disposição para auxiliar com harmonizações, pedidos personalizados e suporte corporativo.</p>
        </div>

        <section className="product-manager-section">
          <div className="product-manager-header">
            <div>
              <h3 className="section-title">Gerenciar Itens do Carrinho</h3>
              <p className="section-description">Edite, exclua ou adicione itens do carrinho diretamente na página de contato.</p>
            </div>
            <button
              className="btn-secondary btn-toggle-form"
              type="button"
              onClick={() => {
                setShowNewProductForm((prev) => !prev);
                resetProductForm();
              }}
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
                <button type="submit" className="btn-primary">
                  {selectedProductId ? 'Salvar alterações' : 'Adicionar item'}
                </button>
                <button type="button" className="btn-secondary" onClick={() => { resetProductForm(); setShowNewProductForm(false); }}>
                  Cancelar
                </button>
              </div>
            </form>
          )}

          <div className="product-list">
            {produtos.length === 0 ? (
              <div className="empty-state">
                Nenhum item salvo no carrinho ainda. Adicione produtos no catálogo, em kits ou manualmente.
              </div>
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
                    <button className="btn-primary" type="button" onClick={() => startEditProduct(produto)}>
                      Editar
                    </button>
                    <button className="btn-secondary" type="button" onClick={() => handleProductDelete(produto.id)}>
                      Excluir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <div className="contact-grid">
          {/* COLUNA ESQUERDA: INFORMAÇÕES DE CONTATO */}
          <section className="contact-info-section">
            <div className="info-card">
              <h3 className="info-title">Boutique Sede</h3>
              <p>TV D João VI, 264 - D João VI</p>
              <p>Capanema - PA, 68701-090</p>
            </div>

            <div className="info-card">
              <h3 className="info-title">Concierge & Vendas</h3>
              <p>WhatsApp: +55 (91) 98188-3429</p>
              <p>Telefone: (91) 8522-0399</p>
              <span className="info-note">Seg a Sáb, das 08h às 19h</span>
            </div>

            <div className="info-card">
              <h3 className="info-title">Assessoria Corporativa</h3>
              <p>eventos@reidosfrios.com.br</p>
              <span className="info-note">Para kits empresariais e eventos</span>
            </div>
          </section>

          {/* COLUNA DIREITA: FORMULÁRIO */}
          <section className="contact-form-section">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="nome">Nome Completo</label>
                <input 
                  type="text" 
                  id="nome" 
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required 
                  placeholder="Ex: Dom Pedro II"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail de Contato</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="imperador@exemplo.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="assunto">Assunto</label>
                <select id="assunto" name="assunto" value={formData.assunto} onChange={handleChange}>
                  <option value="Dúvida Geral">Dúvida Geral</option>
                  <option value="Suporte com Pedido">Suporte com Pedido</option>
                  <option value="Kits Corporativos">Kits Corporativos (B2B)</option>
                  <option value="Feedback">Feedback e Sugestões</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="mensagem">Mensagem</label>
                <textarea 
                  id="mensagem" 
                  name="mensagem"
                  rows="5"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required 
                  placeholder="Escreva sua mensagem aqui..."
                ></textarea>
              </div>

              <button type="submit" className="btn-submit" disabled={enviado}>
                {enviado ? 'MENSAGEM ENVIADA ✓' : 'ENVIAR MENSAGEM'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}