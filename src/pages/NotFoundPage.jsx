import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container className="text-center py-5">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-3">Página no encontrada</h2>
      <p className="text-muted mb-4">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Button as={Link} to="/" variant="primary">
        Volver al inicio
      </Button>
    </Container>
  );
};

export default NotFoundPage;