import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import Filters from "./Filters.jsx";
import ProductsGrid from "./ProductsGrid.jsx";
import "../../styles/ProductosPage.css";

const ProductsPage = () => {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categorias, setCategorias] = useState([]);
  const [categoriasLoading, setCategoriasLoading] = useState(true);

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (categoria) params.set("categoria", categoria);

      const { data } = await axios.get(`/api/productos?${params.toString()}`);

      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, categoria]);

  const fetchCategorias = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/categorias');

      const formattedCategorias = data.map((cat) => ({
        value: cat.id,
        label: cat.nombre,
      }));

      setCategorias([
        { value: "", label: "Todas las categorías" },
        ...formattedCategorias,
      ]);
    } catch (err) {
      console.error("Error fetching categorías:", err);
      // Mantener las categorías por defecto si hay error
      setCategorias([{ value: "", label: "Todas las categorías" }]);
    } finally {
      setCategoriasLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  useEffect(() => {
    fetchCategorias();
    fetchProductos();
  }, [fetchCategorias, fetchProductos]);

  return (
    <>
      <Navbar />

      <main className="products-page">
        <div className="products-header">
          <div className="products-header-text">
            <h1>Catálogo de Productos</h1>
            <p>Encuentra todo lo que necesitas para tu proyecto.</p>
          </div>

          <Filters
            inputValue={inputValue}
            setInputValue={setInputValue}
            setSearch={setSearch}
            categoria={categoria}
            setCategoria={setCategoria}
            categorias={categorias}
            categoriasLoading={categoriasLoading}
          />
        </div>

        <ProductsGrid
          productos={productos}
          loading={loading}
          error={error}
          search={search}
          categoria={categoria}
          fetchProductos={fetchProductos}
          setInputValue={setInputValue}
          setSearch={setSearch}
          setCategoria={setCategoria}
        />
      </main>

      <Footer />
    </>
  );
};

export default ProductsPage;