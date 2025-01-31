import { useEffect, useState } from "react";
import { ActivityLog } from "@/components/common/grades/ActivityLog";
import { UserProfileGrades } from "@/components/common/grades/UserProfileGrades";
import { CourseData } from "@/types/GradesTypes.d";
import { UserProfileProps } from "@/types/UserType.d";
import { makeRequest } from "@/hooks/api";
import { toast } from "sonner";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function GradesReportCourses() {
  const [coursesGrades, setCoursesGrades] = useState<{
    [courseId: string]: CourseData;
  }>({});
  const [userProfile, setUserProfile] = useState<UserProfileProps>();
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCoursesGrades = async () => {
      try {
        const response = await makeRequest({
          url: `tasks/user/${userId}`,
          method: "GET",
        });
        setCoursesGrades(response);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar las calificaciones");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const response = await makeRequest({
          url: `users/${userId}`,
          method: "GET",
        });
        setUserProfile(response);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar el perfil de usuario");
      }
    };

    fetchUserProfile();
    fetchCoursesGrades();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[90vh] p-7">
        <PacmanLoader color="#0f172a" loading={loading} size={30} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Panel de Usuario</h1>
      <div className="grid gap-8">
        {userProfile && (
          <UserProfileGrades
            name={userProfile.name}
            email={userProfile.email}
            role={userProfile.role}
            avatar={userProfile.avatar}
          />
        )}
        <ActivityLog coursesGrades={coursesGrades} />
      </div>
    </div>
  );
}
