import logo from "../assets/logo-siderurgica.png";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* COLUMNA 1 */}
        <div className="footer-col">
          <div className="footer-brand">
            <img src={logo} alt="logo" className="footer-logo" />
            <h3>Sideru</h3>
          </div>

          <p>
            Líderes en distribución mayorista con presencia en todo el territorio nacional.
          </p>
        </div>

        {/* COLUMNA 2 */}
        <div className="footer-col">
          <h4>Contacto</h4>

          <p>📱 +52 (55) 1234-5678</p>
          <p>✉️ ventas@sideru.com</p>
          <p>📍 Av. Insurgentes Sur 1234</p>
        </div>

        {/* COLUMNA 3 */}
        <div className="footer-col">

          <h4>Ubicación Principal</h4>

          <div className="map-placeholder">
            
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 Sideru. Todos los derechos reservados.</p>

        <div className="footer-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a href="#">Catálogo</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;