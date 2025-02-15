import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Cookies from "js-cookie";
export default function RouteGuard() {
  const auth = useAuth();
  const location = useLocation();
  // Si no hay usuario logeado, redirecciona a la página de login
  if (!auth.token) {
    if (Cookies.get("referenceSession")) {

      return <Outlet />;
    }


    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
