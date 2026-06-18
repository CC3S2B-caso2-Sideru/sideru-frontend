import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location, message: `Debes iniciar sesión antes de acceder a ${location.pathname}` }} replace />;
  }

  return children;
};

export default PrivateRoute;
