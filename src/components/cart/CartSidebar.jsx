import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { submitCotizacion } from "../../services/cotizaciones.service";

const formatPrice = (value) =>
  Number(value).toLocaleString("es-PE", {
    minimumFractionDigits: 2,
  });

const CartSidebar = ({ isOpen, onClose }) => {
  const {
    cart,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!token) {
      onClose();
      navigate("/login", {
        state: {
          message: "Iniciar sesion para cotizar",
        },
      });
      return;
    }

    setLoading(true);

    try {
      const items = cart.map((item) => ({
        sku: item.sku,
        cantidad: item.cantidad,
      }));

      await submitCotizacion(items, token);

      alert("Solicitud enviada");
      clearCart();
      onClose();
      navigate("/solicitudes");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al solicitar cotizacion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Cerrar carrito"
          className="fixed inset-0 z-999 cursor-default bg-black/40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-1000 flex h-screen w-full max-w-400px flex-col bg-white shadow-[-4px_0_20px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2 className="text-xl font-bold text-gray-950">Carrito</h2>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            x
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 items-center justify-center px-8 text-center text-gray-500">
            <p>Tu carrito esta vacio.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {cart.map((item) => (
                <div
                  key={item.sku}
                  className="border-b border-gray-200 py-4 first:pt-0 last:border-b-0"
                >
                  <div>
                    <h4 className="text-base font-semibold text-gray-950">
                      {item.nombre}
                    </h4>

                    <span className="mt-1 block text-sm text-gray-600">
                      S/ {formatPrice(item.precio)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      className="grid h-8 w-8 place-items-center rounded-md bg-primary text-sm font-bold text-white transition hover:bg-primary-light"
                      onClick={() => decreaseQuantity(item.sku)}
                    >
                      -
                    </button>

                    <span className="min-w-6 text-center text-sm font-semibold text-gray-900">
                      {item.cantidad}
                    </span>

                    <button
                      type="button"
                      className="grid h-8 w-8 place-items-center rounded-md bg-primary text-sm font-bold text-white transition hover:bg-primary-light"
                      onClick={() => increaseQuantity(item.sku)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="mt-3 text-sm font-medium text-red-600 transition hover:text-red-700 hover:underline"
                    onClick={() => removeFromCart(item.sku)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-200 px-6 py-5">
              <h3 className="text-lg font-bold text-gray-950">
                Total: S/ {formatPrice(totalPrice)}
              </h3>

              <button
                type="button"
                className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Solicitar cotizacion"}
              </button>

              <button
                type="button"
                className="w-full rounded-lg bg-gray-100 px-4 py-3 font-medium text-gray-800 transition hover:bg-gray-200"
                onClick={clearCart}
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;
