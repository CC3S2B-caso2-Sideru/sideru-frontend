import { useState, useEffect, useCallback } from "react";
import Filters from "./Filters.jsx";
import ProductsGrid from "./ProductsGrid.jsx";
import {
  fetchProductos as fetchProductosService,
  fetchCategorias as fetchCategoriasService,
} from "../../services/productos.service";

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
      const { data } = await fetchProductosService(search, categoria);
      setProductos(data.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, categoria]);

  const fetchCategorias = useCallback(async () => {
    try {
      const { data } = await fetchCategoriasService();

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
      setCategorias([{ value: "", label: "Todas las categorías" }]);
    } finally {
      setCategoriasLoading(false);
    }
  }, []);

  const addToCart = (producto) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((p) => p.sku === producto.sku);
    if (existingProduct) {
      existingProduct.cantidad += 1;
    } else {
      cart.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return (
    <main className="min-h-full bg-stone-100 px-6 py-10 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="m-0 text-3xl font-bold text-slate-950 sm:text-4xl">
              Catálogo de Productos
            </h1>
            <p className="m-0 mt-2 text-base text-slate-600">
              Encuentra todo lo que necesitas para tu proyecto.
            </p>
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
          addToCart={addToCart}
        />
      </div>
    </main>
  );
};

export default ProductsPage;
