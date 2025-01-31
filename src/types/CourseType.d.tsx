export type Course = {
  course_id: string;
  course_name: string;
  description: string;
  instructor: string;
  total_hours: number;
  category: string;
  price: number;
  enrolled_students: number;
  units: Units[];
};

export type Units = {
  unit_id: string;
  unit_number: number;
  title: string;
  introduction: string;
  url_video: string;
  unit_objectives: string[];
  unit_resources: MaterialApoyo[];
};

export interface MaterialApoyo {
  title: string;
  url: string;
}

export interface ModuloCursoProps {
  id: string;
  unidad: string;
  titulo: string;
  introduccion: string;
  objetivosGenerales: string[];
  videoUrl: string;
  materialesApoyo: MaterialApoyo[];
}

export interface CourseDetailProps {
  courseId?: string | null;
}


export interface VideoData {
  type: "url" | "file";
  content: string;
  file?: File;
}

export interface CourseOverview {
  id: number;
  course_id: string;
  course_name: string;
  description: string;
  enrolled_students: number;
  price: string;
  units: number;
  category: string;
  instructor: string;
  total_hours: number;
}

export interface UserCourseEnrollmentOverview {
  course_id: string;
  user_id: string;
  progress: number;
  last_seen: string;
  course_name: string;
  description: string;
  instructor: string;
  total_hours: number;
  category: string;
}
