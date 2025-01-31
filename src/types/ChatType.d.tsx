export interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
}

export interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}
