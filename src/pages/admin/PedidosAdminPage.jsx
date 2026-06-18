import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { fetchTodosPedidos } from "../../services/pedidos.service";
import PedidoCard from "../pedidos/components/PedidoCard";

const PedidosAdminPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchTodosPedidos();
      setPedidos(data);
    } catch (err) {
      setError("No se pudieron cargar los pedidos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-4 py-8 sm:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-950">Pedidos</h2>
        <p className="mt-1 text-sm text-gray-500">
          Seguimiento de pedidos generados desde cotizaciones aceptadas.
        </p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-gray-500">
          <Loader size={36} />
          <p>Cargando pedidos...</p>
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

      {!loading && !error && pedidos.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-20 text-gray-500">
          <p className="text-lg font-medium">No hay pedidos registrados</p>
        </div>
      )}

      {!loading && !error && pedidos.length > 0 && (
        <div className="space-y-3">
          {pedidos.map((pedido) => (
            <PedidoCard key={pedido.id} pedido={pedido} showCliente />
          ))}
        </div>
      )}
    </div>
  );
};

export default PedidosAdminPage;
