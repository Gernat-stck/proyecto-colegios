// components/Chat/ChatWindow.tsx
import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Conversation, Message } from '@/types/ChatType.d';
import { useSocketContext } from '@/context/SocketContext';
import { fetchMessages } from '@/utils/api';

interface ChatWindowProps {
  conversation: Conversation;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation }) => {
  const { socket } = useSocketContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    // Obtener mensajes históricos
    fetchMessages(conversation.id, conversation.type).then(setMessages);

    // Escuchar mensajes entrantes
    if (socket) {
      socket.emit('joinConversation', { conversationId: conversation.id, type: conversation.type });

      socket.on('message', (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on('typing', ({ userId }: { userId: string }) => {
        setTypingUsers((prev) => [...prev, userId]);
      });

      socket.on('stop typing', ({ userId }: { userId: string }) => {
        setTypingUsers((prev) => prev.filter((id) => id !== userId));
      });
    }

    // Limpiar eventos al desmontar o cambiar de conversación
    return () => {
      if (socket) {
        socket.off('message');
        socket.off('typing');
        socket.off('stop typing');
      }
    };
  }, [socket, conversation]);

  const handleSendMessage = (content: string) => {
    if (socket) {
      const message: Partial<Message> = {
        content,
        sender: 'Me',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, message as Message]);

      socket.emit('sendMessage', {
        content,
        conversationId: conversation.id,
        type: conversation.type,
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col  overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">{conversation.name}</h2>
      </div>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
      {typingUsers.length > 0 && (
        <div className="p-2 text-sm text-gray-500">
          {typingUsers.join(', ')} está escribiendo...
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
