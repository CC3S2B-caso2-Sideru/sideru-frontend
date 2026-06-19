import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home/HomePage";
import ProductosPage from "./pages/productos/ProductosPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SolicitudesPage from "./pages/solicitudes/SolicitudesPage";
import PedidosPage from "./pages/pedidos/PedidosPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminRoute from "./components/auth/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import CotizacionesAdminPage from "./pages/admin/CotizacionesAdminPage";
import PedidosAdminPage from "./pages/admin/PedidosAdminPage";
import ProductosAdminPage from "./pages/admin/ProductosAdminPage";
import DashboardPage from "./pages/admin/DashboardPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/solicitudes"
          element={
            <PrivateRoute>
              <SolicitudesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <PrivateRoute>
              <PedidosPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="cotizaciones" element={<CotizacionesAdminPage />} />
        <Route path="pedidos" element={<PedidosAdminPage />} />
        <Route path="productos" element={<ProductosAdminPage />} />
      </Route>
    </Routes>
  );
};

export default App;
