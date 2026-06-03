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

  // Salva no localStorage sempre que o estado 'produtos' mudar
  useEffect(() => {
    localStorage.setItem('@ReiDosFrios:produtos', JSON.stringify(produtos));
  }, [produtos]);

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

  // O Hook exporta o estado e as funções para as telas usarem
  return {
    produtos,
    adicionarProduto,
    editarProduto,
    excluirProduto
  };
}