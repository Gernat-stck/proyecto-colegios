import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfileProps } from "@/types/UserType.d";
import { useEffect, useState } from "react";

export function UserProfileGrades({
  name,
  email,
  role,
  avatar: avatarUrl,
}: UserProfileProps) {
  const [roleUser, setRoleUser] = useState<string>("");
  useEffect(() => {
    switch (role) {
      case "student":
        setRoleUser("Estudiante 🎓");
        break;
      case "teacher":
        setRoleUser("Profesor 👨‍🏫");
        break;
      case "admin":
        setRoleUser("Administrador 🛠️");
        break;
      case "partners":
        setRoleUser("Socio 💎");
        break;
      default:
        setRoleUser("Usuario 🧑‍💻");
        break;
    }
  }, [role]);

  return (
    <Card className="w-full max-w-md bg-gradient-to-b from-violet-900 to-violet-600 shadow-2xl rounded-3xl text-white font-semibold">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-black">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{name}</CardTitle>
          <Badge className="text-sm text-muted-foreground mt-2">{roleUser}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold">Email:</span>
            <span>{email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
