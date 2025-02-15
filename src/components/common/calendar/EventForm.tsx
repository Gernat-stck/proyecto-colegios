import React, { useEffect, useState } from "react";
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
import { MyEvent } from "@/types/CalendarType.d";
import { Course } from "@/types/CourseType.d";
import { makeRequest } from "@/hooks/api";

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

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");
    const url = role === "admin" ? "courses" : `courses/${userId}/instructor`;

    makeRequest({ url, method: "GET" })
      .then((data: Course[]) => setCourses(data))
      .catch((error: any) => console.error("Error fetching courses", error));
  }, []);

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
              className={!canEdit ? "input-disabled-as-text" : ""}
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
              className={!canEdit ? "input-disabled-as-text" : ""}
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
              className={!canEdit ? "input-disabled-as-text" : ""}
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
              className={!canEdit ? "input-disabled-as-text" : ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-id" className="text-white font-semibold">
              Curso
            </Label>
            <select
              id="course-id"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
              disabled={!canEdit}
              className={`bg-violet-700 text-white placeholder-violet-300 border-violet-500 focus:border-violet-400 focus:ring-violet-400 ${
                !canEdit ? "opacity-90 pointer-events-none" : ""
              }`}
            >
              <option value="" disabled>
                Selecciona un curso
              </option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter className="sm:justify-start">
            {canEdit && (
              <>
                <Button
                  type="submit"
                  className="mr-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  Guardar
                </Button>
                {event.event_id && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => onDelete(event)}
                    className="mr-2 bg-red-600 hover:bg-red-700"
                  >
                    Eliminar
                  </Button>
                )}
              </>
            )}
            <Button
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
