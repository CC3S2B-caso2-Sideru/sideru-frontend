const Stats = () => {
  return (
    <section className="grid bg-slate-950 text-white md:grid-cols-3">
      <div className="flex flex-col items-center justify-center px-8 py-14 text-center md:py-20 xl:py-24">
        <h2 className="m-0 text-5xl font-bold md:text-6xl xl:text-7xl">12+</h2>
        <p className="m-0 mt-2 text-base md:text-lg xl:text-xl">
          Almacenes Regionales
        </p>
      </div>

      <div className="flex flex-col items-center justify-center px-8 py-14 text-center md:py-20 xl:py-24">
        <h2 className="m-0 text-5xl font-bold md:text-6xl xl:text-7xl">15K+</h2>
        <p className="m-0 mt-2 text-base md:text-lg xl:text-xl">
          Productos en Catálogo
        </p>
      </div>

      <div className="flex flex-col items-center justify-center px-8 py-14 text-center md:py-20 xl:py-24">
        <h2 className="m-0 text-5xl font-bold md:text-6xl xl:text-7xl">98%</h2>
        <p className="m-0 mt-2 text-base md:text-lg xl:text-xl">
          Entregas Puntuales
        </p>
      </div>
    </section>
  );
};

export default Stats;
