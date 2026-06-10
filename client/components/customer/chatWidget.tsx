// "use client";

// import { useState, useRef, useEffect } from "react";
// import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
// import { useSendMessageMutation } from "@/redux/api/chatApi";
// import { useAppSelector } from "@/redux/hooks";
// import type { ChatMessage } from "@/types/chat";

// export default function ChatWidget() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: "welcome",
//       role: "assistant",
//       content: "Namaste! 👋 Main aapka restaurant assistant hoon. Menu, orders, ya kisi bhi cheez mein help chahiye? Poochho!",
//       timestamp: new Date(),
//     },
//   ]);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const currentOrderId = useAppSelector(
//     (state) => state.order.currentOrder?._id
//   );

//   const [sendMessage, { isLoading }] = useSendMessageMutation();

//   // Auto scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Focus input when opened
//   useEffect(() => {
//     if (isOpen) {
//       setTimeout(() => inputRef.current?.focus(), 100);
//     }
//   }, [isOpen]);

//   const handleSend = async () => {
//     const trimmed = input.trim();
//     if (!trimmed || isLoading) return;

//     const userMsg: ChatMessage = {
//       id: Date.now().toString(),
//       role: "user",
//       content: trimmed,
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");

//     try {
//       const response = await sendMessage({
//         message: trimmed,
//         orderId: currentOrderId,
//       }).unwrap();

//       const botMsg: ChatMessage = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: response.data.reply,
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, botMsg]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 1).toString(),
//           role: "assistant",
//           content: "Sorry, kuch problem ho gayi. Please try again! 🙏",
//           timestamp: new Date(),
//         },
//       ]);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const quickQuestions = [
//     "Veg items kya hain?",
//     "Mera order status?",
//     "Kitna time lagega?",
//   ];

//   return (
//     <>
//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-20 right-4 z-50 flex h-[480px] w-[340px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:right-6">

//           {/* Header */}
//           <div className="flex items-center justify-between rounded-t-2xl bg-indigo-600 px-4 py-3">
//             <div className="flex items-center gap-2">
//               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
//                 <Bot size={16} className="text-white" />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-white">
//                   Restaurant Assistant
//                 </p>
//                 <div className="flex items-center gap-1">
//                   <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
//                   <span className="text-xs text-indigo-200">Online</span>
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white transition"
//             >
//               <X size={18} />
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-3">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
//               >
//                 {/* Avatar */}
//                 <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-indigo-600" : "bg-gray-100 dark:bg-gray-800"}`}>
//                   {msg.role === "user"
//                     ? <User size={13} className="text-white" />
//                     : <Bot size={13} className="text-indigo-600" />
//                   }
//                 </div>

//                 {/* Bubble */}
//                 <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
//                   msg.role === "user"
//                     ? "rounded-tr-sm bg-indigo-600 text-white"
//                     : "rounded-tl-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
//                 }`}>
//                   {msg.content}
//                 </div>
//               </div>
//             ))}

//             {/* Typing indicator */}
//             {isLoading && (
//               <div className="flex gap-2">
//                 <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
//                   <Bot size={13} className="text-indigo-600" />
//                 </div>
//                 <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 dark:bg-gray-800">
//                   <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
//                   <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
//                   <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
//                 </div>
//               </div>
//             )}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* Quick Questions */}
//           {messages.length === 1 && (
//             <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
//               {quickQuestions.map((q) => (
//                 <button
//                   key={q}
//                   onClick={() => {
//                     setInput(q);
//                     inputRef.current?.focus();
//                   }}
//                   className="shrink-0 rounded-full border border-indigo-200 px-3 py-1 text-xs text-indigo-600 hover:bg-indigo-50 transition dark:border-indigo-800 dark:text-indigo-400"
//                 >
//                   {q}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Input */}
//           <div className="border-t p-3 dark:border-gray-700">
//             <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
//               <input
//                 ref={inputRef}
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Kuch poochho..."
//                 className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-white"
//               />
//               <button
//                 onClick={handleSend}
//                 disabled={!input.trim() || isLoading}
//                 className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:opacity-40"
//               >
//                 {isLoading
//                   ? <Loader2 size={13} className="animate-spin" />
//                   : <Send size={13} />
//                 }
//               </button>
//             </div>
//           </div>

//         </div>
//       )}

//       {/* Floating Button */}
//       <button
//         onClick={() => setIsOpen((prev) => !prev)}
//         className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-700 hover:scale-105 active:scale-95 sm:right-6"
//       >
//         {isOpen
//           ? <X size={22} />
//           : <MessageCircle size={22} />
//         }
//         {/* Notification dot */}
//         {!isOpen && (
//           <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-orange-500 ring-2 ring-white" />
//         )}
//       </button>
//     </>
//   );
// }


















"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useSendMessageMutation } from "@/redux/api/chatApi";
import { useAppSelector } from "@/redux/hooks";
import type { ChatMessage } from "@/types/chat";

const QUICK_QUESTIONS = [
  "🥗 Veg items kya hain?",
  "📦 Mera order status?",
  "⏱️ Kitna time lagega?",
  "🔥 Best seller kya hai?",
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
        <Bot size={13} className="text-white" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm dark:bg-gray-800">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full shadow-sm ${
        isUser
          ? "bg-gradient-to-br from-indigo-500 to-indigo-600"
          : "bg-gradient-to-br from-purple-500 to-indigo-600"
      }`}>
        {isUser
          ? <User size={12} className="text-white" />
          : <Bot size={12} className="text-white" />
        }
      </div>

      {/* Bubble */}
      <div className={`group relative max-w-[78%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "rounded-br-sm bg-gradient-to-br from-indigo-500 to-indigo-600 text-white"
            : "rounded-bl-sm bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200"
        }`}>
          {msg.content}
        </div>
        <span className="px-1 text-[10px] text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
          {msg.timestamp.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Namaste! 👋 Main aapka restaurant assistant hoon.\n\nMenu, orders, ya kisi bhi cheez mein help chahiye? Neeche se koi sawaal choose karo ya apna sawaal likhो!",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentOrderId = useAppSelector(
    (state) => state.order.currentOrder?._id
  );

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (text?: string) => {
    const trimmed = (text ?? input).trim();
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

      if (!isOpen) setUnreadCount((c) => c + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, abhi thodi dikkat aa rahi hai. Please thodi der mein try karo! 🙏",
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

  const showQuickQuestions =
    messages.length === 1 || messages.length === 2;

  return (
    <>
      {/* ── Chat Window ── */}
      <div
        className={`fixed bottom-24 right-4 z-50 flex flex-col sm:right-6 transition-all duration-300 ease-out ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ width: 340, height: 520 }}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-2xl dark:border-gray-700 dark:bg-gray-950">

          {/* Header */}
          <div className="relative flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3.5">
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <div className="h-full w-full rounded-t-2xl bg-[radial-gradient(ellipse_at_top,_white_0%,_transparent_70%)]" />
            </div>

            <div className="relative flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/30">
                <Bot size={18} className="text-white" />
                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-indigo-600 bg-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Restaurant AI
                </p>
                <p className="flex items-center gap-1 text-[11px] text-indigo-200">
                  <Sparkles size={9} />
                  Powered by Rajandev magic ✨
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="relative rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-gray-200">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {showQuickQuestions && !isLoading && (
            <div className="px-3 pb-2">
              <p className="mb-2 px-1 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                Quick Questions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs font-medium text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-indigo-800 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-100 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 pl-4 pr-2 py-2 transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-800">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Kuch bhi poochho..."
                className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-white"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm transition hover:opacity-90 active:scale-95 disabled:opacity-40"
              >
                {isLoading
                  ? <Loader2 size={13} className="animate-spin" />
                  : <Send size={13} />
                }
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-gray-300 dark:text-gray-600">
              AI responses may not always be accurate
            </p>
          </div>
        </div>
      </div>

      {/* ── Floating Button ── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95 sm:right-6"
      >
        <div className={`transition-all duration-200 ${isOpen ? "rotate-0 scale-100" : "rotate-0 scale-100"}`}>
          {isOpen ? (
            <X size={22} />
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </div>

        {/* Unread badge */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white ring-2 ring-white">
            {unreadCount}
          </span>
        )}

        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-20" />
        )}
      </button>
    </>
  );
}