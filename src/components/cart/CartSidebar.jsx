import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { submitCotizacion } from "../../services/cotizaciones.service";

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
          message: "Iniciar sesion para cotizar"
        }
      });
      return;
    }
    setLoading(true);

    try {
      const items = cart.map((item) => ({
        sku: item.sku,
        cantidad: item.cantidad
      }));

      await submitCotizacion(items);

      alert("Solicitud enviada");
      clearCart();
      onClose();
      navigate("/solicitudes");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al solicitar cotización");
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      {isOpen && (
        <div className="cart-overlay" onClick={onClose}></div>
      )}

      <aside className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Carrito</h2>

          <button className="cart-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Tu carrito está vacío.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.sku} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.nombre}</h4>

                    <span>
                      S/{" "}
                      {Number(item.precio).toLocaleString("es-PE", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div className="cart-controls">
                    <button onClick={() => decreaseQuantity(item.sku)}>
                      -
                    </button>

                    <span>{item.cantidad}</span>

                    <button onClick={() => increaseQuantity(item.sku)}>
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.sku)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <h3>
                Total: S/{" "}
                {Number(totalPrice).toLocaleString("es-PE", {
                  minimumFractionDigits: 2,
                })}
              </h3>

              <button className="btn-primary cart-action" onClick={handleCheckout} disabled={loading}>
                {loading ? "Procesando..." : "Solicitar cotización"}
              </button>

              <button className="clear-cart-btn" onClick={clearCart}>
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
