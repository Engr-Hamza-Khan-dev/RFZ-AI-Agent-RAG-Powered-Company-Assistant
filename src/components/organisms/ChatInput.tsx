"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SuggestedQuestion } from "@/components/molecules";
import { suggestedQuestions } from "@/data";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: (text?: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  isLoading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-gray-100 bg-white px-8 py-4">
      {/* Suggested questions scroll row */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
        {suggestedQuestions.map((q) => (
          <SuggestedQuestion
            key={q.id}
            question={q}
            onClick={(text) => {
              onSend(text);
              inputRef.current?.focus();
            }}
          />
        ))}
      </div>

      {/* Text input row */}
      <div className="flex items-center gap-3">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question here..."
          disabled={isLoading}
          className="flex-1 h-12 rounded-xl border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus-visible:ring-purple-400 focus-visible:border-purple-400"
        />
        <Button
          onClick={() => onSend()}
          disabled={isLoading || !value.trim()}
          size="icon"
          className="w-12 h-12 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 shrink-0"
        >
          <Send size={18} className="text-white" />
        </Button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-2">
        RFZ AI can make mistakes. Please verify important information.
      </p>
    </div>
  );
};