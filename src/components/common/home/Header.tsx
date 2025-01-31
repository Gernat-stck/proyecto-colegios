import React from "react";
import { HeaderType } from "@/types/HeaderType.d";

const Header: React.FC<HeaderType> = ({
  average,
  tasksDone,
  totalTasks,
  examsDone,
  totalExams,
  onSelect,
}) => {
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full rounded-3xl flex items-center overflow-hidden">
        {/* Círculo de Progreso - Lado izquierdo */}
        <button onClick={() => onSelect("Average")} className="h-full aspect-square p-4">
          <div className="bg-white rounded-full full-border-8 border-white h-full w-full flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-violet-600">{average}</span>
            <span className="text-sm text-violet-600">%</span>
          </div>
        </button>

        {/* Información de Tareas - Lado derecho */}
        <button onClick={() => onSelect("Tasks")} className="flex-1 h-full">
          <div className="bg-violet-400 h-full mx-4 rounded-2xl px-6 py-3">
            <div className="space-y-2">
              <div>
                <h4 className="text-white text-xl font-medium">Tareas Completadas</h4>
                <p className="text-white/90 text-md">
                  {tasksDone}/{totalTasks}
                </p>
              </div>
              <div>
                <h4 className="text-white text-xl font-medium">Asistencia</h4>
                <p className="text-white/90 text-md">
                  {examsDone}/{totalExams}
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
};
export default Header;
