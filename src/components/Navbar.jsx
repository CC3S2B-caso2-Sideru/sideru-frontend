import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar";

import logo from "../assets/logo-siderurgica.png";

const Navbar = () => {
  const navigate = useNavigate();

  const { cartCount } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);

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

        <button className="btn-primary">
          Iniciar Sesión
        </button>
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