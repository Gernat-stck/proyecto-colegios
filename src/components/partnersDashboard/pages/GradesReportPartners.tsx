import { useState, useEffect } from "react";
import { Subject, Course, StudentGrade, Activity } from "@/types/GradesTypes.d";
export const fetchSubjects = async (): Promise<Subject[]> => {
  return [
    {
      id: "subject-1",
      name: "Matemáticas",
      courses: [
        {
          id: "course-1",
          name: "Curso 1",
          activities: [
            { id: "activity-1", name: "Examen 1" },
            { id: "activity-2", name: "Examen 2" },
          ],
          students: [
            { id: "student-1", name: "Juan Pérez" },
            { id: "student-2", name: "María López" },
          ],
          grades: [
            {
              studentId: "student-1",
              grades: { "activity-1": 85, "activity-2": 90 },
            },
            {
              studentId: "student-2",
              grades: { "activity-1": 78, "activity-2": 82 },
            },
          ],
        },
        {
          id: "course-2",
          name: "Curso 2",
          activities: [
            { id: "activity-3", name: "Examen 1" },
            { id: "activity-4", name: "Examen 2" },
          ],
          students: [
            { id: "student-3", name: "Carlos García" },
            { id: "student-4", name: "Ana Martínez" },
          ],
          grades: [
            {
              studentId: "student-3",
              grades: { "activity-3": 88, "activity-4": 92 },
            },
            {
              studentId: "student-4",
              grades: { "activity-3": 80, "activity-4": 85 },
            },
          ],
        },
      ],
    },
    {
      id: "subject-2",
      name: "Ciencias",
      courses: [
        {
          id: "course-3",
          name: "Curso 3",
          activities: [
            { id: "activity-5", name: "Examen 1" },
            { id: "activity-6", name: "Examen 2" },
          ],
          students: [
            { id: "student-5", name: "Luis Fernández" },
            { id: "student-6", name: "Laura Gómez" },
          ],
          grades: [
            {
              studentId: "student-5",
              grades: { "activity-5": 75, "activity-6": 80 },
            },
            {
              studentId: "student-6",
              grades: { "activity-5": 85, "activity-6": 88 },
            },
          ],
        },
      ],
    },
  ];
};
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, GripHorizontal } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "sonner";

export default function GradeControlSystem() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [pendingChanges, setPendingChanges] = useState<boolean>(false);
  const [originalGrades, setOriginalGrades] = useState<StudentGrade[]>([]);
  const [newActivityName, setNewActivityName] = useState<string>("");

  useEffect(() => {
    fetchSubjects().then(setSubjects);
  }, []);

  const handleSubjectChange = (subjectId: string) => {
    const subject = subjects.find((s) => s.id === subjectId) || null;
    setSelectedSubject(subject);
    setSelectedCourse(null);
    setPendingChanges(false);
    setOriginalGrades([]);
  };

  const handleCourseChange = (courseId: string) => {
    const course =
      selectedSubject?.courses.find((c) => c.id === courseId) || null;
    setSelectedCourse(course);
    setPendingChanges(false);
    if (course) {
      setOriginalGrades(JSON.parse(JSON.stringify(course.grades)));
    }
  };

  const handleUpdateGrade = (
    studentId: string,
    activityId: string,
    grade: number
  ) => {
    setSelectedCourse((prevCourse) => {
      if (!prevCourse) return null;
      const updatedGrades = prevCourse.grades.map((sg) =>
        sg.studentId === studentId
          ? { ...sg, grades: { ...sg.grades, [activityId]: grade } }
          : sg
      );
      return { ...prevCourse, grades: updatedGrades };
    });
    setPendingChanges(true);
  };

  const handleDeleteGrade = (studentId: string, activityId: string) => {
    setSelectedCourse((prevCourse) => {
      if (!prevCourse) return null;
      const updatedGrades = prevCourse.grades.map((sg) =>
        sg.studentId === studentId
          ? { ...sg, grades: { ...sg.grades, [activityId]: undefined } }
          : sg
      );
      return { ...prevCourse, grades: updatedGrades };
    });
    setPendingChanges(true);
  };

  const handleSaveChanges = () => {
    if (selectedSubject && selectedCourse) {
      // Aquí iría la lógica para guardar los cambios en el backend
      // Por ahora, solo simularemos una operación asíncrona
      setTimeout(() => {
        setPendingChanges(false);
        setOriginalGrades(JSON.parse(JSON.stringify(selectedCourse.grades)));
        toast.success("Cambios guardados con éxito", {
          duration: 2000,
          position: "top-center",
        });
      }, 1000);
    }
  };

  const handleCancelChanges = () => {
    if (selectedCourse) {
      setSelectedCourse((prevCourse) => {
        if (!prevCourse) return null;
        return {
          ...prevCourse,
          grades: JSON.parse(JSON.stringify(originalGrades)),
        };
      });
      setPendingChanges(false);
    }
  };

  const handleAddActivity = () => {
    if (
      selectedCourse &&
      newActivityName.trim() &&
      selectedCourse.activities.length < 5
    ) {
      const newActivity: Activity = {
        id: `new-${Date.now()}`,
        name: newActivityName.trim(),
      };
      setSelectedCourse((prevCourse) => {
        if (!prevCourse) return null;
        return {
          ...prevCourse,
          activities: [...prevCourse.activities, newActivity],
        };
      });
      setNewActivityName("");
      setPendingChanges(true);
    }
  };

  const calculateGlobalGrade = (grades: {
    [activityId: string]: number | undefined;
  }) => {
    const values = Object.values(grades).filter(
      (g): g is number => g !== undefined
    );
    if (values.length === 0) return "-";
    const sum = values.reduce((a, b) => a + b, 0);
    return (sum / values.length).toFixed(2);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination || !selectedCourse) {
      return;
    }

    const items = Array.from(selectedCourse.activities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedCourse((prevCourse) => {
      if (!prevCourse) return null;
      return {
        ...prevCourse,
        activities: items,
      };
    });
    setPendingChanges(true);
  };

  return (
    <Card className="container mx-auto p-4 space-y-4 mt-10">
      <CardHeader>
        <CardTitle>Sistema de Control de Notas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Select onValueChange={handleSubjectChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar materia" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleCourseChange}
              disabled={!selectedSubject}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar curso" />
              </SelectTrigger>
              <SelectContent>
                {selectedSubject?.courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedSubject && selectedCourse && (
            <div>
              <div className="flex flex-wrap justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Calificaciones para {selectedSubject.name} -{" "}
                  {selectedCourse.name}
                </h3>
                <div className="flex items-center gap-4">
                  {pendingChanges && (
                    <span className="text-yellow-500">Cambios pendientes</span>
                  )}
                  <Button
                    onClick={handleSaveChanges}
                    disabled={!pendingChanges}
                  >
                    Guardar cambios
                  </Button>
                  <Button
                    onClick={handleCancelChanges}
                    disabled={!pendingChanges}
                    variant="outline"
                  >
                    Cancelar cambios
                  </Button>
                </div>
              </div>

              {selectedCourse.activities.length < 5 && (
                <div className="flex items-center gap-2 mb-4">
                  <Input
                    placeholder="Nombre de la nueva actividad"
                    value={newActivityName}
                    onChange={(e) => setNewActivityName(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button
                    onClick={handleAddActivity}
                    disabled={
                      !newActivityName.trim() ||
                      selectedCourse.activities.length >= 5
                    }
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Agregar actividad
                  </Button>
                </div>
              )}

              <ScrollArea className="h-[calc(100vh-400px)]">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Table>
                    <Droppable droppableId="activities" direction="horizontal">
                      {(provided) => (
                        <TableHeader
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <TableRow>
                            <TableHead className="sticky left-0 bg-background">
                              Estudiante
                            </TableHead>
                            {selectedCourse.activities.map(
                              (activity, index) => (
                                <Draggable
                                  key={activity.id}
                                  draggableId={activity.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <TableHead
                                      className="text-center cursor-move"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="flex items-center justify-center">
                                        <GripHorizontal className="mr-2 h-4 w-4" />
                                        {activity.name}
                                      </div>
                                    </TableHead>
                                  )}
                                </Draggable>
                              )
                            )}
                            {provided.placeholder}
                            <TableHead className="text-center">
                              Nota Global
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                      )}
                    </Droppable>
                    <TableBody>
                      {selectedCourse.students.map((student) => {
                        const studentGrade = selectedCourse.grades.find(
                          (sg) => sg.studentId === student.id
                        ) || {
                          grades: {} as {
                            [activityId: string]: number | undefined;
                          },
                        };
                        return (
                          <TableRow key={student.id}>
                            <TableCell className="sticky left-0 bg-background">
                              {student.name}
                            </TableCell>
                            {selectedCourse.activities.map((activity) => (
                              <TableCell key={activity.id} className="p-0">
                                <div className="flex items-center justify-center gap-2 p-2">
                                  <Input
                                    type="number"
                                    value={
                                      typeof studentGrade.grades === "object" &&
                                      studentGrade.grades[activity.id] !==
                                        undefined
                                        ? studentGrade.grades[activity.id]
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleUpdateGrade(
                                        student.id,
                                        activity.id,
                                        Number(e.target.value)
                                      )
                                    }
                                    className="w-16 text-center"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      handleDeleteGrade(student.id, activity.id)
                                    }
                                    aria-label={`Eliminar nota de ${activity.name} para ${student.name}`}
                                  ></Button>
                                </div>
                              </TableCell>
                            ))}
                            <TableCell className="text-center">
                              {calculateGlobalGrade(studentGrade.grades)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </DragDropContext>
              </ScrollArea>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
