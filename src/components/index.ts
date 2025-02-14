// Exportando componentes de adminDashboard (si es que existe)

import AdminNavbar from "./adminDashboard/AdminNavbar";
import HomeAdmin from "./adminDashboard/pages/HomeAdmin";
import UsersAdmin from "./adminDashboard/pages/UsersAdmin";
/*Exportando componentes de CoursesDashboard
import CoursesNavbar from "./CommonUser/CoursesNavbar";
import HomeCourses from "./CommonUser/pages/HomeCourses";
import MessagesCourses from "./CommonUser/pages/MessagesCourses";
import NewCourses from "./CommonUser/pages/NewCourses";
import TasksCourses from "./CommonUser/pages/TasksCourses";
import ActiveCourses from "./CommonUser/pages/ActiveCourses";
import GradesReportCourses from "./CommonUser/pages/GradesReportCourses";
import CalendarCourses from "./CommonUser/pages/CalendarCourses";
import DetailCourses from "./common/courses/DetailCourses";*/
// Otros componentes comunes
import Support from "./common/Support";
import Profile from "./common/Profile";
import LogOption from "./common/nav/LogOption";
/*Componentes para los partners de cursos
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
import AddTaskPartners from "./common/task/AddTaskPartners";*/

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
  /*Courses
  CoursesNavbar,
  HomeCourses,
  MessagesCourses,
  NewCourses,
  TasksCourses,
  ActiveCourses,
  GradesReportCourses,
  CalendarCourses,
  DetailCourses,*/
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
  /*Partners
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
  TasksPartners,*/
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
