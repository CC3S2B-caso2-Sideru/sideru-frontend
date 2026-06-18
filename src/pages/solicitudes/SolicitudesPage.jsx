import { useEffect, useState } from "react";
import { XCircle, FileText } from "lucide-react";
import { fetchMisCotizaciones } from "../../services/cotizaciones.service";
import Loader from "../../components/Loader";
import SolicitudCard from "./components/SolicitudCard";

const SolicitudesPage = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSolicitudes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchMisCotizaciones();
      setSolicitudes(data);
    } catch (err) {
      setError("No se pudieron cargar tus solicitudes de cotización.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <h2 className="mb-8 text-2xl font-bold text-gray-950">
        Mis Solicitudes de Cotización
      </h2>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-gray-500">
          <Loader size={36} />
          <p>Cargando solicitudes...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-red-800">
          <div className="flex items-start gap-3">
            <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium">{error}</p>
              <button
                type="button"
                className="mt-2 text-sm font-medium text-red-700 underline hover:text-red-900"
                onClick={fetchSolicitudes}
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && solicitudes.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-20 text-gray-500">
          <FileText className="mb-3 h-12 w-12 text-gray-300" />
          <p className="text-lg font-medium">No tienes solicitudes aún</p>
          <p className="mt-1 text-sm">
            Agrega productos al carrito y solicita una cotización.
          </p>
        </div>
      )}

      {!loading && !error && solicitudes.length > 0 && (
        <div className="space-y-3">
          {solicitudes.map((s) => (
            <SolicitudCard key={s.id} solicitud={s} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SolicitudesPage;
