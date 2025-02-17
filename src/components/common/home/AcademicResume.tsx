import TaskPendingWidget from "@/components/common/task/TaskPendingWidget"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, FileCheck } from "lucide-react"

export default function AcademicResume() {
  return (
    <Card className="bg-gradient-to-r from-violet-600 to-violet-400 text-white rounded-2xl m-2 sm:m-4 overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Academic Resume */}
          <section className="lg:w-2/5 xl:w-1/3 space-y-2">
            <h3 className="text-2xl font-bold mb-4 text-center">Resumen Académico</h3>
            <div className="flex flex-col space-y-4">
              {/* Promedio */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <p className="text-sm text-violet-200">Promedio:</p>
                <p className="text-3xl font-bold">
                  85
                  <span className="text-lg font-normal text-violet-200">/100</span>
                </p>
              </div>
              {/* Tasks and Exams */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mx-5">
                  <p className="mr-1 text-violet-200">Tareas:</p>
                  <Badge className="bg-violet-700 text-white">
                    <BookOpen className="w-6 h-6 mr-1" />
                    <span className="font-bold">15</span>/20
                  </Badge>
                </div>
                <div className="flex items-center justify-between mx-5">
                  <p className="mr-2 text-violet-200">Exámenes:</p>
                  <Badge className="bg-violet-700 text-white">
                    <FileCheck className="w-6 h-6 mr-1" />
                    <span className="font-bold">3</span>/5
                  </Badge>
                </div>
              </div>
            </div>
          </section>
          {/* Task Pending */}
          <section className="lg:w-1/3 xl:w-2/3 space-y-4 ml-auto">
            <h3 className="text-2xl font-bold mb-2">Tareas Pendientes</h3>
            <div className="h-[200px] p-2 rounded-lg bg-transparent border border-violet-800 shadow-lg overflow-y-hidden">
              <TaskPendingWidget />
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  )
}

