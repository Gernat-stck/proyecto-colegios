import { useState } from "react"
import { Card } from "@/components/ui/card"

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
  }
]

export default function Header() {
  const [selectedStudent] = useState<Student>(students[0])

  return (
    <Card className="bg-gradient-to-r from-violet-600 to-violet-400 text-white rounded-2xl m-2 sm:m-4 overflow-hidden relative p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-y-0 sm:space-x-6">
        {/* Contenedor de la imagen */}

        <div className="w-16 h-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 overflow-hidden rounded-full flex-shrink-0">
          <img
            src={selectedStudent.imageUrl || "/placeholder.svg"}
            alt={`Foto de ${selectedStudent.name}`}
            className="w-full h-full object-cover bg-white"
          />
        </div>
        {/* Contenedor de la información */}

        <div className="flex-grow flex flex-col h-full">
          <h1 className="text-xl sm:text-lg lg:text-3xl font-bold">Bienvenido{' '}
            <span className=" text-black rounded-lg p-1">{selectedStudent.name} </span></h1>
          <p className="text-lg sm:text-lg lg:text-lg font-semibold mb-4"></p>
          {/* Card con la información */}
          <div className="rounded-3xl bg-violet-800 bg-opacity-50 shadow-lg p-3">
            <ul className="text-white text-sm sm:text-base lg:text-lg grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex justify-between sm:justify-start sm:space-x-4">
                <strong>ID Estudiante:</strong> <span>{selectedStudent.id}</span>
              </li>
              <li className="flex justify-between sm:justify-start sm:space-x-4">
                <strong>Grado:</strong> <span>{selectedStudent.grade}</span>
              </li>
              <li className="flex justify-between sm:justify-start sm:space-x-4">
                <strong>Seccion:</strong> <span>{selectedStudent.section}</span>
              </li>
              <li className="flex justify-between sm:justify-start sm:space-x-4">
                <strong>Coordinador:</strong> <span>{selectedStudent.coordinator}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  )
}

