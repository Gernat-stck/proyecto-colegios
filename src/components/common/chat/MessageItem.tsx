// components/Chat/MessageItem.tsx
import React from 'react';
import { Message } from '@/types/ChatType.d';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isOwnMessage = message.sender === 'Me';
  console.log(message);
  return (
    <div
      className={`flex mb-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
      >
        <p>{message.content}</p>
        <span className="text-xs text-gray-500">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;
