import almacen from "../../assets/images/almacen-siderurgia-2.jpg";

const Coverage = () => {
  return (
    <section className="flex flex-col items-center gap-16 px-6 py-20 lg:flex-row lg:px-48">
      <div className="flex-1">
        <h2 className="m-0 text-4xl font-bold md:text-5xl">
          Cobertura Nacional Garantizada
        </h2>

        <p className="my-6 max-w-lg leading-relaxed text-slate-700">
          Con presencia en las principales ciudades del país, aseguramos
          entregas rápidas y eficientes a cualquier destino.
        </p>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-lg text-white">
              📍
            </div>
            <div>
              <h4 className="m-0 font-bold">Red Logística Completa</h4>
              <p className="m-0 mt-1 text-sm text-slate-700">
                12 centros de distribución estratégicamente ubicados
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-lg text-white">
              📦
            </div>
            <div>
              <h4 className="m-0 font-bold">Inventario Actualizado</h4>
              <p className="m-0 mt-1 text-sm text-slate-700">
                Sistema en tiempo real para disponibilidad inmediata
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-80 flex-1 overflow-hidden rounded-xl bg-slate-200">
        <img className="h-full w-full object-cover" src={almacen} alt="Almacen" />
      </div>
    </section>
  );
};

export default Coverage;
