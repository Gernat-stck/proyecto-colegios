import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { makeRequest } from "@/hooks/api";

interface Course {
  unit_count: number;
  course_name: string;
}
export default function AddTaskPartners() {
  const [taskData, setTaskData] = useState({
    course_id: "",
    unit_number: 1,
    task_id: "",
    title: "",
    description: "",
    course_name: "",
    completed: false,
    due_at: "",
    completed_at: null,
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseUnits, setSelectedCourseUnits] = useState<number>(1);

  useEffect(() => {
    const fetchSubjectUnits = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const data = await makeRequest({
          url: `subjects/units/${userId}`,
          method: "GET",
        });
        setCourses(data);
      } catch (error) {
        toast.error("Error al cargar los cursos");
      }
    };
    fetchSubjectUnits();
  }, []);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string | number) => {
    setTaskData((prev) => ({ ...prev, [field]: value }));
    if (field === "course_name") {
      const selectedCourse = courses.find(
        (course) => course.course_name === value
      );
      if (selectedCourse) {
        console.log(selectedCourse);
        setSelectedCourseUnits(selectedCourse.unit_count);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskData.course_name) {
      toast.error("Por favor selecciona un curso");
      return;
    }
    // Simulate API call
    try {
      await makeRequest({
        url: "tasks",
        method: "POST",
        data: taskData,
      });
      toast.success("Tarea creada con éxito");
      // Limpiar los datos del formulario
      setTaskData({
        course_id: "",
        unit_number: 1,
        task_id: "",
        title: "",
        description: "",
        course_name: "",
        completed: false,
        due_at: "",
        completed_at: null,
      });
    } catch (error) {
      toast.error("Error al crear la tarea");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Crear Nueva Tarea</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="course_name">Curso</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("course_name", value)
                  }
                  value={taskData.course_name}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course, index) => (
                      <SelectItem key={index} value={course.course_name}>
                        {course.course_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="unit_number">Número de Unidad</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("unit_number", Number(value))
                  }
                  value={taskData.unit_number.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: selectedCourseUnits },
                      (_, i) => i + 1
                    ).map((unit) => (
                      <SelectItem key={unit} value={unit.toString()}>
                        Unidad {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="title"
                value={taskData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={taskData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="due_at">Fecha de Entrega</Label>
              <Input
                id="due_at"
                name="due_at"
                type="date"
                value={taskData.due_at}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Crear Tarea</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
