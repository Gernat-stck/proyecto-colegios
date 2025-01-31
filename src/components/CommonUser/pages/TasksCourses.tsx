import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { TaskDetail } from "@/components/common/task/TaskDetails";
import { makeRequest } from "@/hooks/api";
import { Task, TaskResponse } from "@/types/TaskType.d";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function TasksCourses() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const tasksPerPage = 5;

  const getTaskByEnrolledCourse = async () => {
    try {
      const data: TaskResponse = await makeRequest({
        url: `tasks/user/${userId}`,
        method: "GET",
      });
      console.log(data);
      const allTasks: Task[] = [];
      const categories: string[] = [];
      for (const courseId in data) {
        const courseData = data[courseId];
        if (courseData && courseData.tasks) {
            categories.push(courseData.category);
          courseData.tasks.forEach((taskData) => {
            const taskWithCategoryAndUserTask = {
              ...taskData.task,
              category: courseData.category,
              user_task: taskData.user_task,
            };
            allTasks.push(taskWithCategoryAndUserTask);
          });
        }
      }

      setTasks(allTasks);
      setSubjects(categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTaskByEnrolledCourse();
  }, []);

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((task) => filter === "Todas" || task.category === filter)
      .sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
  }, [tasks, filter]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredAndSortedTasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[90vh] p-4">
        <PacmanLoader color="#0f172a" loading={loading} size={30} />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[90vh] p-4">
        <Card className="w-full max-w-3xl mx-auto flex-grow">
          <CardHeader>
            <CardTitle>Administrador de Tareas</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-center">No hay tareas disponibles</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleViewDetails = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    setSelectedTask(task || null);
  };

  const handleCloseDetails = () => {
    setSelectedTask(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1));
  };

  console.log("curso seleccionado", currentTasks);
  return (
    <div className="flex justify-center items-center min-h-[90vh] p-4">
      <Card className="w-full max-w-3xl mx-auto flex-grow">
        <CardHeader>
          <CardTitle>Administrador de Tareas</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          {selectedTask ? (
            <TaskDetail task={selectedTask} onClose={handleCloseDetails} />
          ) : (
            <>
              <div className="mb-4">
                <Select onValueChange={setFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filtrar por materia" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {currentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      {task.completed ? (
                        <CheckCircle className="text-green-500" />
                      ) : (
                        <AlertCircle className="text-yellow-500" />
                      )}
                      <span className={task.completed ? "text-gray-500" : ""}>
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={task.completed ? "default" : "secondary"}
                        className={
                          task.completed
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {task.completed ? "Entregada" : "Pendiente"}
                      </Badge>
                      {task.completed ? (
                        task.user_task.grade !== null ? (
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800"
                          >
                            Nota: {task.user_task.grade}{" "}
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800"
                          >
                            Sin Calificar
                          </Badge>
                        )
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800"
                        >
                          Sin Entregar{" "}
                        </Badge>
                      )}
                      <Badge variant="outline">{task.category}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(task.id)}
                      >
                        <Info className="w-4 h-4 mr-1" />
                        Detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <div className="flex items-center">
                  Página {currentPage} de{" "}
                  {Math.ceil(filteredAndSortedTasks.length / tasksPerPage)}
                </div>
                <Button
                  onClick={handleNextPage}
                  disabled={indexOfLastTask >= filteredAndSortedTasks.length}
                >
                  Siguiente
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
