// Tipo para la tabla messages
interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isGroup: boolean;
}

// Tipo para la tabla users
interface User {
  id: string;
  user_name: string;
  avatar: string;
  is_online: boolean;
  last_seen: string;
}

// Tipo para la tabla classes
interface Class {
  id: string;
  course_name: string;
  instructor: string;
}

// Tipo para la tabla group_messages
interface GroupMessage {
  id: string;
  content: string;
  user: string;
  group_id: string;
  timestamp: string;
}

// Tipo para la tabla private_messages
interface PrivateMessage {
  id: string;
  content: string;
  sender: string;
  receiver: string;
  timestamp: string;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string | null;
  lastMessageTime: string | null;
  isGroup: boolean;
}

export type { Message, User, Class, GroupMessage, PrivateMessage, Contact };
