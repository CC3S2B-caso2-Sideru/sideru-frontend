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
      <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 bg-white px-6 py-4 shadow-sm lg:px-40">
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" className="h-10" />
          <span className="text-xl font-bold">Sideru</span>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 md:gap-5">
          <Link
            className="whitespace-nowrap font-medium text-black no-underline transition hover:text-slate-950"
            to="/productos"
          >
            Catálogo de Productos
          </Link>

          {token && (
            <span className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-950">
              {user?.username || user?.persona?.nombre || "Usuario"}
            </span>
          )}

          <button
            className="relative cursor-pointer border-none bg-transparent text-2xl transition hover:scale-105"
            onClick={() => setIsCartOpen(true)}
            aria-label="Abrir carrito"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {token ? (
            <button
              className="whitespace-nowrap rounded-lg border-none bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          ) : (
            <button
              className="whitespace-nowrap rounded-lg border-none bg-slate-950 px-4 py-2 font-medium text-white transition hover:bg-slate-800"
              onClick={() => navigate("/login")}
            >
              Iniciar Sesión
            </button>
          )}
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
