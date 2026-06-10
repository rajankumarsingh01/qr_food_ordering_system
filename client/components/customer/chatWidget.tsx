"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { useSendMessageMutation } from "@/redux/api/chatApi";
import { useAppSelector } from "@/redux/hooks";
import type { ChatMessage } from "@/types/chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Namaste! 👋 Main aapka restaurant assistant hoon. Menu, orders, ya kisi bhi cheez mein help chahiye? Poochho!",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentOrderId = useAppSelector(
    (state) => state.order.currentOrder?._id
  );

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const response = await sendMessage({
        message: trimmed,
        orderId: currentOrderId,
      }).unwrap();

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, kuch problem ho gayi. Please try again! 🙏",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "Veg items kya hain?",
    "Mera order status?",
    "Kitna time lagega?",
  ];

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 flex h-[480px] w-[340px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:right-6">

          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-indigo-600 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Restaurant Assistant
                </p>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span className="text-xs text-indigo-200">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-indigo-600" : "bg-gray-100 dark:bg-gray-800"}`}>
                  {msg.role === "user"
                    ? <User size={13} className="text-white" />
                    : <Bot size={13} className="text-indigo-600" />
                  }
                </div>

                {/* Bubble */}
                <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-tr-sm bg-indigo-600 text-white"
                    : "rounded-tl-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <Bot size={13} className="text-indigo-600" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 dark:bg-gray-800">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    inputRef.current?.focus();
                  }}
                  className="shrink-0 rounded-full border border-indigo-200 px-3 py-1 text-xs text-indigo-600 hover:bg-indigo-50 transition dark:border-indigo-800 dark:text-indigo-400"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t p-3 dark:border-gray-700">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Kuch poochho..."
                className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-white"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:opacity-40"
              >
                {isLoading
                  ? <Loader2 size={13} className="animate-spin" />
                  : <Send size={13} />
                }
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-700 hover:scale-105 active:scale-95 sm:right-6"
      >
        {isOpen
          ? <X size={22} />
          : <MessageCircle size={22} />
        }
        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-orange-500 ring-2 ring-white" />
        )}
      </button>
    </>
  );
}