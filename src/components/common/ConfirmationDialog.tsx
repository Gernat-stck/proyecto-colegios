import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";

interface ConfirmationDialogProps {
  triggerText: string;
  title: string;
  description: string;
  onConfirm: (...args: any[]) => void;
  confirmParams?: any[];
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmationDialog({
  triggerText,
  title,
  description,
  onConfirm,
  confirmParams = [],
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmationDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm(...confirmParams);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"} className="hover:bg-red-500 hover:text-white">
          {triggerText} <Trash className="w-4 h-4 mr-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
