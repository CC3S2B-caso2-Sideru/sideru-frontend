import almacen from "../../assets/images/almacen-siderurgia-2.jpg";

const Coverage = () => {
  return (
    <section className="flex flex-col items-center gap-12 px-6 py-16 sm:px-10 md:px-20 lg:flex-row lg:px-32 xl:gap-16 xl:px-40 xl:py-24">
      <div className="flex-1">
        <h2 className="m-0 text-4xl font-bold leading-tight md:text-5xl xl:text-6xl">
          Cobertura Nacional Garantizada
        </h2>

        <p className="my-6 max-w-2xl text-base leading-relaxed text-slate-700 md:text-lg xl:text-xl">
          Con presencia en las principales ciudades del país, aseguramos
          entregas rápidas y eficientes a cualquier destino.
        </p>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-lg text-white">
              📍
            </div>
            <div>
              <h4 className="m-0 text-base font-bold md:text-lg">
                Red Logística Completa
              </h4>
              <p className="m-0 mt-1 text-sm text-slate-700 md:text-base">
                12 centros de distribución estratégicamente ubicados
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-lg text-white">
              📦
            </div>
            <div>
              <h4 className="m-0 text-base font-bold md:text-lg">
                Inventario Actualizado
              </h4>
              <p className="m-0 mt-1 text-sm text-slate-700 md:text-base">
                Sistema en tiempo real para disponibilidad inmediata
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-72 w-full flex-1 overflow-hidden rounded-xl bg-slate-200 md:h-96 lg:w-auto">
        <img className="h-full w-full object-cover" src={almacen} alt="Almacen" />
      </div>
    </section>
  );
};

export default Coverage;
