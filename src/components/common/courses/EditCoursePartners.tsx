import { useState, useEffect, type ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Course, Units, MaterialApoyo } from "@/types/CourseType.d";
import { makeRequest } from "@/hooks/api";
import { toast } from "sonner";
import { Trash, Plus } from "lucide-react";

type EditCoursePartnersProps = {
  selectedCourseId: string;
  setSelectedCourseId: (course: string) => void;
  onSelect: (component: string) => void;
};

const EditCoursePartners = ({
  selectedCourseId,
  setSelectedCourseId,
  onSelect,
}: EditCoursePartnersProps) => {
  const [editedUnits, setEditedUnits] = useState<Units[]>([]);
  const [newUnit, setNewUnit] = useState<Units>({
    unit_id: "",
    unit_number: 0,
    title: "",
    introduction: "",
    url_video: "",
    unit_objectives: [""],
    unit_resources: [],
  });
  const [selectedUnitIndex, setSelectedUnitIndex] = useState<number | null>(
    null
  );
  useEffect(() => {
    if (selectedCourseId === null) {
      setSelectedCourseId(selectedCourseId);
      onSelect("MyCourses");
    }
    const fetchCourse = async () => {
      try {
        const data: Course = await makeRequest({
          url: `courses/${selectedCourseId}`,
          method: "GET",
        });
        setEditedUnits(data.units);
        setNewUnit({
          unit_id: "",
          unit_number: data.units.length + 1,
          title: "",
          introduction: "",
          url_video: "",
          unit_objectives: [""],
          unit_resources: [],
        });
      } catch (error) {
        toast.error("Error al cargar el curso");
        return;
      }
    };
    fetchCourse();
  }, [selectedCourseId, onSelect]);

  const handleChange = (field: keyof Units, value: any) => {
    setNewUnit((prevUnit) => ({ ...prevUnit, [field]: value }));
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
    value: any
  ) => {
    const newMaterials = [...newUnit.unit_resources];
    newMaterials[index] = { ...newMaterials[index], [field]: value };
    handleChange("unit_resources", newMaterials);
  };

  const handleAddMaterial = () => {
    handleChange("unit_resources", [
      ...newUnit.unit_resources,
      { title: "", url: "" },
    ]);
  };

  const handleRemoveMaterial = (index: number) => {
    const newMaterials = newUnit.unit_resources.filter((_, i) => i !== index);
    handleChange("unit_resources", newMaterials);
  };

  const handleVideoContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const embedUrl = e.target.value.replace("watch?v=", "embed/");
    handleChange("url_video", embedUrl);
  };

  const handleUnitSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = Number(e.target.value);
    if (!isNaN(index)) {
      setSelectedUnitIndex(index);
      setNewUnit(editedUnits[index]);
    } else {
      setSelectedUnitIndex(null);
      setNewUnit({
        unit_id: "",
        unit_number: 0,
        title: "",
        introduction: "",
        url_video: "",
        unit_objectives: [""],
        unit_resources: [],
      });
    }
  };

  const handleSubmit = () => {
    if (
      !newUnit.unit_number ||
      !newUnit.title ||
      !newUnit.introduction ||
      !newUnit.url_video ||
      !newUnit.unit_objectives
    ) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    if (selectedUnitIndex !== null) {
      setEditedUnits((prevUnits) =>
        prevUnits.map((unit, index) =>
          index === selectedUnitIndex ? newUnit : unit
        )
      );
    } else {
      setEditedUnits((prevUnits) => [...prevUnits, newUnit]);
    }
    setNewUnit({
      unit_id: "",
      unit_number: editedUnits.length + 1,
      title: "",
      introduction: "",
      url_video: "",
      unit_objectives: [""],
      unit_resources: [],
    });
    setSelectedUnitIndex(null);
  };

  const sendDataToServer = async () => {
    try {
      await makeRequest({
        url: `courses/${selectedCourseId}/update/units`,
        method: "POST",
        data: { units: editedUnits },
      });
      console.log("Datos enviados", editedUnits);
      toast.success("Curso actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el curso");
    }
  };
  const handleSendData = async () => {
    const firstConfirmation = window.confirm(
      "¿Estás seguro de que deseas enviar los datos?"
    );
    if (!firstConfirmation) {
      return;
    }

    const secondConfirmation = window.confirm(
      "¿Realmente estás seguro de que deseas enviar los datos?"
    );
    if (!secondConfirmation) {
      return;
    }

    try {
      await sendDataToServer();
      toast.success("Datos enviados con éxito");
    } catch (error) {
      toast.error("Error al enviar los datos");
    }
  };

  const handleCancel = () => {
    setNewUnit({
      unit_id: "",
      unit_number: editedUnits.length + 1,
      title: "",
      introduction: "",
      url_video: "",
      unit_objectives: [""],
      unit_resources: [],
    });
    setSelectedUnitIndex(null);
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
                required
              />
            </Badge>
            <select
              value={
                selectedUnitIndex !== null ? selectedUnitIndex.toString() : ""
              }
              onChange={handleUnitSelect}
              className="ml-4 p-2 border rounded text-black"
            >
              <option value="">Seleccionar Unidad</option>
              {editedUnits.map((unit, index) => (
                <option key={unit.unit_id} value={index.toString()}>
                  {unit.unit_number}. {unit.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <CardTitle className="text-4xl font-extrabold tracking-tight">
              <Input
                value={newUnit.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full text-black bg-white border-none"
                placeholder="Título de la Unidad"
                required
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
              required
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
                      required
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
              onChange={handleVideoContentChange}
              className="w-full mb-2"
              placeholder="URL del video"
              required
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
            <Button variant="default" onClick={handleSendData}>
              Finalizar Actualizacion del curso
            </Button>
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <Button variant="outline" onClick={handleCancel}>
              {selectedUnitIndex !== null ? "Añadir unidad nueva" : "Cancelar"}
            </Button>
            <Button
              className="bg-violet-600 hover:bg-violet-900"
              onClick={handleSubmit}
            >
              {selectedUnitIndex !== null
                ? "Actualizar Unidad"
                : "Añadir Unidad"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditCoursePartners;
