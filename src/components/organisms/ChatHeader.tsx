"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ChatHeaderProps {
  onNewChat: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onNewChat }) => (
  <div className="flex items-start justify-between px-8 pt-8 pb-4 border-b border-gray-100 bg-white">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome to RFZ AI Agent 👋
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Your AI assistant to help you learn everything about RFZ digital.
      </p>
    </div>
    <Button
      variant="outline"
      size="sm"
      onClick={onNewChat}
      className="gap-2 text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 shrink-0"
    >
      <RotateCcw size={14} />
      Start New Chat
    </Button>
  </div>
);