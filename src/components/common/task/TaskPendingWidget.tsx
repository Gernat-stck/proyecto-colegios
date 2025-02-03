import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export default function TaskPendingWidget() {
  return (
    <div className="space-y-4 max-h-[30svh] overflow-y-auto pr-2 custom-scrollbar">
      {events.map((event, index) => (
        <div
          key={index}
          className="bg-violet-700 rounded-lg p-4 shadow-md flex items-center"
        >
          <div className="flex-grow">
            <h4 className="font-semibold">{event.title}</h4>
            <p className="text-sm text-violet-200">{event.date}</p>
            <Badge className="mt-2 bg-violet-500">{event.type}</Badge>
          </div>
          <ChevronRight className="w-5 h-5 text-violet-400" />
        </div>
      ))}
    </div>
  );
}

const events = [
  {
    title: "Examen Final de Matemáticas",
    date: "5 Jun 2023, 10:00 AM",
    type: "Examen",
  },
  {
    title: "Feria de Ciencias",
    date: "12 Jun 2023, 9:00 AM - 5:00 PM",
    type: "Evento",
  },
  {
    title: "Taller de Escritura Creativa",
    date: "15 Jun 2023, 2:00 PM",
    type: "Taller",
  },
  {
    title: "Presentación de Proyectos Finales",
    date: "20 Jun 2023, 11:00 AM",
    type: "Académico",
  },
  {
    title: "Ceremonia de Graduación",
    date: "30 Jun 2023, 6:00 PM",
    type: "Ceremonia",
  },
];
