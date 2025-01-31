import  { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events] = useState([
    {
      title: 'Reunión con el equipo',
      start: new Date(2024, 11, 9, 10, 0), // Meses en JavaScript son base 0
      end: new Date(2024, 11, 9, 11, 0),
    },
    {
      title: 'Lanzamiento de producto',
      start: new Date(2024, 11, 10, 12, 0),
      end: new Date(2024, 11, 10, 13, 0),
    }
  ]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default MyCalendar;
