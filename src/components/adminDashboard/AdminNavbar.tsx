import {
  HomeIcon,
  UserRoundPen,
} from "lucide-react";
import NavbarLayout from "@/layouts/NavbarLayout";

const navItems = [
  { name: "Home", icon: <HomeIcon />, route: "Home" },
  { name: "Administrar Usuarios", icon: <UserRoundPen />, route: "AdminUsers" },
];

export default function AdminNavbar({
  onSelect,
}: {
  onSelect: (component: string) => void;
}) {
  const handleSelect = (component: string) => {
    onSelect(component);
  };

  return <NavbarLayout navItems={navItems} onSelect={handleSelect} />;
}
