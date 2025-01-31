import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import LogOption from "@/components/common/nav/LogOption";
import { Components } from "@/components";
import { Task } from "@/types/TaskType.d";
type ComponentsType = {
  [key: string]: React.ComponentType<any>;
};

const DashboardLayout = () => {
  const { userType, subscreen } = useParams<{
    userType: string;
    subscreen?: string;
  }>();
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    subscreen || "Home"
  );
  const [courseId, setCourseId] = useState<string | null>(null);
  const [taskSelected, setTaskSelected] = useState<Task | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  useEffect(() => {
    if (selectedComponent) {
      navigate(`/dashboard/${userType}/${selectedComponent}`);
    }
  }, [selectedComponent, navigate, userType]);

  const renderNavbar = () => {
    if (!userType) return null;

    const componentName = `${userType.charAt(0).toUpperCase() + userType.slice(1)}Navbar`;
    const NavbarComponent =
      (Components as ComponentsType)[componentName] || NotFound;
    return <NavbarComponent onSelect={setSelectedComponent} />;
  };

  const renderComponent = () => {
    if (!userType) return null;
    const componentName = `${selectedComponent}${userType.charAt(0).toUpperCase() + userType.slice(1)}`;
    const Component = (Components as ComponentsType)[componentName] || NotFound;
    return (
      <Component
        onSelect={setSelectedComponent}
        courseId={courseId}
        setCourseId={setCourseId}
        taskSelected={taskSelected}
        setTaskSelected={setTaskSelected}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
      />
    );
  };

  return (
    <div className="relative bg-gray-100 ">
      <div className="flex relative">
        <div className="custom-h-dashboard lg:p-4 w-svw lg:w-80 fixed left-0 top-0 z-50">
          <nav className="flex justify-center items-center bg-gradient-to-br from-violet-900 to-violet-700 lg:rounded-3xl shadow-2xl w-full h-full lg:h-full ">
            {renderNavbar()}
          </nav>
        </div>
        <div className="custom-h-dashboard w-full p-4 mt-20 lg:mt-0 lg:ml-80 relative">
          <div className="fixed left-0 top-0 w-full hidden lg:flex justify-end gap-2 py-2 px-4 z-10">
            <LogOption />
          </div>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
