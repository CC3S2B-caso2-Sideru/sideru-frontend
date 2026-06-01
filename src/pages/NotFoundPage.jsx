import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="py-5 text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="mb-3 text-2xl font-semibold">Página no encontrada</h2>
      <p className="mb-4 text-gray-500">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Link
        to="/"
        className="inline-block rounded-lg bg-primary px-6 py-2 font-medium text-white transition hover:bg-primary-light"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
