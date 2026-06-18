import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
  enviada: "#3b82f6",
  aceptada: "#22c55e",
  rechazada: "#ef4444",
  expirada: "#6b7280",
  borrador: "#eab308",
};

const labelByEstado = {
  enviada: "Enviada",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
  expirada: "Expirada",
  borrador: "Borrador",
};

const CotizacionesEstadoChart = ({ data }) => {
  const chartData = data.map((d) => ({
    name: labelByEstado[d.estado] || d.estado,
    value: d.total,
    estado: d.estado,
  }));

  if (chartData.every((d) => d.value === 0)) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-gray-400">
        Sin datos
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {chartData.map((entry) => (
            <Cell key={entry.estado} fill={COLORS[entry.estado] || "#9ca3af"} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CotizacionesEstadoChart;
