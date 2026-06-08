import { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import clsx from "clsx";
import EstadoBadge from "../../solicitudes/components/EstadoBadge";
import SolicitudDetalle from "../../solicitudes/components/SolicitudDetalle";
import { useToast } from "../../../contexts/ToastContext";
import { aceptarCotizacion, rechazarCotizacion } from "../../../services/admin.service";

const formatPrice = (value) =>
  Number(value).toLocaleString("es-PE", { minimumFractionDigits: 2 });

const formatDate = (value) =>
  new Date(value).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const AdminCotizacionCard = ({ solicitud, onUpdate }) => {
  const toast = useToast();
  const [expanded, setExpanded] = useState(false);
  const [acting, setActing] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleAction = async (action) => {
    setActing(true);
    try {
      const { data } = action === "aceptar"
        ? await aceptarCotizacion(solicitud.id)
        : await rechazarCotizacion(solicitud.id);
      onUpdate(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al procesar la acción");
    } finally {
      setActing(false);
      setConfirmAction(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
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
          <span className="text-sm text-gray-500">{solicitud.cliente}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="hidden sm:inline">
            {formatDate(solicitud.fechaEmision)}
          </span>
          <span className="font-semibold text-gray-900">
            S/ {formatPrice(solicitud.total)}
          </span>
          <ChevronDown
            className={clsx(
              "h-4 w-4 shrink-0 transition-transform",
              expanded && "rotate-180"
            )}
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

      {solicitud.estado === "enviada" && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 sm:px-6">
          {confirmAction ? (
            <div className="flex items-center justify-end gap-3">
              <span className="text-sm text-gray-600">
                {confirmAction === "aceptar"
                  ? "¿Aceptar esta cotización?"
                  : "¿Rechazar esta cotización?"}
              </span>
              <button
                type="button"
                disabled={acting}
                className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-70"
                onClick={() => handleAction(confirmAction)}
              >
                {acting ? "..." : "Confirmar"}
              </button>
              <button
                type="button"
                disabled={acting}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                onClick={() => setConfirmAction(null)}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmAction("aceptar");
                }}
              >
                <Check size={16} />
                Aceptar
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmAction("rechazar");
                }}
              >
                <X size={16} />
                Rechazar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCotizacionCard;
