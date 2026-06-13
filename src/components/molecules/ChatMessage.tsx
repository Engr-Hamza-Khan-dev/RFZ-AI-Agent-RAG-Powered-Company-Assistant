import React from "react";
import ReactMarkdown from "react-markdown";
import { Avatar } from "@/components/atoms";
import { Message } from "@/types";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3 mb-4", isUser && "flex-row-reverse")}>
      <Avatar variant={isUser ? "user" : "bot"} />

      <div className={cn("flex flex-col max-w-[78%]", isUser && "items-end")}>
        {/* Bubble */}
        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-sm leading-relaxed",
            isUser
              ? "bg-rfz-primary text-white rounded-tr-sm"
                : "bg-card border border-border shadow-sm text-foreground rounded-tl-sm"
          )}
        >
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown
              components={{
                p:    ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                strong:({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                ul:   ({ children }) => <ul className="mt-2 space-y-1">{children}</ul>,
                li:   ({ children }) => (
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-4 h-4 rounded-full bg-rfz-primary flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{children}</span>
                  </li>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {/* Timestamp + delivered */}
        <div className="flex items-center gap-1 mt-1 px-1">
          <span className="text-xs text-gray-400">{message.timestamp}</span>
          {isUser && message.delivered && (
            <CheckCheck size={12} className="text-purple-400" />
          )}
        </div>
      </div>
    </div>
  );
};