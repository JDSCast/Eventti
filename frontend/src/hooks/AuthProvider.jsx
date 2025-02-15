import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import Cookies from "js-cookie";
import { isAuthenticated, setAuthenticated } from "../api/authStatus";
//instancia de Context para mantener la sesion del usuario
const AuthContext = createContext();

//Provider ayuda asigna y procesa la informacion del usuario hacia cada child
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: Cookies.get("username") || "",
    email: Cookies.get("email") || "",
  });
  
  const [token, setToken] = useState(Cookies.get("accessToken") || "");

  const navigate = useNavigate();

  //Valida las cookies cada que se cambia de direccion
  useEffect(() => {

    if (!Cookies.get("accessToken") && Cookies.get("referenceSession")) {

      checkTokens()
    }
    if (!Cookies.get("accessToken") && !Cookies.get("referenceSession")) {
      setToken("");
    }

  }, [navigate]);

  // Si expira la sesion fuera de navigate, cierra la sesion automaticamente
  useEffect(() => {
    if (!isAuthenticated) {
      logOut();
    }

  }, [isAuthenticated]);

  //Utiliza el endpoint para verificar el refresh token
  const checkTokens = async () => {
    try {
      const response = await apiClient.get("/auth");
      if (response.status === 200) {

        // Actualizar el estado si se restaura la sesión
        setToken(Cookies.get("accessToken") || response.data.message);
        return true;
      } else {
        // console.log(`la sesión no fue restaurada: ${response.status}`);
        return false;
      }
    } catch (error) {
      // console.log(`Error al restaurar la sesión: ${error.response?.status}`);
      return false;
    }
  };

  //Controlan el login y la info de respuesta para asignarla al contexto
  const loginAction = async (userLogin) => {
    const response = await apiClient.post("/users/login", userLogin);

    // * Solo responde con la info que esta indicada en el back
    if (response.status === 200) {
      setUser({
        username: `${response.data.name} ${response.data.lastname}`,
        email: response.data.email,
      });
      setAuthenticated(true);
      setToken(Cookies.get("accessToken"));

      //Setea la info que recibe del back como una cookie para el front
      Cookies.set(
        "username",
        `${response.data.name} ${response.data.lastname}`,
        { expires: 1 }
      );
      Cookies.set("email", response.data.email, { expires: 1 });

      return navigate("/events");
    }

    throw new Error(response.data.message);
  };

  const logOut = async () => {
    setUser({
      username: "",
      email: "",
    });
    setToken("");
    try {
      await apiClient.get("/users/logout");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      navigate("/");
    } finally {
      // Borra las cookies del navegador, sin importar que pase en back
      Cookies.remove("accessToken");
      Cookies.remove("referenceSession");
      Cookies.remove("email");
      Cookies.remove("username");
      navigate("/home");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

//Permite usar  la info y metodos de AuthContext, el "use" en el nombre es necesario
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
