import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import EstadoBadge from "./EstadoBadge";
import SolicitudDetalle from "./SolicitudDetalle";

const formatPrice = (value) =>
  Number(value).toLocaleString("es-PE", {
    minimumFractionDigits: 2,
  });

const formatDate = (value) =>
  new Date(value).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const SolicitudCard = ({ solicitud }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-sm font-bold text-gray-950">
            Cotización #{solicitud.id}
          </h3>
          <EstadoBadge estado={solicitud.estado} />
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="hidden sm:inline">
            {formatDate(solicitud.fechaEmision)}
          </span>
          <span className="font-semibold text-gray-900">
            S/ {formatPrice(solicitud.total)}
          </span>
          <ChevronDown
            className={clsx("h-4 w-4 shrink-0 transition-transform", expanded && "rotate-180")}
          />
        </div>
      </button>

      {expanded && (
        <SolicitudDetalle
          detalles={solicitud.detalles}
          subtotal={solicitud.subtotal}
          igv={solicitud.igv}
          total={solicitud.total}
        />
      )}
    </div>
  );
};

export default SolicitudCard;
