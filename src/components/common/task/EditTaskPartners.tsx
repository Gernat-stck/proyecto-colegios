import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Task } from "@/types/TaskType.d";
import { makeRequest } from "@/hooks/api";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().optional(),
  due_at: z.string().optional(),
});

export default function EditTaskPartners({
  taskSelected,
}: {
  taskSelected?: Task;
}) {
  if (!taskSelected) {
    return (
      <div className="flex justify-center items-center min-h-[90vh] p-4">
        <Card className="w-full max-w-3xl mx-auto flex-grow">
          <CardContent className="p-6">
            <div>No task selected</div>
          </CardContent>
        </Card>
      </div>
    );
  }
  console.log("Task selected:", taskSelected);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: taskSelected.title ?? "",
      subject: taskSelected.course_name ?? "",
      description: taskSelected.description ?? "",
      due_at: taskSelected.due_at,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await makeRequest({
        url: `tasks/${taskSelected?.task_id}`,
        method: "PATCH",
        data: JSON.stringify(values),
      });
    } catch (e) {
      console.error(e);
      toast.error("Error al actualizar la tarea", {
        duration: 5000,
        position: "top-center",
      });
      return;
    }
    toast.success("Tarea actualizada con exito", {
      duration: 5000,
      position: "top-center",
    });
  }
  const adjustDate = (dateString: string) => {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
  };
  return (
    <div className="flex justify-center items-center min-h-[90vh] p-7">
      <Card className="w-full max-w-4xl mx-auto flex-grow ">
        <CardHeader>
          <CardTitle>Editor de Tareas</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo de la actividad</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el titulo de la actividad"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de Curso</FormLabel>
                    <FormControl>
                      <Input placeholder="Task subject" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Task description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="due_at"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de entrega</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder="Select a date"
                            value={
                              field.value
                                ? format(adjustDate(field.value), "yyyy-MM-dd")
                                : ""
                            }
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                      </PopoverTrigger>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update Task</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
