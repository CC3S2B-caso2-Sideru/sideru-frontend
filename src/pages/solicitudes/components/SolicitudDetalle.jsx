const formatPrice = (value) =>
  Number(value).toLocaleString("es-PE", {
    minimumFractionDigits: 2,
  });

const SolicitudDetalle = ({ detalles, subtotal, igv, total }) => (
  <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
    <h4 className="mb-3 text-sm font-semibold text-gray-700">
      Productos solicitados
    </h4>

    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
            <th className="pb-2 pr-3 font-medium">SKU</th>
            <th className="pb-2 pr-3 font-medium">Producto</th>
            <th className="pb-2 pr-3 text-center font-medium">Cant.</th>
            <th className="pb-2 pr-3 text-right font-medium">P. Unit.</th>
            <th className="pb-2 text-right font-medium">Subtotal</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {detalles.map((d) => (
            <tr key={d.id}>
              <td className="py-2 pr-3 font-mono text-xs text-gray-500">
                {d.sku}
              </td>
              <td className="py-2 pr-3 text-gray-900">{d.productoNombre}</td>
              <td className="py-2 pr-3 text-center text-gray-700">
                {d.cantidad}
              </td>
              <td className="py-2 pr-3 text-right text-gray-700">
                S/ {formatPrice(d.precioUnitario)}
              </td>
              <td className="py-2 text-right font-medium text-gray-900">
                S/ {formatPrice(d.subtotal)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-4 flex flex-col items-end gap-1 border-t border-gray-200 pt-3 text-sm">
      <div className="flex gap-6 text-gray-600">
        <span>Subtotal</span>
        <span className="w-24 text-right">S/ {formatPrice(subtotal)}</span>
      </div>
      <div className="flex gap-6 text-gray-600">
        <span>IGV (18%)</span>
        <span className="w-24 text-right">S/ {formatPrice(igv)}</span>
      </div>
      <div className="flex gap-6 font-semibold text-gray-900">
        <span>Total</span>
        <span className="w-24 text-right">S/ {formatPrice(total)}</span>
      </div>
    </div>
  </div>
);

export default SolicitudDetalle;
