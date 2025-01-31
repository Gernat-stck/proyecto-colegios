import { useEffect, useState } from "react";
import { BadgePlus, Clock, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CourseOverview } from "@/types/CourseType.d";
import { makeRequest } from "@/hooks/api";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function MyCoursesPartners({
  onSelect,
  setSelectedCourseId,
}: {
  onSelect: (component: string) => void;
  setSelectedCourseId: (course: string) => void;
}) {
  const [allCourses, setAllCourses] = useState<CourseOverview[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const data: CourseOverview[] = await makeRequest({
          url: `courses/${userId}/instructor`,
          method: "GET",
        });
        setAllCourses(data);
      } catch (error) {
        toast.error("Error al cargar los cursos impartidos");
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const filteredCourses = allCourses.filter(
    (course) =>
      (course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === null || course.category === selectedCategory)
  );

  const AddNewCourses = () => {
    onSelect("AddNewModule");
  };

  const EditCoursePartners = (course: CourseOverview) => {
    setSelectedCourseId(course.course_id);
    onSelect("EditModule");
  };

  const categories = [...new Set(allCourses.map((course) => course.category))];
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[90vh] p-7">
        <PacmanLoader color="#0f172a" loading={loading} size={30} />{" "}
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mis Cursos</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Buscar cursos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/2"
        />
        <Select
          onValueChange={(value) =>
            setSelectedCategory(value === "all" ? null : value)
          }
        >
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Filtrar por categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          className="bg-violet-600 hover:bg-violet-800 max-w-fit content"
          onClick={AddNewCourses}
        >
          <BadgePlus className="w-4 h-4" />
          <span>Crear un nuevo curso</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.course_name}</CardTitle>
              <CardDescription>{course.instructor}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge className="mb-2 ">{course.category}</Badge>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.total_hours} horas</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolled_students} estudiantes</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-bold">
                ${parseFloat(course.price).toFixed(2)}
              </span>
              <Button
                className="bg-violet-600 hover:bg-violet-700"
                onClick={() => EditCoursePartners(course)}
              >
                Administrar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredCourses.length === 0 && (
        <p className="text-center text-muted-foreground mt-6">
          No se encontraron cursos que coincidan con tu búsqueda.
        </p>
      )}
    </div>
  );
}
