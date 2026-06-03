import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando com as letras minúsculas exatas das suas pastas
const Login = lazy(() => import('../pages/login'));
const Catalog = lazy(() => import('../pages/catalog'));
const Charcuterie = lazy(() => import('../pages/charcuterie'));
const Kits = lazy(() => import('../pages/kits'));
const ProductDetails = lazy(() => import('../pages/productDetails'));
const Profile = lazy(() => import('../pages/profile'));

const LoadingWindow = () => <div>Carregando o império...</div>;

export function AppRoutes() { // Pode exportar direto ou usar export default no final
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingWindow />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/charcutaria" element={<Charcuterie />} />
          <Route path="/kits" element={<Kits />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}