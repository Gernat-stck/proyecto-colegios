import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UserCircle } from "lucide-react";
import { makeRequest } from "@/hooks/api";
import SplitText from "@/components/ui/SplitText";
const handleLoginWithoutGoogle = async (
  e: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  setLoading: (loading: boolean) => void,
  navigate: (path: string) => void
) => {
  e.preventDefault();
  setLoading(true);
  try {
    const data = await makeRequest({
      url: "auth/login",
      method: "POST",
      data: { email, password },
    });
    localStorage.setItem("tokenSanctum", data.authToken || "");
    localStorage.setItem("role", data.role || "Courses");
    localStorage.setItem("userId", data.userId || "");
    toast.success("Inicio de sesión exitoso");
    navigate(`/dashboard/${data.role}/Home`);
  } catch (error) {
    console.error("Error during login:", error);
    let errorMessage = "Error en el inicio de sesión";
    if (error instanceof Error) {
      const responseError = (error as any).response?.data?.error;
      errorMessage = responseError || errorMessage;
    }
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white w-screen h-screen overflow-y-hidden">
      <Link to="/">
        <Button
          variant="ghost"
          className="bg-transparent text-xl absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-8 w-8 mr-2" />
          Regresar
        </Button>
      </Link>
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                onSubmit={(e) =>
                  handleLoginWithoutGoogle(
                    e,
                    email,
                    password,
                    setLoading,
                    navigate
                  )
                }
              >
                <SplitText
                  text={`Bienvenido`}
                  className="text-4xl font-semibold text-center"
                  delay={150}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,50px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  threshold={0.2}
                  rootMargin="-50px"
                />
                <SplitText
                  text={`a una nueva forma de aprender.`}
                  className="text-3xl font-semibold text-center"
                  delay={150}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,50px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  threshold={0.2}
                  rootMargin="-50px"
                />

                <UserCircle className=" h-16 w-full text-dark-grey-900 flex items-center my-10" />
                <p className="mb-4 text-grey-700">Ingresa tus credenciales</p>
                {/*<Button
                  className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
                  onClick={(e) => handleGoogleLogin(e, setLoading)}
                >
                  <img
                    className="h-5 mr-2"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                    alt=""
                    loading="lazy"
                  />
                  Iniciar con Google
                </Button>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <p className="mx-4 text-grey-600">or</p>
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div> */}
                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Correo*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="mail@loopple.com"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Contraseña*
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Cargando..." : "Inciar Sesion"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
