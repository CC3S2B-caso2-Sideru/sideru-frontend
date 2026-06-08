const Stats = () => {
  return (
    <section className="grid bg-slate-950 text-white md:grid-cols-3">
      <div className="flex flex-col items-center justify-center px-8 py-16 text-center md:py-24">
        <h2 className="m-0 text-6xl font-bold">12+</h2>
        <p className="m-0 mt-2 text-lg">Almacenes Regionales</p>
      </div>

      <div className="flex flex-col items-center justify-center px-8 py-16 text-center md:py-24">
        <h2 className="m-0 text-6xl font-bold">15K+</h2>
        <p className="m-0 mt-2 text-lg">Productos en Catálogo</p>
      </div>

      <div className="flex flex-col items-center justify-center px-8 py-16 text-center md:py-24">
        <h2 className="m-0 text-6xl font-bold">98%</h2>
        <p className="m-0 mt-2 text-lg">Entregas Puntuales</p>
      </div>
    </section>
  );
};

export default Stats;
