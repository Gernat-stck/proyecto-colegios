"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Attachments } from "@/types/TaskType.d";

interface FileUploaderProps {
  taskId: string;
  initialAttachments: Attachments[];
  onAttachmentsChange: (attachments: Attachments[]) => void;
}

export function FileUploader({
  taskId,
  initialAttachments,
  onAttachmentsChange,
}: FileUploaderProps) {
  const [attachments, setAttachments] =
    useState<Attachments[]>(initialAttachments);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newAttachments = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      const updatedAttachments = [...attachments, ...newAttachments];
      setAttachments(updatedAttachments);
      onAttachmentsChange(updatedAttachments);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para subir los archivos nuevos
    toast.loading("Subiendo archivos para :", {
      duration: 5000,
      position: "top-center",
      description: taskId,
    });
  };

  const removeAttachment = (id: string) => {
    const updatedAttachments = attachments.filter(
      (attachment) => attachment.id !== id
    );
    setAttachments(updatedAttachments);
    onAttachmentsChange(updatedAttachments);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="file"
          onChange={handleFileChange}
          className="file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          multiple
        />
        <Button type="submit" className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Subir archivos
        </Button>
      </form>
      <div className="space-y-2">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center justify-between bg-muted p-2 rounded-md"
          >
            <a
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {attachment.name}
            </a>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeAttachment(attachment.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
