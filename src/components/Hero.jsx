import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="hero">
      <div className="overlay">
        <p className="badge">Top 4 en el Mercado Nacional</p>

        <h1 className="hero-title">
          Líderes en Distribución <br /> Nacional
        </h1>

        <p className="description">
          Conectamos tu negocio con los mejores productos del país.
          Cobertura nacional, entregas puntuales, servicio profesional.
        </p>

        <div className="buttons">
          <button className="btn-primary" onClick={() => navigate('/productos')}>Explorar Catálogo</button>
          <button className="btn-secondary">Registrarse</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
