import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
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
import AddNewUnitsTeacher from "./AddNewUnitsTeacher";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const materialApoyoSchema = z.object({
  title: z.string(),
  url: z.string(),
});

const unitSchema = z.object({
  unit_number: z.number(),
  unit_id: z.string().nullable(),
  title: z.string(),
  introduction: z.string(),
  unit_objectives: z.array(z.string()),
  url_video: z.string(),
  unit_resources: z.array(materialApoyoSchema),
});

const formSchema = z.object({
  course_id: z.string().nullable(),
  course_name: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  instructor: z.string().min(1, "El nombre del instructor es requerido"),
  total_hours: z.coerce
    .number()
    .min(1, "Las horas totales deben ser al menos 1"),
  category: z.string().min(1, "La categoría es requerida"),
  enrolled_students: z.coerce
    .number()
    .min(0, "El número de estudiantes no puede ser negativo"),
  section: z.string().min(1, "La sección es requerida"),
  units: z.array(unitSchema).min(1, "Debe haber al menos una unidad"),
});

type ModuleFormValues = z.infer<typeof formSchema>;

interface AddNewModuleTeacherProps {
  onCreateSuccess: (newCourse: Course) => void;
  onCancel: () => void;
}

export default function AddNewModuleTeacher({
  onCancel,
}: AddNewModuleTeacherProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseData, setCourseData] = useState<Course | null>(null);
  const form = useForm<ModuleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course_id: "",
      course_name: "",
      description: "",
      instructor: "",
      total_hours: 0,
      category: "",
      enrolled_students: 0,
      section: "",
      units: [
        {
          unit_number: 1,
          unit_id: "",
          title: "",
          introduction: "",
          unit_objectives: [""],
          url_video: "",
          unit_resources: [{ title: "", url: "" }],
        },
      ],
    },
  });

  async function onSubmit(values: ModuleFormValues) {
    setIsSubmitting(true);
    try {
      const newCourse: Course = {
        ...values,
      };
      toast.success("Módulo creado exitosamente");
      setCourseData(newCourse);
    } catch (error) {
      console.error("Error al formatear los datos:", error);
      toast.error("Error al formatear los datos");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (courseData) {
    return <AddNewUnitsTeacher course={courseData} />;
  }
  const SECTIONS = Array.from({ length: 9 }, (_, gradeIndex) => {
    const grade = gradeIndex + 1;
    return ['A', 'B'].map(section => ({
      value: `${grade}° Grado ${section}`,
      label: `${grade}° Grado ${section}`
    }));
  }).flat();

  return (
    <div className="flex justify-center items-center min-h-[90vh] p-7">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Crear Nuevo Módulo</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="course_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="total_hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horas Totales</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="enrolled_students"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        Estudiantes Inscritos
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="hidden" />
                      </FormControl>
                      <FormMessage className="sr-only" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sección</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una sección" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SECTIONS.map((section) => (
                            <SelectItem key={section.value} value={section.value}>
                              {section.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creando..." : "Crear Módulo"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
