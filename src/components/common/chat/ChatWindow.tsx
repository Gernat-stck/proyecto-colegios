import React, { useState, useRef, useEffect } from "react";
import { Message, Contact } from "@/types/ChatType.d";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  selectedContact: Contact | undefined;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  selectedContact,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

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
            <h2 className="ml-4 text-lg font-semibold">
              {selectedContact.name}
            </h2>
          </div>
        )}
      </div>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "Me" || message.sender === "Yo"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.sender !== "Me" && message.sender !== "Yo" && (
                <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                  <AvatarImage
                    src={selectedContact?.avatar}
                    alt={selectedContact?.name}
                  />
                  <AvatarFallback>
                    {selectedContact?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "Me" || message.sender === "Yo"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
              {message.sender === "Me" ||
                (message.sender === "Yo" && (
                  <Avatar className="h-8 w-8 ml-2 flex-shrink-0">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="Me"
                    />
                    <AvatarFallback>Me</AvatarFallback>
                  </Avatar>
                ))}
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
