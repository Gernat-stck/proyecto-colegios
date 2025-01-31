import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "./FileUploader";
import { BookOpen, Calendar, CheckCircle2, Star, X } from "lucide-react";
import { Task } from "@/types/TaskType.d";

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

//TODO: Revisar el attachment e implementar la logica para subir los archivos

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  const [attachments, setAttachments] = useState(task.task_attachments ?? []);
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4" />
          <span>{task.category}</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Descripción</h3>
          <p>{task.description || "No hay descripción disponible."}</p>
        </div>

        {task.due_at && (
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span>
              Fecha límite:{" "}
              {format(task.due_at, "d 'de' MMMM 'de' yyyy", { locale: es })}
            </span>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Archivos adjuntos</h3>
          {task.task_attachments && task.task_attachments.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {task.task_attachments.map((attachment) => (
                <li key={attachment.id}>
                  <a
                    href={attachment.url}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {attachment.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No hay archivos adjuntos</p>
          )}
        </div>

        <FileUploader
          taskId={task.id.toString()}
          initialAttachments={attachments}
          onAttachmentsChange={setAttachments}
        />
        <div className="flex items-center space-x-2">
          <CheckCircle2
            className={`w-5 h-5 ${task.completed ? "text-green-500" : "text-muted-foreground"}`}
          />
          <span>{task.completed ? "Entregado" : "No entregado"}</span>
        </div>

        {task.completed && task.grade !== undefined && (
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Calificación: {task.grade}/100</span>
          </div>
        )}

        <Badge
          variant={task.completed ? "default" : "secondary"}
          className="text-xs"
        >
          {task.completed ? "Completado" : "Pendiente"}
        </Badge>
      </CardContent>
    </Card>
  );
}
