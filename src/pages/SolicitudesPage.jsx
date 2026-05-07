import { Container, Table, Button, Badge } from "react-bootstrap";
import Footer from "../components/Footer";

const SolicitudesPage = () => {
  const solicitudes = [
    { id: 1, fecha: "2026-05-01", estado: "Pendiente", total: "S/ 1,250.00" },
    { id: 2, fecha: "2026-04-28", estado: "Aprobado", total: "S/ 3,400.00" },
    { id: 3, fecha: "2026-04-15", estado: "Rechazado", total: "S/ 800.00" },
  ];

  const variantBadge = (estado) => {
    switch (estado) {
      case "Aprobado": return "success";
      case "Pendiente": return "warning";
      case "Rechazado": return "danger";
      default: return "secondary";
    }
  };

  return (
    <>
      <Container className="py-5">
        <h2 className="mb-4">Mis Solicitudes de Cotización</h2>
        {solicitudes.length === 0 ? (
          <p className="text-muted">No tienes solicitudes aún.</p>
        ) : (
          <Table hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.fecha}</td>
                  <td>
                    <Badge bg={variantBadge(s.estado)}>{s.estado}</Badge>
                  </td>
                  <td>{s.total}</td>
                  <td>
                    <Button size="sm" variant="outline-primary">
                      Ver detalle
                    </Button>
                  </td>
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