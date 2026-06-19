import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const formatPrice = (value) =>
  Number(value).toLocaleString("es-PE", { minimumFractionDigits: 2 });

const IngresoRealVsPotencialChart = ({ data }) => {
  if (!data || !data.porMes || data.porMes.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-gray-400">
        Sin datos
      </div>
    );
  }

  const chartData = data.porMes.map((d) => ({
    mes: d.mes,
    Aceptado: Number(d.aceptado),
    Rechazado: Number(d.rechazado),
  }));

  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `S/ ${formatPrice(value)}`} />
          <Legend />
          <Bar dataKey="Aceptado" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Rechazado" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-green-500" />
          <span className="text-gray-600">
            Ingreso real: S/ {formatPrice(data.totalAceptado || 0)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-red-500" />
          <span className="text-gray-600">
            Potencial no capturado: S/ {formatPrice(data.totalRechazado || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngresoRealVsPotencialChart;
