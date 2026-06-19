import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CotizacionesMensualesChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-gray-400">
        Sin datos
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="cantidad" fill="#0a0f2c" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CotizacionesMensualesChart;
