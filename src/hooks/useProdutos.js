import { useState, useEffect } from 'react';

export function useProdutos() {
  // 1. READ: Inicializa o estado buscando do localStorage
  const [produtos, setProdutos] = useState(() => {
    const dadosSalvos = localStorage.getItem('@ReiDosFrios:produtos');
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }
    // Retorna um array vazio se não houver nada salvo
    return [];
  });

  const [favoritos, setFavoritos] = useState(() => {
    const dadosFavoritos = localStorage.getItem('@ReiDosFrios:favoritos');
    if (dadosFavoritos) {
      return JSON.parse(dadosFavoritos);
    }
    return [];
  });

  // Salva no localStorage sempre que o estado 'produtos' mudar
  useEffect(() => {
    localStorage.setItem('@ReiDosFrios:produtos', JSON.stringify(produtos));
  }, [produtos]);

  useEffect(() => {
    localStorage.setItem('@ReiDosFrios:favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  // 2. CREATE: Adiciona um novo produto
  const adicionarProduto = (novoProduto) => {
    const produtoComId = {
      ...novoProduto,
      id: crypto.randomUUID() // Gera um ID único e seguro
    };
    setProdutos((estadoAnterior) => [...estadoAnterior, produtoComId]);
  };

  // 3. UPDATE: Atualiza os dados de um produto existente
  const editarProduto = (idParaEditar, dadosAtualizados) => {
    setProdutos((estadoAnterior) =>
      estadoAnterior.map((produto) =>
        produto.id === idParaEditar ? { ...produto, ...dadosAtualizados } : produto
      )
    );
  };

  // 4. DELETE: Remove um produto pelo ID
  const excluirProduto = (idParaDeletar) => {
    setProdutos((estadoAnterior) =>
      estadoAnterior.filter((produto) => produto.id !== idParaDeletar)
    );
  };

  const isFavorito = (id) => favoritos.some((produto) => String(produto.id) === String(id));

  const adicionarFavorito = (produto) => {
    if (isFavorito(produto.id)) return;
    setFavoritos((estadoAnterior) => [...estadoAnterior, produto]);
  };

  const removerFavorito = (idParaRemover) => {
    setFavoritos((estadoAnterior) =>
      estadoAnterior.filter((produto) => String(produto.id) !== String(idParaRemover))
    );
  };

  const toggleFavorito = (produto) => {
    if (isFavorito(produto.id)) {
      removerFavorito(produto.id);
      return;
    }
    adicionarFavorito(produto);
  };

  // O Hook exporta o estado e as funções para as telas usarem
  return {
    produtos,
    adicionarProduto,
    editarProduto,
    excluirProduto,
    favoritos,
    adicionarFavorito,
    removerFavorito,
    toggleFavorito,
    isFavorito
  };
}