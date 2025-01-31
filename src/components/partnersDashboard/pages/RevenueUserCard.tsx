import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleDollarSignIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfileProps } from "@/types/UserType.d";
import { useEffect, useState } from "react";
import { makeRequest } from "@/hooks/api";
import { toast } from "sonner";

const totalRevenue = 15000;

export function RevenueUserCard() {
  const [userPros, setUserPros] = useState<UserProfileProps | undefined>();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchUserProfile = async () => {
      try {
        const response = await makeRequest({
          url: `users/${userId}`,
          method: "GET",
        });
        setUserPros(response);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar el perfil de usuario");
      }
    };
    fetchUserProfile();
  }, []);
  return (
    <Card className="col-span-2">
      <div className="flex flex-col h-full mt-16">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">
            Ingresos Totales
          </CardTitle>
          <CircleDollarSignIcon className="w-8 h-8 text-primary-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            ${totalRevenue.toLocaleString()}
          </div>
          <p className="text-md text-muted-foreground">
            +20.1% del mes anterior
          </p>
          {userPros && (
            <div className="mt-4 flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={userPros.avatar} alt={userPros.name} />
                <AvatarFallback>{userPros.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {userPros.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {userPros.email}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center mt-8 justify-center">
            <Button className="mt-4 w-1/2">Iniciar Retiro</Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
