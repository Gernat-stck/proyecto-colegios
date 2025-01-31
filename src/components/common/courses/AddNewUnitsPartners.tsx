import { useState, ChangeEvent, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
//import { Label } from "@/components/ui/label";
import {
  Plus,
  Trash, //Upload
} from "lucide-react";
//import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Course, MaterialApoyo, Units } from "@/types/CourseType.d";
import { toast } from "sonner";
import { makeRequest } from "@/hooks/api";
import { useNavigate } from "react-router-dom";

interface AddNewUnitsPartnersProps {
  course: Course;
}

const AddNewUnitsPartners = ({ course }: AddNewUnitsPartnersProps) => {
  const [newUnit, setNewUnit] = useState<Units>({
    unit_id: "",
    unit_number: 0,
    title: "",
    introduction: "",
    unit_objectives: [],
    url_video: "",
    unit_resources: [],
  });
  const [units, setUnits] = useState<Units[]>([]);
  const navigate = useNavigate();
  const [courseData] = useState<Course>(course);

  const handleChange = (field: keyof Units, value: any) => {
    setNewUnit({ ...newUnit, [field]: value });
  };

  const handleObjetivoChange = (index: number, value: string) => {
    const newObjetivos = [...newUnit.unit_objectives];
    newObjetivos[index] = value;
    handleChange("unit_objectives", newObjetivos);
  };

  const handleAddObjetivo = () => {
    handleChange("unit_objectives", [...newUnit.unit_objectives, ""]);
  };

  const handleRemoveObjetivo = (index: number) => {
    const newObjetivos = newUnit.unit_objectives.filter((_, i) => i !== index);
    handleChange("unit_objectives", newObjetivos);
  };

  const handleMaterialChange = (
    index: number,
    field: keyof MaterialApoyo,
    value: string
  ) => {
    const newMaterials = [...newUnit.unit_resources];
    newMaterials[index] = { ...newMaterials[index], [field]: value };
    setNewUnit({ ...newUnit, unit_resources: newMaterials });
  };

  const handleAddMaterial = () => {
    setNewUnit({
      ...newUnit,
      unit_resources: [...newUnit.unit_resources, { title: "", url: "" }],
    });
  };

  const handleRemoveMaterial = (index: number) => {
    const newMaterials = newUnit.unit_resources.filter((_, i) => i !== index);
    setNewUnit({ ...newUnit, unit_resources: newMaterials });
  };

  /*const handleVideoTypeChange = (value: "url" | "file") => {
    handleChange("url_video", { type: value, content: "", file: undefined });
  };*/

  const handleVideoContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const embedUrl = e.target.value.replace("watch?v=", "embed/");
    handleChange("url_video", embedUrl);
  };

  useEffect(() => {
    handleChange("unit_number", units.length + 1);
  }, [units.length]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Verificar que la nueva unidad tenga título
    if (!newUnit.title) {
      toast.error("La unidad debe tener un título", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    // Agregar la nueva unidad al array de unidades
    const updatedUnits = [...units, newUnit];
    setUnits(updatedUnits);

    // Limpiar el formulario de la nueva unidad y aumentar el número de unidad
    setNewUnit({
      unit_id: "",
      unit_number: updatedUnits.length + 1, // Incrementar el número de unidad
      title: "",
      introduction: "",
      unit_objectives: [],
      url_video: "",
      unit_resources: [],
    });

    toast.success("Unidad agregada exitosamente", {
      duration: 3000,
      position: "top-center",
    });
  };

  const sendDataToServer = async () => {
    // Agregar las unidades al objeto courseData
    const updatedCourseData = { ...courseData, units };

    try {
      await makeRequest({
        url: "courses",
        method: "POST",
        data: updatedCourseData,
      });
      toast.success("Curso creado exitosamente", {
        duration: 3000,
        position: "top-center",
      });
      navigate("/dashboard/partners/MyCourses");
    } catch (error) {
      console.error("Error al crear el curso:", error);
    }
  };

  const handleCancel = () => {
    setNewUnit({
      unit_id: "",
      unit_number: 0,
      title: "",
      introduction: "",
      unit_objectives: [],
      url_video: "",
      unit_resources: [],
    });
  };
  return (
    <div className="container mx-auto p-4 space-y-4 mt-10">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-violet-600 to-violet-400 text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant="secondary"
              className="text-lg font-semibold border-none"
            >
              <Input
                value={newUnit.unit_number}
                onChange={(e) => handleChange("unit_number", e.target.value)}
                className="w-full text-black"
                placeholder="Unidad #"
                type="number"
                disabled
              />
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <CardTitle className="text-4xl font-extrabold tracking-tight">
              <Input
                value={newUnit.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full text-black bg-white border-none"
                placeholder="Título de la Unidad"
              />
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-violet-600 mb-3">
              Introducción
            </h2>
            <Textarea
              value={newUnit.introduction}
              onChange={(e) => handleChange("introduction", e.target.value)}
              className="w-full min-h-[100px]"
              placeholder="Escribe la introducción de la unidad aquí..."
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-violet-600 mb-3">
              Objetivos Generales
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {newUnit.unit_objectives.map((objetivo, index) => (
                <li key={index} className="text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={objetivo}
                      onChange={(e) =>
                        handleObjetivoChange(index, e.target.value)
                      }
                      className="flex-grow"
                      placeholder="Escribe un objetivo..."
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveObjetivo(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <Button onClick={handleAddObjetivo} className="mt-2">
              <Plus className="h-4 w-4 mr-2" /> Agregar Objetivo
            </Button>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-violet-600 mb-3">
              Video de la Unidad
            </h2>
            <Input
              value={newUnit.url_video}
              onChange={(e) => handleVideoContentChange(e)}
              className="w-full mb-2"
              placeholder="URL del video"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-violet-600 mb-3">
              Material de Apoyo
            </h2>
            <ScrollArea className="h-48 rounded-md border p-4">
              <ul className="space-y-2">
                {newUnit.unit_resources.map((material, index) => (
                  <li key={index}>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={material.title}
                        onChange={(e) =>
                          handleMaterialChange(index, "title", e.target.value)
                        }
                        placeholder="Título del material"
                        className="flex-grow"
                        required={newUnit.unit_resources.length > 0}
                      />
                      <Input
                        value={material.url}
                        onChange={(e) =>
                          handleMaterialChange(index, "url", e.target.value)
                        }
                        placeholder="URL del material"
                        className="flex-grow"
                        required={newUnit.unit_resources.length > 0}
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMaterial(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <Button onClick={handleAddMaterial} className="mt-2">
                <Plus className="h-4 w-4 mr-2" /> Agregar Material
              </Button>
            </ScrollArea>
          </section>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex justify-start mt-4 space-x-4">
            <Button variant="default" onClick={sendDataToServer}>
              Finalizar creación del Curso
            </Button>
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              className="bg-violet-600 hover:bg-violet-900"
              onClick={handleSubmit}
            >
              Crear Unidad
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddNewUnitsPartners;
