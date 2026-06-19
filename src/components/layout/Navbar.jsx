import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import CartSidebar from "../cart/CartSidebar";
import logo from "../../assets/logo-siderurgica.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, token, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-30 bg-white px-4 py-3 shadow-sm sm:px-6 lg:px-20 xl:px-40">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" className="h-9 sm:h-10" />
            <span className="text-lg font-bold sm:text-xl">Sideru</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 md:justify-end md:overflow-visible md:pb-0 lg:gap-5">
            <Link
              className="shrink-0 whitespace-nowrap text-sm font-medium text-black no-underline transition hover:text-slate-950 sm:text-base"
              to="/productos"
            >
              Catálogo de Productos
            </Link>

            {token && user?.tipo === "INTERNO" && (
              <Link
                className="shrink-0 whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-light"
                to="/admin"
              >
                Panel
              </Link>
            )}

            {token && user?.tipo !== "INTERNO" && (
              <>
                <Link
                  className="shrink-0 whitespace-nowrap text-sm font-medium text-black no-underline transition hover:text-slate-950 sm:text-base"
                  to="/solicitudes"
                >
                  Mis Cotizaciones
                </Link>
                <Link
                  className="shrink-0 whitespace-nowrap text-sm font-medium text-black no-underline transition hover:text-slate-950 sm:text-base"
                  to="/pedidos"
                >
                  Mis Pedidos
                </Link>
              </>
            )}

            {token && (
              <span className="shrink-0 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-950 sm:px-4">
                {user?.username || user?.persona?.nombre || "Usuario"}
              </span>
            )}

            <button
              className="relative shrink-0 cursor-pointer border-none bg-transparent px-1 text-2xl transition hover:scale-105"
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir carrito"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {token ? (
              <button
                className="shrink-0 whitespace-nowrap rounded-lg border-none bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-orange-500 sm:px-4 sm:text-base"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            ) : (
              <button
                className="shrink-0 whitespace-nowrap rounded-lg border-none bg-slate-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 sm:px-4 sm:text-base"
                onClick={() => navigate("/login")}
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Navbar;
