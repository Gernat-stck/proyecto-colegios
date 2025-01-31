import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";
import { UserCourseEnrollmentOverview } from "@/types/CourseType.d";
import { makeRequest } from "@/hooks/api";
import PacmanLoader from "react-spinners/PacmanLoader";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { toast } from "sonner";

export default function EnrolledCourses({
  onSelect,
  courseId,
  setCourseId,
}: {
  onSelect: (component: string) => void;
  courseId?: string | null;
  setCourseId: (id: string | null) => void;
}) {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(
    courseId || null
  );
  const [enrolledCourses, setEnrolledCourses] = useState<
    UserCourseEnrollmentOverview[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const data: UserCourseEnrollmentOverview[] = await makeRequest({
          url: `user/${userId}/courses`,
          method: "GET",
        });
        setEnrolledCourses(data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const handleUnenroll = async (courseId: string) => {
    try {
      const userId = localStorage.getItem("userId");
      await makeRequest({
        url: `courses/unenroll`,
        method: "POST",
        data: { course_id: courseId, user_id: userId },
      });
      setEnrolledCourses((prevCourses) =>
        prevCourses.filter((course) => course.course_id !== courseId)
      );
      toast.success("Desenrollado exitosamente");
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[90vh] p-7">
        <PacmanLoader color="#0f172a" loading={loading} size={30} />
      </div>
    );
  }

  const toggleCourseDetails = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
    setCourseId(courseId);
    onSelect("Detail");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mis Cursos Inscritos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <Card key={course.course_id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{course.course_name}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Badge className="mb-2">{course.category}</Badge>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="w-4 h-4" />
                <span>{course.total_hours} horas</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Progress value={course.progress} className="flex-grow" />
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button
                variant="outline"
                size={"sm"}
                className="w-full hover:bg-blue-500 hover:text-white"
                onClick={() => toggleCourseDetails(course.course_id)}
              >
                Ver Detalles
              </Button>
                <ConfirmationDialog
                  triggerText="Desenrollarse"
                  title="Desenrolarse del curso"
                  description="¿Estás seguro de que deseas desenrolarte de este curso?"
                  onConfirm={() => handleUnenroll(course.course_id)}
                />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
