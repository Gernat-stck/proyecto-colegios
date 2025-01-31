import { useState } from "react";
import {
  ArrowLeft,
  BookOpenCheck,
  Bot,
  Calendar1,
  HomeIcon,
  MessageSquareMore,
  NotebookPenIcon,
  NotepadText,
  User,
  UserRoundPen,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function AdminNavbar({
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
    <>
      <ul className="flex lg:hidden justify-between items-center text-slate-900 px-6 pb-4 pt-6">
        <li className="text-3xl font-bold text-black"> LOGOTIPO </li>
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
      <ul className="hidden lg:flex flex-col h-full pb-4">
        <li className="text-slate-900 hidden lg:block text-3xl font-bold text-center px-4 py-6">
          LOGOTIPO
        </li>
        <li
          className={`px-6 my-3 lg:my-2 ${selected === "Home" ? "bg-gray-200" : ""} hover:bg-gray-200`}
        >
          <Button
            onClick={() => handleSelect("Home")}
            className="w-full h-full bg-transparent shadow-none text-black hover:bg-transparent px-2 py-1 flex items-center gap-3 font-semibold text-xl lg:text-lg"
          >
            <HomeIcon className="lucide lucide-house" /> Inicio
          </Button>
        </li>
        <li
          className={`block px-6 my-3 lg:my-2 ${selected === "Messages" ? "bg-gray-200" : ""} hover:bg-gray-200`}
        >
          <Button
            onClick={() => handleSelect("Messages")}
            className="w-full h-full bg-transparent shadow-none text-black hover:bg-transparent px-2 py-1 flex items-center gap-3 font-semibold text-xl lg:text-lg"
          >
            <MessageSquareMore /> Mensajes
          </Button>
        </li>
        <li
          className={`block px-6 my-3 lg:my-2 ${selected === "Calendar" ? "bg-gray-200" : ""} hover:bg-gray-200`}
        >
          <Button
            onClick={() => handleSelect("Calendar")}
            className="w-full h-full bg-transparent shadow-none text-black hover:bg-transparent px-2 py-1 flex items-center gap-3 font-semibold text-xl lg:text-lg"
          >
            <Calendar1 /> Calendario
          </Button>
        </li>
        <li
          className={`block px-6 my-3 lg:my-2 ${selected === "Grades" ? "bg-gray-200" : ""} hover:bg-gray-200`}
        >
          <Button
            onClick={() => handleSelect("Grades")}
            className="w-full h-full bg-transparent shadow-none text-black hover:bg-transparent px-2 py-1 flex items-center gap-3 font-semibold text-xl lg:text-lg"
          >
            <BookOpenCheck /> Calificaciones
          </Button>
        </li>
        <li
          className={`block px-6 my-3 lg:my-2 ${selected === "Tasks" ? "bg-gray-200" : ""} hover:bg-gray-200`}
        >
          <Button
            onClick={() => handleSelect("Tasks")}
            className="w-full h-full bg-transparent shadow-none text-black hover:bg-transparent px-2 py-1 flex items-center gap-3 font-semibold text-xl lg:text-lg"
          >
            <NotebookPenIcon /> Tareas
          </Button>
        </li>
        <li
          className={`block px-6 my-3 lg:my-2 ${selected === "Materials" ? "bg-gray-200" : ""} hover:bg-gray-200`}
        >
          <Button
            onClick={() => handleSelect("Materials")}
            className="w-full h-full bg-transparent shadow-none text-black hover:bg-transparent px-2 py-1 flex items-center gap-3 font-semibold text-xl lg:text-lg"
          >
            <NotepadText className="w-6 h-8" /> Material Didáctico
          </Button>
        </li>
        <li
          className={`block px-6 my-3 lg:my-2 ${selected === "Attendance" ? "bg-gray-200" : ""} hover:bg-gray-200`}
        >
          <Button
            onClick={() => handleSelect("Attendance")}
            className="w-full h-full bg-transparent shadow-none text-black hover:bg-transparent px-2 py-1 flex items-center gap-3 font-semibold text-xl lg:text-lg"
          >
            <UserRoundPen /> Asistencia
          </Button>
        </li>
        <div className="mt-32">
          <li
            className={`px-6 mt-9 lg:mt-auto mb-3 lg:mb-2 ${selected === "Support" ? "bg-gray-200" : ""} hover:bg-gray-200`}
          >
            <Button
              onClick={() => handleSelect("Support")}
              className="w-full h-full bg-transparent shadow-none text-black hover:bg-transparent px-2 py-1 flex items-center gap-3 font-semibold text-sm"
            >
              <Bot className="inline" /> Soporte Técnico
            </Button>
          </li>
          <li
            className={`block px-6 my-3 lg:my-2 ${selected === "Profile" ? "bg-gray-200" : ""} hover:bg-gray-200`}
          >
            <Button
              onClick={() => handleSelect("Profile")}
              className="w-full h-full bg-transparent shadow-none text-black hover:bg-transparent px-2 py-1 flex items-center gap-3 font-semibold text-sm"
            >
              <User className="inline" /> Perfil
            </Button>
          </li>
          <li className={`block px-6 my-3 lg:my-2 hover:bg-gray-200`}>
            <Link to={"/"}>
              <Button className="w-full h-full bg-transparent shadow-none text-black hover:bg-transparent px-2 py-1 flex items-center gap-3 font-semibold text-sm">
                <ArrowLeft className="inline" /> Volver al Inicio
              </Button>
            </Link>
          </li>
        </div>
      </ul>
    </>
  );
}
