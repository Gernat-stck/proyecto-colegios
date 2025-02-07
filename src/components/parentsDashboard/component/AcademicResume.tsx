import TaskPendingWidget from "@/components/common/task/TaskPendingWidget";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Check, BookOpen, FileCheck } from "lucide-react";

export default function AcademicResume() {
  return (
    <Card className="bg-gradient-to-br from-violet-600 to-violet-400 text-white h-full rounded-2xl m-2 sm:m-4 overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <section className="space-y-4">
          <h3 className="text-2xl font-bold mb-4">Resumen Académico</h3>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <p className="text-sm text-violet-200">Promedio:</p>
              <p className="text-3xl font-bold">
                85
                <span className="text-lg font-normal text-violet-200">
                  /100
                </span>
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="mr-2 text-violet-200">Tareas:</p>
                <Badge className="bg-violet-700 text-white">
                  <BookOpen className="w-6 h-6 mr-1" />
                  <span className="font-bold">15</span>/20
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="mr-2 text-violet-200">Exámenes:</p>
                <Badge className="bg-violet-700 text-white">
                  <FileCheck className="w-6 h-6 mr-1" />
                  <span className="font-bold">3</span>/5
                </Badge>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold mb-2">Alertas</h3>
          <div className="max-h-[144px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
            <Badge className="bg-red-500 text-white p-2 flex items-center w-full">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="truncate">
                Lleva <strong className="mx-1">2 Faltas</strong> esta semana
              </span>
            </Badge>
            <Badge className="bg-teal-500 text-white p-2 flex items-center w-full">
              <Check className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="truncate">Ha completado todas sus tareas</span>
            </Badge>
            <Badge className="bg-teal-500 text-white p-2 flex items-center w-full">
              <Check className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="truncate">Ha asistido a todos los exámenes</span>
            </Badge>
            <Badge className="bg-yellow-500 text-white p-2 flex items-center w-full">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="truncate">Próximo examen en 3 días</span>
            </Badge>
            <Badge className="bg-blue-500 text-white p-2 flex items-center w-full">
              <Check className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="truncate">Ha mejorado su promedio este mes</span>
            </Badge>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold mb-2">Tareas Pendientes</h3>
          <div className="max-h-fit p-2 rounded-lg bg-transparent border border-violet-800 shadow-lg">
            <TaskPendingWidget />
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
