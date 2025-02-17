// components/Chat/MessageInput.tsx
import React, { useState } from 'react';
import { useSocketContext } from '@/context/SocketContext';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const { socket } = useSocketContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing');
      // Puedes implementar un debounce para evitar múltiples emisiones
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t flex">
      <input
        type="text"
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
        placeholder="Escribe un mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleTyping}
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white rounded-full px-4 py-2"
      >
        Enviar
      </button>
    </form>
  );
};

export default MessageInput;
