import almacen from "../assets/images/almacen-siderurgia-2.jpg";

const Coverage = () => {
  return (
    <section className="coverage">
      
      <div className="coverage-text">
        
        <h2>Cobertura Nacional Garantizada</h2>

        <p className="coverage-description">
          Con presencia en las principales ciudades del país, aseguramos entregas rápidas y eficientes a cualquier destino.
        </p>

        <div className="coverage-items">

          <div className="coverage-item">
            <div className="icon-box">📍</div>
            <div>
              <h4>Red Logística Completa</h4>
              <p>12 centros de distribución estratégicamente ubicados</p>
            </div>
          </div>

          <div className="coverage-item">
            <div className="icon-box">📦</div>
            <div>
              <h4>Inventario Actualizado</h4>
              <p>Sistema en tiempo real para disponibilidad inmediata</p>
            </div>
          </div>

        </div>

      </div>


      <div className="coverage-image">
        <img src={almacen} alt="Almacen"/>
      </div>

    </section>
  );
};

export default Coverage;