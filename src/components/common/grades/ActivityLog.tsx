import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GradeTable } from "./GradeTable";
import { ActivityLogProps } from "@/types/GradesTypes.d";

export function ActivityLog({ coursesGrades }: ActivityLogProps) {
  const courseIds = Object.keys(coursesGrades);
  const [selectedCourse, setSelectedCourse] = useState(courseIds[0]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Registro de Notas</h2>
      <div className="space-y-4">
        <Select onValueChange={setSelectedCourse} defaultValue={selectedCourse}>
          <SelectTrigger className="w-60 bg-violet-600 text-white text-md font-semibold rounded-lg p-5">
            <SelectValue placeholder="Selecciona una materia" />
          </SelectTrigger>
          <SelectContent>
            {courseIds.map((courseId) => (
              <SelectItem key={courseId} value={courseId}>
                {coursesGrades[courseId].tasks?.[0]?.task.course_name || courseId}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {courseIds.map(
          (courseId) =>
            courseId === selectedCourse && (
              coursesGrades[courseId].tasks ? (
                <GradeTable
                  key={courseId}
                  course={courseId}
                  cycle={coursesGrades[courseId].category}
                  grades={coursesGrades[courseId].tasks.map((taskData) => ({
                    id: taskData.task.id.toString(),
                    task_id: taskData.task.task_id,
                    completed: taskData.user_task?.is_completed ?? false,
                    activityName: taskData.task.title,
                    studentId: taskData.user_task?.user_id ?? '',
                    date: taskData.task.due_at,
                    grade: taskData.user_task?.grade ?? 0,
                  }))}
                />
              ) : (
                <div key={courseId} className="text-center text-gray-500">
                  Aún no se han registrado actividades para esta materia.
                </div>
              )
            )
        )}
      </div>
    </div>
  );
}
