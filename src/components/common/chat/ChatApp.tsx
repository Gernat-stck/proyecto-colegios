import type React from "react";
import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import ChatWindow from "./ChatWindow";
import type { Contact } from "@/types/ChatType.d";
import useWebSocket from "@/hooks/useWebSocket";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ChatApp: React.FC<{ userId: string; groups: string[] }> = ({
  userId,
  groups,
}) => {
  const { messages, sendMessage, groupUsers } = useWebSocket({
    userId,
    groups,
  });
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null
  );

  const defaultContacts: Contact[] = [
    {
      id: 1,
      name: "Alex Sánchez",
      avatar:
        "https://img.freepik.com/psd-gratis/render-3d-personaje-avatar_23-2150611750.jpg",
      lastMessage: "Hola, ¿cómo estás?",
      lastMessageTime: "10:30 AM",
      isGroup: false,
    },
    {
      id: 2,
      name: "Mariel Salazar",
      avatar:
        "https://img.freepik.com/psd-gratis/representacion-3d-avatar_23-2150833538.jpg",
      lastMessage: null,
      lastMessageTime: null,
      isGroup: false,
    },
    // Agrega más contactos según sea necesario
  ];

  const [contacts, setContacts] = useState<Contact[]>(defaultContacts);

  useEffect(() => {
    // Combinar los contactos por defecto con los grupos recibidos del useWebSocket
    const combinedContacts = [
      ...defaultContacts,
      ...groups.map((group, index) => ({
        id: defaultContacts.length + index + 1,
        name: group,
        avatar: `/placeholder.svg?height=40&width=40&text=${group[0]}`,
        lastMessage: null,
        lastMessageTime: null,
        isGroup: true,
      })),
    ];

    setContacts(combinedContacts);
  }, [groups]);

  useEffect(() => {
    // Actualizar los contactos con los últimos mensajes
    const updatedContacts = contacts.map((contact) => {
      const contactMessages = messages[contact.name] || [];
      const lastMessage = contactMessages[contactMessages.length - 1];
      return {
        ...contact,
        lastMessage: lastMessage ? lastMessage.content : null,
        lastMessageTime: lastMessage
          ? new Date(lastMessage.timestamp).toLocaleTimeString()
          : null,
      };
    });

    // Ordenar contactos por el mensaje más reciente
    updatedContacts.sort((a, b) => {
      if (!a.lastMessageTime) return 1;
      if (!b.lastMessageTime) return -1;
      return (
        new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime()
      );
    });

    setContacts(updatedContacts);
  }, [messages, contacts]);

  const handleSelectContact = (contactId: number) => {
    setSelectedContactId(contactId);
    setShowAllContacts(false);
  };

  const handleSendMessage = (message: string) => {
    if (selectedContactId !== null) {
      const selectedContact = contacts.find((c) => c.id === selectedContactId);
      if (selectedContact) {
        sendMessage(
          message,
          selectedContact.isGroup
            ? selectedContact.name
            : selectedContactId.toString(),
          selectedContact.isGroup
        );
      }
    }
  };

  const contactsToShow = showAllContacts
    ? contacts
    : contacts.filter((contact) => contact.lastMessage !== null);

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent p-4">
      <Card className="flex w-full max-w-4xl h-[600px] shadow-xl overflow-hidden">
        <div className="w-1/3 text-white h-full border-r-2 border-gray-300 bg-gradient-to-b from-violet-900 to-violet-500">
          <div className="p-4 border-b">
            <Button
              onClick={() => setShowAllContacts(!showAllContacts)}
              className="w-full"
            >
              {showAllContacts ? "Mostrar chats recientes" : "Nuevo mensaje"}
            </Button>
          </div>
          <ContactList
            contacts={contactsToShow}
            selectedContactId={selectedContactId}
            onSelectContact={handleSelectContact}
          />
        </div>
        <div className="w-2/3 h-full bg-gradient-to-b from-violet-900 to-violet-500 overflow-hidden">
          {selectedContactId !== null ? (
            <ChatWindow
              messages={messages[selectedContactId.toString()] || []}
              onSendMessage={handleSendMessage}
              selectedContact={contacts.find((c) => c.id === selectedContactId)}
              groupUsers={groupUsers}
              userId={userId}
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
