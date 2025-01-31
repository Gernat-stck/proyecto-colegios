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
import { BadgePlus, Info, Pencil } from "lucide-react";
import { Task } from "@/types/TaskType.d";
import { makeRequest } from "@/hooks/api";
import { toast } from "sonner";
import NotFoundTask from "@/components/common/task/NotFoundTask";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import PacmanLoader from "react-spinners/PacmanLoader";
import  TaskDetailPartners  from "./TaskDetailPartners";
export default function TasksPartners({
  onSelect,
  setTaskSelected,
}: {
  onSelect: (component: string) => void;
  setTaskSelected?: (task: Task) => void;
  setCourseId: (id: string | null) => void;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [filter, setFilter] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const tasksPerPage = 5;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const data = await makeRequest({
          url: `tasks/instructor/${userId}`,
          method: "GET",
        });

        const allTasks: Task[] = [];
        const subjectsSet: Set<string> = new Set();

        for (const subject in data) {
          subjectsSet.add(subject);
          data[subject].forEach((task: Task) => {
            allTasks.push({ ...task, category: subject });
          });
        }

        setTasks(allTasks);
        setSubjects(Array.from(subjectsSet));
      } catch (error) {
        toast.error("Error al cargar las tareas");
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((task) => filter === "Todas" || task.category === filter)
      .sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
  }, [tasks, filter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[90vh] p-7">
        <PacmanLoader color="#0f172a" loading={loading} size={30} />
      </div>
    );
  }

  if (tasks.length === 0) {
    return <NotFoundTask onSelect={onSelect} />;
  }
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredAndSortedTasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  );

  const handleViewDetails = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    setSelectedTask(task || null);
  };

  const handleEditTask = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && setTaskSelected) {
      setTaskSelected(task);
      onSelect("EditTask");
    } else {
      console.error("taskIdSelected no está definido");
    }
  };
  const handleDeleteTask = async (taskId: string) => {
    try {
      await makeRequest({
        url: `tasks/${taskId}`,
        method: "DELETE",
      });
      toast.success("Tarea eliminada con exito", {
        duration: 5000,
        position: "top-center",
      });
    } catch (e) {
      console.error(e);
      toast.error("Error al eliminar la tarea", {
        duration: 5000,
        position: "top-center",
      });
    } finally {
      setTasks(tasks.filter((task) => task.task_id !== taskId));
    }
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

  return (
    <div className="flex justify-center items-center min-h-[90vh] p-4">
      <Card className="w-full max-w-3xl mx-auto flex-grow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Administrador de Tareas</CardTitle>
            <Button
              onClick={() => onSelect("AddTask")}
              className="bg-violet-500 hover:bg-violet-800 max-w-fit content"
            >
              Crear Tarea
              <BadgePlus className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          {selectedTask ? (
            <TaskDetailPartners task={selectedTask} onClose={handleCloseDetails} />
          ) : (
            <>
              <div className="mb-4">
                <Select onValueChange={setFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filtrar por materia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">Todas</SelectItem>
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
                      <span className={task.completed ? "text-gray-500" : ""}>
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{task.category}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(task.id)}
                        className="hover:bg-gray-400 hover:text-white"
                      >
                        <Info className="w-4 h-4 mr-1" />
                        Detalles
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTask(task.id)}
                        className="hover:bg-blue-400 hover:text-white"
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <ConfirmationDialog
                        triggerText="Eliminar Tarea"
                        title="¿Estás seguro que quieres eliminar esta tarea?"
                        description="Esta acción no se puede deshacer. Todos los datos serán eliminados permanentemente."
                        onConfirm={handleDeleteTask}
                        confirmParams={[task.task_id]}
                        confirmText="Sí, eliminar tarea"
                        cancelText="No, cancelar"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="bg-gray-400 hover:bg-gray-800 hover:text-white"
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
                  className="bg-gray-400 hover:bg-gray-800 hover:text-white"
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
