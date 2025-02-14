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
import { Trash, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface ConfirmationDialogProps {
  triggerText: string;
  title: string;
  description: string;
  onConfirm: (...args: any[]) => void;
  confirmParams?: any[];
  confirmText?: string;
  cancelText?: string;
  variant?: "warning" | "danger" | "safe" | "delete";
  iconName?: "trash" | "warning" | "safe" | "danger";
}

const variantStyles = {
  warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  safe: "bg-green-500 hover:bg-green-600 text-white",
  delete: "bg-gray-500 hover:bg-gray-600 text-white",
};

const icons = {
  trash: Trash,
  warning: AlertTriangle,
  safe: CheckCircle,
  danger: XCircle,
};

export function ConfirmationDialog({
  triggerText,
  title,
  description,
  onConfirm,
  confirmParams = [],
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "delete",
  iconName = "trash",
}: ConfirmationDialogProps) {
  const [open, setOpen] = useState(false);
  const IconComponent = icons[iconName];

  const handleConfirm = () => {
    onConfirm(...confirmParams);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          className={`${variantStyles[variant]} hover:text-white`}
        >
          {triggerText} <IconComponent className="w-4 h-4 mr-1" />
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
