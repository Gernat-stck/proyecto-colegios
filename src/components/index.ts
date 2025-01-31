// Exportando componentes de adminDashboard (si es que existe)

import AdminNavbar from "./adminDashboard/AdminNavbar";
import HomeAdmin from "./adminDashboard/pages/HomeAdmin";
import UsersAdmin from "./adminDashboard/pages/UsersAdmin";
//Exportando componentes de CoursesDashboard
import CoursesNavbar from "./CommonUser/CoursesNavbar";
import HomeCourses from "./CommonUser/pages/HomeCourses";
import MessagesCourses from "./CommonUser/pages/MessagesCourses";
import NewCourses from "./CommonUser/pages/NewCourses";
import TasksCourses from "./CommonUser/pages/TasksCourses";
import ActiveCourses from "./CommonUser/pages/ActiveCourses";
import GradesReportCourses from "./CommonUser/pages/GradesReportCourses";
import CalendarCourses from "./CommonUser/pages/CalendarCourses";
import DetailCourses from "./common/courses/DetailCourses";
// Otros componentes comunes
import Support from "./common/Support";
import Profile from "./common/Profile";
import LogOption from "./common/nav/LogOption";
//Componentes para los partners de cursos
import PartnersNavbar from "./partnersDashboard/PartnersNavbar";
import HomePartners from "./partnersDashboard/pages/HomePartners";
import CalendarPartners from "./partnersDashboard/pages/CalendarPartners";
import GradesReportPartners from "./partnersDashboard/pages/GradesReportPartners";
import ForumsPartners from "./partnersDashboard/pages/ForumsPartners";
import MyCoursesPartners from "./partnersDashboard/pages/MyCoursesPartners";
import TasksPartners from "./partnersDashboard/pages/TasksPartners";
import EditTaskPartners from "./common/task/EditTaskPartners";
import AddNewUnitsPartners from "./common/courses/AddNewUnitsPartners";
import EditCoursePartners from "./common/courses/EditCoursePartners";
import EditModulePartners from "./common/courses/EditModulePartners";
import AddNewModulePartners from "./common/courses/AddNewModulePartners";
import AddTaskPartners from "./common/task/AddTaskPartners";
// Exportar todos los componentes como un objeto
export const Components = {
  //Admin
  AdminNavbar,
  HomeAdmin,
  UsersAdmin,
  //Courses
  CoursesNavbar,
  HomeCourses,
  MessagesCourses,
  NewCourses,
  TasksCourses,
  ActiveCourses,
  GradesReportCourses,
  CalendarCourses,
  DetailCourses,
  //Partners
  EditTaskPartners,
  EditModulePartners,
  AddNewUnitsPartners,
  EditCoursePartners,
  PartnersNavbar,
  HomePartners,
  CalendarPartners,
  ForumsPartners,
  GradesReportPartners,
  MyCoursesPartners,
  AddNewModulePartners,
  AddTaskPartners,
  TasksPartners,
  //Others
  LogOption,
  Support,
  Profile,
};
