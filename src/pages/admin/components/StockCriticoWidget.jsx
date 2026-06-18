import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import apiClient from "../../../api/client";

const StockCriticoWidget = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/productos/stock-bajo")
      .then(({ data }) => setProductos(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-gray-400">
        Cargando...
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-gray-400">
        No hay productos con stock crítico
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle size={20} className="text-yellow-500" />
        <span className="text-lg font-bold text-yellow-600">
          {productos.length}
        </span>
        <span className="text-sm text-gray-500">productos bajo mínimo</span>
      </div>

      <div className="space-y-2">
        {productos.slice(0, 5).map((p) => (
          <div
            key={p.sku}
            className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
          >
            <span className="truncate font-medium text-gray-800">
              {p.nombre}
            </span>
            <span className="shrink-0 text-gray-500">
              {p.stock} / {p.stockMinimo ?? 0}
            </span>
          </div>
        ))}
      </div>

      {productos.length > 5 && (
        <p className="mt-2 text-xs text-gray-400">
          Y {productos.length - 5} más...
        </p>
      )}

      <Link
        to="/admin/productos"
        className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
      >
        Ver todos los productos →
      </Link>
    </div>
  );
};

export default StockCriticoWidget;
