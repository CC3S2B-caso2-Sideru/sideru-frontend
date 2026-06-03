import { useState } from "react";
import { useCart } from "../../contexts/CartContext";

const ProductoCard = ({ producto }) => {
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();

  const stockClass =
    producto.stock === 0
      ? "bg-red-100 text-red-800"
      : producto.stock < 10
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800";

  return (
    <article className="flex h-full w-full min-w-0 overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-full w-full min-w-0 flex-col">
        <div className="relative h-48 overflow-hidden bg-stone-200">
          {!imgError && producto.imagen ? (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-stone-200 text-5xl text-gray-400">
              🔩
            </div>
          )}

          <span
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${stockClass}`}
          >
            {producto.stock === 0
              ? "Agotado"
              : producto.stock < 10
              ? `Últimas ${producto.stock} uds.`
              : "Disponible"}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
            {producto.sku}
          </span>

          <h3 className="m-0 flex-1 break-words text-base font-semibold leading-snug text-slate-950">
            {producto.nombre}
          </h3>

          <div className="mt-auto flex min-w-0 items-center justify-between gap-3 border-t border-stone-100 pt-4">
            <span className="min-w-0 text-lg font-bold text-slate-950 sm:text-xl">
              S/{" "}
              {Number(producto.precio).toLocaleString("es-PE", {
                minimumFractionDigits: 2,
              })}
            </span>

            <button
              type="button"
              className="shrink-0 rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-70"
              disabled={producto.stock === 0}
              onClick={() => addToCart(producto)}
            >
              {producto.stock === 0 ? "Agotado" : "Agregar"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductoCard;
