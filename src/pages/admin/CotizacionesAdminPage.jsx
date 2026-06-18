import { useEffect, useState, useMemo } from "react";
import { fetchTodasCotizaciones } from "../../services/admin.service";
import Loader from "../../components/Loader";
import AdminCotizacionCard from "./components/AdminCotizacionCard";
import FiltroEstado from "./components/FiltroEstado";

const CotizacionesAdminPage = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("enviada");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchTodasCotizaciones();
      setCotizaciones(data);
    } catch (err) {
      setError("No se pudieron cargar las cotizaciones.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (updated) => {
    setCotizaciones((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const filtered = useMemo(
    () =>
      filtro
        ? cotizaciones.filter((c) => c.estado === filtro)
        : cotizaciones,
    [cotizaciones, filtro]
  );

  return (
    <div className="px-4 py-8 sm:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-950">Cotizaciones</h2>
        <FiltroEstado selected={filtro} onChange={setFiltro} />
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-gray-500">
          <Loader size={36} />
          <p>Cargando cotizaciones...</p>
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

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-20 text-gray-500">
          <p className="text-lg font-medium">
            {filtro
              ? `No hay cotizaciones ${filtro}s`
              : "No hay cotizaciones"}
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((c) => (
            <AdminCotizacionCard
              key={c.id}
              solicitud={c}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CotizacionesAdminPage;
