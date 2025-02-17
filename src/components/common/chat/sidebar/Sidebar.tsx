// components/Sidebar/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import SidebarItem from './SidebarItem';
import { Conversation } from '@/types/ChatType.d';
import { fetchConversations } from '@/utils/api';

interface SidebarProps {
  onSelectConversation: (conversation: Conversation) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    // Obtener las conversaciones desde la API
    fetchConversations().then(setConversations);
  }, []);

  return (
    <div className="w-64 bg-gradient-to-b to-violet-500 from-violet-600 border-r-2">
      <div className="p-4 border-b-2">
        <h2 className="text-2xl text-center text-white font-bold">Chats</h2>
      </div>
      <div>
        {conversations.map((conv) => (
          <SidebarItem key={conv.id} conversation={conv} onClick={onSelectConversation} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
