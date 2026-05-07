import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ProductosPage from "./pages/productos/ProductosPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SolicitudesPage from "./pages/SolicitudesPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;