import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação Lazy para otimização de performance
const Login = lazy(() => import('../pages/Login'));
const Catalog = lazy(() => import('../pages/Catalog'));
const Charcuterie = lazy(() => import('../pages/Charcuterie'));
const Kits = lazy(() => import('../pages/Kits'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Profile = lazy(() => import('../pages/Profile'));

// Um componente simples de loading enquanto a tela carrega
const LoadingWindow = () => <div>Carregando o império...</div>;

export default function AppRoutes() {
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