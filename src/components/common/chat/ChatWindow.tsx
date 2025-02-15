"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import type { Message, Contact } from "@/types/ChatType.d";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  selectedContact: Contact | undefined;
  groupUsers: { [key: string]: string[] };
  userId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  selectedContact,
  groupUsers,
  userId,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, []); // Updated useEffect dependency

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-white">
        {selectedContact && (
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={selectedContact.avatar}
                alt={selectedContact.name}
              />
              <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{selectedContact.name}</h2>
              {selectedContact.isGroup && groupUsers[selectedContact.name] && (
                <p className="text-sm text-gray-500">
                  {groupUsers[selectedContact.name].length} participants
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === userId ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender !== userId && (
                <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                  <AvatarImage
                    src={`/placeholder.svg?height=32&width=32&text=${message.sender[0]}`}
                    alt={message.sender}
                  />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === userId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {selectedContact?.isGroup && message.sender !== userId && (
                  <p className="text-xs font-semibold mb-1">{message.sender}</p>
                )}
                <p className="text-sm">{message.msg}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
              {message.sender === userId && (
                <Avatar className="h-8 w-8 ml-2 flex-shrink-0">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Me"
                  />
                  <AvatarFallback>Me</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 bg-white">
        <div className="flex items-center">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-grow mr-2"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Enviar</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
