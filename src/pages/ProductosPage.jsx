import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import loadingGif from "../assets/loading.gif";
import "../styles/ProductosPage.css";

const SkeletonCard = () => (
  <div className="product-card skeleton">
    <div className="skeleton-img" />
    <div className="product-info">
      <div className="skeleton-line short" />
      <div className="skeleton-line long" />
      <div className="skeleton-line medium" />
      <div className="skeleton-footer">
        <div className="skeleton-line price" />
        <div className="skeleton-btn" />
      </div>
    </div>
  </div>
);

const ProductCard = ({ producto }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="product-card">
      <div className="product-img-wrapper">
        {!imgError && producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            onError={() => setImgError(true)}
            className="product-img"
          />
        ) : (
          <div className="product-img-placeholder">
            <span>🔩</span>
          </div>
        )}
        <span className={`stock-badge ${producto.stock === 0 ? "out" : producto.stock < 10 ? "low" : "ok"}`}>
          {producto.stock === 0 ? "Agotado" : producto.stock < 10 ? `Últimas ${producto.stock} uds.` : "Disponible"}
        </span>
      </div>

      <div className="product-info">
        <span className="product-sku">{producto.sku}</span>
        <h3 className="product-name">{producto.nombre}</h3>

        <div className="product-footer">
          <span className="product-price">
            S/ {Number(producto.precio).toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </span>
          <button
            className="btn-add"
            disabled={producto.stock === 0}
          >
            {producto.stock === 0 ? "Agotado" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
};

const ProductsPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoriasLoading, setCategoriasLoading] = useState(true);

  const fetchProductos = async () => {
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
  };

  const fetchCategorias = async () => {
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
  };

  useEffect(() => {
    fetchProductos();
  }, [search, categoria]);

  useEffect(() => {
    fetchCategorias();
    fetchProductos();
  }, []);

  // Timer de 400ms para actualizar el estado de búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <>
      <Navbar />

      <main className="products-page">
        <div className="products-header">
          <div className="products-header-text">
            <h1>Catálogo de Productos</h1>
            <p>Encuentra todo lo que necesitas para tu proyecto.</p>
          </div>

          <div className="products-filters">
            <div className="search-box">
              <span className="search-icon"></span>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="search-input"
              />
              {inputValue && (
                <button className="clear-btn" onClick={() => { setInputValue(""); setSearch(""); }}>✕</button>
              )}
            </div>

            <select
              className="category-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              disabled={categoriasLoading}
            >
              {categorias.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="products-meta">
          {!loading && !error && (
            <span>{productos.length} producto{productos.length !== 1 ? "s" : ""} encontrado{productos.length !== 1 ? "s" : ""}</span>
          )}
          {(search || categoria) && (
            <button className="clear-filters" onClick={() => { setInputValue(""); setSearch(""); setCategoria(""); }}>
              Limpiar filtros
            </button>
          )}
        </div>

        {error ? (
          <div className="products-error">
            <span>⚠️</span>
            <p>No se pudo cargar el catálogo. {error}</p>
            <button className="btn-primary" onClick={fetchProductos}>Reintentar</button>
          </div>
        ) : loading ? (
          <div className="loading-container">
            <img src={loadingGif} alt="Cargando..." className="loading-gif" />
          </div>
        ) : productos.length === 0 ? (
          <div className="products-empty">
            <p>No se encontraron productos con esos filtros.</p>
          </div>
        ) : (
          <div className="products-grid">
            {productos.map((p) => (
              <ProductCard key={p.sku} producto={p} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProductsPage;