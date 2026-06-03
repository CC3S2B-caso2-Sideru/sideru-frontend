import { useEffect, useState } from "react";
//import { Container, Table, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { fetchMisCotizaciones } from "../../services/cotizaciones.service";
import Footer from "../../components/layout/Footer";

const SolicitudesPage = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSolicitudes = async () => {
    setLoading(true);
    try {
      const { data } = await fetchMisCotizaciones();
      setSolicitudes(data);
    } catch (err) {
      setError("No se pudieron cargar tus solicitudes de cotización.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const variantBadge = (estado) => {
    switch (estado.toLowerCase()) {
      case "aceptada": return "success";
      case "enviada": return "info";
      case "borrador": return "warning";
      case "rechazada": return "danger";
      default: return "secondary";
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Cargando solicitudes...</p>
      </Container>
    );
  }

  return (
    <>
      <Container className="py-5">
        <h2 className="mb-4">Mis Solicitudes de Cotización</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        {solicitudes.length === 0 ? (
          <p className="text-muted">No tienes solicitudes aún.</p>
        ) : (
          <Table hover responsive>
            <thead>
              <tr>
                <th>Nro Cotización</th>
                <th>Fecha de Emisión</th>
                <th>Expiración</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((s) => (
                <tr key={s.id}>
                  <td>#000{s.id}</td>
                  <td>{new Date(s.fechaEmision).toLocaleDateString()}</td>
                  <td>{new Date(s.fechaExpiracion).toLocaleDateString()}</td>
                  <td>
                    <Badge bg={variantBadge(s.estado)}>{s.estado.toUpperCase()}</Badge>
                  </td>
                  <td>S/ {Number(s.total).toFixed(2)}</td>
                  <td>{s.observaciones || "Sin observaciones"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default SolicitudesPage;