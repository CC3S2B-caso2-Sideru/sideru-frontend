import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartSidebar from "./CartSidebar";
import logo from "../assets/logo-siderurgica.png";

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
      <nav className="navbar">
        <div className="brand" onClick={() => navigate('/')}>
          <img src={logo} alt="Logo" className="logo-img"/>
          <span className="brand-name">Sideru</span>
        </div>

        <div className="nav-links">
          <Link to="/productos">
            Catálogo de Productos
          </Link>

          {token && (
            <span className="user-name">
              {user?.username || user?.persona?.nombre || "Usuario"}
            </span>
          )}

          <button
            className="cart-button"
            onClick={() => setIsCartOpen(true)}
          >
            🛒
            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </button>

          {token ? (
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          ) : (
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>

      {isCartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Navbar;