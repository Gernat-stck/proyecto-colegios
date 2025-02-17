// types/index.ts
export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  name: string;
  type: "private" | "group";
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}
