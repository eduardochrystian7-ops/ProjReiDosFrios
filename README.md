# Rei dos Frios

## Visão geral

`Rei dos Frios` é um projeto front-end em React + Vite que simula uma experiência de e-commerce gourmet para um negócio de frios e charcutaria. A aplicação oferece autenticação básica, rotas privadas e um catálogo de produtos com navegação para detalhes.

### Objetivos

- Demonstrar layout e navegação de um portal de vendas premium
- Implementar rotas protegidas usando React Router
- Simular persistência local de dados com `localStorage`
- Usar carregamento assíncrono de páginas com lazy loading

---

## Tecnologias utilizadas

- React 19
- Vite
- React Router DOM 7
- ESLint
- JavaScript moderno (ESM)

---

## Arquitetura do projeto

A aplicação segue uma organização funcional com as seguintes camadas principais:

- `src/main.jsx` — entrypoint do Vite e montagem do React
- `src/App.jsx` — componente raiz que faz o bootstrap das rotas
- `src/routes/index.jsx` — definição das rotas principais e layout do roteador
- `src/routes/PrivateRoute.jsx` — proteção simples de rotas usando `localStorage`
- `src/hooks/useProdutos.js` — hook customizado para CRUD local de produtos
- `src/pages/*` — páginas e componentes de interface por área
- `src/assets/*` — imagens e recursos estáticos importados

---

## Estrutura de pastas

```
src/
  App.jsx
  main.jsx
  assets/
  hooks/
    useProdutos.js
  pages/
    catalog/
      index.jsx
      Catalog.css
    charcuterie/
      index.jsx
    Contact/
      index.jsx
      style.css
    kits/
      index.jsx
      kits.css
    login/
      index.jsx
      styles.css
    productDetails/
      index.jsx
      ProductCard.css
    profile/
      index.jsx
      style.css
  routes/
    index.jsx
    PrivateRoute.jsx
```

---

## Páginas e rotas

- `/` — Tela de login
- `/catalogo` — Catálogo de produtos (rota privada)
- `/charcutaria` — Charcutaria (rota privada)
- `/kits` — Kits de produtos (rota privada)
- `/contato` — Contato (rota privada)
- `/produto/:id` — Detalhes do produto (rota privada)
- `/perfil` — Perfil do usuário (rota privada)

---

## Como executar

### Pré-requisitos

- Node.js 18+ recomendado
- npm 10+ ou yarn

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Após executar, abra o endereço exibido no terminal (`http://localhost:5173` ou similar).

### Build para produção

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

---

## Scripts disponíveis

- `npm run dev` — inicia o servidor de desenvolvimento Vite
- `npm run build` — gera o bundle de produção
- `npm run preview` — executa a pré-visualização do build
- `npm run lint` — valida o código com ESLint

---

## Observações importantes

- O login atual usa `localStorage` para armazenar email e senha. Isso é apenas para prototipação. Em produção, não se deve salvar senhas em texto claro.
- A proteção de rota em `src/routes/PrivateRoute.jsx` é simples e aceita qualquer valor salvo em `@ReiDosFrios:email` e `@ReiDosFrios:senha`.
- O catálogo usa dados estáticos simulados em `src/pages/catalog/index.jsx`.

---

## Sugestões de melhorias

- Adicionar autenticação real via API
- Implementar gerenciamento global de estado (Context API, Redux ou Zustand)
- Substituir `localStorage` por backend ou banco de dados real
- Reaproveitar componentes de layout (Header, Footer, Card)
- Tornar o app totalmente responsivo e otimizar CSS
- Adicionar testes unitários e de integração

---

## Dependências principais

- `react`
- `react-dom`
- `react-router-dom`
- `vite`
- `@vitejs/plugin-react`
- `eslint`
- `@eslint/js`
- `eslint-plugin-react-hooks`

---

## Contato

Para dúvidas ou contribuições, abra uma issue ou envie um pull request neste repositório.
