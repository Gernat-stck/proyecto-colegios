import { useState, useEffect } from "react";
import axios from "axios";

interface UseGenerateTokenReturn {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const useGenerateToken = (): UseGenerateTokenReturn => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sanctumToken = localStorage.getItem("tokenSanctum");
  const microServiceUrl = import.meta.env.VITE_MCS_URL;
  useEffect(() => {
    const getMicroserviceToken = async () => {
      if (!sanctumToken) {
        setError("No hay token de autenticación");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(`${microServiceUrl}/api/token`, {
          token: sanctumToken,
        });
        setToken(response.data.token);
        localStorage.setItem("microserviceToken", response.data.token);
        setError(null);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Error al conectar con el servidor";
        setError(errorMessage);
        console.error(
          "Error al obtener el token del microservicio:",
          errorMessage
        );
      } finally {
        setLoading(false);
      }
    };

    getMicroserviceToken();
  }, [sanctumToken]);

  return { token, loading, error };
};

export default useGenerateToken;
