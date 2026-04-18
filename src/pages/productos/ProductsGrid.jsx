import ProductoCard from "./ProductoCard.jsx";
import loadingGif from "../../assets/loading.gif";

const ProductsGrid = ({ productos, loading, error, search, categoria, fetchProductos, setInputValue, setSearch, setCategoria }) => {
  return (
    <>
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
            <ProductoCard key={p.sku} producto={p} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsGrid;