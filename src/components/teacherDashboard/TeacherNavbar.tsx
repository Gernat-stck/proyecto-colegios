import {
  HomeIcon,
  MessageSquareMore,
  Calendar1,
  BookOpenCheck,
  NotebookPenIcon,
  BookAIcon,
  NotepadText,
  UserRoundPen,
} from "lucide-react";
import NavbarLayout from "@/layouts/NavbarLayout";

const navItems = [
  { name: "Home", icon: <HomeIcon />, route: "Home" },
  { name: "Mensajes", icon: <MessageSquareMore />, route: "Messages" },
  { name: "Calendario", icon: <Calendar1 />, route: "Calendar" },
  { name: "Registro de notas", icon: <BookOpenCheck />, route: "GradesReport" },
  { name: "Tareas", icon: <NotebookPenIcon />, route: "Tasks" },
  { name: "Clases", icon: <BookAIcon />, route: "Classes" },
  { name: "Material Didactico", icon: <NotepadText />, route: "Materials" },
  { name: "Control Academico", icon: <UserRoundPen />, route: "Attendance" },
];
export default function TeacherNavbar({
  onSelect,
}: {
  onSelect: (component: string) => void;
}) {
  const handleSelect = (component: string) => {
    onSelect(component);
  };

  return (
      <NavbarLayout navItems={navItems} onSelect={handleSelect} />
  );
}
