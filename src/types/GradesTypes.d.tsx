export interface StudentGrade {
  grades: { [activityId: string]: number | undefined };
  studentId: string;
}

export interface Activity {
  id: string;
  name: string;
}

export interface Student {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
  activities: Activity[];
  students: Student[];
  grades: StudentGrade[];
}

export interface Subject {
  id: string;
  name: string;
  courses: Course[];
}

export interface GradeTableProps {
  subject: Subject;
  course: Course;
  onUpdateGrade: (studentId: string, activityId: string, grade: number) => void;
  onDeleteGrade: (studentId: string, activityId: string) => void;
}
export interface Grade {
  completed: any;
  id: string;
  activityName: string;
  studentId?: string;
  date: string;
  grade: number;
  task_id: string;
}

export interface CourseGrades {
  course: string;
  cycle: string;
  grades: Grade[];
}

export interface Task {
  id: number;
  course_id: string;
  unit_number: number;
  task_id: string;
  title: string;
  description: string;
  course_name: string;
  completed: boolean;
  due_at: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
  task_attachments: any[];
}

export interface UserTask {
  id: number;
  user_id: string;
  course_id: string;
  unit_id: string;
  task_id: string;
  grade: number | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskData {
  task: Task;
  attachment_task: any | null;
  user_task: UserTask;
}

export interface CourseData {
  category: string;
  tasks: TaskData[];
}

export interface ActivityLogProps {
  coursesGrades: { [courseId: string]: CourseData };
}
