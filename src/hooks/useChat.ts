"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Message } from "@/types";
import { INITIAL_MESSAGE } from "@/data";

const getTime = () => {
  const now  = new Date();
  const h    = now.getHours() % 12 || 12;
  const m    = now.getMinutes().toString().padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";
  return `${h}:${m} ${ampm}`;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "assistant", content: INITIAL_MESSAGE, timestamp: getTime() },
  ]);
  const [input,     setInput]     = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    async (text?: string) => {
      const msg = (text ?? input).trim();
      if (!msg || isLoading) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: msg,
        timestamp: getTime(),
        delivered: true,
      };

      setMessages((p) => [...p, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();
      const reply = data.reply ?? "Sorry, I couldn't process that.";

        setMessages((p) => [
          ...p,
          { id: (Date.now() + 1).toString(), role: "assistant", content: reply, timestamp: getTime() },
        ]);
      } catch {
        setMessages((p) => [
          ...p,
          { id: (Date.now() + 1).toString(), role: "assistant", content: "Something went wrong. Please try again.", timestamp: getTime() },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading]
  );

  const resetChat = useCallback(() => {
    setMessages([{ id: "init", role: "assistant", content: INITIAL_MESSAGE, timestamp: getTime() }]);
    setInput("");
  }, []);

  return { messages, input, setInput, isLoading, sendMessage, resetChat, bottomRef };
}