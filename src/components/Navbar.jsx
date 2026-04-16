import logo from "../assets/logo-siderurgica.png";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="brand">
        <img src={logo} alt="Logo" className="logo-img"/>
        <span className="brand-name">Sideru</span>
      </div>

      <div className="nav-links">
        <a href="#">Catálogo de Productos</a>
        <button className="btn-primary">Iniciar Sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;