import { useEffect, useState, useCallback, useRef } from "react";
import { Search, Plus } from "lucide-react";
import { useToast } from "../../contexts/ToastContext";
import { fetchCategorias } from "../../services/productos.service";
import {
  fetchProductos,
  createProducto,
  updateProducto,
  toggleProductoActivo,
} from "../../services/admin.service";
import Loader from "../../components/Loader";
import StockBadge from "./components/StockBadge";
import ProductoFormModal from "./components/ProductoFormModal";
import Paginacion from "./components/Paginacion";

const formatPrice = (value) =>
  Number(value).toLocaleString("es-PE", { minimumFractionDigits: 2 });

const PAGE_SIZE = 12;

const ProductosAdminPage = () => {
  const toast = useToast();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    categoriaId: "",
    activo: "",
  });
  const debounceRef = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchProductos({
        search: filters.search || undefined,
        categoriaId: filters.categoriaId || undefined,
        activo:
          filters.activo === "true"
            ? true
            : filters.activo === "false"
              ? false
              : undefined,
        page,
        size: PAGE_SIZE,
      });
      const contenido = Array.isArray(data) ? data : (data.content ?? []);
      setProductos(contenido);
      setTotalPages(data.totalPages ?? data.page?.totalPages ?? 1);
    } catch (err) {
      setError("No se pudieron cargar los productos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchCategorias()
      .then(({ data }) => setCategorias(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
    setPage(0);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  };

  const handleSave = async (payload) => {
    if (editingProducto) {
      const { data } = await updateProducto(editingProducto.sku, payload);
      setProductos((prev) => prev.map((p) => (p.sku === data.sku ? data : p)));
      toast.success("Producto actualizado");
    } else {
      const { data } = await createProducto(payload);
      fetchData();
      toast.success("Producto creado");
    }
    setShowModal(false);
    setEditingProducto(null);
  };

  const handleToggleActive = async (sku) => {
    try {
      const { data } = await toggleProductoActivo(sku);
      setProductos((prev) => prev.map((p) => (p.sku === sku ? data : p)));
    } catch (err) {
      toast.error("Error al cambiar el estado");
    }
  };

  const openCreate = () => {
    setEditingProducto(null);
    setShowModal(true);
  };

  const openEdit = (producto) => {
    setEditingProducto(producto);
    setShowModal(true);
  };

  const selectClass =
    "rounded-lg border-2 border-gray-300 py-2 pl-3 pr-8 text-sm shadow-sm transition focus:border-primary focus:ring-4 focus:ring-blue-900/15 focus:outline-none";

  return (
    <div className="px-4 py-8 sm:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-950">Productos</h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              className="w-48 rounded-lg border-2 border-gray-300 py-2 pl-10 pr-3 text-sm shadow-sm transition focus:border-primary focus:ring-4 focus:ring-blue-900/15 focus:outline-none"
              placeholder="SKU o nombre..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          <select
            className={`${selectClass} w-40`}
            value={filters.categoriaId}
            onChange={(e) => handleFilterChange("categoriaId", e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          <select
            className={`${selectClass} w-32`}
            value={filters.activo}
            onChange={(e) => handleFilterChange("activo", e.target.value)}
          >
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-light"
            onClick={openCreate}
          >
            <Plus size={18} />
            Nuevo
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-gray-500">
          <Loader size={36} />
          <p>Cargando productos...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-red-800">
          <p className="font-medium">{error}</p>
          <button
            type="button"
            className="mt-2 text-sm font-medium text-red-700 underline hover:text-red-900"
            onClick={fetchData}
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && productos.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-20 text-gray-500">
          <p className="text-lg font-medium">No se encontraron productos</p>
        </div>
      )}

      {!loading && !error && productos.length > 0 && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productos.map((p) => (
              <div
                key={p.sku}
                className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-950">
                      {p.nombre}
                    </p>
                    <p className="text-xs text-gray-400">{p.sku}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={p.activo}
                      onChange={() => handleToggleActive(p.sku)}
                    />
                    <div className="h-5 w-9 rounded-full bg-gray-200 peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-300 transition" />
                    <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-4" />
                  </label>
                </div>

                <p className="text-xs text-gray-500">
                  {p.categoria || "Sin categoría"}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-900">
                    S/ {formatPrice(p.precio)}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Stock:</span>
                    <StockBadge stock={p.stock} stockMinimo={p.stockMinimo} />
                  </div>
                </div>

                <p className="text-xs text-gray-400">
                  Umbral: {p.stockMinimo ?? 0}
                </p>

                <button
                  type="button"
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  onClick={() => openEdit(p)}
                >
                  Editar
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Paginacion
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      )}

      {showModal && (
        <ProductoFormModal
          producto={editingProducto}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingProducto(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductosAdminPage;
