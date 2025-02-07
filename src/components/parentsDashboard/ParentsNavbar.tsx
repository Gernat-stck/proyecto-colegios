import {
  HomeIcon,
  MessageSquareMore,
  Calendar1,
  BookOpenCheck,
  NotebookPenIcon,
  UserRoundPen,
  CircleDollarSign,
} from "lucide-react";
import NavbarLayout from "@/layouts/NavbarLayout";

const navItems = [
  { name: "Home", icon: <HomeIcon />, route: "Home" },
  { name: "Mensajes", icon: <MessageSquareMore />, route: "Messages" },
  { name: "Calendario", icon: <Calendar1 />, route: "Calendar" },
  { name: "Registro de Notas", icon: <BookOpenCheck />, route: "GradesReport" },
  { name: "Tareas", icon: <NotebookPenIcon />, route: "Tasks" },
  {
    name: "Registro de Asistencias",
    icon: <UserRoundPen />,
    route: "Attendance",
  },
  { name: "Pagos", icon: <CircleDollarSign />, route: "Payments" },
];

export default function ParentsNavbar({
  onSelect,
}: {
  onSelect: (component: string) => void;
}) {
  const handleSelect = (component: string) => {
    onSelect(component);
  };

  return <NavbarLayout navItems={navItems} onSelect={handleSelect} />;
}
