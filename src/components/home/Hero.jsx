import { useNavigate } from "react-router-dom";
import almacenHero from "../../assets/images/almacen-siderurgia.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${almacenHero})` }}
    >
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 max-w-5xl px-6 py-20 md:px-24 lg:px-48">
        <p className="inline-block rounded-full border border-white/30 bg-slate-950/20 px-4 py-2 text-sm backdrop-blur-sm">
          Top 4 en el Mercado Nacional
        </p>

        <h1 className="mt-6 text-5xl font-bold leading-tight md:text-6xl">
          Líderes en Distribución <br /> Nacional
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed">
          Conectamos tu negocio con los mejores productos del país. Cobertura
          nacional, entregas puntuales, servicio profesional.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            className="rounded-lg bg-slate-950 px-4 py-2 font-medium text-white transition hover:bg-slate-800"
            onClick={() => navigate("/productos")}
          >
            Explorar Catálogo
          </button>
          <button
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 font-medium text-white backdrop-blur-md transition hover:bg-white/20"
            onClick={() => navigate("/register")}
          >
            Registrarse
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
