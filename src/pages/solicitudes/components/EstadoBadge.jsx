const variantClasses = {
  enviada:
    "bg-blue-100 text-blue-800 border border-blue-200",
  aceptada:
    "bg-green-100 text-green-800 border border-green-200",
  rechazada:
    "bg-red-100 text-red-800 border border-red-200",
  borrador:
    "bg-yellow-100 text-yellow-800 border border-yellow-200",
  expirada:
    "bg-gray-100 text-gray-500 border border-gray-200",
  pendiente:
    "bg-yellow-100 text-yellow-800 border border-yellow-200",
  confirmado:
    "bg-green-100 text-green-800 border border-green-200",
  en_preparacion:
    "bg-indigo-100 text-indigo-800 border border-indigo-200",
  despachado:
    "bg-blue-100 text-blue-800 border border-blue-200",
  entregado:
    "bg-emerald-100 text-emerald-800 border border-emerald-200",
  cancelado:
    "bg-gray-100 text-gray-500 border border-gray-200",
  rechazado_stock:
    "bg-red-100 text-red-800 border border-red-200",
};

const labelByEstado = {
  enviada: "Enviada",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
  borrador: "Borrador",
  expirada: "Expirada",
  pendiente: "Pendiente de pago",
  confirmado: "Confirmado",
  en_preparacion: "En preparacion",
  despachado: "Despachado",
  entregado: "Entregado",
  cancelado: "Cancelado",
  rechazado_stock: "Rechazado por stock",
};

const EstadoBadge = ({ estado }) => {
  const clases = variantClasses[estado?.toLowerCase()] ?? variantClasses.borrador;
  const label = labelByEstado[estado?.toLowerCase()] ?? estado;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${clases}`}
    >
      {label}
    </span>
  );
};

export default EstadoBadge;
