import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Student {
  id: string
  name: string
  grade: string
  section: string
  coordinator: string
  imageUrl: string
}

const students: Student[] = [
  {
    id: "123456",
    name: "Carlos Pérez",
    grade: "Octavo",
    section: "A",
    coordinator: "Miguel Angel",
    imageUrl: "/src/assets/profiletemplate.svg",
  },
  {
    id: "789012",
    name: "Juan Pérez",
    grade: "Noveno",
    section: "B",
    coordinator: "Ana García",
    imageUrl: "/src/assets/estudiante2.svg",
  },
  {
    id: "345678",
    name: "María Perez",
    grade: "Séptimo",
    section: "C",
    coordinator: "Carlos López",
    imageUrl: "/src/assets/estudiante3.svg",
  },
]

export default function StudentOverview() {
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0])

  return (
    <Card className="h-full bg-gradient-to-br from-violet-600 to-violet-400 text-white rounded-2xl m-2 sm:m-4 overflow-hidden relative">
      <CardHeader className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Información del Estudiante</h1>
      </CardHeader>
      <CardContent className="text-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto mb-4 overflow-hidden rounded-full">
          <img
            src={selectedStudent.imageUrl || "/placeholder.svg"}
            alt={`Foto de ${selectedStudent.name}`}
            className="w-full h-full object-cover bg-white"
          />
        </div>
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6">{selectedStudent.name}</p>
        <div className="rounded-3xl bg-violet-800 bg-opacity-50 shadow-lg p-6 sm:p-8">
          <ul className="text-white text-sm sm:text-base lg:text-lg text-left space-y-3">
            <li className="flex justify-between">
              <strong>ID Estudiante:</strong> <span>{selectedStudent.id}</span>
            </li>
            <li className="flex justify-between">
              <strong>Grado:</strong> <span>{selectedStudent.grade}</span>
            </li>
            <li className="flex justify-between">
              <strong>Seccion:</strong> <span>{selectedStudent.section}</span>
            </li>
            <li className="flex justify-between">
              <strong>Coordinador:</strong> <span>{selectedStudent.coordinator}</span>
            </li>
          </ul>
        </div>
      </CardContent>
      {students.length > 1 && (
        <div className="absolute bottom-4 right-4">
          <Select onValueChange={(value) => setSelectedStudent(students.find((s) => s.id === value) || students[0])}>
            <SelectTrigger className="w-[180px] bg-violet-700 text-white border-violet-500">
              <SelectValue placeholder="Seleccionar estudiante" />
            </SelectTrigger>
            <SelectContent className="bg-violet-700 text-white border-violet-500">
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id} className="focus:bg-violet-600">
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </Card>
  )
}

