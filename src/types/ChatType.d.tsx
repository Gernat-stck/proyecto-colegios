export interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string | null;
  lastMessageTime: string | null;
  isGroup: boolean; // Agregar esta propiedad
}

export interface Message {
  id: string;
  msg: string;
  sender: string;
  timestamp: number;
  isGroup: boolean;
}
