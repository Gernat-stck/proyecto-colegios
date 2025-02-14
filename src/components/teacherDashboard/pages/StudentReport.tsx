import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface StudentReport {
  grado: string;
  seccion: string;
  idAlumno: string;
  porcentajeAsistencia: string;
  nombreAlumno: string;
  fecha: string;
  maestroReporta: string;
  comentario: string;
}
interface StudentReportProps {
  onClose: () => void;
}
export default function StudentReport({ onClose }: StudentReportProps) {
  const [report, setReport] = useState<StudentReport>({
    grado: "Quinto",
    seccion: "A",
    idAlumno: "STU-001",
    porcentajeAsistencia: "80/100",
    nombreAlumno: "Paco Flores",
    fecha: new Date().toISOString().split("T")[0],
    maestroReporta: "Carlos Daniel",
    comentario: "",
  });

  const handleSubmit = async () => {
    console.log("Report submitted:", report);
    try {
      // Send report to backend
      //TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Acta levantada exitosamente");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Error al levantar acta");
      return;
    } finally {
      // Clear form
      setReport({
        grado: "Quinto",
        seccion: "A",
        idAlumno: "STU-001",
        porcentajeAsistencia: "80/100",
        nombreAlumno: "Paco Flores",
        fecha: new Date().toISOString().split("T")[0],
        maestroReporta: "Carlos Daniel",
        comentario: "",
      });
      onClose();
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6 mt-6 bg-transparent">
      <div className="mx-auto max-w-3xl rounded-lg bg-gradient-to-b from-violet-600 to-violet-500 p-6 shadow-xl">
        <div className="flex items-center justify-between p-2 mb-6">
          <Button
            size={"sm"}
            variant="ghost"
            className="bg-indigo-700 text-md left-4 flex items-center text-gray-100 hover:text-gray-900"
            onClick={onClose}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Cancelar
          </Button>{" "}
          <ConfirmationDialog
            triggerText="Levantar Acta"
            title="¿Estás seguro que deseas generar esta nueva acta?"
            description="Esta acción no se puede deshacer. Toda la informacion proporcionada sera enviada al encargado inmediatamente."
            onConfirm={handleSubmit}
            confirmParams={[report]}
            confirmText="Sí, levantar acta conductual"
            cancelText="No, cancelar"
            variant="warning"
            iconName="warning"
          />
        </div>
        <div className="relative mb-4">
          {/* Datos del estudiante */}
          <div className="mb-6 flex items-start gap-6">
            <div className="flex-shrink-0">
              <img
                src="/public/vite.svg"
                alt="Student avatar"
                className="h-20 w-20 rounded-full"
              />
            </div>
            <div className="grid w-full grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-white">
                  Grado
                </label>
                <input
                  type="text"
                  className="w-full rounded border-gray-300 bg-violet-800 p-2 text-white"
                  value={report.grado}
                  disabled
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-white">
                  Porcentaje de asistencia
                </label>
                <input
                  type="text"
                  className="w-full rounded border-gray-300 bg-violet-800 p-2 text-white"
                  value={report.porcentajeAsistencia}
                  disabled
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-white">
                  Sección
                </label>
                <input
                  type="text"
                  className="w-full rounded border-gray-300 bg-violet-800 p-2 text-white"
                  value={report.seccion}
                  disabled
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-white">
                  Nombre de alumno
                </label>
                <input
                  type="text"
                  className="w-full rounded border-gray-300 bg-violet-800 p-2 text-white"
                  value={report.nombreAlumno}
                  disabled
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-white">
                  ID Alumno
                </label>
                <input
                  type="text"
                  className="w-full rounded border-gray-300 bg-violet-800 p-2 text-white"
                  value={report.idAlumno}
                  disabled
                />
              </div>
            </div>
          </div>
          {/* Datos del reporte */}
          <div className="rounded-lg bg-violet-700 p-6 text-white">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-white">
                  Fecha
                </label>
                <input
                  type="date"
                  className="w-full rounded border-gray-300 bg-violet-600 p-2"
                  value={report.fecha}
                  onChange={(e) =>
                    setReport({ ...report, fecha: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-white">
                  Maestro quien reporta
                </label>
                <input
                  type="text"
                  className="w-full rounded border-gray-300 bg-violet-600 p-2"
                  value={report.maestroReporta}
                  onChange={(e) =>
                    setReport({ ...report, maestroReporta: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Comentario
              </label>
              <textarea
                className="w-full rounded border-gray-300 bg-violet-600 p-2"
                rows={3}
                value={report.comentario}
                onChange={(e) =>
                  setReport({ ...report, comentario: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
