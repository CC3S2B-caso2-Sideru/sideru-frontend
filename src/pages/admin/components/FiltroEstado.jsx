import clsx from "clsx";

const estados = [
  { value: "", label: "Todas" },
  { value: "enviada", label: "Enviadas" },
  { value: "aceptada", label: "Aceptadas" },
  { value: "rechazada", label: "Rechazadas" },
  { value: "expirada", label: "Expiradas" },
];

const FiltroEstado = ({ selected, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {estados.map(({ value, label }) => (
      <button
        key={value}
        type="button"
        className={clsx(
          "rounded-full px-4 py-1.5 text-sm font-medium transition",
          selected === value
            ? "bg-primary text-white"
            : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
        )}
        onClick={() => onChange(value)}
      >
        {label}
      </button>
    ))}
  </div>
);

export default FiltroEstado;
