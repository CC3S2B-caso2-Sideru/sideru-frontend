import { Link } from "react-router-dom";
import logo from "../../assets/logo-siderurgica.png";

const Footer = () => {
  const mapUrl =
    "https://www.google.com/maps?q=Universidad%20Nacional%20de%20Ingenier%C3%ADa%20Lima%20Per%C3%BA&output=embed";
  const mapsLink = "https://maps.app.goo.gl/3TM1h2zcT7kwDdiw5";

  return (
    <footer className="bg-slate-950 px-6 py-10 text-white sm:px-8 lg:px-20 xl:px-40">
      <div>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo" className="h-8 sm:h-9" />
              <h3 className="m-0 text-xl font-bold sm:text-2xl">Sideru</h3>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">
              Líderes en distribución mayorista con presencia en todo el
              territorio nacional.
            </p>
          </div>

          <div>
            <h4 className="mb-4 mt-0 text-base font-bold sm:text-lg">
              Contacto
            </h4>

            <div className="space-y-2 text-sm text-white/75 sm:text-base">
              <p className="m-0">📱 +52 (55) 1234-5678</p>
              <p className="m-0">✉️ ventas@sideru.com</p>
              <p className="m-0">📍 Av. Túpac Amaru 210, Rímac, Lima</p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 mt-0 text-base font-bold sm:text-lg">
              Ubicación Principal
            </h4>

            <div className="overflow-hidden rounded-lg bg-white/15">
              <iframe
                className="h-36 w-full border-0 sm:h-40"
                title="Ubicación de la Universidad Nacional de Ingeniería"
                src={mapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              className="mt-3 inline-block text-sm font-medium text-white no-underline hover:underline"
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/20 pt-5 text-sm sm:text-base md:flex-row md:items-center md:justify-between">
          <p className="m-0 text-white/70">
            © 2026 Sideru. Todos los derechos reservados.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
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
      </div>
    </footer>
  );
};

export default Footer;
