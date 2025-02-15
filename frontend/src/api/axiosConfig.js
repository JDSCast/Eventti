import axios from "axios";
import { setAuthenticated } from './authStatus';
import Cookies from 'js-cookie';

// Configuración de axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER || "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// TODO: Considerar si es necesario
apiClient.interceptors.request.use( (config)=>{
    // Añadir token de autenticación al header de cada petición
    const token = Cookies.get('accessToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//Intercepta las repuestas del back para asegurarse de que el usuario siga logeado
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {

      setAuthenticated(false);
    }
    return error.response;
  }
);

export default apiClient;
