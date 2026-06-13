"use client";

import React, { useState } from "react";
import {
  Sidebar,
  ChatHeader,
  ChatWindow,
  ChatInput,
} from "@/components/organisms";
import { ChatRightPanels } from "./ChatRightPanels";
import { MobileDrawers } from "./MobileDrawers";
import { useChat } from "@/hooks/useChat";

export const ChatLayout: React.FC = () => {
  const [activeNav, setActiveNav] = useState("chat");
  const [showAbout, setShowAbout] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { messages, input, setInput, isLoading, sendMessage, resetChat, bottomRef } = useChat();

  const handleNavChange = (id: string) => {
    setActiveNav(id);
    setMobileSidebarOpen(false);
    setShowAbout(id === "about");
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex" activeNav={activeNav} onNavChange={handleNavChange} />

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <button
            className="absolute inset-0 bg-transparent"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          />
          <div className="absolute inset-y-0 left-0 w-full sm:w-[250px] bg-card border-r border-border shadow-xl">
            <Sidebar activeNav={activeNav} onNavChange={handleNavChange} />
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <ChatHeader
          onNewChat={resetChat}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
          onOpenAbout={() => setShowAbout(true)}
        />
        <ChatWindow messages={messages} isLoading={isLoading} bottomRef={bottomRef as React.RefObject<HTMLDivElement>} />
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={sendMessage}
          isLoading={isLoading}
        />
      </main>

      <ChatRightPanels activeNav={activeNav} showAbout={showAbout} setShowAbout={setShowAbout} setActiveNav={setActiveNav} />

      <MobileDrawers activeNav={activeNav} setActiveNav={setActiveNav} />
    </div>
  );
};