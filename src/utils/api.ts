// utils/api.ts
import axios from "axios";
import { Conversation, Message } from "@/types/ChatType.d";

const API_URL = import.meta.env.VITE_MCS_URL as string;
const token = localStorage.getItem("microserviceToken"); // O donde almacenes el token
export const fetchConversations = async (): Promise<Conversation[]> => {
  const response = await axios.get(`${API_URL}/conversations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const fetchMessages = async (
  conversationId: string,
  type: string
): Promise<Message[]> => {
  const response = await axios.get(
    `${API_URL}messages/${type}/${conversationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
