import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { token, user } = useAuth();
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "Debes iniciar sesión para acceder al panel.",
        }}
        replace
      />
    );
  }

  if (user?.tipo !== "INTERNO") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
