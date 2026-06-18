import { useState } from "react";
import { ChevronDown, CreditCard, X } from "lucide-react";
import clsx from "clsx";
import EstadoBadge from "../../solicitudes/components/EstadoBadge";
import SolicitudDetalle from "../../solicitudes/components/SolicitudDetalle";

const formatPrice = (value) =>
  Number(value).toLocaleString("es-PE", { minimumFractionDigits: 2 });

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "-";

const calcularResumen = (pedido) => {
  const subtotal = pedido.detalles?.reduce(
    (acc, item) => acc + Number(item.subtotal || 0),
    0
  );
  const total = Number(pedido.total || 0);
  return {
    subtotal,
    igv: Math.max(total - subtotal, 0),
    total,
  };
};

const PedidoCard = ({ pedido, showCliente = false, onPagar }) => {
  const [expanded, setExpanded] = useState(false);
  const [paying, setPaying] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("transferencia");
  const [reference, setReference] = useState("");
  const resumen = calcularResumen(pedido);
  const pendiente = pedido.estado === "pendiente";

  const handlePagar = async () => {
    if (!onPagar) return;
    setPaying(true);
    try {
      await onPagar(pedido.id, {
        metodoPago: paymentMethod,
        referencia: reference || `SIM-${Date.now()}`,
      });
      setShowPayment(false);
      setReference("");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-sm font-bold text-gray-950">
            Pedido #{pedido.id}
          </h3>
          <EstadoBadge estado={pedido.estado} />
          <span className="text-sm text-gray-500">
            Cotizacion #{pedido.cotizacionId}
          </span>
          {showCliente && (
            <span className="text-sm text-gray-500">{pedido.cliente}</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="hidden sm:inline">
            {formatDate(pedido.fechaPedido)}
          </span>
          <span className="font-semibold text-gray-900">
            S/ {formatPrice(pedido.total)}
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
          detalles={pedido.detalles}
          subtotal={resumen.subtotal}
          igv={resumen.igv}
          total={resumen.total}
        />
      )}

      {onPagar && pendiente && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="m-0 text-sm text-gray-600">
              Este pedido esta pendiente de pago.
            </p>
            <button
              type="button"
              disabled={paying}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-light disabled:opacity-70"
              onClick={() => setShowPayment(true)}
            >
              <CreditCard size={16} />
              Pagar pedido
            </button>
          </div>
        </div>
      )}

      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h3 className="m-0 text-lg font-bold text-gray-950">
                  Pago de Pedido
                </h3>
                <p className="m-0 mt-1 text-sm text-gray-500">
                  Pedido #{pedido.id} · S/ {formatPrice(pedido.total)}
                </p>
              </div>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setShowPayment(false)}
                disabled={paying}
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Metodo de pago
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-primary"
                  disabled={paying}
                >
                  <option value="transferencia">Transferencia bancaria</option>
                  <option value="yape">Yape</option>
                  <option value="plin">Plin</option>
                  <option value="tarjeta">Tarjeta simulada</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Referencia de pago
                </label>
                <input
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-primary"
                  placeholder="Ej. OP-123456"
                  disabled={paying}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-gray-200 px-5 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                onClick={() => setShowPayment(false)}
                disabled={paying}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-light disabled:opacity-70"
                onClick={handlePagar}
                disabled={paying}
              >
                <CreditCard size={16} />
                {paying ? "Confirmando..." : "Confirmar pago"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidoCard;
