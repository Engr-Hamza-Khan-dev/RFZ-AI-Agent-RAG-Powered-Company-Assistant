"use client";

import React, { useState } from "react";
import {
  Sidebar,
  ChatHeader,
  ChatWindow,
  ChatInput,
  AboutPanel,
} from "@/components/organisms";
import { useChat } from "@/hooks/useChat";

export const ChatLayout: React.FC = () => {
  const [activeNav,     setActiveNav]     = useState("chat");
  const [showAbout,     setShowAbout]     = useState(true);
  const { messages, input, setInput, isLoading, sendMessage, resetChat, bottomRef } = useChat();

  const handleNavChange = (id: string) => {
    setActiveNav(id);
    if (id === "about") setShowAbout(true);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      {/* Left Sidebar */}
      <Sidebar activeNav={activeNav} onNavChange={handleNavChange} />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <ChatHeader onNewChat={resetChat} />
        <ChatWindow messages={messages} isLoading={isLoading} bottomRef={bottomRef as React.RefObject<HTMLDivElement>} />
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={sendMessage}
          isLoading={isLoading}
        />
      </main>

      {/* Right About Panel */}
      {showAbout && (
        <AboutPanel onClose={() => setShowAbout(false)} />
      )}
    </div>
  );
};