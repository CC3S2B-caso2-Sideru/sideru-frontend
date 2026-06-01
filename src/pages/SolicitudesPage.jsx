import Footer from "../components/Footer";

const SolicitudesPage = () => {
  const solicitudes = [
    { id: 1, fecha: "2026-05-01", estado: "Pendiente", total: "S/ 1,250.00" },
    { id: 2, fecha: "2026-04-28", estado: "Aprobado", total: "S/ 3,400.00" },
    { id: 3, fecha: "2026-04-15", estado: "Rechazado", total: "S/ 800.00" },
  ];

  const badgeColors = (estado) => {
    switch (estado) {
      case "Aprobado": return "bg-green-100 text-green-800";
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Rechazado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="py-5 mx-auto max-w-4xl px-4">
        <h2 className="mb-4 text-2xl font-bold">Mis Solicitudes de Cotización</h2>
        {solicitudes.length === 0 ? (
          <p className="text-gray-500">No tienes solicitudes aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">#</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Fecha</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Estado</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Total</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Acción</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((s) => (
                  <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{s.id}</td>
                    <td className="px-4 py-3 text-sm">{s.fecha}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColors(s.estado)}`}>
                        {s.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{s.total}</td>
                    <td className="px-4 py-3">
                      <button className="rounded-lg border border-primary px-3 py-1 text-sm text-primary transition hover:bg-primary hover:text-white">
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SolicitudesPage;
