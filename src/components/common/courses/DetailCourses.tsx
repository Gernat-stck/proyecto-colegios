import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseDetailProps, Course } from "@/types/CourseType.d";
import { makeRequest } from "@/hooks/api";

export default function DetailCourses({ courseId }: CourseDetailProps) {
  const [curso, setCurso] = useState<Course | null>(null);
  const [selectedUnitIndex, setSelectedUnitIndex] = useState<number>(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data: Course = await makeRequest({
          url: `courses/${courseId}`,
          method: "GET",
        });
        setCurso(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!curso) {
    return <div>Loading...</div>;
  }

  // Ordenar las unidades por el campo que desees, por ejemplo, 'id'
  const sortedUnits = [...curso.units].sort(
    (a, b) => a.unit_number - b.unit_number
  );
  const selectedUnit = sortedUnits[selectedUnitIndex];

  const handlePrevious = () => {
    if (selectedUnitIndex > 0) {
      setSelectedUnitIndex(selectedUnitIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedUnitIndex < sortedUnits.length - 1) {
      setSelectedUnitIndex(selectedUnitIndex + 1);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4 mt-10">
      <Select onValueChange={(value) => setSelectedUnitIndex(Number(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona una unidad" />
        </SelectTrigger>
        <SelectContent>
          {sortedUnits.map((unit, index) => (
            <SelectItem key={index} value={index.toString()}>
              Unidad {unit.unit_number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-violet-600 to-violet-400 text-white p-6">
          <Badge variant="secondary" className="mb-2 text-lg font-semibold">
            Unidad {selectedUnit.unit_number}
          </Badge>
          <CardTitle className="text-4xl font-extrabold tracking-tight">
            {selectedUnit.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-3 text-violet-600">
              Introducción
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {selectedUnit.introduction}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-violet-600">
              Objetivos Generales
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {selectedUnit.unit_objectives.map((objetivo, index) => (
                <li key={index} className="text-gray-700">
                  {objetivo}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-violet-600">
              Video del Módulo
            </h2>
            <div className="aspect-w-16 aspect-h-9 h-[400px]">
              <iframe
                src={selectedUnit.url_video}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-violet-600">
              Material de Apoyo
            </h2>
            <ScrollArea className="h-48 rounded-md border p-4">
              <ul className="space-y-2">
                {selectedUnit.unit_resources &&
                selectedUnit.unit_resources.length > 0 ? (
                  selectedUnit.unit_resources.map((material, index) => (
                    <li key={index}>
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {material.title}
                      </a>
                    </li>
                  ))
                ) : (
                  <li>No hay material de apoyo disponible.</li>
                )}
              </ul>
            </ScrollArea>
          </section>
          <div className="flex justify-between mt-4">
            <Button
              className="bg-violet-600 hover:bg-violet-900"
              onClick={handlePrevious}
              disabled={selectedUnitIndex === 0}
            >
              Anterior
            </Button>
            <Button
              className="bg-violet-600 hover:bg-violet-900"
              onClick={handleNext}
              disabled={selectedUnitIndex === sortedUnits.length - 1}
            >
              Siguiente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
