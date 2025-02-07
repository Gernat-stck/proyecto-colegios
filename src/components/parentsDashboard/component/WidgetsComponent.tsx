import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Calendar, ChevronRight } from "lucide-react";
export default function WidgetsComponent() {
  return (
    <div className="space-y-6 m-2 sm:m-4">
      <Card className="bg-gradient-to-br from-violet-600 to-violet-400 text-white rounded-2xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-2xl font-bold">
            <Megaphone className="w-6 h-6 mr-2" />
            Anuncios Relevantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[25svh] overflow-y-auto pr-2 custom-scrollbar">
            {announcements.map((announcement, index) => (
              <div
                key={index}
                className="bg-violet-700 rounded-lg p-4 shadow-md"
              >
                <h4 className="font-semibold mb-2">{announcement.title}</h4>
                <p className="text-sm text-violet-200">
                  {announcement.content}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <Badge className="bg-violet-500">
                    {announcement.category}
                  </Badge>
                  <span className="text-xs text-violet-300">
                    {announcement.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-violet-600 to-violet-400 text-white rounded-2xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-2xl font-bold">
            <Calendar className="w-6 h-6 mr-2" />
            Próximos Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}

const announcements = [
  {
    title: "Nuevo sistema de calificaciones",
    content:
      "A partir del próximo semestre, se implementará un nuevo sistema de calificaciones. Más detalles próximamente.",
    category: "Académico",
    date: "15 May 2023",
  },
  {
    title: "Mantenimiento de la plataforma",
    content:
      "La plataforma estará en mantenimiento el próximo fin de semana. Por favor, planifique en consecuencia.",
    category: "Técnico",
    date: "18 May 2023",
  },
  {
    title: "Conferencia de Ciencias",
    content:
      "No se pierda la conferencia anual de ciencias este mes. Oradores invitados de renombre internacional.",
    category: "Evento",
    date: "22 May 2023",
  },
  {
    title: "Nuevos cursos disponibles",
    content:
      "Se han añadido nuevos cursos electivos para el próximo semestre. Revise su portal para más información.",
    category: "Académico",
    date: "25 May 2023",
  },
];

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
