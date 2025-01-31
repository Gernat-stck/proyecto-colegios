import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grade } from "@/types/GradesTypes.d";
import { Badge } from "@/components/ui/badge";
interface GradeTableProps {
  course: string;
  cycle: string;
  grades: Grade[];
}

export function GradeTable({ course, cycle, grades }: GradeTableProps) {
  const averageGrade =
    grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Card className="bg-gradient-to-br from-violet-600 to-violet-400 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          <span>{cycle}</span>
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ID del curso: {course}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption className="mt-2 text-white  ">
            Nota Global: {averageGrade.toFixed(2)}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className=" text-white w-auto">ID</TableHead>
              <TableHead className="text-white">Actividad</TableHead>
              <TableHead className="text-white">Fecha</TableHead>
              <TableHead className="text-white">Entregado</TableHead>
              <TableHead className="text-right text-white">Nota</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell className="font-medium fit-content">
                  {grade.task_id}
                </TableCell>
                <TableCell>{grade.activityName}</TableCell>
                <TableCell>{formatDate(grade.date)}</TableCell>
                <TableCell className="flex items-center">
                  <Badge
                    className={`ml-2 ${grade.completed ? "bg-green-500" : "bg-gray-900"}`}
                  >
                    <span>{grade.completed ? "Sí" : "No"}</span>
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {grade.grade.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
