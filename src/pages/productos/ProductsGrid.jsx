import ProductoCard from "./ProductoCard.jsx";
import loadingGif from "../../assets/loading.gif";

const ProductsGrid = ({
  productos,
  loading,
  error,
  search,
  categoria,
  fetchProductos,
  setInputValue,
  setSearch,
  setCategoria,
  addToCart,
}) => {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
        {!loading && !error && (
          <span>
            {productos.length} producto{productos.length !== 1 ? "s" : ""}{" "}
            encontrado{productos.length !== 1 ? "s" : ""}
          </span>
        )}
        {(search || categoria) && (
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
            onClick={() => {
              setInputValue("");
              setSearch("");
              setCategoria("");
            }}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {error ? (
        <div className="px-6 py-20 text-center text-slate-600">
          <span className="mb-4 block text-5xl">⚠️</span>
          <p>No se pudo cargar el catálogo. {error}</p>
          <button
            type="button"
            className="mt-4 rounded-lg bg-slate-950 px-4 py-2 font-medium text-white transition hover:bg-slate-800"
            onClick={fetchProductos}
          >
            Reintentar
          </button>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center py-20">
          <img src={loadingGif} alt="Cargando..." className="w-20 opacity-70" />
        </div>
      ) : productos.length === 0 ? (
        <div className="px-6 py-20 text-center text-slate-600">
          <p>No se encontraron productos con esos filtros.</p>
        </div>
      ) : (
        <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {productos.map((p) => (
            <ProductoCard key={p.sku} producto={p} addToCart={addToCart} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
