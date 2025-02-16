import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MyEvent } from "@/types/CalendarType.d";
import type { Course } from "@/types/CourseType.d";
import { makeRequest } from "@/hooks/api";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";

interface EventFormProps {
  event: MyEvent;
  onSave: (event: MyEvent) => void;
  onDelete: (event: MyEvent) => void;
  onClose: () => void;
  canEdit: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  event,
  onSave,
  onDelete,
  onClose,
  canEdit,
}) => {
  const [eventName, setEventName] = useState<string>(event.event_name);
  const [eventDescription, setEventDescription] = useState<string>(
    event.event_description || ""
  );
  const [startDate, setStartDate] = useState<Date>(event.event_start_date);
  const [endDate, setEndDate] = useState<Date>(event.event_end_date);
  const [courseId, setCourseId] = useState<string>(event.course_id);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseName, setSelectedCourseName] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    const role = localStorage.getItem("role");
    const url = role === "admin" ? "courses" : `courses/${userId}/instructor`;

    makeRequest({ url, method: "GET" })
      .then((data: Course[]) => {
        setCourses(data);
        const selectedCourse = data.find(
          (course) => course.course_id === event.course_id
        );
        if (selectedCourse) {
          setSelectedCourseName(selectedCourse.course_name);
        }
      })
      .catch((error: any) => console.error("Error fetching courses", error));
  }, [event.course_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...event,
      event_name: eventName,
      event_description: eventDescription,
      event_start_date: startDate,
      event_end_date: endDate,
      course_id: courseId,
    });
  };

  const formatDateTimeLocal = (date: Date) => date.toISOString().slice(0, 16);

  const inputClasses = `bg-violet-700 text-white placeholder-violet-300 border-violet-500 focus:border-violet-400 focus:ring-violet-400 ${
    !canEdit ? "opacity-90 pointer-events-none" : ""
  }`;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-violet-400 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {event.event_id ? "Editar Evento" : "Nuevo Evento"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-name" className="text-white font-semibold">
              Nombre del Evento
            </Label>
            <Input
              id="event-name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              disabled={!canEdit}
              className={inputClasses}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="event-description"
              className="text-white font-semibold"
            >
              Descripción del Evento
            </Label>
            <Textarea
              id="event-description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows={3}
              disabled={!canEdit}
              className={inputClasses}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-start" className="text-white font-semibold">
              Inicio
            </Label>
            <Input
              id="event-start"
              type="datetime-local"
              value={formatDateTimeLocal(startDate)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              required
              disabled={!canEdit}
              className={inputClasses}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-end" className="text-white font-semibold">
              Fin
            </Label>
            <Input
              id="event-end"
              type="datetime-local"
              value={formatDateTimeLocal(endDate)}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              required
              disabled={!canEdit}
              className={inputClasses}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-id" className="text-white font-semibold">
              Curso
            </Label>
            <Select
              disabled={!canEdit}
              value={courseId}
              onValueChange={(value) => {
                setCourseId(value);
                const selectedCourse = courses.find(
                  (course) => course.course_id === value
                );
                if (selectedCourse) {
                  setSelectedCourseName(selectedCourse.course_name);
                }
              }}
            >
              <SelectTrigger className={inputClasses}>
                <SelectValue placeholder="Selecciona un curso">
                  {event.event_id ? selectedCourseName || "Selecciona un curso" : "Selecciona un curso"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.course_id} value={course.course_id}>
                    {course.course_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="sm:justify-start">
            {canEdit && (
              <>
                <ConfirmationDialog
                  triggerText="Guardar"
                  title="Confirmar Actualización"
                  description="¿Estás seguro de que deseas guardar los cambios en este evento?"
                  onConfirm={handleSubmit}
                  variant="safe"
                  iconName="safe"
                  confirmText="Guardar"
                  cancelText="Cancelar"
                />
                {event.event_id && (
                  <ConfirmationDialog
                    triggerText="Eliminar"
                    title="Confirmar Eliminación"
                    description="¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer."
                    onConfirm={() => onDelete(event)}
                    variant="danger"
                    iconName="trash"
                    confirmText="Eliminar"
                    cancelText="Cancelar"
                  />
                )}
              </>
            )}
            <Button
            size={"sm"}
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-800 border-indigo-700 hover:border-indigo-800 text-white hover:text-white"
            >
              {canEdit ? "Cancelar" : "Cerrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
