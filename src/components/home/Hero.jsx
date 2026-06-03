import { useNavigate } from "react-router-dom";
import almacenHero from "../../assets/images/almacen-siderurgia.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative flex min-h-screen items-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${almacenHero})` }}
    >
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 max-w-6xl px-6 py-24 sm:px-10 md:px-20 lg:px-32 xl:px-40">
        <p className="inline-block rounded-full border border-white/30 bg-slate-950/20 px-4 py-2 text-sm font-medium backdrop-blur-sm md:text-base">
          Top 4 en el Mercado Nacional
        </p>

        <h1 className="mt-6 text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl xl:text-8xl">
          Líderes en Distribución <br /> Nacional
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl xl:text-2xl">
          Conectamos tu negocio con los mejores productos del país. Cobertura
          nacional, entregas puntuales, servicio profesional.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            className="rounded-lg bg-slate-950 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
            onClick={() => navigate("/productos")}
          >
            Explorar Catálogo
          </button>
          <button
            className="rounded-lg border border-white/30 bg-white/10 px-5 py-3 font-medium text-white backdrop-blur-md transition hover:bg-white/20"
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
