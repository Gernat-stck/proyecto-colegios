// pages/ChatPage.tsx
import React, { useState } from 'react';
import Sidebar from '@/components/common/chat/sidebar/Sidebar';
import ChatWindow from '@/components/common/chat/ChatWindow';
import { Conversation } from '@/types/ChatType.d';

const ChatPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  return (
    <div className="flex bg-gradient-to-b to-violet-500 from-violet-600  h-[90svh] mx-auto p-10 rounded-lg shadow-lg">
      <Sidebar onSelectConversation={setSelectedConversation} />
      {selectedConversation ? (
        <ChatWindow conversation={selectedConversation} />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white bold text-xl">Selecciona una conversación para empezar a chatear.</p>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
