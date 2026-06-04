import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

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
          <Route path="/catalogo" element={<PrivateRoute><Catalog /></PrivateRoute>} />
          <Route path="/charcutaria" element={<PrivateRoute><Charcuterie /></PrivateRoute>} />
          <Route path="/kits" element={<PrivateRoute><Kits /></PrivateRoute>} />
          <Route path="/produto/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}