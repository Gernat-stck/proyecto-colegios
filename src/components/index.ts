// Exportando componentes de adminDashboard (si es que existe)

import AdminNavbar from "./adminDashboard/AdminNavbar";
import HomeAdmin from "./adminDashboard/pages/HomeAdmin";
import UsersAdmin from "./adminDashboard/pages/UsersAdmin";
// Otros componentes comunes
import Support from "./common/Support";
import Profile from "./common/Profile";
import LogOption from "./common/nav/LogOption";

// Exportando componentes de responsableDashboard
import ParentsNavbar from "./parentsDashboard/ParentsNavbar";
import AttendanceParents from "./parentsDashboard/pages/AttendanceParents";
import CalendarParents from "./parentsDashboard/pages/CalendarParents";
import GradesReportParents from "./parentsDashboard/pages/GradesReportParents";
import HomeParents from "./parentsDashboard/pages/HomeParents";
import MessagesParents from "./parentsDashboard/pages/MessagesParents";
import PaymentsParents from "./parentsDashboard/pages/PaymentsParents";
import TasksParents from "./parentsDashboard/pages/TasksParents";

// Exportando componentes de teacherDashboard
import TeacherNavbar from "./teacherDashboard/TeacherNavbar";
import HomeTeacher from "./teacherDashboard/pages/HomeTeacher";
import MessagesTeacher from "./teacherDashboard/pages/MessagesTeacher";
import CalendarTeacher from "./teacherDashboard/pages/CalendarTeacher";
import GradesReportTeacher from "./teacherDashboard/pages/GradesReportTeacher";
import TasksTeacher from "./teacherDashboard/pages/TasksTeacher";
import MaterialsTeacher from "./teacherDashboard/pages/MaterialsTeacher";
import AttendanceTeacher from "./teacherDashboard/pages/AttendanceTeacher";
import AddNewModuleTeacher from "./common/courses/AddNewModuleTeacher";
import AddNewUnitsTeacher from "./common/courses/AddNewUnitsTeacher";
import EditCourseTeacher from "./common/courses/EditCourseTeacher";
import EditModuleTeacher from "./common/courses/EditModuleTeacher";

// Exportando componentes de studentDashboard
import StudentsNavbar from "./studentDashboard/StudentsNavbar";
import HomeStudents from "./studentDashboard/pages/HomeStudents";
import MessagesStudents from "./studentDashboard/pages/MessagesStudents";
import CalendarStudents from "./studentDashboard/pages/CalendarStudents";
import GradesReportStudents from "./studentDashboard/pages/GradesReportStudents";
import TasksStudents from "./studentDashboard/pages/TasksStudents";
import MaterialsStudents from "./studentDashboard/pages/MaterialsStudents";
import AttendanceStudents from "./studentDashboard/pages/AttendanceStudents";
import ClassesStudents from "./studentDashboard/pages/ClassesStudents";
import ClassesTeacher from "./teacherDashboard/pages/ClassesTeacher";

// Exportar todos los componentes como un objeto
export const Components = {
  //Admin
  AdminNavbar,
  HomeAdmin,
  UsersAdmin,
  //Students
  StudentsNavbar,
  HomeStudents,
  MessagesStudents,
  CalendarStudents,
  GradesReportStudents,
  TasksStudents,
  MaterialsStudents,
  AttendanceStudents,
  ClassesStudents,
  //Teacher
  TeacherNavbar,
  HomeTeacher,
  MessagesTeacher,
  CalendarTeacher,
  GradesReportTeacher,
  TasksTeacher,
  MaterialsTeacher,
  ClassesTeacher,
  AttendanceTeacher,
  AddNewModuleTeacher,
  AddNewUnitsTeacher,
  EditCourseTeacher,
  EditModuleTeacher,

  //parents
  AttendanceParents,
  CalendarParents,
  GradesReportParents,
  HomeParents,
  MessagesParents,
  PaymentsParents,
  TasksParents,
  ParentsNavbar,
  //Others
  LogOption,
  Support,
  Profile,
};
