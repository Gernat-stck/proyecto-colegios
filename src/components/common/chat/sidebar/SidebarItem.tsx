// components/Sidebar/SidebarItem.tsx
import React from 'react';
import { Conversation } from '@/types/ChatType.d';
import Avatar from '../common/Avatar';

interface SidebarItemProps {
  conversation: Conversation;
  onClick: (conversation: Conversation) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ conversation, onClick }) => {
  return (
    <div
      className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
      onClick={() => onClick(conversation)}
    >
      <Avatar name={conversation.name} />
      <div className="ml-3">
        <p className="text-md font-medium">{conversation.name}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
