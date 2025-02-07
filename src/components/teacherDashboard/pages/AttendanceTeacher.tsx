import { useState } from "react"
import { Search, Check, X, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const mockStudents = [
  { id: "001", name: "Ana García" },
  { id: "002", name: "Carlos López" },
  { id: "003", name: "María Rodríguez" },
  { id: "004", name: "Juan Martínez" },
  { id: "005", name: "Sofia Torres" },
]

const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

type AttendanceStatus = "present" | "absent" | "late" | null

export default function AttendanceTeacher() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [grade, setGrade] = useState("")
  const [section, setSection] = useState("")
  const [attendance, setAttendance] = useState<Record<string, Record<number, AttendanceStatus>>>({})

  const filteredStudents = mockStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAttendanceChange = (studentId: string, dayIndex: number) => {
    setAttendance((prev) => {
      const studentAttendance = prev[studentId] || {}
      const currentStatus = studentAttendance[dayIndex]

      let newStatus: AttendanceStatus = "present"
      if (currentStatus === "present") newStatus = "late"
      else if (currentStatus === "late") newStatus = "absent"
      else if (currentStatus === "absent") newStatus = null

      return {
        ...prev,
        [studentId]: {
          ...studentAttendance,
          [dayIndex]: newStatus,
        },
      }
    })
  }

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return <Check className="w-6 h-6 text-green-900" />
      case "absent":
        return <X className="w-6 h-6 text-red-500" />
      case "late":
        return <Clock className="w-6 h-6 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6 mt-6">
      <div className="bg-[#9575CD] rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Control de Asistencia</h1>
          <div className="relative">
            <Input
              type="search"
              placeholder="Buscar alumno..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="w-48">
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Grado" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((g) => (
                  <SelectItem key={g} value={g.toString()}>
                    {g}° Grado
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-48">
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Sección" />
              </SelectTrigger>
              <SelectContent>
                {["A", "B", "C"].map((s) => (
                  <SelectItem key={s} value={s}>
                    Sección {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Week Selection */}
        <div className="flex items-center justify-center gap-4 text-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const prevWeek = new Date(currentWeek)
              prevWeek.setDate(prevWeek.getDate() - 7)
              setCurrentWeek(prevWeek)
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <span className="min-w-40 text-center">Semana del {currentWeek.toLocaleDateString()}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const nextWeek = new Date(currentWeek)
              nextWeek.setDate(nextWeek.getDate() + 7)
              setCurrentWeek(nextWeek)
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
                <th className="py-3 px-4 text-left border-r">ID Alumno</th>
                <th className="py-3 px-4 text-left border-r-2 border-r-white">Nombre de Alumno</th>
                {weekDays.map((day) => (
                  <th key={day} className="py-3 px-4 text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="py-3 px-4 border-r">{student.id}</td>
                  <td className="py-3 px-4 border-r-2">{student.name}</td>
                  {weekDays.map((_, index) => (
                    <td key={index} className="py-3 px-4 text-center">
                      <Button size="icon" className="bg-slate-200 hover:bg-slate-300" onClick={() => handleAttendanceChange(student.id, index)}>
                        {getStatusIcon(attendance[student.id]?.[index])}
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex gap-6 text-white justify-end">
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
      </div>
    </div>
  )
}

