import React, { useState } from "react";
import ContactList from "./ContactList";
import ChatWindow from "./ChatWindow";
import { Contact, Message } from "@/types/ChatType.d";
import { Card } from "@/components/ui/card";
const ChatApp: React.FC = () => {
  const [contacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({}
  );
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null
  );
  const handleSelectContact = (contactId: number) => {
    setSelectedContactId(contactId);
  }; // Function to handle sending a message
  const handleSendMessage = (message: string) => {
    if (selectedContactId !== null) {
      const newMessage: Message = {
        id: messages[selectedContactId].length + 1,
        sender: "Yo",
        content: message,
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedContactId]: [...prevMessages[selectedContactId], newMessage],
      }));
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent p-4">
      <Card className="flex w-full max-w-4xl h-[600px] shadow-xl overflow-hidden">
        <div className="w-1/3 text-white h-full border-r-2 border-gray-300 bg-gradient-to-b from-violet-900 to-violet-500">
          <ContactList
            contacts={contacts}
            selectedContactId={selectedContactId}
            onSelectContact={handleSelectContact}
          />
        </div>
        <div className="w-2/3 h-full bg-gradient-to-b from-violet-900 to-violet-500 ">
          {selectedContactId !== null ? (
            <ChatWindow
              messages={messages[selectedContactId] || []}
              onSendMessage={handleSendMessage}
              selectedContact={contacts.find((c) => c.id === selectedContactId)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-200">
              <p className="text-lg">Selecciona un contacto para chatear</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ChatApp;
