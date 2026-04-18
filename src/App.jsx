import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ProductosPage from "./pages/productos/ProductosPage";

function App() {
  return (<>
    <Routes>
      <Route index element={<HomePage />} /> 
      <Route path="/productos" element={<ProductosPage />} />  
    </Routes>
  </>);
}

export default App;