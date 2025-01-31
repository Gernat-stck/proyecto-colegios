import { useState, useCallback, useEffect } from "react";
import { Bell, LogOut, Settings, Headset, User2Icon } from "lucide-react";
import { UserProfileProps } from "@/types/UserType.d";
import { makeRequest } from "@/hooks/api";
import { toast } from "sonner";

const MenuLink = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: typeof Bell;
  children: React.ReactNode;
}) => (
  <a className="flex py-2 my-1 custom-login-hover items-center" href={href}>
    <Icon className="inline mr-2" size={14} />
    <span>{children}</span>
  </a>
);
//TODO: REALIZAR EL COMPONENTE DE NOTIFICACIONES PARA CONSULTAR LAS NOTIFICACIONES
const LogOption = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuVisible((prevVisible) => !prevVisible);
  }, []);

  const [userPros, setUserPros] = useState<UserProfileProps>();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchUserProfile = async () => {
      try {
        const response = await makeRequest({
          url: `users/${userId}`,
          method: "GET",
        });
        setUserPros(response);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar el perfil de usuario");
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await makeRequest({
        url: `auth/logout`,
        method: "POST",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al cerrar sesión");
    } finally {
      localStorage.clear();
      toast.success("Sesión cerrada correctamente");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };
  return (
    <>
      <button
        onClick={toggleMenu}
        className="  bg-violet-900 text-white *:border-white border-2 shadow-md py-1 px-2 rounded-full font-semibold relative hover:text-white custom-login-arrow flex items-center"
      >
        {userPros ? (
          userPros.avatar && (
            <img
              src={userPros.avatar}
              className="aspect-square w-8 rounded-full mr-2 object-cover"
            />
          )
        ) : (
          <User2Icon />
        )}

        <span>{userPros?.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-chevron-down inline ml-1 mb-px rotate-0 transition-all duration-300 ${
            menuVisible ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
        {menuVisible && (
          <div className="rounded-lg absolute top-full right-0 w-48 py-2 px-3 my-2 text-xs bg-violet-800 shadow transition-all duration-200">
            <MenuLink href="/" icon={Headset}>
              Soporte
            </MenuLink>
            <MenuLink href="/usuario/iMeGLo69IK5MsU0PGRiK" icon={Settings}>
              Configuración
            </MenuLink>
            <button
              className="flex py-2 my-1 custom-logout-hover items-center"
              type="button"
              onClick={handleLogout}
            >
              <LogOut className="inline mr-2" size={14} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}
      </button>
    </>
  );
};

export default LogOption;
