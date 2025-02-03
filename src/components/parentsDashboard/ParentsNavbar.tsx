import { useState } from "react";
import {
  ArrowLeft,
  BookOpenCheck,
  Bot,
  Calendar1,
  CircleDollarSign,
  HomeIcon,
  MessageSquareMore,
  NotebookPenIcon,
  UserRoundPen,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function ParentsNavbar({
  onSelect,
}: {
  onSelect: (component: string) => void;
}) {
  const [selected, setSelected] = useState<string>("Home");

  const handleSelect = (component: string) => {
    setSelected(component);
    onSelect(component);
  };

  return (
    <nav className="w-full">
      <ul className="flex lg:hidden justify-between items-center text-slate-900 px-6 pb-4 pt-6">
        <li className="text-3xl font-bold text-white"> LOGOTIPO </li>
        <li>
          <Button className="undefined">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </Button>
        </li>
      </ul>
      <ul className="hidden lg:flex flex-col h-full pb-4 items-start">
        <li className="text-white hidden lg:block text-3xl font-bold text-center w-full py-6">
          LOGOTIPO
        </li>
        <li
          className={`w-full px-6 my-3 lg:my-2 ${selected === "Home" ? "bg-gradient-to-l from-violet-300 to-violet-500" : ""} hover:bg-violet-200 hover:bg-opacity-10 flex`}
        >
          <Button
            onClick={() => handleSelect("Home")}
            className="w-full bg-transparent shadow-none text-white hover:bg-transparent px-2 py-1 flex items-center justify-start gap-3 font-semibold text-xl lg:text-lg"
          >
            <HomeIcon className="lucide lucide-house" /> Inicio
          </Button>
        </li>
        <li
          className={`w-full px-6 my-3 lg:my-2 ${selected === "Messages" ? "bg-gradient-to-l from-violet-300 to-violet-500" : ""} hover:bg-violet-200 hover:bg-opacity-10 flex`}
        >
          <Button
            onClick={() => handleSelect("Messages")}
            className="w-full bg-transparent shadow-none text-white hover:bg-transparent px-2 py-1 flex items-center justify-start gap-3 font-semibold text-xl lg:text-lg"
          >
            <MessageSquareMore /> Mensajes
          </Button>
        </li>
        <li
          className={`w-full px-6 my-3 lg:my-2 ${selected === "Calendar" ? "bg-gradient-to-l from-violet-300 to-violet-500" : ""} hover:bg-violet-200 hover:bg-opacity-10 flex`}
        >
          <Button
            onClick={() => handleSelect("Calendar")}
            className="w-full bg-transparent shadow-none text-white hover:bg-transparent px-2 py-1 flex items-center justify-start gap-3 font-semibold text-xl lg:text-lg"
          >
            <Calendar1 /> Calendario
          </Button>
        </li>
        <li
          className={`w-full px-6 my-3 lg:my-2 ${selected === "GradesReport" ? "bg-gradient-to-l from-violet-300 to-violet-500" : ""} hover:bg-violet-200 hover:bg-opacity-10 flex`}
        >
          <Button
            onClick={() => handleSelect("GradesReport")}
            className="w-full bg-transparent shadow-none text-white hover:bg-transparent px-2 py-1 flex items-center justify-start gap-3 font-semibold text-xl lg:text-lg"
          >
            <BookOpenCheck /> Calificaciones
          </Button>
        </li>
        <li
          className={`w-full px-6 my-3 lg:my-2 ${selected === "Tasks" ? "bg-gradient-to-l from-violet-300 to-violet-500" : ""} hover:bg-violet-200 hover:bg-opacity-10 flex`}
        >
          <Button
            onClick={() => handleSelect("Tasks")}
            className="w-full bg-transparent shadow-none text-white hover:bg-transparent px-2 py-1 flex items-center justify-start gap-3 font-semibold text-xl lg:text-lg"
          >
            <NotebookPenIcon /> Tareas
          </Button>
        </li>
        <li
          className={`w-full px-6 my-3 lg:my-2 ${selected === "Payments" ? "bg-gradient-to-l from-violet-300 to-violet-500" : ""} hover:bg-violet-200 hover:bg-opacity-10 flex`}
        >
          <Button
            onClick={() => handleSelect("Payments")}
            className="w-full bg-transparent shadow-none text-white hover:bg-transparent px-2 py-1 flex items-center justify-start gap-3 font-semibold text-xl lg:text-lg"
          >
            <CircleDollarSign className="w-8 h-10" /> Pagos
          </Button>
        </li>
        <li
          className={`w-full px-6 my-3 lg:my-2 ${selected === "Attendance" ? "bg-gradient-to-l from-violet-300 to-violet-500" : ""} hover:bg-violet-200 hover:bg-opacity-10 flex`}
        >
          <Button
            onClick={() => handleSelect("Attendance")}
            className="w-full bg-transparent shadow-none text-white hover:bg-transparent px-2 py-1 flex items-center justify-start gap-3 font-semibold text-xl lg:text-lg"
          >
            <UserRoundPen /> Asistencia
          </Button>
        </li>
        <div className="mt-32 w-full flex flex-col items-end">
          <li
            className={`w-full px-6 mt-9 lg:mt-auto mb-3 lg:mb-2 ${selected === "Support" ? "bg-gradient-to-l from-violet-300 to-violet-500" : ""} hover:bg-violet-200 hover:bg-opacity-10 flex`}
          >
            <Button
              onClick={() => handleSelect("Support")}
              className="w-full bg-transparent shadow-none text-white hover:bg-transparent px-2 py-1 flex items-center justify-start gap-3 font-semibold text-sm"
            >
              <Bot className="inline" /> Soporte Técnico
            </Button>
          </li>
          <li className="w-full px-6 my-3 lg:my-2 hover:bg-gray-200 flex">
            <Link to={"/"}>
              <Button className="w-full bg-transparent shadow-none text-white hover:bg-transparent px-2 py-1 flex items-center justify-start gap-3 font-semibold text-sm">
                <ArrowLeft className="inline" /> Volver al Inicio
              </Button>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
