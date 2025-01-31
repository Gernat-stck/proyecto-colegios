import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFoundTask({
  onSelect,
}: {
  onSelect: (component: string) => void;
}) {
  return (
    <div className="flex justify-center items-center min-h-[90vh] p-4">
      <Card className="w-full max-w-3xl mx-auto flex justify-center items-center">
        <CardContent className="p-6 flex flex-col justify-center items-center">
          <div>No existen tareas para mostrar</div>
          <Button className="mt-5 hover:bg-slate-700 hover:text-white" variant="outline" onClick={() => onSelect("AddTask")}>Agregar tarea</Button>
        </CardContent>
      </Card>
    </div>
  );
}
