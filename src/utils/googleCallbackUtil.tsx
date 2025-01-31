import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (token) {
        try {
          localStorage.setItem("authToken", params.get("token") || "");
          localStorage.setItem("userRole", params.get("role") || "");
          localStorage.setItem("userId", params.get("userId") || "");
          localStorage.setItem(
            "tokenSanctum",
            params.get("tokenSanctum") || ""
          );
          navigate("/dashboard/" + params.get("role"));
        } catch (error) {
          console.error("Error during callback:", error);
        }
      }
    };

    fetchUser();
  }, [location, navigate]);

  return <div>Autenticación exitosa, redirigiendo...</div>;
};

export default Callback;
