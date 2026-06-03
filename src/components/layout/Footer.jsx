import { Link } from "react-router-dom";
import logo from "../../assets/logo-siderurgica.png";

const Footer = () => {
  return (
    <footer className="bg-slate-950 px-6 py-12 text-white lg:px-16">
      <div className="mb-8 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-8" />
            <h3 className="m-0 text-xl font-bold">Sideru</h3>
          </div>

          <p className="mt-4 leading-relaxed text-white/80">
            Líderes en distribución mayorista con presencia en todo el
            territorio nacional.
          </p>
        </div>

        <div>
          <h4 className="mb-4 mt-0 font-bold">Contacto</h4>

          <div className="space-y-2 text-white/80">
            <p className="m-0">📱 +52 (55) 1234-5678</p>
            <p className="m-0">✉️ ventas@sideru.com</p>
            <p className="m-0">📍 Av. Insurgentes Sur 1234</p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 mt-0 font-bold">Ubicación Principal</h4>

          <div className="h-32 rounded-lg bg-white/20" />
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/20 pt-4 md:flex-row md:items-center md:justify-between">
        <p className="m-0 text-white/80">
          © 2026 Sideru. Todos los derechos reservados.
        </p>

        <div className="flex flex-wrap gap-4">
          <a className="text-white no-underline hover:underline" href="#">
            Privacidad
          </a>
          <a className="text-white no-underline hover:underline" href="#">
            Términos
          </a>
          <Link className="text-white no-underline hover:underline" to="/productos">
            Catálogo
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
