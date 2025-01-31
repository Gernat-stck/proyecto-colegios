export interface Task {
  category: string;
  grade: number | null;
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
  task_attachments: Attachments[];
  user_task: UserTask;
}

export interface Attachments {
  id: string;
  name: string;
  url: string;
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

export interface TaskResponse {
  [courseId: string]: {
    category: string;
    tasks: {
      task: Task;
      attachment_task: Attachments | null;
      user_task: UserTask;
    }[];
  };
}
