"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Menu, Info } from "lucide-react";

interface ChatHeaderProps {
  onNewChat: () => void;
  onOpenSidebar: () => void;
  onOpenAbout: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onNewChat, onOpenSidebar, onOpenAbout }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-8 pt-4 pb-3 border-b border-border bg-card gap-3">
    <div className="flex items-center gap-3 w-full sm:w-auto">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-rfz-muted hover:text-rfz-primary"
        onClick={onOpenSidebar}
      >
        <Menu size={18} />
      </Button>
      <div className="min-w-0">
        <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">
          Welcome to RFZ AI Agent 👋
        </h1>
        <p className="hidden sm:block text-sm text-rfz-muted mt-1 truncate">
          Your AI assistant to help you learn everything about RFZ digital.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2 mt-3 sm:mt-0">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-rfz-muted hover:text-rfz-primary"
        onClick={onOpenAbout}
      >
        <Info size={18} />
      </Button>

      {/* Full button on md+ */}
      <Button
        variant="outline"
        size="sm"
        onClick={onNewChat}
        className="hidden md:inline-flex gap-2 text-rfz-muted border-rfz hover:border-rfz hover:text-rfz-primary hover:bg-muted shrink-0"
      >
        <RotateCcw size={14} />
        Start New Chat
      </Button>

      {/* Icon-only button on mobile */}
      <Button
        variant="outline"
        size="icon"
        onClick={onNewChat}
        className="md:hidden text-rfz-muted border-rfz hover:border-rfz hover:text-rfz-primary hover:bg-muted"
        aria-label="Start new chat"
      >
        <RotateCcw size={16} />
      </Button>
    </div>
  </div>
);