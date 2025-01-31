import { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Course } from "@/types/CourseType.d";
import { toast } from "sonner";
import { makeRequest } from "@/hooks/api";
import PacmanLoader from "react-spinners/PacmanLoader";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditModuleFormProps {
  selectedCourseId: string;
  setSelectedCourseId: (course: string) => void;
  onSelect: (component: string) => void;
}

//TODO: Hay que agregar una validacion que no me deje pasar a las unidades si no se han guardado los cambios

const formSchema = z.object({
  course_name: z.string().min(1, { message: "El título es requerido" }),
  instructor: z
    .string()
    .min(1, { message: "El nombre del instructor es requerido" }),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  total_hours: z.coerce
    .number()
    .min(0, { message: "Las horas totales son requeridas" }),
  category: z.string().min(1, { message: "La categoría es requerida" }),
  price: z.coerce.number().min(0, { message: "El precio es requerido" }),
});

export default function EditModuleForm({
  selectedCourseId,
  setSelectedCourseId,
  onSelect,
}: EditModuleFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course_name: "",
      instructor: "",
      description: "",
      total_hours: 0,
      category: "",
      price: 0,
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (selectedCourseId === null) {
      setSelectedCourseId(selectedCourseId);
      onSelect("MyCourses");
    }

    const fetchCourse = async () => {
      setLoading(true);
      try {
        const data: Course = await makeRequest({
          url: `courses/${selectedCourseId}`,
          method: "GET",
        });
        setSelectedCourse(data);
        reset(data);
      } catch (error) {
        toast.error("Error al cargar el curso");
        return;
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [selectedCourseId, onSelect]);

  const getUpdatedData = (
    selectedCourse: Course,
    values: Partial<Course>
  ): Course => {
    return {
      ...selectedCourse,
      ...values,
    };
  };

  useEffect(() => {
    if (selectedCourse) {
      reset(selectedCourse);
    }
  }, [selectedCourse, reset]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedCourse) {
      toast.error("No hay curso seleccionado");
      return;
    }

    try {
      const updatedData = getUpdatedData(selectedCourse, values);

      await makeRequest({
        url: `courses/${selectedCourseId}/overview`,
        method: "PATCH",
        data: updatedData,
      });
      toast.success("Módulo actualizado correctamente", {
        duration: 5000,
        position: "top-center",
      });

      setSelectedCourse(updatedData);
      setIsEditing(false);
    } catch (error) {
      toast.error("Error al actualizar el módulo");
    }
  }
  const handleEditUnits = () => {
    setSelectedCourseId(selectedCourse!.course_id);
    onSelect("EditCourse");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[90vh] p-7">
        <PacmanLoader color="#0f172a" loading={loading} size={30} />
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-[90vh] p-7">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Editar Módulo</CardTitle>
        </CardHeader>
        <FormProvider {...form}>
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Controller
                      name="course_name"
                      control={control}
                      rules={{ required: "El título es requerido" }}
                      render={({ field }) => (
                        <Input {...field} disabled={!isEditing} />
                      )}
                    />
                  </FormControl>
                  <FormMessage>{errors.course_name?.message}</FormMessage>
                </FormItem>
                <FormItem>
                  <FormLabel>Instructor</FormLabel>
                  <FormControl>
                    <Controller
                      name="instructor"
                      control={control}
                      rules={{
                        required: "El nombre del instructor es requerido",
                      }}
                      render={({ field }) => (
                        <Input {...field} disabled={!isEditing} />
                      )}
                    />
                  </FormControl>
                  <FormMessage>{errors.instructor?.message}</FormMessage>
                </FormItem>
              </div>
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: "La descripción es requerida" }}
                    render={({ field }) => (
                      <Textarea {...field} disabled={!isEditing} />
                    )}
                  />
                </FormControl>
                <FormMessage>{errors.description?.message}</FormMessage>
              </FormItem>
              <div className="grid grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel>Horas Totales</FormLabel>
                  <FormControl>
                    <Controller
                      name="total_hours"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          disabled={!isEditing}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage>{errors.total_hours?.message}</FormMessage>
                </FormItem>
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <FormControl>
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: "La categoría es requerida" }}
                      render={({ field }) => (
                        <Input {...field} disabled={!isEditing} />
                      )}
                    />
                  </FormControl>
                  <FormMessage>{errors.category?.message}</FormMessage>
                </FormItem>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          disabled={!isEditing}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage>{errors.price?.message}</FormMessage>
                </FormItem>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {isEditing ? (
                <>
                  <Button type="submit">Actualizar cambios</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Editar
                </Button>
              )}
              <Button
                type="button"
                variant="secondary"
                onClick={handleEditUnits}
              >
                Editar unidades
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
