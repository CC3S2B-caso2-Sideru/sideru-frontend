import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-siderurgica.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">

      <div className="brand" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" className="logo-img"/>
        <span className="brand-name">Sideru</span>
      </div>

      <div className="nav-links">
        <Link to="/productos">Catálogo de Productos</Link>
        <button className="btn-primary">Iniciar Sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;