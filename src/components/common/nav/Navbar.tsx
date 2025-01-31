import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 w-screen lg:w-full z-50 backdrop-blur-0 bg-slate-50/5 text-slate-900 border-b border-slate-900/10"
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container mx-auto flex justify-between items-center p-6 lg:p-4">
        <div className="text-slate-100 text-2xl lg:text-3xl font-bold">
          LOGOTIPO
        </div>
        <ul className="hidden lg:flex text-base space-x-10">
          <li className="flex">
            <a href="#">Inicio</a>
          </li>
          <li className="flex">
            <a href="#ads">Anuncios</a>
          </li>
          <li className="flex">
            <a href="#about">Quienes Somos </a>
          </li>
          <li className="flex">
            <a href="#offer">Oferta Academica </a>
          </li>
          <li className="flex">
            <a href="#contact">Contacto </a>
          </li>
          <li className="flex pl-6">
            <div className="inline-block relative">
              <Link
                to="/login"
                className="appearance-none bg-transparent -pl-10 pr-10 leading-5 focus:outline-none cursor-pointer transition duration-150 ease-in-out"
              >
                Iniciar Sesion
              </Link>
              <LockKeyhole className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 pointer-events-none" />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
