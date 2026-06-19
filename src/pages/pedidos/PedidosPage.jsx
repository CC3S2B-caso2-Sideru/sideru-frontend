import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, XCircle } from "lucide-react";
import Loader from "../../components/Loader";
import { useToast } from "../../contexts/ToastContext";
import { fetchMisPedidos, registrarPagoSimulado } from "../../services/pedidos.service";
import PedidoCard from "./components/PedidoCard";

const PedidosPage = () => {
  const toast = useToast();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPedidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchMisPedidos();
      setPedidos(data);
    } catch (err) {
      setError("No se pudieron cargar tus pedidos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handlePagar = async (id, payload) => {
    try {
      const { data } = await registrarPagoSimulado(id, payload);
      setPedidos((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      toast.success("Pago registrado. Pedido confirmado.");
    } catch (err) {
      toast.error(err.response?.data?.message || "No se pudo registrar el pago.");
      throw err;
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="m-0 text-2xl font-bold text-gray-950">Mis Pedidos</h2>
        <div className="flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
          <Link
            to="/solicitudes"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 no-underline transition hover:bg-gray-50 hover:text-gray-950"
          >
            Cotizaciones
          </Link>
          <Link
            to="/pedidos"
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white no-underline"
          >
            Pedidos
          </Link>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-gray-500">
          <Loader size={36} />
          <p>Cargando pedidos...</p>
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
                onClick={fetchPedidos}
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && pedidos.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-20 text-gray-500">
          <FileText className="mb-3 h-12 w-12 text-gray-300" />
          <p className="text-lg font-medium">No tienes pedidos aun</p>
          <p className="mt-1 text-sm">
            Cuando una cotizacion aceptada se convierta en pedido, aparecera aqui.
          </p>
        </div>
      )}

      {!loading && !error && pedidos.length > 0 && (
        <div className="space-y-3">
          {pedidos.map((pedido) => (
            <PedidoCard key={pedido.id} pedido={pedido} onPagar={handlePagar} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PedidosPage;
