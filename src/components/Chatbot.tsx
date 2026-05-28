"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Loader2, Sparkles, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions in English/Indonesian
  const suggestions = {
    en: [
      "What are Fariz's core skills?",
      "Tell me about the NexPay project.",
      "Is Fariz open to freelance?",
      "How to contact Fariz?",
    ],
    id: [
      "Apa saja keahlian utama Fariz?",
      "Ceritakan tentang proyek NexPay.",
      "Apakah Fariz menerima freelance?",
      "Bagaimana menghubungi Fariz?",
    ],
  };

  // Initial greeting
  const getGreeting = () => {
    return language === "en"
      ? "Hi! I'm Fariz's AI Assistant. Ask me anything about his skills, experience, or projects."
      : "Halo! Saya Asisten AI Fariz. Tanyakan apa saja tentang keahlian, pengalaman, atau proyek-proyeknya.";
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [
        ...messages,
        userMessage,
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            language === "en"
              ? "Sorry, I'm having trouble connecting to the brain. Please try again later."
              : "Maaf, terjadi kendala koneksi ke server. Silakan coba sesaat lagi.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[90vw] sm:w-[380px] h-[500px] rounded-3xl overflow-hidden mb-4 border border-black/[0.08] dark:border-white/[0.08] bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-black/[0.07] dark:border-white/[0.07] flex items-center justify-between bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white relative shadow-inner">
                  <Sparkles size={18} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-neutral-950 rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-black dark:text-white leading-tight">
                    {language === "en" ? "Fariz AI Assistant" : "Asisten AI Fariz"}
                  </h4>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
                    {isLoading ? (language === "en" ? "Typing..." : "Mengetik...") : "Online"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {/* Default Greeting */}
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 leading-relaxed rounded-tl-none border border-black/[0.04] dark:border-white/[0.04]">
                  {getGreeting()}
                </div>
              </div>

              {/* Message History */}
              {messages.map((msg, idx) => (
                <div key={idx} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed border",
                      msg.role === "user"
                        ? "bg-black dark:bg-white text-white dark:text-black rounded-tr-none border-transparent"
                        : "bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-tl-none border-black/[0.04] dark:border-white/[0.04]"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing Loader */}
              {isLoading && (
                <div className="flex justify-start items-center gap-2">
                  <div className="bg-neutral-100 dark:bg-neutral-900 text-neutral-400 rounded-2xl rounded-tl-none px-4 py-3 border border-black/[0.04] dark:border-white/[0.04] flex items-center gap-1.5">
                    <Loader2 size={14} className="animate-spin text-cyan-500" />
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      {language === "en" ? "Thinking..." : "Berpikir..."}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 0 && (
              <div className="px-4 py-2.5 border-t border-black/[0.05] dark:border-white/[0.05] bg-black/[0.01] dark:bg-white/[0.01]">
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2 font-medium">
                  {language === "en" ? "Suggested Questions" : "Pertanyaan Saran"}
                </p>
                <div className="flex flex-col gap-1.5">
                  {suggestions[language].map((sugg, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sugg)}
                      className="text-left text-xs px-3 py-2 rounded-xl border border-black/[0.06] dark:border-white/[0.06] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-black/[0.07] dark:border-white/[0.07] bg-black/[0.02] dark:bg-white/[0.02]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={language === "en" ? "Ask a question..." : "Tanyakan sesuatu..."}
                  className="flex-1 px-4 py-2 text-sm rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-neutral-900 text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow cursor-pointer z-50 relative"
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.15 }} className="relative">
              <MessageCircle size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black dark:border-white animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
