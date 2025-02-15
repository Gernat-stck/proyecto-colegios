"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  momentLocalizer,
  type SlotInfo,
  type Event as BigCalendarEvent,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventForm from "./EventForm";
import { Button } from "@/components/ui/button";
import { MyEvent } from "@/types/CalendarType.d";
const localizer = momentLocalizer(moment);
moment.locale("es");
interface CalendarEvent extends BigCalendarEvent {
  event_id?: string;
  event_name: string;
  event_description?: string;
  course_id: string;
}
//TODO: Validar las funciones crud dependiendo de los permisos del usuario
//TODO: Agregar un filtro para mostrar solo los eventos del usuario
//TODO: Agregar un filtro para mostrar solo los eventos de un curso
//TODO: Conecatar con la API de cursos para obtener los cursos del usuario
function MyCalendar() {
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/events")
      .then((response) => response.json())
      .then((data: MyEvent[]) => {
        const eventsWithDates = data.map((event) => ({
          ...event,
          event_start_date: new Date(event.event_start_date),
          event_end_date: new Date(event.event_end_date),
        }));
        setEvents(eventsWithDates);
      });
  }, []);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedEvent({
      event_name: "",
      event_description: "",
      event_start_date: slotInfo.start,
      event_end_date: slotInfo.end,
      course_id: "",
    });
    setIsFormOpen(true);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    const selected = events.find((ev) => ev.event_id === event.event_id);
    if (selected) {
      setSelectedEvent(selected);
      setIsFormOpen(true);
    }
  };

  const handleSave = (event: MyEvent) => {
    const method = event.event_id ? "PUT" : "POST";
    const url = event.event_id
      ? `/api/events/${event.event_id}`
      : "/api/events";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...event,
        event_start_date: event.event_start_date.toISOString(),
        event_end_date: event.event_end_date.toISOString(),
      }),
    })
      .then((response) => response.json())
      .then((savedEvent: MyEvent) => {
        const savedEventWithDates = {
          ...savedEvent,
          event_start_date: new Date(savedEvent.event_start_date),
          event_end_date: new Date(savedEvent.event_end_date),
        };
        setEvents((prevEvents) => {
          const index = prevEvents.findIndex(
            (ev) => ev.event_id === savedEvent.event_id
          );
          if (index !== -1) {
            const updatedEvents = [...prevEvents];
            updatedEvents[index] = savedEventWithDates;
            return updatedEvents;
          } else {
            return [...prevEvents, savedEventWithDates];
          }
        });
        setIsFormOpen(false);
        setSelectedEvent(null);
      });
  };

  const handleDelete = (event: MyEvent) => {
    if (!event.event_id) return;

    fetch(`/api/events/${event.event_id}`, {
      method: "DELETE",
    }).then(() => {
      setEvents((prevEvents) =>
        prevEvents.filter((ev) => ev.event_id !== event.event_id)
      );
      setIsFormOpen(false);
      setSelectedEvent(null);
    });
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    const now = new Date();
    const isPast = event.end ? event.end < now : false;
    const style = {
      textDecoration: isPast ? "line-through" : "none",
      backgroundColor: isPast ? "#D3D3D3" : "#3174ad",
      opacity: isPast ? 0.6 : 1,
      borderRadius: "4px",
      border: "none",
      color: isPast ? "#666" : "#fff",
    };
    return { style };
  };

  const calendarEvents: CalendarEvent[] = events.map((event) => ({
    ...event,
    title: event.event_name,
    start: event.event_start_date,
    end: event.event_end_date,
  }));

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl font-bold">Calendario de Eventos</h1>
      <Button
        className="bg-violet-600 text-white hover:bg-violet-800"
        onClick={() =>
          handleSelectSlot({
            start: new Date(),
            end: new Date(),
            slots: [],
            action: "select",
          })
        }
      >
        Crear Nuevo Evento
      </Button>
      <div className="h-[600px] bg-transparent rounded-lg border-2 border-gray-300 p-4">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          startAccessor="start"
          endAccessor="end"
          className="rounded-lg"
        />
      </div>
      {isFormOpen && selectedEvent && (
        <EventForm
          event={selectedEvent}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}

export default MyCalendar;
