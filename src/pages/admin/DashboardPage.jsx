import { useEffect, useState } from "react";
import {
  fetchCotizacionesPorEstado,
  fetchCotizacionesPorMes,
  fetchIngresoRealVsPotencial,
  fetchProductosMasCotizados,
} from "../../services/reportes.service";
import Loader from "../../components/Loader";
import CotizacionesEstadoChart from "./components/CotizacionesEstadoChart";
import CotizacionesMensualesChart from "./components/CotizacionesMensualesChart";
import IngresoRealVsPotencialChart from "./components/IngresoRealVsPotencialChart";
import ProductosTopChart from "./components/ProductosTopChart";
import StockCriticoWidget from "./components/StockCriticoWidget";

const DashboardPage = () => {
  const [data, setData] = useState({
    porEstado: [],
    porMes: [],
    ingreso: null,
    productosTop: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [estadoRes, mesRes, ingresoRes, topRes] = await Promise.all([
          fetchCotizacionesPorEstado(),
          fetchCotizacionesPorMes(),
          fetchIngresoRealVsPotencial(),
          fetchProductosMasCotizados(),
        ]);
        setData({
          porEstado: estadoRes.data,
          porMes: mesRes.data,
          ingreso: ingresoRes.data,
          productosTop: topRes.data,
        });
      } catch (err) {
        setError("No se pudieron cargar los datos del dashboard.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-gray-500">
        <Loader size={36} />
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8 sm:px-8">
        <div className="rounded border border-red-300 bg-red-50 p-4 text-red-800">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-8">
      <h2 className="mb-8 text-2xl font-bold text-gray-950">Dashboard</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Cotizaciones por estado
          </h3>
          <CotizacionesEstadoChart data={data.porEstado} />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Cotizaciones por mes
          </h3>
          <CotizacionesMensualesChart data={data.porMes} />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Ingreso real vs potencial perdido
          </h3>
          <IngresoRealVsPotencialChart data={data.ingreso} />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Productos más cotizados
          </h3>
          <ProductosTopChart data={data.productosTop} />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Stock crítico
          </h3>
          <StockCriticoWidget />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
