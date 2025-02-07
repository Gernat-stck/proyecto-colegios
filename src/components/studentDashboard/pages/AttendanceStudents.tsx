import { useState, useMemo } from "react";
import {
  Check,
  X,
  Clock,
  ShieldQuestion,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for a single student
const studentData = {
  id: "001",
  name: "Ana García",
  grade: "3°",
  section: "B",
};

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

type AttendanceStatus = "present" | "absent" | "late" | undefined;

// Extended mock attendance data
const mockAttendance: Record<string, Record<number, AttendanceStatus>> = {
  "2025-02-03": {
    0: "present",
    1: "absent",
    2: "present",
    3: "present",
    4: "late",
  },
  "2025-03-10": {
    0: "late",
    1: "present",
    2: "present",
    3: "present",
    4: "present",
  },
  "2025-03-17": {
    0: "present",
    1: "absent",
    2: "present",
    3: "late",
    4: "present",
  },
  "2025-03-24": {
    0: "present",
    1: "present",
    2: "present",
    3: "present",
    4: "present",
  },
};

export default function AttendanceStudents() {
  const [currentWeek, setCurrentWeek] = useState(new Date("2025-02-03"));

  const getWeekKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");
    console.log(`getWeekKey: ${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return <Check className="w-6 h-6 text-green-500" />;
      case "absent":
        return <X className="w-6 h-6 text-red-500" />;
      case "late":
        return <Clock className="w-6 h-6 text-yellow-500" />;
      default:
        return <ShieldQuestion className="w-6 h-6 text-gray-500" />;
    }
  };

  const weekKey = getWeekKey(currentWeek);
  const weekAttendance = mockAttendance[weekKey];

  const adjustedDate = new Date(currentWeek);
  adjustedDate.setDate(adjustedDate.getDate() + 1);

  const monthlySummary = useMemo(() => {
    const currentMonth = currentWeek.getMonth();
    const currentYear = currentWeek.getFullYear();

    return Object.entries(mockAttendance).reduce(
      (acc, [dateKey, attendance]) => {
        const [year, month] = dateKey.split("-").map(Number);
        if (year === currentYear && month - 1 === currentMonth) {
          Object.values(attendance).forEach((status) => {
            if (status === "present") acc.present++;
            else if (status === "late") acc.late++;
            else if (status === "absent") acc.absent++;
          });
        }
        return acc;
      },
      { present: 0, late: 0, absent: 0 }
    );
  }, [currentWeek]);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6 mt-16">
      <div className="bg-[#9575CD] rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="text-white">
          <h1 className="text-2xl font-bold">Mi Asistencia</h1>
          <p className="mt-2">
            {studentData.name} - {studentData.grade} Grado, Sección{" "}
            {studentData.section}
          </p>
        </div>

        {/* Week Selection */}
        <div className="flex items-center justify-center gap-4 text-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const prevWeek = new Date(currentWeek);
              prevWeek.setDate(prevWeek.getDate() - 7);
              setCurrentWeek(prevWeek);
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <span className="min-w-40 text-center">
            Semana del {adjustedDate.toLocaleDateString()}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const nextWeek = new Date(currentWeek);
              nextWeek.setDate(nextWeek.getDate() + 7);
              setCurrentWeek(nextWeek);
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#7E57C2] text-white">
                {weekDays.map((day) => (
                  <th key={day} className="py-3 px-4 text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {weekDays.map((_, index) => (
                  <td key={index} className="py-3 px-4 text-center border">
                    <div className="flex justify-center items-center h-10">
                      {getStatusIcon(
                        weekAttendance ? weekAttendance[index] : undefined
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex gap-6 text-white justify-center">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5" /> Presente
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" /> Tardanza
          </div>
          <div className="flex items-center gap-2">
            <X className="w-5 h-5" /> Ausente
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg p-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Resumen del Mes</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-green-500 font-bold text-xl">
                {monthlySummary.present}
              </p>
              <p className="text-sm">Presentes</p>
            </div>
            <div className="text-center">
              <p className="text-yellow-500 font-bold text-xl">
                {monthlySummary.late}
              </p>
              <p className="text-sm">Tardanzas</p>
            </div>
            <div className="text-center">
              <p className="text-red-500 font-bold text-xl">
                {monthlySummary.absent}
              </p>
              <p className="text-sm">Ausencias</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
