import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { fetchCategorias } from "../../../services/productos.service";

const inputClass =
  "w-full rounded-lg border-2 border-gray-300 px-3 py-2 text-sm shadow-sm transition focus:border-primary focus:ring-4 focus:ring-blue-900/15 focus:outline-none";

const ProductoFormModal = ({ producto, onSave, onClose }) => {
  const isEdit = !!producto;
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    sku: "",
    nombre: "",
    descripcion: "",
    imagen: "",
    precio: "",
    stock: "",
    stockMinimo: "",
    categoriaId: "",
  });

  useEffect(() => {
    fetchCategorias()
      .then(({ data }) => setCategorias(data))
      .catch(() => setError("No se pudieron cargar las categorías"));
  }, []);

  useEffect(() => {
    if (producto) {
      setForm({
        sku: producto.sku || "",
        nombre: producto.nombre || "",
        descripcion: producto.descripcion || "",
        imagen: producto.imagen || "",
        precio: producto.precio?.toString() || "",
        stock: producto.stock?.toString() || "",
        stockMinimo: producto.stockMinimo?.toString() || "",
        categoriaId: categorias.find((c) => c.nombre === producto.categoria)?.id?.toString() || "",
      });
    }
  }, [producto, categorias]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.sku.trim()) return "El SKU es obligatorio";
    if (!form.nombre.trim()) return "El nombre es obligatorio";
    if (!form.precio || Number(form.precio) <= 0) return "El precio debe ser mayor a 0";
    if (form.stock === "" || Number(form.stock) < 0) return "El stock no puede ser negativo";
    if (form.stockMinimo && Number(form.stockMinimo) > Number(form.stock))
      return "El umbral de auto-aprobación no puede ser mayor que el stock";
    if (!form.categoriaId) return "Selecciona una categoría";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const payload = {
        sku: form.sku.trim(),
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim() || null,
        imagen: form.imagen.trim() || null,
        precio: Number(form.precio),
        stock: Number(form.stock),
        stockMinimo: form.stockMinimo ? Number(form.stockMinimo) : 0,
        categoriaId: Number(form.categoriaId),
      };
      await onSave(payload);
    } catch (err) {
      setError(err.response?.data?.message || "Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "mb-1 block text-xs font-medium text-gray-700";

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-50 cursor-default bg-black/40"
        onClick={onClose}
      />

      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="pointer-events-auto relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-2xl">
          <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
            <h3 className="text-lg font-bold text-gray-950">
              {isEdit ? "Editar producto" : "Nuevo producto"}
            </h3>
            <button
              type="button"
              className="grid h-8 w-8 pl place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4">
            {error && (
              <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>SKU *</label>
                <input
                  className={inputClass}
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  disabled={isEdit}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Nombre *</label>
                <input
                  className={inputClass}
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Descripción</label>
                <textarea
                  className={inputClass}
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  rows={2}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Imagen (URL)</label>
                <input
                  className={inputClass}
                  name="imagen"
                  value={form.imagen}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className={labelClass}>Precio (S/) *</label>
                <input
                  className={inputClass}
                  name="precio"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={form.precio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Categoría *</label>
                <select
                  className={inputClass}
                  name="categoriaId"
                  value={form.categoriaId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar...</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Stock inicial</label>
                <input
                  className={inputClass}
                  name="stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className={labelClass} title="Cantidad máxima que un cliente puede solicitar sin que un administrador revise la cotización">
                  Umbral auto-aprobación ⓘ
                </label>
                <input
                  className={inputClass}
                  name="stockMinimo"
                  type="number"
                  min="0"
                  value={form.stockMinimo}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Guardando..." : isEdit ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductoFormModal;
