import React from "react";
import { ChatMessage } from "@/components/molecules";
import { TypingIndicator, Avatar } from "@/components/atoms";
import { Message } from "@/types";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  bottomRef,
}) => (
  <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50/40">
    {messages.map((msg) => (
      <ChatMessage key={msg.id} message={msg} />
    ))}

    {isLoading && (
      <div className="flex gap-3 mb-4">
        <Avatar variant="bot" />
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm">
          <TypingIndicator />
        </div>
      </div>
    )}

    <div ref={bottomRef} />
  </div>
);