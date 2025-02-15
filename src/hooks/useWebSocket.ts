import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "@/types/ChatType.d";

interface Messages {
  [key: string]: Message[];
}

interface UseWebSocketProps {
  userId: string;
  groups: string[];
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

interface UseWebSocketReturn {
  messages: Messages;
  sendMessage: (msg: string, receiver: string, isGroup: boolean) => void;
  isConnected: boolean;
  clearMessages: (receiver?: string) => void;
  reconnect: () => void;
  groupUsers: { [key: string]: string[] };
}

const useWebSocket = ({
  userId,
  groups,
  onConnect,
  onDisconnect,
  onError,
}: UseWebSocketProps): UseWebSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Messages>({});
  const [isConnected, setIsConnected] = useState(false);
  const [groupUsers, setGroupUsers] = useState<{ [key: string]: string[] }>({});
  const serverUrl = import.meta.env.REACT_APP_WS_SERVER_URL as string || "localhost:3000";

  const initializeSocket = useCallback(() => {
    try {
      const newSocket = io(serverUrl, {
        auth: { user_id: userId, groups },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      setSocket(newSocket);
      return newSocket;
    } catch (error) {
      onError?.(
        error instanceof Error
          ? error
          : new Error("Failed to initialize socket")
      );
      return null;
    }
  }, [serverUrl, userId, groups, onError]);

  useEffect(() => {
    const newSocket = initializeSocket();
    if (!newSocket) return;

    const handleConnect = () => {
      setIsConnected(true);
      onConnect?.();
      console.log("Connected to WebSocket server");
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      onDisconnect?.();
      console.log("Disconnected from WebSocket server");
    };

    const handlePrivateMessage = (msg: string, id: string, sender: string, timestamp: string) => {
      const newMessage: Message = {
        id,
        content: msg,
        sender,
        timestamp,
        isGroup: false,
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [sender]: [...(prevMessages[sender] || []), newMessage],
      }));
    };

    const handleGroupMessage = (msg: string, id: string, sender: string, timestamp: string) => {
      const newMessage: Message = {
        id,
        content: msg,
        sender,
        timestamp,
        isGroup: true,
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [sender]: [...(prevMessages[sender] || []), newMessage],
      }));
    };

    const handleGroupUsers = (group_id: string, users: string[]) => {
      setGroupUsers((prevGroupUsers) => ({
        ...prevGroupUsers,
        [group_id]: users,
      }));
    };

    const handleError = (error: Error) => {
      onError?.(error);
      console.error("WebSocket error:", error);
    };

    newSocket.on("connect", handleConnect);
    newSocket.on("disconnect", handleDisconnect);
    newSocket.on("private message", handlePrivateMessage);
    newSocket.on("group message", handleGroupMessage);
    newSocket.on("group users", handleGroupUsers);
    newSocket.on("error", handleError);

    return () => {
      newSocket.off("connect", handleConnect);
      newSocket.off("disconnect", handleDisconnect);
      newSocket.off("private message", handlePrivateMessage);
      newSocket.off("group message", handleGroupMessage);
      newSocket.off("group users", handleGroupUsers);
      newSocket.off("error", handleError);
      newSocket.close();
    };
  }, [initializeSocket, onConnect, onDisconnect, onError]);

  const sendMessage = useCallback(
    (msg: string, receiver: string, isGroup: boolean) => {
      if (!socket || !isConnected) {
        console.warn("Cannot send message: Socket not connected");
        return;
      }

      const eventName = isGroup ? "group message" : "private message";
      socket.emit(eventName, msg, receiver);
    },
    [socket, isConnected]
  );

  const clearMessages = useCallback((receiver?: string) => {
    if (receiver) {
      setMessages((prev) => {
        const newMessages = { ...prev };
        delete newMessages[receiver];
        return newMessages;
      });
    } else {
      setMessages({});
    }
  }, []);

  const reconnect = useCallback(() => {
    if (socket) {
      socket.close();
    }
    initializeSocket();
  }, [socket, initializeSocket]);

  return {
    messages,
    sendMessage,
    isConnected,
    clearMessages,
    reconnect,
    groupUsers,
  };
};

export default useWebSocket;
