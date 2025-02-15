import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface MyEvent {
  event_id?: string
  event_name: string
  event_description?: string
  event_start_date: Date
  event_end_date: Date
  course_id: string
}

interface EventFormProps {
  event: MyEvent
  onSave: (event: MyEvent) => void
  onDelete: (event: MyEvent) => void
  onClose: () => void
}

function EventForm({ event, onSave, onDelete, onClose }: EventFormProps) {
  const [eventName, setEventName] = useState<string>(event.event_name)
  const [eventDescription, setEventDescription] = useState<string>(event.event_description || "")
  const [startDate, setStartDate] = useState<Date>(event.event_start_date)
  const [endDate, setEndDate] = useState<Date>(event.event_end_date)
  const [courseId, setCourseId] = useState<string>(event.course_id)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...event,
      event_name: eventName,
      event_description: eventDescription,
      event_start_date: startDate,
      event_end_date: endDate,
      course_id: courseId,
    })
  }

  const formatDateTimeLocal = (date: Date) => date.toISOString().slice(0, 16)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.event_id ? "Editar Evento" : "Nuevo Evento"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-name">Nombre del Evento</Label>
            <Input id="event-name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-description">Descripción del Evento</Label>
            <Textarea
              id="event-description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-start">Inicio</Label>
            <Input
              id="event-start"
              type="datetime-local"
              value={formatDateTimeLocal(startDate)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-end">Fin</Label>
            <Input
              id="event-end"
              type="datetime-local"
              value={formatDateTimeLocal(endDate)}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-id">ID del Curso</Label>
            <Input id="course-id" value={courseId} onChange={(e) => setCourseId(e.target.value)} required />
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="submit" className="mr-2">
              Guardar
            </Button>
            {event.event_id && (
              <Button type="button" variant="destructive" onClick={() => onDelete(event)} className="mr-2">
                Eliminar
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EventForm

