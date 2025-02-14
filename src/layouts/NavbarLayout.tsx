import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bot, ArrowLeft } from "lucide-react";

interface NavItem {
  name: string;
  icon: JSX.Element;
  route: string;
}

interface NavbarTemplateProps {
  navItems: NavItem[];
  onSelect: (component: string) => void;
}

export default function NavbarLayout({ navItems, onSelect }: NavbarTemplateProps) {
  const [selected, setSelected] = useState<string>("Home");

  const handleSelect = (component: string) => {
    setSelected(component);
    onSelect(component);
  };

  return (
    <nav className="w-full">
      <ul className="flex lg:hidden justify-between items-center text-slate-900 px-6 py-6">
        <li className="text-3xl font-bold text-white">LOGOTIPO</li>
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
        {navItems.map((item) => (
          <li
            key={item.name}
            className={`w-full px-6 my-3 lg:my-2 ${
              selected === item.route ? "bg-gradient-to-l from-violet-300 to-violet-500" : ""
            } hover:bg-violet-200 hover:bg-opacity-10 flex`}
          >
            <Button
              onClick={() => handleSelect(item.route)}
              className="w-full bg-transparent shadow-none text-white hover:bg-transparent px-2 py-1 flex items-center justify-start gap-3 font-semibold text-xl lg:text-lg"
            >
              {item.icon} {item.name}
            </Button>
          </li>
        ))}
        <div className="mt-28 w-full flex flex-col items-end">
          <li
            className={`w-full px-6 mt-9 lg:mt-auto mb-3 lg:mb-2 ${
              selected === "Support" ? "bg-gradient-to-l from-violet-300 to-violet-500" : ""
            } hover:bg-violet-200 hover:bg-opacity-10 flex`}
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
