import React from "react";
import { Contact } from "@/types/ChatType.d";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContactListProps {
  contacts: Contact[];
  selectedContactId: number | null;
  onSelectContact: (contactId: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  selectedContactId,
  onSelectContact,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Contacts</h2>
      </div>
      <ScrollArea className="flex-grow">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors ${
              selectedContactId === contact.id ? "bg-blue-50" : ""
            }`}
            onClick={() => onSelectContact(contact.id)}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-grow">
              <h3 className="text-sm font-medium">{contact.name}</h3>
              <p className="text-xs text-gray-500 truncate">
                {contact.lastMessage}
              </p>
            </div>
            <span className="text-xs text-gray-400">
              {contact.lastMessageTime}
            </span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ContactList;
